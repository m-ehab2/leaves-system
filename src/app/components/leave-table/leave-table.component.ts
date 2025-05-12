import { Component, signal, Input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequest } from '../../models/leave-request';
import { LeaveRequestService } from '../../services/leave-request.service';
import { LeaveDetailsComponent } from '../leave-details/leave-details.component';

@Component({
  selector: 'app-leave-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.scss']
})
export class LeaveTableComponent {
  @Input() set filters(value: {employee: string, status: string}) {
    this._filters = value;
    this.applyFilters();
  }
  private _filters: {employee: string, status: string} = {
    employee: '',
    status: ''
  };

  displayedColumns = ['employee', 'startDate', 'endDate', 'status'];
  allLeaveRequests = signal<LeaveRequest[]>([]);
  filteredLeaveRequests = signal<LeaveRequest[]>([]);
  
  constructor(
    private leaveService: LeaveRequestService,
    private dialog: MatDialog
  ) {
    this.loadLeaveRequests();
  }

  onRowClick(row: LeaveRequest) {
    this.dialog.open(LeaveDetailsComponent, {
      width: '500px',
      data: row
    });
  }

  private loadLeaveRequests() {
    this.leaveService.getLeaveRequests().subscribe(requests => {
      this.allLeaveRequests.set(requests);
      console.log({})
      this.applyFilters();
    });
  }

  private applyFilters() {
    let filtered = this.allLeaveRequests();
    
    if (this._filters.employee) {
      filtered = filtered.filter(request => 
        request.employeeName.toLowerCase().includes(this._filters.employee.toLowerCase())
      );
    }
    
    if (this._filters.status) {
      filtered = filtered.filter(request => 
        request.status.toLowerCase() === this._filters.status.toLowerCase()
      );
    }
    
    this.filteredLeaveRequests.set(filtered);
  }
}