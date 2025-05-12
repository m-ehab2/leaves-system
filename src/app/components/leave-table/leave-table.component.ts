import {
  Component,
  Input,
  Signal,
  computed,
  effect,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LeaveStateService } from '../../services/leave-state.service';
import { LeaveRequest } from '../../models/leave-request';
import { LeaveDetailsComponent } from '../leave-details/leave-details.component';

@Component({
  selector: 'app-leave-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.scss'],
})
export class LeaveTableComponent {
  @Input() set filters(value: { employee: string; status: string }) {
    this.employeeFilter.set(value.employee);
    this.statusFilter.set(value.status);
  }

  // Filter signals
  private employeeFilter = signal<string>('');
  private statusFilter = signal<string>('');

  // Columns
  displayedColumns = ['employee', 'startDate', 'endDate', 'status'];

  // Base signals from state service
  leaveRequests: Signal<LeaveRequest[]>;
  isLoading: Signal<boolean>;

  // Computed filtered list
  filteredLeaveRequests = computed(() => {
    let list = this.leaveRequests();
    const emp = this.employeeFilter().toLowerCase();
    const stat = this.statusFilter().toLowerCase();

    if (emp) {
      list = list.filter((r) => r.employeeName.toLowerCase().includes(emp));
    }
    if (stat) {
      list = list.filter((r) => r.status.toLowerCase() === stat);
    }
    return list;
  });

  // Paginator reference
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Data source to handle pagination
  dataSource: LeaveRequest[] = [];

  constructor(
    private leaveState: LeaveStateService,
    private dialog: MatDialog
  ) {
    this.leaveRequests = this.leaveState.leaveRequests;
    this.isLoading = this.leaveState.isLoading;

    // Effect to update data source when filteredLeaveRequests changes
    effect(() => {
      const filteredData = this.filteredLeaveRequests();
      this.dataSource = filteredData; // Update data source with filtered data
      if (this.paginator) {
        this.paginator.length = filteredData.length; // Update paginator length
        this.paginator.pageIndex = 0; // Reset to first page on filter change
        this.updateDisplayedData(); // Apply pagination
      }
      console.log('Filtered requests count:', filteredData.length);
    });
  }

  ngAfterViewInit() {
    // Ensure paginator is initialized
    if (this.paginator) {
      this.paginator.pageSize = 5; // Default page size
      this.paginator.pageSizeOptions =
        ![5, 10].includes(this.dataSource.length) && this.dataSource.length
          ? [5, 10, this.dataSource.length]
          : [5, 10]; // Available page sizes
      this.updateDisplayedData(); // Apply initial pagination
    }
  }

  // Update displayed data based on paginator settings
  private updateDisplayedData() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.dataSource = this.filteredLeaveRequests().slice(startIndex, endIndex);
  }

  // Handle page change
  onPageChange() {
    this.updateDisplayedData();
  }

  onRowClick(row: LeaveRequest) {
    this.dialog.open(LeaveDetailsComponent, {
      width: '500px',
      data: row,
    });
  }
}
