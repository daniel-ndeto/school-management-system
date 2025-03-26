# SCHOOL MANAGEMENT SYSTEM

<h3 align="center">
Transform your school’s daily operations into a dynamic, growth‐focused environment.<br>
Easily organize classes, enroll students and faculty, and monitor progress in real time.<br>
Utilize continuous attendance tracking, performance assessments, and timely feedback to drive improvement.<br>
Access detailed records, review marks, and foster open communication to empower every learner.
</h3>

## About

The School Management System is a cutting-edge, web-based application built on the powerful MERN (MongoDB, Express.js, React.js, Node.js) stack. Engineered for maximum efficiency, it revolutionizes school administration by:

- **Centralizing and Automating Administrative Tasks:**  
  Manage student and teacher enrollment, class creation, and scheduling from one unified dashboard.

- **Streamlining Class Organization:**  
  Easily create and manage classes and subjects, ensuring smooth day-to-day operations.

- **Facilitating Real-Time Communication:**  
  Enable seamless, role-based communication among administrators, teachers, and students.

**Leveraging the MERN architecture, our system delivers:**

1. **Unparalleled Scalability & Performance:**  
   - Lightning-fast data retrieval using a database-driven approach  
   - Seamless scalability to accommodate growing institutional needs  
   - Optimized for handling large volumes of concurrent users and data

2. **Intuitive User Experience:**  
   - Responsive React.js frontend with sleek, user-friendly dashboards tailored for Admin, Teacher, and Student roles  
   - Intuitive navigation and minimal learning curve for all users

3. **Robust Back-End Integration:**  
   - Node.js and Express.js powering efficient server-side operations  
   - MongoDB’s flexible, document-based storage adapts to diverse data structures  
   - Real-time data synchronization for up-to-the-minute information

4. **Enhanced Security:**  
   - Role-based access control to protect sensitive information  
   - Encrypted data transmission and storage  
   - Regular security updates to safeguard against potential vulnerabilities

5. **Comprehensive Analytics:**  
   - Built-in reporting tools for administrators and teachers  
   - Interactive data visualization features (charts, tables) to track student performance trends  
   - Actionable insights to drive continuous improvement in educational outcomes

## What My Project Can Do

- **Centralized Administration:**  
  Automate and manage critical tasks like student and teacher enrollment, class creation, and scheduling—all from a single dashboard.

- **Role-Based Dashboards:**  
  Provide tailored, intuitive interfaces for administrators, teachers, and students, ensuring each group accesses the features they need.

- **Real-Time Attendance Tracking:**  
  Enable teachers to quickly mark attendance, generate reports, and monitor trends to help identify and address absenteeism.

- **Performance Assessments:**  
  Allow teachers to record marks, provide detailed feedback, and track students’ academic progress over time using interactive charts and reports.

- **Effective Communication:**  
  Facilitate real-time messaging and notifications between students, teachers, and administrators to foster collaboration and engagement.

- **Data Visualization & Analytics:**  
  Offer built-in reporting tools and data visualization features that help monitor academic performance and attendance, enabling data-driven decision-making.

- **Robust Security Measures:**  
  Protect sensitive information with role-based access control and encrypted data transmission and storage.

- **Scalability & Performance:**  
  Leverage the MERN stack to support rapid data retrieval and scalability, ensuring the system grows with your institution while maintaining high performance.

- **Seamless Deployment & Maintenance:**  
  Clear installation and error-resolution guidelines simplify setup locally and deployment to production environments using services like Render and Netlify.

In essence, our School Management System empowers schools to streamline administrative processes, enhance educational outcomes, and create a connected, growth-focused environment where every stakeholder has the tools they need for success.

## Features

- **User Roles:**  
  The system supports three user roles: Admin, Teacher, and Student. Each role has specific functionalities and access levels.

- **Admin Dashboard:**  
  Administrators can add new students and teachers, create classes and subjects, manage user accounts, and oversee system settings.

- **Attendance Tracking:**  
  Teachers can easily take attendance for their classes, mark students as present or absent, and generate attendance reports.

- **Performance Assessment:**  
  Teachers can assess students' performance by providing marks and feedback. Students can view their marks and track their progress over time.

- **Data Visualization:**  
  Students and teachers can visualize performance data through interactive charts and tables for an at-a-glance understanding.

- **Communication:**  
  Facilitate effective communication via in-system messaging and notifications among students, teachers, and administrators.

## Technologies Used

- **Frontend:** React.js, Material UI, Redux  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB

## Installation

Clone the repository:
```sh
git clone https://github.com/daniel-ndeto/school-management-system.git


### Setup Backend
1. Open a terminal and navigate to the `backend` folder:
   
   cd backend
   npm install
   npm start
   ```
2. Create a `.env` file in the `backend` folder and add:
   ```sh
   MONGO_URL = mongodb://127.0.0.1/school
   ```
   *(Replace with your MongoDB Atlas link if necessary.)*

### Setup Frontend
1. Open another terminal and navigate to the `frontend` folder:
   ```sh
   cd frontend
   npm install
   npm start
   ```
2. Open your browser and navigate to `localhost:3000` for the frontend.  
   The backend API will run at `localhost:5000`.

## Error Solution

If you encounter a sign-up error (e.g., a network error or endless loading):

1. **Frontend Environment Variables:**
   - Navigate to `frontend/.env` and uncomment the first line.
   - Restart the frontend server:
     ```sh
     cd frontend
     npm start
     ```

2. **Update Base URL in Code:**
   - In `frontend/src/redux/userRelated/userHandle.js`, add after the import statements:
     ```javascript
     const REACT_APP_BASE_URL = "http://localhost:5000";
     ```
   - Replace all instances of `process.env.REACT_APP_BASE_URL` with `REACT_APP_BASE_URL` in files containing "Handle" in their names (e.g., in `teacherRelated` and other related folders).

3. **Account Setup:**
   - Sign up first rather than logging in as a guest.  
   - For guest mode, use credentials from an existing account in the system as specified in `LoginPage.js`.


## Deployment

- **Backend:** Deployed using **Render** for server-side operations.
- **Frontend:** Deployed using **Netlify** for client-side hosting.


