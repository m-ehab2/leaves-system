import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LeaveRequest } from '../models/leave-request';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const leaveRequests: LeaveRequest[] = [
      {
        id: 1,
        employeeName: 'John Doe',
        startDate: '2023-11-01',
        endDate: '2023-11-05',
        reason: 'Family vacation',
        status: 'Approved',
      },
      {
        id: 2,
        employeeName: 'Jane Smith',
        startDate: '2023-11-10',
        endDate: '2023-11-12',
        reason: 'Medical appointment',
        status: 'Pending',
      },
      {
        id: 3,
        employeeName: 'Mike Johnson',
        startDate: '2023-11-15',
        endDate: '2023-11-16',
        reason: 'Personal reasons',
        status: 'Rejected',
      },
      {
        id: 4,
        employeeName: 'Sarah Williams',
        startDate: '2023-11-20',
        endDate: '2023-11-25',
        reason: 'Family emergency',
        status: 'Approved',
      },
      {
        id: 5,
        employeeName: 'David Brown',
        startDate: '2023-12-01',
        endDate: '2023-12-05',
        reason: 'Year-end vacation',
        status: 'Pending',
      },
      {
        id: 6,
        employeeName: 'Sarah Johnson',
        startDate: '2024-01-10',
        endDate: '2024-01-15',
        reason: 'Business trip',
        status: 'Approved',
      },
      {
        id: 7,
        employeeName: 'Michael Smith',
        startDate: '2024-02-20',
        endDate: '2024-02-22',
        reason: 'Sick leave',
        status: 'Pending',
      },
      {
        id: 8,
        employeeName: 'Emily Davis',
        startDate: '2024-03-05',
        endDate: '2024-03-10',
        reason: 'Personal time off',
        status: 'Pending',
      },
      {
        id: 9,
        employeeName: 'James Wilson',
        startDate: '2024-04-01',
        endDate: '2024-04-03',
        reason: 'Medical leave',
        status: 'Approved',
      },
      {
        id: 10,
        employeeName: 'Jessica Taylor',
        startDate: '2024-05-15',
        endDate: '2024-05-20',
        reason: 'Family emergency',
        status: 'Pending',
      },
    ];
    return { leaveRequests };
  }

  // Overrides the genId method to ensure that a leave request always has an id.
  // If the leave requests array is empty, the method returns the initial number (1).
  // If the leave requests array is not empty, the method returns the highest
  // leave request id + 1.
  genId(leaveRequests: LeaveRequest[]): number {
    return leaveRequests.length > 0
      ? Math.max(...leaveRequests.map((leave) => leave.id)) + 1
      : 1;
  }
}
