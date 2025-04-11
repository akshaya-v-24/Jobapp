Job Board Application
A full-stack job board platform allowing job seekers to apply for jobs and track their application statuses, while employers can manage job postings and handle applications. The backend is developed using Java Spring Boot, and it integrates with a MySQL database. The frontend is handled separately (e.g., Angular) and communicates via REST APIs.


Tech Stack

Backend: Java 17, Spring Boot, Spring Security, Spring Data JPA
Database: MySQL
Build Tool: Maven
Frontend: Angular (communicates with backend via REST API)
Others: JWT Authentication, Swagger (optional for API documentation)

Features

Job Seekers

Register and log in securely using JWT.
Apply for available jobs with resume and cover letter.
Track status of submitted applications.
Receive notifications when application status changes.

Employers

Create, update, delete job listings.
View job applications.
Approve or reject job applications.
Automatically trigger notifications for status updates.

Admin
View all job seekers, employers, jobs, and applications.
Moderate access and system data if needed.

Project Structure 

JobBoard/
├── controller/
├── model/
├── repository/
├── service/
├── config/
├── dto/
├── security/
└── resources/



Base URL: http://localhost:8080

AUTH CONTROLLER 

 1. Register a New User
Method: POST
Endpoint: /register
Description: Registers a new user with the system.
Request Body: JSON object of User (with details like name, email, password, role, etc.)
Response:
201 Created: Registration successful
400 Bad Request: User already exists or validation error
500 Internal Server Error: Other issues during registration
Access: Public (Anyone)

2. Login a User
Method: POST
Endpoint: /login
Description: Authenticates a user and returns a JWT token upon successful login.
Request Body: JSON object of AuthRequest (with email and password)
Response:
200 OK: Returns an AuthResponse containing token and user details
401 Unauthorized: Invalid credentials
500 Internal Server Error: Login failure
Access: Public (Anyone)

USER CONTROLLER

1. Get User by ID
Method: GET
Endpoint: /users/{id}
Description: Fetches user profile by their ID (for both Job Seekers and Employers).
Access: Job Seeker / Employer / Admin

2. Update User by ID
Method: PUT
Endpoint: /users/{id}
Description: Updates user profile details. Only the logged-in user can update their own profile.
Request Body: JSON with updated User data
Access: Authenticated users (only their own profile)

3. Get All Users
Method: GET
Endpoint: /users
Description: Retrieves a list of all users in the system.
Access: Admin only

4. Delete User by ID
Method: DELETE
Endpoint: /users/{id}
Description: Deletes a user account based on their ID. Only accessible by admins.
Access: Admin only

5. Get Logged-in User's Profile
Method: GET
Endpoint: /users/me
Description: Returns the currently authenticated user’s profile details using the email extracted from the JWT token.
Access: Any logged-in user

JOB CONTROLLER

1. Get All Jobs
Method: GET
Endpoint: /jobs
Description: Retrieves all job listings. Optionally filters jobs by jobType using a query parameter.
Query Param (Optional): jobType (e.g., "Full-Time", "Part-Time")
Access: Public

2. Get Job by ID
Method: GET
Endpoint: /jobs/{id}
Description: Fetches job details for the specified job ID.
Access: Public

3. Create a Job
Method: POST
Endpoint: /jobs
Description: Creates a new job posting. Requires employer details in the request body.
Request Body: JSON with job details, including a valid employer ID
Access: Employer

4. Update Job
Method: PUT
Endpoint: /jobs/{id}
Description: Updates the job details for a given job ID.
Access: Employer (creator of the job)

5. Delete Job
Method: DELETE
Endpoint: /jobs/{id}
Description: Deletes the job posting identified by the given ID.
Access: Employer / Admin

6. Get Applicants for a Job
Method: GET
Endpoint: /jobs/{id}/applicants
Description: Retrieves a list of applicants who applied for a specific job.
Access: Employer / Admin

