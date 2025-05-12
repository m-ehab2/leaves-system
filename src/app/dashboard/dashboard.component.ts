import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LeaveRequestService } from '../services/leave-request.service';
import { LeaveRequest } from '../models/leave-request';
import { ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  leaveStats = {
    pending: 0,
    approved: 0,
    rejected: 0,
  };
  constructor(private leaveService: LeaveRequestService) {}

  ngOnInit(): void {
    this.loadLeaveStats();
  }

  private loadLeaveStats(): void {
    this.leaveService.getLeaveRequests().subscribe((leaves) => {
      this.leaveStats = this.computeStats(leaves);
    });
  }

  private computeStats(leaves: LeaveRequest[]): {
    pending: number;
    approved: number;
    rejected: number;
  } {
    return leaves.reduce(
      (acc, leave) => {
        switch (leave.status.toLowerCase()) {
          case 'pending':
            acc.pending++;
            break;
          case 'approved':
            acc.approved++;
            break;
          case 'rejected':
            acc.rejected++;
            break;
        }
        return acc;
      },
      { pending: 0, approved: 0, rejected: 0 }
    );
  }
}
