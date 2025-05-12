import { Injectable, signal, computed } from '@angular/core';
import { LeaveRequest } from '../models/leave-request';
import { LeaveRequestService } from './leave-request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveStateService {
  leaveRequests = signal<LeaveRequest[]>([]);
  isLoading = signal(true);

  constructor(private leaveService: LeaveRequestService) {
    this.loadLeaveRequests();
  }

  // Computed signals for stats
  public stats = computed(() => {
    return this.leaveRequests().reduce(
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
  });

  // Getter for leave requests
  public getLeaveRequests() {
    return this.leaveRequests;
  }

  // Load leave requests
  private loadLeaveRequests() {
    this.isLoading.set(true);
    this.leaveService.getLeaveRequests().subscribe({
      next: (requests) => {
        this.leaveRequests.set(requests);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  // Add new leave request
  public addLeaveRequest(request: LeaveRequest): Observable<LeaveRequest> {
    return this.leaveService.addLeaveRequest(request).pipe(
      tap((newRequest) => {
        this.leaveRequests.update((reqs) => [...reqs, newRequest]);
      })
    );
  }

  // Delete new leave request
  public deleteLeaveRequest(id: number) {
    return this.leaveService.deleteLeaveRequest(id).pipe(
      tap((newRequest) => {
        console.log({ id });
        this.leaveRequests.update((requests) =>
          requests.filter((r) => r.id !== id)
        );
      })
    );
  }

  // Update leave request
  public updateLeaveRequest(request: LeaveRequest) {
    return this.leaveService.updateLeaveRequest(request).pipe(
      tap((newRequest) => {
        this.leaveRequests.update((requests) =>
          requests.map((r) => (r.id === request.id ? request : r))
        );
      })
    );
  }
}
