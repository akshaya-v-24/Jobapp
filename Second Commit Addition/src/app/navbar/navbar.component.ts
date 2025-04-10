

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AppNotification } from '../models/AppNotification.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notifications: AppNotification[] = [];
  showDropdown = false;
  userId: number = Number(localStorage.getItem('userId')) || 1;

  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadUnreadNotifications(); // 🔁 Only load unread notifications initially
  }

  // loadUnreadNotifications(): void {
  //   this.notificationService.getUnreadNotifications(this.userId).subscribe(data => {
  //     this.notifications = data;
  //   });
  // }

  loadUnreadNotifications(): void {
    this.notificationService.getUnreadNotifications(this.userId).subscribe(data => {
      this.notifications = data;  // ✅ now it's AppNotification[]
    });
  }
  

  markAsRead(notification: AppNotification): void {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.id).subscribe(() => {
        notification.isRead = true;
      });
    }
  }

  markAllAsRead(): void {
    if (this.notifications.length > 0) {
      this.notificationService.markAllAsRead(this.userId).subscribe(() => {
        this.notifications = []; // Clear locally after marking
      });
    }
  }

  hasUnread(): boolean {
    return this.notifications.some(n => !n.isRead);
  }

  unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  toggleDropdown(): void {
    if (this.isLoggedIn()) {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.loadUnreadNotifications(); // 🔁 Reload only unread
      }
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isJobSeeker(): boolean {
    return localStorage.getItem('role') === 'JOB_SEEKER';
  }

  isEmployer(): boolean {
    return localStorage.getItem('role') === 'EMPLOYER';
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
