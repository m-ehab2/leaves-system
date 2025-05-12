import { Component, effect, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LeaveStateService } from '../../services/leave-state.service';
import { LeaveRequest } from '../../models/leave-request';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // expose the service’s signals directly
  leaveRequests: Signal<LeaveRequest[]>;
  isLoading: Signal<boolean>;
  leaveStats: Signal<{ pending: number; approved: number; rejected: number }>;

  constructor(private leaveState: LeaveStateService) {
    this.leaveRequests = this.leaveState.getLeaveRequests();
    this.isLoading = this.leaveState.isLoading;
    this.leaveStats = this.leaveState.stats;
    effect(() => {
      console.log('Leave requests changed:', this.leaveRequests());
    });
  }
}
