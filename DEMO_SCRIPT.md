# 🎤 EMEXA PROJECT DEMO SCRIPT
## Complete Presentation Guide (2 Hour Demo)

**Presenter:** [Your Name]  
**Date:** November 3, 2025  
**Duration:** ~30-45 minutes (with Q&A)

---

## 📋 TABLE OF CONTENTS

1. [Introduction](#1-introduction-3-minutes)
2. [System Architecture Overview](#2-system-architecture-overview-5-minutes)
3. [Backend Deep Dive](#3-backend-deep-dive-10-minutes)
4. [Frontend Deep Dive](#4-frontend-deep-dive-10-minutes)
5. [Live Demo](#5-live-demo-10-minutes)
6. [Security Features](#6-security-features-5-minutes)
7. [Q&A](#7-qa-remaining-time)

---

## 1. INTRODUCTION (3 Minutes)

### Opening Statement:
> "Good [morning/afternoon], everyone. Today I'll be presenting **EMEXA**, a full-stack authentication system designed for educational institutions. This system allows students and teachers to register, login, and manage their accounts separately with enterprise-grade security."

### What is EMEXA?
- **E**ducational **M**anagement **EXA**mple (Authentication System)
- A complete user authentication platform
- Separates Students and Teachers into distinct user types
- Built with modern web technologies

### Key Features:
✅ **Dual User Types** - Separate registration for Students and Teachers  
✅ **Secure Authentication** - bcrypt password encryption + JWT tokens  
✅ **Modern UI** - React with beautiful animations and UX  
✅ **RESTful API** - Clean backend architecture with Flask  
✅ **Database Management** - SQLite with separate tables for each user type  
✅ **Form Validation** - Client-side and server-side validation  
✅ **Error Handling** - Comprehensive error messages and logging  

### Technology Stack:

**Frontend:**
- React 19.1.1 (Latest)
- Vite 7.1.14 (Build tool)
- Hash-based routing
- Modern CSS animations

**Backend:**
- Python 3.x
- Flask 3.0.0 (Web framework)
- SQLAlchemy (ORM)
- Flask-JWT-Extended (Authentication)
- bcrypt (Password hashing)

**Database:**
- SQLite (Lightweight, file-based)
- 3 Tables: `users`, `students`, `teachers`

---

## 2. SYSTEM ARCHITECTURE OVERVIEW (5 Minutes)

### High-Level Architecture Diagram:

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│                  http://localhost:5173                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTP Requests (JSON)
                        │ GET/POST with CORS
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│                      Port: 5173 (locked)                    │
├─────────────────────────────────────────────────────────────┤
│  Components:                                                │
│  ├── Login.jsx          → Login form + validation           │
│  ├── Register.jsx       → Registration form + animations    │
│  ├── ForgotPassword.jsx → Password recovery                 │
│  └── Dashboard.jsx      → Main user area                    │
│                                                              │
│  Core Files:                                                │
│  ├── App.jsx            → Hash-based routing                │
│  ├── api.js             → API wrapper for backend calls     │
│  └── Forms.css          → Beautiful UI styling              │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ API Calls
                        │ POST /auth/register
                        │ POST /auth/login
                        │ POST /auth/forgot-password
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Flask + Python)                   │
│                     Port: 5000 (fixed)                      │
├─────────────────────────────────────────────────────────────┤
│  Main Entry:                                                │
│  └── app.py             → Flask app initialization          │
│                                                              │
│  Routes:                                                    │
│  └── routes/auth.py     → /auth/* endpoints                 │
│      ├── /auth/register → Create new users                  │
│      ├── /auth/login    → Authenticate users                │
│      └── /auth/forgot-password → Reset password             │
│                                                              │
│  Models:                                                    │
│  └── models/user.py     → Database table definitions        │
│      ├── User (legacy)  → Old single table                  │
│      ├── Student        → Student-specific table            │
│      └── Teacher        → Teacher-specific table            │
│                                                              │
│  Core Logic:                                                │
│  ├── Password Hashing (bcrypt with salt rounds=12)          │
│  ├── JWT Token Generation (secure session management)       │
│  ├── Email Validation (email-validator library)             │
│  └── CORS Handling (Flask-CORS for cross-origin)            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ SQLAlchemy ORM
                        │ Database queries
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              DATABASE (SQLite - emexa.db)                   │
│         Location: backend/instance/emexa.db                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📊 Table: students                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ id | full_name | email | password_hash | created_at │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 1  | Nipun     | n@... | $2b$12$KIX...  | 2025-...  │   │
│  │ 2  | Saman     | s@... | $2b$12$abc...  | 2025-...  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  📊 Table: teachers                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ id | full_name | email | password_hash | created_at │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 1  | Ms. Silva | t@... | $2b$12$xyz...  | 2025-...  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  📊 Table: users (legacy - not used)                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow Example (Registration):

```
1. USER fills registration form
   → Full Name: "John Doe"
   → Email: "john@student.com"
   → Password: "securepass123"
   → Account Type: "Student"
   → Clicks "Register"

2. FRONTEND (Register.jsx)
   → Validates form locally (8+ char password, valid email)
   → Shows loading spinner
   → Calls: api.post('/auth/register', data)
   → api.js sends: POST http://localhost:5000/auth/register

3. BACKEND (routes/auth.py)
   → Receives JSON data
   → Validates email format (email-validator)
   → Checks password length (≥8 characters)
   → Checks if email already exists in database
   → Hashes password with bcrypt (12 salt rounds)
   → Creates Student record in database
   → Generates JWT token for auto-login
   → Returns: { message, token, user }

4. DATABASE (emexa.db)
   → INSERT INTO students VALUES (...)
   → Stores encrypted password (irreversible hash)
   → Auto-generates ID and timestamp

5. FRONTEND receives response
   → Saves JWT token to localStorage
   → Shows animated success message
   → Redirects to login after 3 seconds
```

---

## 3. BACKEND DEEP DIVE (10 Minutes)

### A. Application Structure

**File: `backend/app.py`** (Main Entry Point)

```python
# Key responsibilities:
1. Initialize Flask application
2. Configure database connection (SQLite)
3. Set up CORS for frontend communication
4. Initialize JWT for authentication
5. Register API routes (blueprints)
6. Create database tables on startup
```

**Important Configuration:**

```python
# CORS allows frontend (localhost:5173) to call backend (localhost:5000)
CORS(app, origins=[
    "http://localhost:5173",  # Primary port
    "http://localhost:5174",  # Backup ports
    # ... up to 5185
])

# JWT secret key for token signing
app.config['JWT_SECRET_KEY'] = 'dev-jwt-secret'

# Database URI (SQLite file)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///emexa.db'
```

---

### B. Database Models

**File: `backend/models/user.py`**

We have **3 models** (database tables):

#### 1️⃣ **Student Model**

```python
class Student(db.Model):
    __tablename__ = 'students'
    
    # Columns:
    id              → Primary key (auto-increment)
    full_name       → Student's full name (required)
    email           → Unique email (required, indexed)
    password_hash   → bcrypt encrypted password (255 chars)
    student_id      → Optional student ID number
    grade_level     → Optional grade (e.g., "Grade 10")
    created_at      → Timestamp when account created
    updated_at      → Timestamp when last updated
    
    # Methods:
    set_password(password)    → Hash password with bcrypt
    check_password(password)  → Verify password against hash
    to_dict()                 → Convert to JSON (excludes password!)
```

**Why separate Student table?**
- Different fields needed (student_id, grade_level)
- Better data organization
- Easier to query students specifically
- Can add student-specific features later (courses, grades, etc.)

#### 2️⃣ **Teacher Model**

```python
class Teacher(db.Model):
    __tablename__ = 'teachers'
    
    # Columns:
    id              → Primary key
    full_name       → Teacher's full name
    email           → Unique email (indexed)
    password_hash   → bcrypt encrypted password
    teacher_id      → Optional teacher ID
    subject         → Subject taught (e.g., "Mathematics")
    department      → Department (e.g., "Science Dept")
    created_at      → Registration timestamp
    updated_at      → Last update timestamp
    
    # Same methods as Student:
    set_password(), check_password(), to_dict()
```

**Why separate Teacher table?**
- Different fields (subject, department)
- Different permissions in future
- Can add teacher-specific features (classes, attendance)

#### 3️⃣ **User Model** (Legacy)

```python
class User(db.Model):
    __tablename__ = 'users'
    
    # Old combined table (not used anymore)
    # Kept for backward compatibility
```

---

### C. Authentication Routes

**File: `backend/routes/auth.py`**

#### 1️⃣ **Registration Endpoint**

```python
@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Create new Student or Teacher account
    
    Request Body:
    {
        "fullName": "John Doe",
        "email": "john@example.com",
        "password": "securepass123",
        "accountType": "student" or "teacher"
    }
    
    Process:
    1. Extract data from request
    2. Validate all fields
    3. Check email format (email-validator)
    4. Check password length (≥8 chars)
    5. Check if email already exists
    6. Hash password with bcrypt
    7. Create Student or Teacher record
    8. Generate JWT token
    9. Return success + token + user data
    
    Response (Success):
    {
        "message": "Registration successful",
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "fullName": "John Doe",
            "email": "john@example.com",
            "accountType": "student",
            "createdAt": "2025-11-03T10:30:45"
        }
    }
    Status: 201 Created
    
    Response (Error):
    {
        "message": "Email already registered"
    }
    Status: 409 Conflict
    ```

**Key Logic Points:**

```python
# Email validation
from email_validator import validate_email
validate_email(email)  # Throws error if invalid

# Password hashing (bcrypt with salt)
salt = bcrypt.gensalt()  # Random salt
hash = bcrypt.hashpw(password.encode(), salt)

# Checking existing users
existing_student = Student.query.filter_by(email=email).first()
existing_teacher = Teacher.query.filter_by(email=email).first()
if existing_student or existing_teacher:
    return error_409  # Email taken

# Creating user based on type
if account_type == 'student':
    new_user = Student(full_name=full_name, email=email)
else:
    new_user = Teacher(full_name=full_name, email=email)

new_user.set_password(password)  # Hash password
db.session.add(new_user)         # Add to database
db.session.commit()              # Save changes

# Generate JWT token for auto-login
token = create_access_token(identity={
    'id': new_user.id,
    'type': 'student'  # or 'teacher'
})
```

#### 2️⃣ **Login Endpoint**

```python
@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Authenticate user and return JWT token
    
    Request Body:
    {
        "email": "john@example.com",
        "password": "securepass123"
    }
    
    Process:
    1. Get email and password
    2. Search Student table first
    3. If found, verify password
    4. If not found, search Teacher table
    5. Verify password
    6. Generate JWT token
    7. Return token + user data
    
    Response (Success):
    {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "fullName": "John Doe",
            "email": "john@example.com",
            "accountType": "student"
        }
    }
    Status: 200 OK
    
    Response (Error):
    {
        "message": "Invalid email or password"
    }
    Status: 401 Unauthorized
    ```

**Key Logic:**

```python
# Try Student table first
student = Student.query.filter_by(email=email).first()
if student and student.check_password(password):
    # Password correct!
    token = create_access_token(identity={'id': student.id, 'type': 'student'})
    return success_response

# Try Teacher table if not student
teacher = Teacher.query.filter_by(email=email).first()
if teacher and teacher.check_password(password):
    token = create_access_token(identity={'id': teacher.id, 'type': 'teacher'})
    return success_response

# Not found in either table
return error_401  # Invalid credentials
```

---

### D. Password Security (bcrypt)

**Why bcrypt?**
- Industry standard for password hashing
- Built-in salt (random data added to password)
- Slow by design (prevents brute-force attacks)
- One-way encryption (cannot be reversed)

**How it works:**

```python
# When user registers with password "mypassword123":

1. Generate random salt
   salt = bcrypt.gensalt()  # e.g., "$2b$12$KIXyZ9p7Q4N2Rm..."

2. Combine password + salt and hash
   hash = bcrypt.hashpw(b"mypassword123", salt)
   # Result: "$2b$12$KIXyZ9p7Q4N2RmJxYzVlZOGH8vQn3mF5pQr7sT9uVwXyZ..."

3. Store hash in database (NOT the original password!)
   password_hash = "$2b$12$KIXyZ9p7Q4N2RmJxYzVlZOGH8vQn3mF5pQr7sT9uVwXyZ..."

4. When user logs in:
   stored_hash = "$2b$12$KIXyZ9p7Q4N2RmJxYzVlZOGH8vQn3mF5pQr7sT9uVwXyZ..."
   user_input = "mypassword123"
   
   bcrypt.checkpw(user_input.encode(), stored_hash.encode())
   # Returns True if password matches, False otherwise
```

**Security Benefits:**
- ✅ Even database admin cannot see real passwords
- ✅ Each password has unique salt (rainbow tables useless)
- ✅ Takes ~100ms to hash (too slow for brute-force)
- ✅ Adjustable difficulty (12 rounds = 2^12 iterations)

---

### E. JWT Authentication

**What is JWT?**
- JSON Web Token
- Secure way to transmit information between parties
- Self-contained (includes all user info)
- Signed with secret key (cannot be tampered)

**Structure:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzOTk5MzIwMCwianRpIjoiMTIzNDU2NzgiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjp7ImlkIjoxLCJ0eXBlIjoic3R1ZGVudCJ9LCJuYmYiOjE2Mzk5OTMyMDAsImV4cCI6MTYzOTk5NjgwMH0.Xz8kPqT5jN2mL7vR9sK4wY1bQ3cF8dA6eH9gI0jK2lM

                  │                               │                                                                                                                                │
               HEADER                          PAYLOAD                                                                                                                      SIGNATURE
```

**Decoded JWT:**

```json
// HEADER
{
  "alg": "HS256",  // Algorithm: HMAC SHA256
  "typ": "JWT"     // Type: JSON Web Token
}

// PAYLOAD (user data)
{
  "sub": {         // Subject (user identity)
    "id": 1,
    "type": "student"
  },
  "iat": 1639993200,  // Issued at timestamp
  "exp": 1639996800   // Expiration timestamp
}

// SIGNATURE (ensures token not tampered)
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
```

**How we use it:**

```python
# Backend generates token after login/register
token = create_access_token(identity={
    'id': user.id,
    'type': 'student'
})

# Frontend stores token
localStorage.setItem('token', token)

# Frontend sends token with future requests
headers: {
    'Authorization': 'Bearer ' + token
}

# Backend verifies token
@jwt_required()
def protected_route():
    current_user = get_jwt_identity()
    # current_user = {'id': 1, 'type': 'student'}
```

---

## 4. FRONTEND DEEP DIVE (10 Minutes)

### A. Application Structure

**File: `emexa/src/App.jsx`** (Main Component)

```jsx
// Hash-based routing (no React Router needed!)
const [route, setRoute] = useState(() => 
    window.location.hash.replace('#', '') || '/login'
)

// Listen for URL changes
window.addEventListener('hashchange', onHash)

// Render different pages based on hash
if (route === '/register') return <Register />
if (route === '/forgot') return <ForgotPassword />
return <Login />  // Default
```

**Why hash routing?**
- ✅ Simple (no extra library needed)
- ✅ Works without server configuration
- ✅ Good for small apps
- ✅ Easy to understand

**Navigation:**
```javascript
// Change page
window.location.hash = '#/register'

// URLs:
http://localhost:5173/#/login      → Login page
http://localhost:5173/#/register   → Register page
http://localhost:5173/#/forgot     → Forgot password page
```

---

### B. API Communication Layer

**File: `emexa/src/lib/api.js`**

Simple wrapper around `fetch()` for talking to backend:

```javascript
const API_BASE = 'http://localhost:5000'

async function request(path, opts = {}) {
    const url = API_BASE + path
    const headers = {'Content-Type': 'application/json'}
    
    try {
        const res = await fetch(url, {
            credentials: 'include',  // Send cookies
            headers,
            ...opts
        })
        
        const body = await res.json()
        
        if (!res.ok) {
            // Extract error message
            throw new Error(body.message || 'Request failed')
        }
        
        return body
    } catch (err) {
        // Handle network errors
        if (!err.status) {
            throw new Error('Cannot connect to server')
        }
        throw err
    }
}

// Helper functions
export async function post(path, data) {
    return request(path, { 
        method: 'POST', 
        body: JSON.stringify(data) 
    })
}

export async function get(path) {
    return request(path, { method: 'GET' })
}
```

**Usage in components:**

```javascript
import api from '../lib/api'

// Make API call
api.post('/auth/register', {
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'securepass123',
    accountType: 'student'
})
.then(response => {
    console.log('Success:', response)
    // Save token
    localStorage.setItem('token', response.token)
})
.catch(error => {
    console.error('Error:', error.message)
})
```

---

### C. Registration Component

**File: `emexa/src/pages/Register.jsx`**

#### State Management:

```javascript
const [fullName, setFullName] = useState('')     // User's full name
const [email, setEmail] = useState('')           // User's email
const [password, setPassword] = useState('')     // Password
const [confirm, setConfirm] = useState('')       // Password confirmation
const [accountType, setAccountType] = useState('student')  // student or teacher
const [errors, setErrors] = useState({})         // Validation errors
const [loading, setLoading] = useState(false)    // Loading state
const [showPassword, setShowPassword] = useState(false)  // Toggle visibility
const [showConfirm, setShowConfirm] = useState(false)    // Toggle visibility
const [registered, setRegistered] = useState(false)      // Success state
const [userName, setUserName] = useState('')     // For success message
```

#### Form Validation:

```javascript
const validate = () => {
    const e = {}
    
    // Full name required
    if (!fullName.trim()) {
        e.fullName = 'Full name is required'
    }
    
    // Email required and valid format
    if (!email.trim()) {
        e.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        e.email = 'Please enter a valid email address'
    }
    
    // Password required and 8+ characters
    if (!password) {
        e.password = 'Password is required'
    } else if (password.length < 8) {
        e.password = 'Password must be at least 8 characters'
    }
    
    // Confirmation required and must match
    if (!confirm) {
        e.confirm = 'Please confirm your password'
    } else if (password !== confirm) {
        e.confirm = 'Passwords do not match'
    }
    
    return e  // Return errors object
}
```

#### Form Submission:

```javascript
const onSubmit = (ev) => {
    ev.preventDefault()  // Prevent page reload
    
    // Validate form
    const e = validate()
    setErrors(e)
    
    // If validation passed (no errors)
    if (Object.keys(e).length === 0) {
        setLoading(true)  // Show loading spinner
        
        // Call backend API
        api.post('/auth/register', { 
            fullName, 
            email, 
            password, 
            accountType 
        })
        .then(res => {
            // Success!
            console.log('✅ Registration successful:', res)
            
            // Save JWT token
            localStorage.setItem('token', res.token)
            
            // Show success animation
            setUserName(res.user.full_name)
            setRegistered(true)
            
            // Redirect to login after 3 seconds
            setTimeout(() => {
                window.location.hash = '#/login'
            }, 3000)
        })
        .catch(err => {
            // Handle errors
            console.error('❌ Registration failed:', err)
            
            let errorMessage = 'Registration failed. Please try again.'
            
            if (err.isNetworkError) {
                errorMessage = 'Cannot connect to server. Check if backend is running.'
            } else if (err.message) {
                errorMessage = err.message
            }
            
            setErrors({ form: errorMessage })
        })
        .finally(() => {
            setLoading(false)  // Hide loading spinner
        })
    }
}
```

#### UI Features:

**1. Password Visibility Toggle:**

```jsx
<div className="field">
    <label>Password</label>
    <div style={{ position: 'relative' }}>
        <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: '10px', top: '50%' }}
        >
            {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
    </div>
</div>
```

**2. Account Type Selection:**

```jsx
<div className="account-type-selector">
    <label>
        <input 
            type="radio" 
            value="student" 
            checked={accountType === 'student'}
            onChange={e => setAccountType(e.target.value)}
        />
        Student
    </label>
    
    <label>
        <input 
            type="radio" 
            value="teacher" 
            checked={accountType === 'teacher'}
            onChange={e => setAccountType(e.target.value)}
        />
        Teacher
    </label>
</div>
```

**3. Loading State:**

```jsx
<button type="submit" disabled={loading}>
    {loading ? (
        // Spinning loader
        <svg className="spinner" width="16" height="16">
            <circle cx="8" cy="8" r="6" />
        </svg>
    ) : (
        'Register'
    )}
</button>
```

**4. Success Animation:**

```jsx
{registered && (
    <div className="success-message">
        <div className="checkmark-wrapper">
            {/* Animated checkmark SVG */}
            <svg className="checkmark" viewBox="0 0 60 60">
                <circle className="checkmark-circle" cx="30" cy="30" r="28" />
                <path className="checkmark-check" d="M16 30 L26 40 L44 20" />
            </svg>
        </div>
        <h2>Registration Successful!</h2>
        <p>Welcome, {userName}!</p>
        <p>Redirecting to login...</p>
    </div>
)}
```

**CSS Animations:**

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes checkmarkPop {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
}

.success-message {
    animation: fadeIn 0.5s ease-in-out;
}

.checkmark {
    animation: checkmarkPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

---

### D. Login Component

**File: `emexa/src/pages/Login.jsx`**

Similar structure to Register, but simpler:

```javascript
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [remember, setRemember] = useState(false)
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const [showPassword, setShowPassword] = useState(false)
const [loggedIn, setLoggedIn] = useState(false)
const [userName, setUserName] = useState('')

const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (!email.trim()) {
        setError('Please enter your email address')
        return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address')
        return
    }
    if (!password) {
        setError('Please enter your password')
        return
    }
    
    setLoading(true)
    
    // Call backend
    api.post('/auth/login', { email, password })
        .then(res => {
            console.log('✅ Login successful:', res)
            
            // Save token
            localStorage.setItem('token', res.token)
            if (remember) {
                localStorage.setItem('rememberMe', 'true')
            }
            
            // Show success message
            setUserName(res.user.full_name)
            setLoggedIn(true)
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.hash = '#/'
            }, 2000)
        })
        .catch(err => {
            console.error('❌ Login failed:', err)
            setError(err.message || 'Login failed')
        })
        .finally(() => setLoading(false))
}
```

---

## 5. LIVE DEMO (10 Minutes)

### Demo Script:

**Step 1: Show Running Servers**

```bash
# Terminal 1: Backend
cd backend
python app.py

