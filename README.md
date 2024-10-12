# Swachhta & Life Project

## Overview
**Swachhta & Life** is a web application designed to promote cleanliness and environmental awareness. This project includes a **login**, **signup**, and **dashboard** system, with data stored in MongoDB. The backend is built with **Node.js**, while the frontend is powered by **EJS** templates instead of traditional HTML. 

The application also features user authentication, session management, and input validation, including password hashing for secure user data.

## Features
- **User Authentication**: Signup and Login functionality with session management.
- **Password Security**: Secure password storage using bcrypt for hashing.
- **Dashboard**: Displays cleanliness statistics, alerts, inspections, and performance summaries.
- **Form Validation**: Client-side validation for sign-up forms using custom JavaScript.
- **Google, Facebook, and Apple Integration**: Users can log in using Google, Facebook, or Apple.

## Project Structure
```
root
│
├── app.js                  # Main server file
├── models
│   └── user.js             # User schema for MongoDB
├── views
│   ├── login.ejs           # Login page template
│   ├── signup.ejs          # Signup page template
│   ├── index.ejs           # Dashboard page template
├── public
│   └── stylesheets         # CSS for frontend
│   └── javascripts         # Client-side JS for validation
└── package.json            # Project dependencies
```

## Prerequisites
- **Node.js** installed on your machine.
- **MongoDB** running locally.
- **VSCode** (or any other IDE) for editing and running the project.

## Installation and Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/swachhta_life.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd swachhta_life
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start MongoDB** (Ensure MongoDB is installed and running locally):
   - On **Windows**, open CMD as **Administrator** and run:
     ```bash
     net start MongoDB
     ```

5. **Start the application**:
   ```bash
   npx nodemon --verbose
   ```

6. **Access the application**:
   Open your browser and visit: `http://localhost:3000`.

## Running in VSCode
If you're running the project in **VSCode**, follow these steps:
1. Run **VSCode** as an administrator.
2. Open a terminal in VSCode and start the MongoDB service:
   ```bash
   net start MongoDB
   ```
3. Use the following command to run the app:
   ```bash
   npx nodemon --verbose
   ```

## Application Routes
- **`/signup`** - Sign up for a new account.
- **`/login`** - Log in to an existing account.
- **`/dashboard`** - Access the user dashboard after logging in.
- **`/logout`** - Log out and destroy the user session.

## User Authentication Flow
1. **Signup**:
   - Users can sign up with an email and password.
   - Passwords are hashed using bcrypt before being stored in MongoDB.
   - After signing up, the user is redirected to the dashboard.

2. **Login**:
   - Users enter their email and password to log in.
   - Passwords are securely checked against the hashed values stored in the database.

3. **Session Management**:
   - A session is created when the user logs in, which persists until they log out or the session expires.

## Form Validation
- The **signup form** has validation for email (must be a Gmail address) and password (must meet certain complexity requirements).
- The **login form** checks that the credentials entered match a registered user in the database.

## MongoDB Model (user.js)
A simple user schema is created using **Mongoose**:
```js
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
```

## Tech Stack
- **Node.js**: Backend server
- **Express.js**: Web framework for Node.js
- **EJS**: Template engine for rendering views
- **MongoDB**: Database for storing user data
- **Mongoose**: ODM for MongoDB
- **Bcrypt**: For password hashing
- **Session Management**: Using `express-session` for managing user sessions

## To-Do and Improvements
- Implement **OAuth** using Google, Facebook, and Apple APIs for easier login.
- Add more features to the dashboard, such as real-time updates and detailed statistics.
- Integrate notifications for cleanliness alerts.
