# Emergency Personal Information Management System
## Requirements Document

## 1. Project Overview

The system is a full-stack web application that stores and manages personal and emergency information.

Each profile will have a unique QR code. When the QR code is scanned, selected emergency information can be accessed quickly while private information remains protected.

## 2. Functional Requirements

### User Account
- User can register and log in.
- User can securely access their private profile.

### Personal Profile
The user can:
- Create a profile
- View a profile
- Search profiles
- Edit a profile
- Delete a profile

Personal information may include:
- ID
- Name and Surname
- TC Number
- Phone Number
- Email
- Profile Photo

### Emergency Information

The user can store:
- Blood Type
- Allergies
- Emergency Notes
- Emergency Contact
- Preferred Language

### QR Code

- Each profile will have a unique QR code.
- The QR code will open an emergency profile.
- The emergency profile must be mobile-friendly.

### Privacy Controls

The user can choose which information is visible through the emergency QR profile.

Private information must not be displayed publicly.

## 3. Validation Requirements

The system must validate user input.

Examples:
- Required fields cannot be empty.
- Email must have a valid format.
- Phone number must have a valid format.
- TC Number must have a valid format.

## 4. Interface Requirements

- Simple and modern interface
- Responsive design
- Mobile-friendly emergency profile
- Clear forms and buttons
- Easy profile search and management

## 5. Technical Requirements

- Frontend: React
- Backend: Node.js and Express
- Database: PostgreSQL
- REST API
- QR Code Generation
- Git and GitHub