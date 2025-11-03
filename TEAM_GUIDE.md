# EMEXA Project - Complete Team Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [File Structure Explained](#file-structure-explained)
5. [How Each Component Works](#how-each-component-works)
6. [Common Tasks](#common-tasks)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**EMEXA** is a full-stack web application with user authentication, featuring separate registration flows for Students and Teachers.

### Tech Stack
- **Frontend**: React 19.1.1 + Vite 7.1.14
- **Backend**: Flask 3.0.0 (Python)
- **Database**: SQLite
- **Authentication**: JWT tokens with bcrypt password hashing
- **Routing**: React Router with hash-based routing

### Key Features
✅ User registration with role selection (Student/Teacher)
✅ Separate database tables for Students and Teachers
✅ Secure password hashing with bcrypt
✅ Beautiful animated success messages
✅ Password visibility toggle
✅ Form validation
✅ CORS-enabled API communication

---

## 🏗️ Architecture

```
┌─────────────────┐         HTTP Requests        ┌──────────────────┐
│                 │ ───────────────────────────► │                  │
│  React Frontend │                               │  Flask Backend   │
│  (Port 5173)    │ ◄─────────────────────────── │  (Port 5000)     │
│                 │         JSON Responses        │                  │
└─────────────────┘                               └──────────────────┘
                                                           │
                                                           │
                                                           ▼
                                                  ┌──────────────────┐
                                                  │  SQLite Database │
                                                  │  - students      │
                                                  │  - teachers      │
                                                  │  - users (legacy)│
                                                  └──────────────────┘
```

### Data Flow (Registration Example)

1. **User fills form** → Frontend validates input
2. **Form submission** → POST request to `/auth/register`
3. **Backend receives** → Validates data again
4. **Password hashing** → bcrypt creates secure hash
5. **Database save** → Student or Teacher table
6. **JWT creation** → Token generated with user info
7. **Response sent** → Success message + token
8. **Frontend displays** → Animated success screen

---

## 🚀 Setup Instructions

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- VS Code (recommended)

### First-Time Setup

**Step 1: Backend Setup**
```powershell
# Navigate to backend folder
cd backend

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the backend
python app.py
```

**Step 2: Frontend Setup** (in a NEW terminal)
```powershell
# Navigate to frontend folder
cd emexa

# Install dependencies (first time only)
npm install

# Run the frontend
npm run dev
```

**Step 3: Access the Application**
- Open browser: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Quick Start (After First Setup)

**Option 1: Use Batch File** (Easiest)
```powershell
# From project root
.\START_PROJECT.bat
```
This automatically:
- Stops old processes
- Starts backend in one window
- Starts frontend in another window
- Opens browser

**Option 2: Manual Start**
```powershell
# Terminal 1 - Backend
cd backend
.\venv\Scripts\activate.ps1
python app.py

# Terminal 2 - Frontend
cd emexa
npm run dev
```

---

## 📁 File Structure Explained

### Project Root
```
EMEXA/
├── backend/                    # Flask API server
├── emexa/                      # React frontend
├── START_PROJECT.bat           # One-click startup script
├── STOP_PROJECT.bat            # Stop all servers
└── TEAM_GUIDE.md              # This file
```

### Backend Structure (`backend/`)
```
backend/
├── app.py                     # Main Flask application entry point
├── requirements.txt           # Python dependencies
├── venv/                      # Virtual environment (auto-created)
├── emexa.db                   # SQLite database file (auto-created)
├── models/
│   ├── user.py               # User model (legacy)
│   ├── student.py            # Student model
│   └── teacher.py            # Teacher model
└── routes/
    └── auth.py               # Authentication endpoints
```

### Frontend Structure (`emexa/`)
```
emexa/
├── src/
│   ├── main.jsx              # React app entry point
│   ├── App.jsx               # Main app component with routing
│   ├── index.css             # Global styles
│   ├── App.css               # App-specific styles
│   └── pages/
│       ├── Register.jsx      # Registration page
│       ├── Login.jsx         # Login page
│       ├── ForgotPassword.jsx # Password recovery page
│       └── Dashboard.jsx     # User dashboard
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Node dependencies
└── vite.config.js            # Vite configuration (PORT LOCKED)
```

---

## 🔧 How Each Component Works

### 1. Backend Components

#### **app.py** - Main Application
```python
# What it does:
# - Initializes Flask app
# - Configures CORS (allows frontend to connect)
# - Creates database tables
# - Registers API routes
# - Starts the development server

Key configuration:
- Port: 5000 (FIXED - do not change)
- CORS: Supports localhost ports 5173-5185
- Debug mode: ON (for development)
```

#### **models/student.py & teacher.py** - Database Models
```python
# What they do:
# - Define database table structure
# - Handle password hashing with bcrypt
# - Provide methods to save/retrieve user data

Student table columns:
- id (Primary Key)
- fullName
- email (Unique)
- password (Hashed)
- createdAt

Teacher table: Same structure, separate table
```

#### **routes/auth.py** - API Endpoints
```python
# Available endpoints:

POST /auth/register
- Creates new Student or Teacher account
- Input: {fullName, email, password, accountType}
- Returns: JWT token + success message

POST /auth/login
- Authenticates user
- Checks both Student and Teacher tables
- Returns: JWT token with user type

POST /auth/forgot-password
- Password recovery (to be implemented)
```

### 2. Frontend Components

#### **main.jsx** - React Entry Point
```javascript
// What it does:
// - Renders the root App component
// - Attaches React app to DOM element

// No need to modify this file
```

#### **App.jsx** - Router Configuration
```javascript
// What it does:
// - Sets up hash-based routing (#/register, #/login, etc.)
// - Defines which component renders for each URL

Routes:
/ → Login page
/register → Register page
/forgot-password → Password recovery
/dashboard → User dashboard (after login)
```

#### **pages/Register.jsx** - Registration Page
```javascript
// What it does:
// - Displays registration form
// - Validates user input
// - Sends POST request to backend
// - Shows success/error messages
// - Handles password visibility toggle

Key features:
1. Account type selection (Student/Teacher)
2. Form validation (email format, password length)
3. Password visibility toggle (eye icon)
4. Loading state during submission
5. Animated success screen with checkmark
6. Error handling with red boxes
```

---

## 📝 Common Tasks

### Task 1: Add a New Field to Registration

**Example: Add "Phone Number" field**

**Step 1: Update Database Model**
```python
# backend/models/student.py (and teacher.py)

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phoneNumber = db.Column(db.String(20), nullable=True)  # NEW FIELD
    password = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
```

**Step 2: Update Registration Endpoint**
```python
# backend/routes/auth.py

@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    phone_number = data.get('phoneNumber')  # GET NEW FIELD
    
    if account_type == "student":
        user = Student(
            fullName=full_name,
            email=email,
            phoneNumber=phone_number,  # ADD TO MODEL
            password=password
        )
```

**Step 3: Update Frontend Form**
```jsx
// emexa/src/pages/Register.jsx

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phoneNumber: "",  // NEW STATE
  password: "",
  confirmPassword: "",
  accountType: "student"
});

// Add input field in JSX
<input
  type="tel"
  name="phoneNumber"
  placeholder="Phone Number"
  value={formData.phoneNumber}
  onChange={handleInputChange}
/>
```

**Step 4: Delete Old Database & Restart**
```powershell
# Stop servers
# Delete backend/emexa.db
# Restart backend (creates new tables with new column)
```

---

### Task 2: Modify Success Message

**Location**: `emexa/src/pages/Register.jsx`

```jsx
// Find the success screen section (around line 250)
<div style={{
  background: 'linear-gradient(135deg, #f8fff9 0%, #ffffff 100%)',
  // Modify colors, sizes, etc.
}}>
  <h2>Custom Success Message!</h2>
  // Change text, add more content
</div>
```

---

### Task 3: Change Ports

**⚠️ IMPORTANT**: If you change ports, update BOTH files!

**Backend Port** (default: 5000)
```python
# backend/app.py
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5001)  # Changed to 5001
```

**Frontend Port** (default: 5173)
```javascript
// emexa/vite.config.js
export default defineConfig({
  server: {
    port: 5174,  // Changed to 5174
    strictPort: true,
  }
})
```

**Update CORS in Backend**
```python
# backend/app.py
CORS(app, origins=[
    "http://localhost:5174",  # Match new frontend port
    "http://127.0.0.1:5174",
    # ... add more if needed
])
```

**Update API URL in Frontend**
```javascript
// emexa/src/pages/Register.jsx
const response = await fetch('http://localhost:5001/auth/register', {
  // Match new backend port ^^^^^
```

---

### Task 4: Add Email Verification

**Step 1: Add verified column**
```python
# backend/models/student.py
isVerified = db.Column(db.Boolean, default=False)
verificationToken = db.Column(db.String(200))
```

**Step 2: Create verification endpoint**
```python
# backend/routes/auth.py
@auth.route('/verify-email/<token>', methods=['GET'])
def verify_email(token):
    # Find user by token
    # Set isVerified = True
    # Return success
```

**Step 3: Send verification email** (requires email service)
```python
# Use libraries like Flask-Mail
from flask_mail import Mail, Message
```

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to server"

**Symptoms**: Red error box in frontend
**Cause**: Backend not running or port mismatch

**Solution**:
1. Check backend terminal - is Flask running?
2. Look for: "Running on http://127.0.0.1:5000"
3. If not running: `cd backend; .\venv\Scripts\activate.ps1; python app.py`
4. Verify port matches in frontend API calls

---

### Problem: Port Already in Use

**Symptoms**: 
- Backend: "Address already in use"
- Frontend: "Port 5173 is in use"

**Solution**:
```powershell
# Stop all processes
Stop-Process -Name python,node -Force

# Or use batch file
.\STOP_PROJECT.bat

# Then restart
.\START_PROJECT.bat
```

---

### Problem: CORS Errors

**Symptoms**: Browser console shows "CORS policy" errors

**Cause**: Frontend port not in CORS allowed list

**Solution**:
```python
# backend/app.py
# Add your frontend port to this list:
CORS(app, origins=[
    "http://localhost:5173",
    "http://localhost:YOUR_PORT_HERE",  # Add new port
    # ...
])
```

---

### Problem: Database Changes Not Reflecting

**Symptoms**: New columns not appearing, old data persists

**Solution**:
```powershell
# Stop backend
# Delete backend/emexa.db
# Restart backend (creates fresh database)

# Note: This deletes ALL data! For production, use migrations.
```

---

### Problem: npm install Fails

**Symptoms**: Error during `npm install`

**Solution**:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

---

### Problem: Python venv Not Activating

**Symptoms**: PowerShell execution policy error

**Solution**:
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Try activating again
.\venv\Scripts\activate.ps1
```

---

## 🔑 Key Concepts to Understand

### 1. CORS (Cross-Origin Resource Sharing)
- Frontend (5173) and Backend (5000) are different origins
- Backend must explicitly allow frontend to connect
- Configured in `backend/app.py` with Flask-CORS

### 2. JWT Tokens
- After successful login/registration, backend creates a token
- Token contains user info (id, email, type)
- Frontend stores token (localStorage) for authenticated requests

### 3. Password Hashing
- Never store plain text passwords!
- bcrypt hashes passwords before saving
- Checking password: `bcrypt.check_password_hash(stored, entered)`

### 4. React State Management
- `useState` hook stores form data
- `handleInputChange` updates state when user types
- State triggers re-renders when changed

### 5. Async/Await
- `fetch` is asynchronous (doesn't block)
- `await` waits for response before continuing
- `try/catch` handles errors

---

## 📚 Additional Resources

### Learning Materials
- **React**: https://react.dev/learn
- **Flask**: https://flask.palletsprojects.com/
- **Vite**: https://vitejs.dev/guide/
- **bcrypt**: https://github.com/pyca/bcrypt/

### Project Documentation
- `HOW_TO_RUN.md` - Detailed startup guide
- `CORS_FIXED.md` - CORS configuration explained
- `SOLUTION_SUMMARY.md` - Bug fixes and solutions

---

## 👥 Team Collaboration Tips

### Before Making Changes
1. Pull latest code from git
2. Create a new branch: `git checkout -b feature-name`
3. Test your changes locally
4. Commit with clear messages

### Code Review Checklist
- [ ] Does it work on both Student and Teacher accounts?
- [ ] Are passwords still hashed?
- [ ] Did you test error cases?
- [ ] Is the code commented?
- [ ] Did you update documentation?

### Git Workflow
```bash
# Get latest code
git pull origin main

# Create feature branch
git checkout -b add-phone-field

# Make changes, then:
git add .
git commit -m "Added phone number field to registration"
git push origin add-phone-field

# Create Pull Request on GitHub
```

---

## 🎓 Understanding the Code

### Why Hash-Based Routing?
```javascript
// Hash routing: http://localhost:5173/#/register
// Benefits: Works without server configuration, simple deployment
```

### Why Separate Student/Teacher Tables?
```python
# Different user types may need different fields in future
# Example: Teachers might have "subject", Students have "grade"
# Easier to manage permissions and queries
```

### Why strictPort: true?
```javascript
// Prevents Vite from auto-incrementing port (5173→5174→5175)
// Each port change would require updating CORS config
// strictPort: true errors if port busy (forces you to stop old server)
```

---

## 📞 Need Help?

**Common Questions:**
- "How do I...?" → Check this guide first
- "Why isn't it working?" → Check Troubleshooting section
- "Can I change...?" → Yes! This is your project

**Debugging Strategy:**
1. Check browser console (F12) for errors
2. Check backend terminal for Python errors
3. Read error messages carefully
4. Google the error message
5. Ask team members

---

**Last Updated**: November 3, 2025
**Project Status**: ✅ Fully Functional
**Current Version**: 1.0

---

Remember: **Both servers must run simultaneously!** Keep both terminal windows open while developing.
