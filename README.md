# React Native Task Manager App

## Description

A simple task management app built with React Native (Expo), Node.js, Express, and MongoDB. This app allows users to create, view, edit, and delete tasks. It includes user authentication and JWT-based authorization.

## Features

*   User authentication (Signup and Login)
*   JWT-based authorization
*   Task management (CRUD operations)
*   Pull-to-refresh functionality
*   Responsive UI
*   Shareable development builds using `expo-dev-client`

## Technologies Used

*   Frontend: React Native, Expo, React Navigation, React Context, AsyncStorage
*   Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, cors, dotenv
*   Deployment: Render
*   Development Builds: Expo Application Services (EAS), expo-dev-client

## Setup Instructions

### 1. Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL
cd react-native-task-manager  # Change to your repository name

### 2. Configure the Backend

Navigate to the backend directory:

cd backend

Install dependencies:

npm install  # or yarn install


Create a .env file with the following environment variables:

PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET_KEY

Replace YOUR_MONGODB_CONNECTION_STRING with your MongoDB connection string (e.g., from MongoDB Atlas).

Replace YOUR_JWT_SECRET_KEY with a strong, random secret key.

### 3. Deploy the Backend to Render

Create a Render account at https://render.com/.

Follow the Render documentation to deploy a web service from your GitHub repository.

Configure the following environment variables in Render:

PORT: 5000

MONGO_URI: Your MongoDB connection string

JWT_SECRET: Your JWT secret key

Once deployed, note the Render app URL (e.g., https://taskmanager-backend-xxxxxxxx.onrender.com).

### 4. Configure the Frontend

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install  # or yarn install

Update the baseURL in utils/api.js with your Render app URL:

// frontend/utils/api.js
const baseURL = 'https://taskmanager-backend-xxxxxxxx.onrender.com'; // Replace with your Render URL

### 5. Local Development (Using Expo Go)

Start the Expo development server:

expo start  # or npx expo start or yarn start


Run the app on your Android or iOS device using the Expo Go app.
The app requires the correct back-end endpoint to be provided to run correctly


### API Endpoints
Authentication (JWT-based)

POST /auth/signup → Register a new user

POST /auth/login → Authenticate user and return JWT

### Task Management (CRUD operations) (Protected Routes - Requires JWT)

POST /tasks → Create a new task

GET /tasks → Get all tasks for the logged-in user

GET /tasks/:id → Get a specific task

PUT /tasks/:id → Update a task

DELETE /tasks/:id → Delete a task

### Additional Notes

This app uses JWT for authentication.

The backend is deployed on Render.

The frontend is built with React Native and Expo.


It is strongly recommended that if you make changes to any dependencies that you run npm audit fix or equivalent command to ensure that there are no security vulnerabilities introduced to your project