# Output:
# Database tables created successfully!
#    - users table
#    - students table
#    - teachers table
# 
# >> Starting Flask server on http://127.0.0.1:5000
# >> CORS enabled for localhost ports 5173-5183
```

```bash
# Terminal 2: Frontend
cd emexa
npm run dev

# Output:
# ROLLDOWN-VITE v7.1.14 ready in 328 ms
# 
# ➜  Local:   http://localhost:5173/
# ➜  Network: http://10.16.202.87:5173/
```

---

**Step 2: Demo Student Registration**

1. Open browser: `http://localhost:5173/#/register`

2. Fill form:
   - Full Name: "Demo Student"
   - Email: "demo@student.com"
   - Password: "password123"
   - Confirm: "password123"
   - Account Type: **Student** ✓

3. Click "Register"

4. **Show what happens:**
   
   **Frontend Console:**
   ```
   📤 Sending registration to backend: 
   { fullName: "Demo Student", email: "demo@student.com", ... }
   
   ✅ Registration response: 
   { message: "Registration successful", token: "eyJ...", user: {...} }
   
   👤 User created: { id: 7, fullName: "Demo Student", accountType: "student" }
   
   🔑 JWT Token: eyJhbGciOiJIUzI1NiIs...
   
   ✨ SUCCESS! Showing success message...
   ```
   
   **Backend Terminal:**
   ```
   ============================================================
   REGISTRATION REQUEST RECEIVED
   ============================================================
   Full Name: Demo Student
   Email: demo@student.com
   Password: *********** (11 characters)
   Account Type: student
   
   Validation passed - Creating student account...
   Student saved to 'students' table!
      Student ID: 7
      Created at: 2025-11-03 10:45:23.456789
   
   JWT Token generated: eyJhbGciOiJIUzI1NiIs...
   ============================================================
   STUDENT REGISTRATION SUCCESSFUL
   ============================================================
   
   127.0.0.1 - - [03/Nov/2025 10:45:23] "POST /auth/register HTTP/1.1" 201
   ```

