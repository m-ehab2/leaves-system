import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LeaveRequest } from '../../models/leave-request';
import { LeaveStateService } from '../../services/leave-state.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-leave-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss'],
})
export class LeaveDetailsComponent {
  isAdmin = false;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<LeaveDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeaveRequest,
    private leaveState: LeaveStateService,
    private roleService: RoleService
  ) {
    this.isAdmin = this.roleService.isAdmin();
  }

  onApprove() {
    this.updateStatus('Approved');
  }

  onReject() {
    this.updateStatus('Rejected');
  }

  private updateStatus(status: 'Approved' | 'Rejected') {
    this.isLoading = true;
    const updatedRequest: LeaveRequest = {
      ...this.data,
      status,
    };
    this.leaveState.updateLeaveRequest(updatedRequest).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Failed to update leave request', err);
        this.isLoading = false;
      },
    });
  }
  onDelete() {
    this.isLoading = true;
    this.leaveState.deleteLeaveRequest(this.data.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Failed to update leave request', err);
        this.isLoading = false;
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
