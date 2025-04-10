// // app-notification.model.ts
// export interface AppNotification {
//     read: any;
//     id: number;
//     message: string;
//     isRead: boolean;
//     timestamp: string;
//     recipient: any; // Or a proper User model
//   }
  // src/app/models/AppNotification.model.ts

export interface AppNotification {
read: any;
content: any;
    id: number;
    message: string;
    isRead: boolean;      // ✅ match Java field `isRead`
    timestamp: string;
    recipient: {
      id: number;
      username?: string;
      email?: string;
    };
  }
  