5. **Show success animation:**
   - Animated checkmark appears
   - "Registration Successful! Welcome, Demo Student!"
   - Page redirects to login after 3 seconds

---

**Step 3: Demo Database Storage**

```bash
cd backend
python show_data.py
```

**Output:**
```
============================================================
  ALL REGISTERED USER DATA
============================================================

Using database: C:\...\backend\instance\emexa.db

STUDENTS TABLE
------------------------------------------------------------
Total Students: 7

  ID: 7
  Name: Demo Student
  Email: demo@student.com
  Registered: 2025-11-03 10:45:23.456789

  ID: 6
  Name: l
  Email: l@gmail.com
  Registered: 2025-11-03 06:00:35.838037

  ... (previous students)

TEACHERS TABLE
------------------------------------------------------------
Total Teachers: 1

  ID: 1
  Name: k
  Email: k@gmail.com
  Registered: 2025-11-03 05:10:45.504107

============================================================
DATABASE FILE LOCATION:
  Path: C:\...\backend\instance\emexa.db
  Size: 40.00 KB
============================================================
```

**Explain:**
> "As you can see, the new student 'Demo Student' has been added to the `students` table with ID 7. The password is stored as an encrypted hash, not the original password. The database file is 40 KB and growing with each registration."

---

**Step 4: Demo Teacher Registration**

