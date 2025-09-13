# BookingCare Backend

## Overview

BookingCare Backend is the server-side component of the BookingCare platform, designed to handle core functionalities through **CRUD** (Create, Read, Update, Delete) operations for appointment scheduling, patient management, and doctor management. Built with **Node.js** and **Express.js**, it utilizes **MySQL** for relational data storage and provides RESTful APIs to integrate seamlessly with the [BookingCare ReactJS front-end](https://github.com/nini048/booking-care-reactjs). The backend ensures secure data handling, user authentication, and efficient performance for a complete healthcare management solution.

## Features
- **Appointment Booking APIs**: Handles creation, cancellation, and updating of medical appointments.
- **User Management**: Supports user authentication, authorization, and profile management for patients and doctors.
- **Data Management**: Securely stores and queries medical data using MongoDB.
- **Security**: Implements JWT for authentication and encrypts sensitive data.
- **Performance**: Optimized with Express middleware and caching mechanisms.
- **Integration**: Supports CORS for seamless communication with the front-end and third-party services.

## Prerequisites

Ensure the following are installed before setting up the project:

- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher) or **yarn** (optional)
- **MySQL** (local installation or cloud-based setup, e.g., AWS RDS, Google Cloud SQL)
- A database management tool (optional, e.g., MySQL Workbench, phpMyAdmin)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/nini048/booking-care-nodejs.git
cd booking-care-nodejs
```
2. **Install dependencies:**
```bash
npm install
```
3. **Start the development server:**
```bash
npm start
```
The server will run at http://localhost:8080. Test APIs using tools like Postman.

## Available Scripts
In the project directory, you can run the following commands:

- **npm start:** Launches the server in development mode with Nodemon (auto-restarts on code changes).
- **npm test:** Executes the test suite (using Jest or Mocha, depending on configuration).
- **npm run lint:** Checks and fixes code issues with ESLint.


## Project Structure
The project follows a standard MVC (Model-View-Controller) architecture for Node.js/Express:
```bash
booking-care-nodejs/
├── config/                # Configuration files (database, JWT, etc.)
├── controllers/           # CRUD logic handlers for appointments, patients, doctors
├── models/                # MySQL data models (using Sequelize or Knex.js)
├── routes/                # API route definitions for CRUD operations
├── middleware/            # Middleware for authentication, error handling, etc.
├── utils/                 # Utility functions (validation, helpers)
├── app.js                 # Main Express application
├── server.js              # Server entry point
├── package.json           # Project metadata and dependencies
├── README.md              # This file
└── ...                    # Additional files (tests, .env, SQL scripts)    # Other configuration files
```

## Technologies Used
- **Node.js & Express.js**: Framework for building RESTful APIs.
- **MySQL**: Relational database for structured data storage with CRUD operations.
- **Sequelize**: ORM/query builder for MySQL interaction.
- **JWT:** Token-based authentication.
- **Bcrypt:** Password encryption.
- **Nodemon**: Auto-restarts server during development.
- **JavaScript (ES6+)**: Modern JavaScript features.

## Contributing

Contributions are welcome! To contribute:

- Fork the repository.
- Create a feature branch (git checkout -b feature/your-feature-name).
- Commit your changes (git commit -m "Add your feature").
- Push to the branch (git push origin feature/your-feature-name).
- Open a pull request with a detailed description of your changes.

Ensure your code adheres to the project’s coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
