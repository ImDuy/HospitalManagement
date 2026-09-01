# Hospital Management System

## Project Overview

The **Hospital Management System** allows patients to book appointments with doctors online, while doctors can review and manage these booking requests, with all appointment data and schedule being synchronized and persisted automatically by the system.

### Features

- **Authentication**: Role-based user registration and login/logout.
- **Appointment Management**:
  - Patients can view doctor's availability and book an appointment with that doctor at an available time slot
  - Doctors can view appointment requests from patients and approve or decline them.

### Architecture Summary

This application follows the three-tier architecture:

- **Presentation tier**: This is the user interface and communication layer of the application, where the end user interacts with the application. Its main purpose is to display information to and collect information from the user.
- **Application tier**: This is the heart of the application that handles business logic. It processes the data collected from the presentation tier, and can also add, delete, or modify data in the data tier.
- **Data tier**: This is the database of the application where all the data within the app is stored. The the information is processed by application layer will be stored and managed here.

### Known Limitations

- Profile page is not functional.
- Doctor time slots are fixed and identical for every doctor.
- Only three fixed doctor specialties are supported.
- Patients can only book within the next three working days.
- No password reset, email verification, or multi-factor authentication.
- No payment & notifications features.

---

## Project Setup

### 1. Prerequisites

Make sure you have the following installed:

- **Node.js**
- **MongoDB**
- **Git**
- **VS Code**

### 2. Clone the Repository

    ```bash
    git clone https://github.com/ImDuy/HospitalManagement.git
    cd HospitalManagement
    ```

### 3. Environment Configuration

- Create an .env file in the backend folder.
- Copy the .env.example content to .env file.
- Assign your connection string to MONGO_URI variable.
- Add the database name and replace your database credentials as required.

### 4. Install Dependencies

- Run the following command at the root directory to install backend and frontend dependencies
  `npm run install-all`

### 5. Run the project

- To start both the frontend and backend concurrently, run below command at the root directory
  `npm start`

---

## Public URL

- **Deployment URL**: [http://3.27.69.168/]
- **Jira**: [https://trankhangduynguyen.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog]
- **Figma**: [https://www.figma.com/design/44PqhGeBr5OcoB8Nl3ygV0/HSM-High-fidelity-design?node-id=0-1&t=LfmGMJ5CiSAYCGjJ-1]