7. Get Jobs by Employer
Method: GET
Endpoint: /jobs/employer/{employerId}
Description: Retrieves all jobs posted by a specific employer using their ID.
Access: Employer / Admin


APPLICATION CONTROLLER 

1. Apply for a Job
Method: POST
Endpoint: /applications
Description: Allows a job seeker to apply for a specific job.
Access: Job Seeker

2. Get All Applications
Method: GET
Endpoint: /applications
Description: Retrieves all job applications in the system.
Access: Admin

3. Get Applications for a Specific Job
Method: GET
Endpoint: /applications/job/{jobId}
Description: Returns all applications submitted for a particular job.
Access: Employer, Admin

4. Get Applications for a Specific User
Method: GET
Endpoint: /applications/user/{userId}
Description: Retrieves all applications submitted by a specific user.
Access: Job Seeker, Admin

5. Get Current User's Application Statuses
Method: GET
Endpoint: /applications/status
Description: Returns the status of applications submitted by the currently logged-in user.
Access: Job Seeker

6. Update Application Status (Approve/Reject)
Method: PUT
Endpoint: /applications/{id}/status
Description: Allows an employer to approve or reject a submitted application.
Access: Employer

7. Delete an Application
Method: DELETE
Endpoint: /applications/{applicationId}
Description: Deletes an application from the system.
Access: Admin

ADMIN CONTROLLER

1. Get All Users
Method: GET
Endpoint: /api/admin/users
Description: Fetches the list of all registered users in the system.
Access: Admin

2. Update User Active Status (Block/Unblock)
Method: PUT
Endpoint: /api/admin/users/{id}/status
Description: Enables the admin to block or unblock a user by updating their active status.
Request Body: { "active": true/false }
Access: Admin

3. Delete a User
Method: DELETE
Endpoint: /api/admin/users/{id}
Description: Deletes the user account identified by the given ID.
Access: Admin

4. Get All Job Posts
Method: GET
Endpoint: /api/admin/jobs
Description: Retrieves all job postings from all employers.
Access: Admin

5. Delete a Job Post
Method: DELETE
Endpoint: /api/admin/jobs/{id}
Description: Deletes the job post with the specified ID.
Access: Admin

6. Get All Job Applications
Method: GET
Endpoint: /api/admin/applications
Description: Returns a list of all job applications submitted by users.
Access: Admin


NOTIFICATION  CONTROLLER


1. Get Notifications for a User
Method: GET
Endpoint: /api/notifications/{userId}
Description: Retrieves all notifications for the specified user.
Path Variable: userId — ID of the user.
Access: Authenticated User

2. Mark a Single Notification as Read
Method: PUT
Endpoint: /api/notifications/read/{id}
Description: Marks a specific notification (by its ID) as read.
Path Variable: id — ID of the notification.
Access: Authenticated User

3. Get All Unread Notifications for a User
Method: GET
Endpoint: /api/notifications/unread/{recipientId}
Description: Retrieves all unread notifications for the specified recipient.
Path Variable: recipientId — ID of the user.
Access: Authenticated User

4. Mark All Notifications as Read for a User
Method: PUT
Endpoint: /api/notifications/mark-as-read/{recipientId}
Description: Marks all notifications for the given user as read.
Path Variable: recipientId — ID of the user.
Access: Authenticated User


## 🚀 Running the Backend

### Prerequisites
- Java 17
- MySQL
- Maven
- (Optional) Postman or Swagger for testing

### Steps
1. Clone the repository.
2. Create a MySQL database named `jobboard`.
3. Update your DB credentials in `application.properties`.
4. Run the Spring Boot application using:
5. Access the APIs at: `http://localhost:8080`
6. Swagger UI : `http://localhost:8080/swagger-ui/index.html`

 Environment Configuration

 # application.properties (Sample)
spring.datasource.url=jdbc:mysql://localhost:3306/jobboard
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=your_jwt_secret_key
jwt.expiration=3600000

