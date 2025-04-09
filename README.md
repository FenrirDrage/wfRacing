# 🏁 WebApp for Racing Incident Management

This is a web application developed in collaboration with **WFR**, a company that manages kart racing events in France. The app is designed to register and manage race incidents in real time.

## 🚀 Features

- Admin and user login  
- Incident registration with lap and timestamp  
- Validation system for incidents by Track Managers or Race Commissioners  
- Internal tools for data export and analysis

## 📦 Requirements

To run this application locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

You should also check the configured IP addresses in the JavaScript files (e.g., `ip.js`) and adjust them according to your local network setup.

## 🔧 How to Use

1. Clone the repository  
2. Run `npm install` to install dependencies  
3. Start the server with `node server.js` or `npm start` (if configured)  
4. Access the app via `index.html` or run the `.bat` file for quicker launch

## 📌 Project Status

This version represents the **first phase** of development.  
It focuses on:

- Logging race incidents
- Managing user sessions (admin/user)
- Recording lap times and incident details
- Enabling track staff to validate reported incidents
