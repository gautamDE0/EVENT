# Event Management System

A full-stack MERN application for managing college events with separate dashboards for students and administrators.

## Features

- Student registration and login
- Admin login and event management
- Event creation, editing, and deletion (admin only)
- Event browsing for students
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, Vite, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Deployment**: Render/Vercel

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd EVENT
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Environment Variables

### Backend (.env in server folder)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PHONE_EMAIL_CLIENT_ID=your_phone_email_client_id
```

### Frontend (.env in client folder for development, .env.production for production)
```
VITE_API_URL=http://localhost:5000 (for development)
VITE_API_URL=your_backend_production_url (for production)
```

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

### Production Mode

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Start the backend server:
   ```bash
   cd server
   npm start
   ```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
EVENT/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/    # Admin components
│   │   │   ├── Auth/     # Authentication components
│   │   │   └── Student/  # Student components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── server/              # Node.js backend
    ├── config/
    ├── models/
    ├── routes/
    ├── server.js
    └── .env
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Student signup
- `POST /api/auth/login` - Student login
- `POST /api/auth/admin-login` - Admin login

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.