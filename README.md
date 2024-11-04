# Maintenance Work Request Application

## Introduction

### Purpose

The Maintenance Work Request Application is designed to streamline the reporting, management, and resolution of maintenance tasks in an industrial or factory environment. It provides a centralized platform for submitting work requests, assigning tasks, and tracking progress to ensure timely repairs, reducing machine downtime, and improving overall operational efficiency.

### Scope

The application facilitates communication between factory employees (requesters) and the maintenance team. Employees can submit maintenance work requests, while maintenance leaders manage, assign, and resolve these requests. Administrators control user access and system settings. The application tracks the status of all maintenance tasks from submission to completion, ensuring transparency and accountability.

## Overall Description

### Product Perspective

The Maintenance Work Request Application is a web-based system accessible via a browser. Users are authenticated before accessing the system, and role-based access control ensures that functionalities are tailored to user roles (e.g., Admin, Requester, Maintenance Team). Each role has specific privileges, ensuring that tasks are managed efficiently and securely.

### Product Features

- **User Authentication**: Only registered users can access the application through secure login.
- **Request Task Creation**: Requesters can submit work requests for malfunctioning or faulty machines.
- **Task Assignment**: Maintenance leaders assign tasks to the maintenance staff based on their availability and expertise.
- **Task Progress Tracking**: Tracks task statuses (in progress, success) to monitor repairs and ensure timely execution.
- **Reporting and Analysis (Optional)**: The system can generate analytical reports and dashboards to help managers track maintenance performance, downtime, and root causes of failures.

### User Characteristics

- **Requesters**: Employees who operate machinery and are responsible for identifying faults and submitting work requests.
- **Maintenance Team**: Consists of managers, leaders, and staff responsible for managing and performing machine repairs.
- **Admins**: Users responsible for user management and system maintenance.

## Specific Requirements

### User Authentication

- Users must log in before accessing the system.
- User roles include: Admin, Requester, and Maintenance Team members.
- Maintenance roles are further divided into three levels: Manager, Leader, and Staff.
- Unauthorized users will be redirected to the login page.

### Role Management

- The system determines user roles upon login and displays role-appropriate dashboards.
- **Admin**: Can register new users, manage user access, and monitor the overall system.
- **Requester**: Can create, view, update, and delete their own work requests. They can also accept or reject completed maintenance tasks.
- **Maintenance (Manager, Leader)**: Can view all work requests, accept tasks, create new tasks based on existing requests, and assign them to staff.
- **Maintenance (Staff)**: Can view, accept, and update their assigned tasks. Once completed, staff submit their progress using the Maintenance Report Form.

### Work Request Management

- Requesters can create work requests by providing details such as:
  - Machine ID
  - Fault Symptoms
  - Department
  - Optional images for better clarity
- Requesters can also edit or delete their requests before they are addressed.

### Task Assignment & Progress

- Maintenance managers or leaders will review open requests and assign them to appropriate staff members.
- Once a task is assigned, it appears under the "Maintenance Task" tab labeled as "Backlog."
- When maintenance staff accept a task, its status changes to "In Progress."
- Upon completing a task, the staff will submit a "Maintenance Report Form," after which the status changes to "In Review."

### Work Request Approval Process

- Once a task is completed, it will be reviewed by the requester.
- If the task is marked as "Accept," the status changes to "Success," and the request is considered resolved.
- If the task does not pass the review, a reason must be provided, and the task will be reassigned. The status reverts to "Backlog."

### Reporting (Optional)

The system can generate reports that provide insights into:
- Machine performance and reliability
- Task completion rates
- Common root causes of issues

### Logout Functionality

Users will be able to log out securely once they complete their tasks.
