import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeavesListComponent } from './pages/leaves-list/leaves-list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'leaves',
    component: LeavesListComponent,
  },
];
