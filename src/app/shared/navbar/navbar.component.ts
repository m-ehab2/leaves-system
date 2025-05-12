import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLeaveModalComponent } from '../../components/new-leave-modal/new-leave-modal.component';
import { MaterialModule } from '../material.module';
import { RoleService } from '../../services/role.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [MaterialModule, RouterLink],
})
export class NavbarComponent {
  title = 'Leaves Management System';
  isAdmin = false;

  constructor(private roleService: RoleService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.updateRoleStatus();
  }

  toggleRole(): void {
    this.roleService.toggleRole();
    this.updateRoleStatus();
  }

  private updateRoleStatus(): void {
    this.isAdmin = this.roleService.getRole() === 'admin';
  }

  openNewLeaveModal() {
    const dialogRef = this.dialog.open(NewLeaveModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Optionally refresh data or show success message
      }
    });
  }
}
