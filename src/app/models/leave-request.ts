export interface LeaveRequest { 
  id: number; 
  employeeName: string; 
  startDate: string; 
  endDate: string; 
  reason: string; 
  status: 'Pending' | 'Approved' | 'Rejected'; 
}