1. Go back to: `http://localhost:5173/#/register`

2. Fill form:
   - Full Name: "Mr. Smith"
   - Email: "smith@teacher.com"
   - Password: "teacher123"
   - Confirm: "teacher123"
   - Account Type: **Teacher** ✓

3. Click "Register"

4. **Show backend terminal:**
   ```
   Account Type: teacher
   Validation passed - Creating teacher account...
   Teacher saved to 'teachers' table!
      Teacher ID: 2
   ```

5. Run `python show_data.py` again to show new teacher in database

---

**Step 5: Demo Login**

1. Navigate to: `http://localhost:5173/#/login`

2. Enter credentials:
   - Email: "demo@student.com"
   - Password: "password123"

3. Click "Log In"

4. **Show what happens:**
   
   **Frontend Console:**
   ```
   📤 Attempting login for: demo@student.com
   ✅ Login successful: { token: "...", user: {...} }
   👤 User: { id: 7, fullName: "Demo Student", accountType: "student" }
   ```
   
   **Backend Terminal:**
   ```
   127.0.0.1 - - [03/Nov/2025 10:47:15] "POST /auth/login HTTP/1.1" 200
   ```

5. Success message appears, then redirects

---

**Step 6: Demo Error Handling**

1. Try to register with existing email:
   - Email: "demo@student.com" (already exists)
   
   **Result:**
   ```
   ⚠️ Email already registered
   ```

