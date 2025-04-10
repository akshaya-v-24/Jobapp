

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, map } from 'rxjs';
// import { AppNotification } from '../models/AppNotification.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   private apiUrl = 'http://localhost:8080/api/notifications';

//   constructor(private http: HttpClient) {}

//   getUnreadNotifications(userId: number): Observable<AppNotification[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/unread/${userId}`).pipe(
//       map(notifications =>
//         notifications.map(n => ({
//           id: n.id,
//           message: n.message,
//           isRead: n.isRead,
//           timestamp: n.timestamp,
//           recipient: {
//             id: n.recipient?.id,
//             username: n.recipient?.username,
//             email: n.recipient?.email
//           }
//         }))
//       )
//     );
//   }

//   markAsRead(userId: number): Observable<any> {
//     return this.http.put(`${this.apiUrl}/markAsRead/${userId}`, {});
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppNotification } from '../models/AppNotification.model';
//import { AppNotification } from '../models/app-notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getUnreadNotifications(userId: number): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.apiUrl}/unread/${userId}`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/read/${notificationId}`, {});
  }

  markAllAsRead(userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/mark-as-read/${userId}`, {});
  }
}
