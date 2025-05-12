import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly ROLE_KEY = 'userRole';
  private currentRole = signal<'admin' | 'user'>('user');

  constructor() {
    // Initialize from localStorage if available
    const storedRole = localStorage.getItem(this.ROLE_KEY) as 'admin' | 'user' | null;
    if (storedRole && (storedRole === 'admin' || storedRole === 'user')) {
      this.currentRole.set(storedRole);
    } else {
      // Default to 'user' if no valid role is stored
      this.setRole('user');
    }
  }

  getRole(): 'admin' | 'user' {
    return this.currentRole();
  }

  setRole(role: 'admin' | 'user'): void {
    this.currentRole.set(role);
    localStorage.setItem(this.ROLE_KEY, role);
  }

  toggleRole(): void {
    const newRole = this.currentRole() === 'admin' ? 'user' : 'admin';
    this.setRole(newRole);
  }

  isAdmin(): boolean {
    return this.currentRole() === 'admin';
  }
}