2. Try to login with wrong password:
   - Email: "demo@student.com"
   - Password: "wrongpassword"
   
   **Result:**
   ```
   ❌ Invalid email or password
   ```

3. Try to register with weak password:
   - Password: "123" (less than 8 characters)
   
   **Result:**
   ```
   ⚠️ Password must be at least 8 characters
   ```

4. Stop backend server, try to register:
   
   **Result:**
   ```
   ⚠️ Cannot connect to server. Please check if backend is running.
   ```

---

## 6. SECURITY FEATURES (5 Minutes)

### A. Password Security

**1. bcrypt Hashing**

```
User enters:      "mypassword123"
Backend stores:   "$2b$12$KIXyZ9p7Q4N2RmJxYzVlZOGH8vQn3mF5pQr7sT9uVwXyZ..."

Even if someone steals the database, they CANNOT get the original password!
```

**Properties:**
- ✅ **One-way encryption** - Cannot be decrypted
- ✅ **Salted** - Each password has unique salt
- ✅ **Slow** - Takes ~100ms (prevents brute-force)
- ✅ **Adjustable** - 12 rounds = 2^12 iterations

**Code:**
```python
# Hash password (registration)
salt = bcrypt.gensalt()  # Random salt
password_hash = bcrypt.hashpw(password.encode(), salt)

# Verify password (login)
is_valid = bcrypt.checkpw(
    user_input.encode(),      # Password user typed
    stored_hash.encode()      # Hash from database
)
```

