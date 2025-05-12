import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { LeaveRequestService } from '../../services/leave-request.service';

@Component({
  selector: 'app-new-leave-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './new-leave-modal.component.html',
  styleUrls: ['./new-leave-modal.component.scss']
})
export class NewLeaveModalComponent {
  leaveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewLeaveModalComponent>,
    private leaveService: LeaveRequestService
  ) {
    this.leaveForm = this.fb.group({
      employeeName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    }, { validators: this.dateRangeValidator });
  }

  dateRangeValidator(group: FormGroup) {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    
    if (start && end) {
      return start < end ? null : { dateRange: true };
    }
    return null;
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const newLeave = {
        ...this.leaveForm.value,
        status: 'PENDING'
      };
      
      this.leaveService.addLeaveRequest(newLeave).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error submitting leave request:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}