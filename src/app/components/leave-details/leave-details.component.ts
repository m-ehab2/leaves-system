import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LeaveRequest } from '../../models/leave-request';
import { LeaveRequestService } from '../../services/leave-request.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-leave-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss']
})
export class LeaveDetailsComponent {
  isAdmin = false;

  constructor(
    public dialogRef: MatDialogRef<LeaveDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeaveRequest,
    private leaveService: LeaveRequestService,
    private roleService: RoleService
  ) {
    this.isAdmin = this.roleService.isAdmin();
  }

  onApprove() {
    const updatedRequest: LeaveRequest = {
      ...this.data,
      status: 'Approved'
    };
    this.leaveService.updateLeaveRequest(updatedRequest).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onReject() {
    const updatedRequest: LeaveRequest = {
      ...this.data,
      status: 'Rejected'
    };
    this.leaveService.updateLeaveRequest(updatedRequest).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}