---

### B. JWT Authentication

**What is JWT?**
- Stateless authentication (no sessions on server)
- Self-contained (includes user data)
- Signed with secret key (tamper-proof)

**Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  ← HEADER (algorithm)
.
eyJzdWIiOnsiaWQiOjEsInR5cGUiOiJzdHVkZW50In0sImlhdCI6MTYzOTk5MzIwMH0  ← PAYLOAD (user data)
.
Xz8kPqT5jN2mL7vR9sK4wY1bQ3cF8dA6eH9gI0jK2lM  ← SIGNATURE (verification)
```

**How it works:**
1. User logs in → Backend creates JWT
2. Frontend stores JWT in localStorage
3. Frontend sends JWT with every request
4. Backend verifies JWT signature
5. If valid, allow access

**Code:**
```python
# Create token (backend)
token = create_access_token(identity={
    'id': user.id,
    'type': 'student'
})

# Verify token (backend)
@jwt_required()
def protected_route():
    current_user = get_jwt_identity()
    # current_user = {'id': 1, 'type': 'student'}
```

---

### C. Input Validation

**Client-Side (Frontend):**
```javascript
// Email format
if (!/\S+@\S+\.\S+/.test(email)) {
    error = 'Invalid email format'
}

// Password length
if (password.length < 8) {
    error = 'Password must be at least 8 characters'
}

