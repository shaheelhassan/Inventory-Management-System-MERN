# Inventory Management System

A professional-grade inventory management solution built with the MERN stack (MongoDB, Express, React, and Node.js). This system provides a robust platform for tracking stock levels, managing product catalogs, and generating detailed business reports.

## Architecture Overview

The project is structured as a monorepo containing both the frontend and backend components.

### Core Technologies
- **Frontend**: React.js with Vite, Redux Toolkit for state management, and Recharts for data visualization.
- **Backend**: Node.js and Express.js with a RESTful API architecture.
- **Database**: MongoDB with Mongoose for data modeling.
- **Authentication**: JWT (JSON Web Tokens) for secure, stateless authentication.

## Features

- **Real-time Dashboard**: Visual metrics and analytics on inventory trends and stock valuation.
- **Inventory Management**: Comprehensive control over product records including SKU, pricing, and stock status.
- **Role-Based Access Control**: Secure access levels (Admin, Manager, Staff) to ensure data integrity and security.
- **Reporting System**: Automated STOCK reports, valuation summaries, and low-stock alerts.
- **Responsive Interface**: A clean, minimalistic design optimized for various screen resolutions.

## Installation and Setup

### Prerequisites
- Node.js (Latest stable version recommended)
- MongoDB (Local instance or MongoDB Atlas)

### 1. Project Configuration
Ensure you have the necessary environment variables configured in the backend directory. Create a `.env` file in the `backend` folder with the following parameters:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 2. Dependency Installation
Install the necessary packages for the root, frontend, and backend directories:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Database Seeding (Optional)
To populate the database with demonstration data:

```bash
npm run seed
```

### 4. Running the Application
To start both the frontend and backend development servers concurrently from the root directory:

```bash
npm run dev
```

The application will be accessible at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## API Documentation

The backend exposes a collection of RESTful endpoints for managing users, products, and reports. Detailed endpoint documentation can be found within the controller and route definitions in the `backend` directory.

## License

This project is licensed under the ISC License.
