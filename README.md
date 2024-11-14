# MERN Blog Application

This is a simple blog application built using the MERN stack (MongoDB, Express, React, Node.js) with `Vite` for a faster React setup. The backend allows users to register, log in, reset their passwords, and manage blogs (create, read, update, and delete). Authentication is implemented using JWT.

## Table of Contents
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [Blog Routes](#blog-routes)
- [Authentication Flow](#authentication-flow)

## Project Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Vite for the frontend setup

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install backend dependencies:

    ```bash
    cd server
    npm install
    ```

3. Install frontend dependencies:

    ```bash
    cd client
    npm install
    ```

4. Create an `.env` file in the `server` folder and configure the following environment variables:

    ```plaintext
    PORT=5000
    MONGO_URL=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    CLIENT_URL=http://localhost:5173
    ```

5. Start the backend and frontend servers:

    - In the `server` folder, run:

      ```bash
      npm start
      ```

    - In the `client` folder, run:

      ```bash
      npm run dev
      ```

6. Visit the frontend app at `http://localhost:5173`.

## Environment Variables

| Variable     | Description                               |
|--------------|-------------------------------------------|
| `PORT`       | The server port (default: 5000)           |
| `MONGO_URL`  | MongoDB connection string                 |
| `JWT_SECRET` | Secret key for JWT token generation       |
| `CLIENT_URL` | Frontend client URL for CORS permissions  |

## Available Scripts

In the project root directory, you can run the following scripts:

- **Backend (server directory):**
  - `npm run dev`: Starts the backend server in development mode.
  - `npm start`: Starts the backend server in production mode.

- **Frontend (client directory):**
  - `npm run dev`: Starts the frontend development server using Vite.

## API Endpoints

### Authentication Routes

**Base URL**: `/auth`

- **POST** `/auth/register`
  - **Description**: Registers a new user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "confirmedPassword": "password123"
    }
    ```
  - **Response**: `201 Created` with a success message or error details.

- **POST** `/auth/login`
  - **Description**: Logs in an existing user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**: `200 OK` with JWT token as a cookie and success message.

- **POST** `/auth/reset-password`
  - **Description**: Resets user password.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "newPassword123",
      "confirmedPassword": "newPassword123"
    }
    ```
  - **Response**: `200 OK` with a password reset success message.

- **GET** `/auth/protected`
  - **Description**: A protected route that requires a valid token to access.
  - **Response**: `200 OK` with a message if authenticated.

### Blog Routes

**Base URL**: `/blog`

- **GET** `/blog/`
  - **Description**: Fetches all blog posts.
  - **Response**: `200 OK` with an array of blogs.

- **GET** `/blog/read/:id`
  - **Description**: Fetches a specific blog by ID.
  - **Response**: `200 OK` with the blog data if found, or `404 Not Found`.

- **POST** `/blog/create`
  - **Description**: Creates a new blog post.
  - **Request Body**:
    ```json
    {
      "title": "Blog Title",
      "image": "Image URL",
      "content": "Blog content",
      "author": "Author Name"
    }
    ```
  - **Response**: `200 OK` with success message or error details.

- **DELETE** `/blog/delete/:id`
  - **Description**: Deletes a blog post by ID.
  - **Response**: `200 OK` with deletion success message, or `404 Not Found`.

- **PUT** `/blog/update/:id`
  - **Description**: Updates a specific blog post by ID.
  - **Request Body** (fields are optional):
    ```json
    {
      "title": "Updated Title",
      "image": "Updated Image URL",
      "content": "Updated content"
    }
    ```
  - **Response**: `200 OK` with update success message, or `404 Not Found`.

## Authentication Flow

1. **Registration**: 
   - Users register by providing their email and password, which are validated and stored securely with bcrypt hashing.

2. **Login**:
   - Users log in with their email and password. A JWT token is generated upon successful login and sent as a secure HTTP-only cookie.

3. **Protected Routes**:
   - Protected routes require a valid JWT token. The token is validated by middleware (`authMiddleware.js`), allowing access only to authenticated users.

4. **Password Reset**:
   - Users can reset their password by providing their registered email and a new password.

5. **Token Validation**:
   - Every request to a protected endpoint checks the JWT token's validity to ensure secure access.

## License
This project is open source and available under the MIT License.