// Password match
if (password !== confirm) {
    error = 'Passwords do not match'
}
```

**Server-Side (Backend):**
```python
# Email validation with library
from email_validator import validate_email
validate_email(email)  # Throws error if invalid

# Password length
if len(password) < 8:
    return error_400

# Check email exists
if Student.query.filter_by(email=email).first():
    return error_409  # Email already registered
```

**Why both?**
- ✅ Client-side: Better UX (instant feedback)
- ✅ Server-side: Security (client can be bypassed)

---

### D. CORS Configuration

**Problem:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Different origins → Browser blocks requests!

**Solution: CORS (Cross-Origin Resource Sharing)**

```python
from flask_cors import CORS

CORS(app, 
    origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        # ... backup ports
    ],
    supports_credentials=True,
    allow_headers=['Content-Type', 'Authorization'],
    expose_headers=['Content-Type', 'Authorization']
)
```

**What this does:**
- Tells browser: "These origins are allowed to call this API"
- Allows cookies and authentication headers
- Prevents unauthorized websites from calling your API

---

### E. SQL Injection Prevention

**Vulnerable Code (DON'T DO THIS):**
```python
# DANGEROUS! SQL Injection possible
query = f"SELECT * FROM students WHERE email = '{email}'"
result = db.execute(query)
```

**Attacker could input:**
```
email = "'; DROP TABLE students; --"
```

**Safe Code (Using ORM):**
```python
# SAFE! SQLAlchemy handles escaping
student = Student.query.filter_by(email=email).first()
```

**Why it's safe:**
- SQLAlchemy uses parameterized queries
- User input is escaped automatically
- SQL injection impossible

---

## 7. Q&A (Remaining Time)

### Common Questions & Answers:

**Q1: Why separate Student and Teacher tables?**

A: Better data organization and scalability. Students need fields like `grade_level` and `student_id`, while teachers need `subject` and `department`. In the future, we can add student-specific features (courses, grades) and teacher-specific features (classes, attendance) without mixing data.

---

**Q2: Why use JWT instead of sessions?**

A: 
- **Stateless**: No need to store sessions on server
- **Scalable**: Easy to scale to multiple servers
- **Mobile-friendly**: Works with mobile apps
- **Self-contained**: Token includes all user info

---

**Q3: Can't hackers decode JWT tokens?**

A: Yes, they can **decode** it (it's base64), but they cannot **modify** it. The signature ensures any changes to the payload invalidate the token. Only the server with the secret key can create valid tokens.

---

**Q4: Why SQLite instead of MySQL/PostgreSQL?**

A: For this demo/educational project:
- **No setup required**: SQLite is file-based
- **Portable**: Single file database
- **Fast**: Good for small-medium apps
- **Easy to demo**: Can show database with `show_data.py`

For production, we'd use PostgreSQL or MySQL.

---

**Q5: How does password reset work?**

A: (If asked about ForgotPassword.jsx)
- User enters email
- Backend generates reset token
- Email sent with reset link
- User clicks link, enters new password
- Backend verifies token, updates password

---

**Q6: What happens if user loses JWT token?**

A: They need to login again. Token is stored in localStorage:
```javascript
localStorage.setItem('token', token)  // Save
localStorage.getItem('token')         // Retrieve
localStorage.removeItem('token')      // Logout
```

---

**Q7: How do you prevent duplicate emails?**

A: Database constraint + backend check:
```python
# Database level
email = db.Column(db.String(120), unique=True)

# Backend level
if Student.query.filter_by(email=email).first():
    return error_409  # Email already registered
```

---

**Q8: Can students and teachers have the same email?**

A: No! We check both tables:
```python
existing_student = Student.query.filter_by(email=email).first()
existing_teacher = Teacher.query.filter_by(email=email).first()

if existing_student or existing_teacher:
    return error  # Email already registered
