# EMEXA Backend (Python/Flask)

Backend API for the EMEXA exam management system with authentication.

## Features

- User registration with student/teacher account types
- JWT-based authentication
- Password hashing with bcrypt
- SQLite database (easily swap to PostgreSQL)
- CORS configured for frontend integration
- Email validation

## Setup Instructions

### 1. Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### 2. Create Virtual Environment

```powershell
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate
```

### 3. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 4. Environment Configuration

```powershell
# Copy the example env file
copy .env.example .env

# Edit .env and update values (optional for development)
```

### 5. Run the Application

```powershell
python app.py
```

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "accountType": "student"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "accountType": "student",
    "createdAt": "2025-11-01T10:00:00"
  }
}
```

#### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "accountType": "student"
  }
}
```

#### POST /auth/forgot-password
Request password reset.

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "If the email exists, a password reset link has been sent"
}
```

#### GET /auth/me
Get current authenticated user (requires JWT token).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "accountType": "student"
  }
}
```

## Database

By default, uses SQLite (`emexa.db` file in backend folder).

To use PostgreSQL, update `DATABASE_URL` in `.env`:
```
DATABASE_URL=postgresql://username:password@localhost/emexa
```

## Project Structure

```
backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── models/
│   ├── __init__.py
│   └── user.py           # User database model
└── routes/
    ├── __init__.py
    └── auth.py           # Authentication routes
```

## Frontend Integration

Update frontend `.env` file in `emexa` folder:
```
VITE_API_BASE=http://localhost:5000
```

## Testing with cURL

```powershell
# Register
curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\",\"accountType\":\"student\"}"

# Login
curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

## Next Steps

- [ ] Implement email sending for password reset
- [ ] Add email verification on registration
- [ ] Add refresh token mechanism
- [ ] Add rate limiting
- [ ] Add logging
- [ ] Add unit tests
- [ ] Deploy to production server

## Security Notes

- Change `SECRET_KEY` and `JWT_SECRET_KEY` in production
- Use HTTPS in production
- Implement rate limiting for login attempts
- Add password strength requirements
- Consider adding 2FA for sensitive accounts
