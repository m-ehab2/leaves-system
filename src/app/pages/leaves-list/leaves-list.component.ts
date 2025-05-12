import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LeaveRequestService } from '../../services/leave-request.service';
import { LeaveFiltersComponent } from '../../components/leave-filters/leave-filters.component';
import { LeaveTableComponent } from '../../components/leave-table/leave-table.component';

@Component({
  selector: 'app-leaves-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    LeaveTableComponent,
    LeaveFiltersComponent
  ],
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.scss']
})
export class LeavesListComponent {
  constructor(private leaveService: LeaveRequestService) {}
  
  currentFilters = signal<{employee: string, status: string}>({
    employee: '',
    status: ''
  });

  handleFilterChange(filters: {employee: string, status: string}) {
    this.currentFilters.set(filters);
  }
}