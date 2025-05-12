import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LeaveRequest } from '../models/leave-request';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private leaveRequestsUrl = 'api/leaveRequests';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET leave requests from the server */
  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.leaveRequestsUrl)
      .pipe(
        tap(_ => console.log('fetched leave requests')),
        catchError(this.handleError<LeaveRequest[]>('getLeaveRequests', []))
      );
  }

  /** GET leave request by id */
  getLeaveRequest(id: number): Observable<LeaveRequest> {
    const url = `${this.leaveRequestsUrl}/${id}`;
    return this.http.get<LeaveRequest>(url).pipe(
      tap(_ => console.log(`fetched leave request id=${id}`)),
      catchError(this.handleError<LeaveRequest>(`getLeaveRequest id=${id}`))
    );
  }

  /** POST: add a new leave request to the server */
  addLeaveRequest(leaveRequest: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.leaveRequestsUrl, leaveRequest, this.httpOptions).pipe(
      tap((newLeaveRequest: LeaveRequest) => console.log(`added leave request w/ id=${newLeaveRequest.id}`)),
      catchError(this.handleError<LeaveRequest>('addLeaveRequest'))
    );
  }

  /** PUT: update the leave request on the server */
  updateLeaveRequest(leaveRequest: LeaveRequest): Observable<any> {
    return this.http.put(this.leaveRequestsUrl, leaveRequest, this.httpOptions).pipe(
      tap(_ => console.log(`updated leave request id=${leaveRequest.id}`)),
      catchError(this.handleError<any>('updateLeaveRequest'))
    );
  }

  /** DELETE: delete the leave request from the server */
  deleteLeaveRequest(id: number): Observable<LeaveRequest> {
    const url = `${this.leaveRequestsUrl}/${id}`;

    return this.http.delete<LeaveRequest>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted leave request id=${id}`)),
      catchError(this.handleError<LeaveRequest>('deleteLeaveRequest'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}