```

---

**Q9: What's the difference between frontend validation and backend validation?**

A:
- **Frontend**: User experience (instant feedback, no server round-trip)
- **Backend**: Security (frontend can be bypassed with dev tools)
- **Both are necessary!**

---

**Q10: How do you handle CORS errors?**

A: Configure Flask-CORS to allow frontend origin:
```python
CORS(app, origins=["http://localhost:5173"])
```

Common issue: Port mismatch (frontend port changed). Solution: Lock frontend port in `vite.config.js`:
```javascript
server: {
    port: 5173,
    strictPort: true  // Don't auto-increment port
}
```

---

## 8. CLOSING REMARKS (2 Minutes)

### Summary:

> "Today we've explored **EMEXA**, a full-stack authentication system demonstrating:
> 
> ✅ **Modern web architecture** - React frontend + Flask backend  
> ✅ **Secure authentication** - bcrypt + JWT  
> ✅ **Database design** - Separate tables for different user types  
> ✅ **API design** - RESTful endpoints with proper error handling  
> ✅ **UX design** - Beautiful animations, loading states, error messages  
> ✅ **Security best practices** - Input validation, password hashing, CORS  
> 
> This system can be easily extended with:
> - User profiles and settings
> - Password reset functionality
> - Email verification
> - Role-based permissions
> - Student/Teacher dashboards
> - Course management
> - Attendance tracking
> - Grade management
> 
> The architecture is scalable and production-ready with minor modifications."

---

### Key Takeaways for Audience:

1. **Separation of Concerns**: Frontend handles UI, Backend handles data/security
2. **Security First**: Never trust client-side validation alone
3. **Password Security**: Always hash passwords (never store plain text!)
4. **API Design**: Clear, RESTful endpoints with proper status codes
5. **Error Handling**: Comprehensive logging and user-friendly error messages
6. **Modern Stack**: React + Flask is powerful and easy to learn

---

### Thank You!

**Questions?**

---

## 9. BACKUP: TECHNICAL DETAILS (If Asked)

### File Structure:

```
EMEXA/
├── backend/                          ← Backend (Flask)
│   ├── app.py                        ← Main Flask app
│   ├── database.py                   ← SQLAlchemy setup
│   ├── models/
│   │   └── user.py                   ← User, Student, Teacher models
│   ├── routes/
│   │   └── auth.py                   ← Auth endpoints
│   ├── instance/
│   │   └── emexa.db                  ← SQLite database (ACTUAL DATA!)
│   ├── venv/                         ← Python virtual environment
│   └── requirements.txt              ← Python dependencies
│
└── emexa/                            ← Frontend (React)
    ├── src/
    │   ├── App.jsx                   ← Main app component
    │   ├── main.jsx                  ← Entry point
    │   ├── lib/
    │   │   └── api.js                ← API wrapper
    │   ├── pages/
    │   │   ├── Login.jsx             ← Login page
    │   │   ├── Register.jsx          ← Registration page
    │   │   ├── ForgotPassword.jsx    ← Password reset
    │   │   └── Dashboard.jsx         ← Main page
    │   └── assets/
    │       └── EMEXA Logo.png        ← Logo
    ├── public/
    ├── index.html                    ← HTML template
    ├── package.json                  ← NPM dependencies
    └── vite.config.js                ← Vite configuration
```

---

### Dependencies:

**Backend (requirements.txt):**
```
Flask==3.0.0
flask-cors==4.0.0
flask-jwt-extended==4.5.3
flask-sqlalchemy==3.1.1
bcrypt==4.1.1
email-validator==2.1.0
python-dotenv==1.0.0
```

**Frontend (package.json):**
```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^7.1.14"
  }
}
```

---

### Environment Variables:

**Backend (.env):**
```
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///emexa.db
```

**Frontend (.env):**
```
VITE_API_BASE=http://localhost:5000
```

---

### Database Schema:

```sql
-- Students table
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    student_id VARCHAR(50),
    grade_level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers table
CREATE TABLE teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    teacher_id VARCHAR(50),
    subject VARCHAR(100),
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_teachers_email ON teachers(email);
```

---

### API Endpoints:

```
POST /auth/register
  Body: { fullName, email, password, accountType }
  Response: { message, token, user }
  Status: 201 Created

POST /auth/login
  Body: { email, password }
  Response: { token, user }
  Status: 200 OK

POST /auth/forgot-password
  Body: { email }
  Response: { message }
  Status: 200 OK

GET /
  Response: { message, version }
  Status: 200 OK
```

---

### Status Codes:

- **200 OK**: Success
- **201 Created**: Resource created (registration)
- **400 Bad Request**: Invalid input
- **401 Unauthorized**: Wrong credentials
- **409 Conflict**: Email already exists
- **500 Internal Server Error**: Server error

---

**END OF DEMO SCRIPT**

---

## 📝 PRESENTER NOTES:

- **Practice the live demo beforehand!**
- **Have backup slides if live demo fails**
- **Prepare database with sample data**
- **Test all features before presentation**
- **Have terminals ready with commands**
- **Know the codebase thoroughly**
- **Be ready for technical questions**
- **Speak clearly and confidently**
- **Make eye contact with audience**
- **Use diagrams and visuals**

**Good luck with your demo! 🎉**
