import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-filters',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './leave-filters.component.html',
  styleUrls: ['./leave-filters.component.scss']
})
export class LeaveFiltersComponent {
  @Output() filterChange = new EventEmitter<{employee: string, status: string}>();

  employeeFilter = '';
  statusFilter = '';

  onFilterChange() {
    this.filterChange.emit({
      employee: this.employeeFilter,
      status: this.statusFilter
    });
  }
}