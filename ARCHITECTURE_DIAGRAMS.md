# 🎨 EMEXA Architecture Diagrams

Visual guides to understand how EMEXA works.

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:5173                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests (JSON)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND                              │
│                      (Port 5173)                                 │
├─────────────────────────────────────────────────────────────────┤
│  Components:                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Register │  │  Login   │  │ Forgot   │  │Dashboard │       │
│  │   Page   │  │   Page   │  │ Password │  │   Page   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  State Management: React Hooks (useState)                       │
│  Routing: React Router (Hash-based)                             │
│  Styling: CSS with animations                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ API Calls (fetch)
                             │ POST /auth/register
                             │ POST /auth/login
                             │ POST /auth/forgot-password
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FLASK BACKEND                               │
│                      (Port 5000)                                 │
├─────────────────────────────────────────────────────────────────┤
│  Endpoints:                                                      │
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │ /auth/register     │  │ /auth/login        │                │
│  │ • Validate data    │  │ • Check email      │                │
│  │ • Hash password    │  │ • Verify password  │                │
│  │ • Save to DB       │  │ • Create JWT       │                │
│  │ • Return JWT       │  │ • Return user data │                │
│  └────────────────────┘  └────────────────────┘                │
│                                                                  │
│  Security:                                                       │
│  • CORS Protection (Flask-CORS)                                 │
│  • Password Hashing (bcrypt)                                    │
│  • JWT Authentication (PyJWT)                                   │
│  • Input Validation                                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ SQLAlchemy ORM
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SQLITE DATABASE                             │
│                      (emexa.db)                                  │
├─────────────────────────────────────────────────────────────────┤
│  Tables:                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   students   │  │   teachers   │  │    users     │         │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤         │
│  │ id           │  │ id           │  │ id           │         │
│  │ fullName     │  │ fullName     │  │ username     │         │
│  │ email        │  │ email        │  │ email        │         │
│  │ password     │  │ password     │  │ password     │         │
│  │ createdAt    │  │ createdAt    │  │ createdAt    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                        (legacy table)            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Registration Flow Diagram

```
USER                 FRONTEND              BACKEND              DATABASE
 │                      │                     │                     │
 │  1. Fill form        │                     │                     │
 ├─────────────────────>│                     │                     │
 │                      │                     │                     │
 │  2. Click Register   │                     │                     │
 ├─────────────────────>│                     │                     │
 │                      │                     │                     │
 │                      │ 3. Validate         │                     │
 │                      │    • Email format   │                     │
 │                      │    • Password len   │                     │
 │                      │    • Fields filled  │                     │
 │                      │                     │                     │
 │                      │ 4. POST /auth/register                    │
 │                      ├────────────────────>│                     │
 │                      │    Body: {          │                     │
 │                      │      fullName,      │                     │
 │                      │      email,         │                     │
 │                      │      password,      │                     │
 │                      │      accountType    │                     │
 │                      │    }                │                     │
 │                      │                     │                     │
 │                      │                     │ 5. Server validate  │
 │                      │                     │    • Required fields│
 │                      │                     │    • Email regex    │
 │                      │                     │    • Password len   │
 │                      │                     │                     │
 │                      │                     │ 6. Check duplicate  │
 │                      │                     ├────────────────────>│
 │                      │                     │    SELECT * FROM    │
 │                      │                     │    students/teachers│
 │                      │                     │    WHERE email=...  │
 │                      │                     │                     │
 │                      │                     │<────────────────────┤
 │                      │                     │    (No duplicates)  │
 │                      │                     │                     │
 │                      │                     │ 7. Hash password    │
 │                      │                     │    bcrypt.hashpw()  │
 │                      │                     │                     │
 │                      │                     │ 8. Create user      │
 │                      │                     ├────────────────────>│
 │                      │                     │    INSERT INTO      │
 │                      │                     │    students/teachers│
 │                      │                     │                     │
 │                      │                     │<────────────────────┤
 │                      │                     │    User ID: 4       │
 │                      │                     │                     │
 │                      │                     │ 9. Generate JWT     │
 │                      │                     │    jwt.encode({     │
 │                      │                     │      id, email,     │
 │                      │                     │      type, exp      │
 │                      │                     │    })               │
 │                      │                     │                     │
 │                      │ 10. Response (201)  │                     │
 │                      │<────────────────────┤                     │
 │                      │    {                │                     │
 │                      │      success: true, │                     │
 │                      │      token: "eyJ...",│                    │
 │                      │      user: {...}    │                     │
 │                      │    }                │                     │
 │                      │                     │                     │
 │                      │ 11. Store token     │                     │
 │                      │    localStorage     │                     │
 │                      │                     │                     │
 │                      │ 12. Show success    │                     │
 │  Success screen! ✅  │    screen           │                     │
 │<─────────────────────┤                     │                     │
 │                      │                     │                     │
 │                      │ 13. Redirect (3s)   │                     │
 │  Navigate to login   │    window.location  │                     │
 │<─────────────────────┤    .hash = '#/login'│                     │
 │                      │                     │                     │
```

---

## 🔐 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION FLOW                       │
└─────────────────────────────────────────────────────────────────┘

1. REGISTRATION
   ┌─────────┐
   │  User   │
   │ enters  │
   │  data   │
   └────┬────┘
        │
        ▼
   ┌─────────────┐
   │  Frontend   │
   │  validates  │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐
   │   Backend   │
   │   hashes    │
   │  password   │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐         ┌──────────────┐
   │   Saves     │────────>│  Creates JWT │
   │  to DB      │         │    token     │
   └─────────────┘         └──────┬───────┘
                                  │
                                  ▼
                           Returns to user


2. LOGIN
   ┌─────────┐
   │  User   │
   │ enters  │
   │ email + │
   │password │
   └────┬────┘
        │
        ▼
   ┌─────────────┐
   │  Backend    │
   │  finds user │
   │   by email  │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐
   │   Checks    │
   │  password   │
   │  with hash  │
   └────┬────────┘
        │
   ┌────┴────┐
   │ Match?  │
   └────┬────┘
        │
   Yes  │  No
   ┌────┴──────┐
   │           │
   ▼           ▼
┌──────┐   ┌────────┐
│Return│   │ Return │
│ JWT  │   │ error  │
│token │   │  401   │
└──────┘   └────────┘


3. AUTHENTICATED REQUEST
   ┌─────────┐
   │  User   │
   │ makes   │
   │request  │
   └────┬────┘
        │
        ▼
   ┌─────────────┐
   │  Includes   │
   │ JWT token   │
   │ in header   │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐
   │  Backend    │
   │ verifies    │
   │   token     │
   └────┬────────┘
        │
   ┌────┴────┐
   │ Valid?  │
   └────┬────┘
        │
   Yes  │  No
   ┌────┴──────┐
   │           │
   ▼           ▼
┌──────┐   ┌────────┐
│Allow │   │ Reject │
│access│   │  401   │
└──────┘   └────────┘
```

---

## 🗂️ File Dependencies Diagram

```
BACKEND DEPENDENCIES
====================

app.py (entry point)
  │
  ├─> requirements.txt (packages)
  │   ├─> Flask
  │   ├─> Flask-CORS
  │   ├─> Flask-SQLAlchemy
  │   ├─> bcrypt
  │   └─> PyJWT
  │
  ├─> models/ (database)
  │   ├─> __init__.py
  │   ├─> user.py
  │   ├─> student.py
  │   └─> teacher.py
  │
  └─> routes/ (endpoints)
      ├─> __init__.py
      └─> auth.py
          ├─> /auth/register
          ├─> /auth/login
          └─> /auth/forgot-password


FRONTEND DEPENDENCIES
=====================

index.html (entry)
  │
  └─> main.jsx
      │
      ├─> index.css (global styles)
      │
      └─> App.jsx (main component)
          │
          ├─> App.css (app styles)
          │
          ├─> React Router
          │
          └─> pages/
              ├─> Register.jsx
              │   └─> API: POST /auth/register
              │
              ├─> Login.jsx
              │   └─> API: POST /auth/login
              │
              ├─> ForgotPassword.jsx
              │   └─> API: POST /auth/forgot-password
              │
              └─> Dashboard.jsx
```

---

## 🌐 CORS Configuration Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                          CORS EXPLAINED                        │
└───────────────────────────────────────────────────────────────┘

PROBLEM: Different Origins Cannot Communicate

Frontend Origin          Backend Origin
http://localhost:5173    http://localhost:5000
      │                         │
      │    ❌ BLOCKED           │
      ├────────X─────────────>  │
      │    (Different ports)    │


SOLUTION: Explicitly Allow Frontend Origin

Backend (app.py):
┌─────────────────────────────────────────┐
│ CORS(app, origins=[                     │
│   "http://localhost:5173",  ← ALLOWED   │
│   "http://localhost:5174",  ← ALLOWED   │
│   "http://127.0.0.1:5173",  ← ALLOWED   │
│   ...                                   │
│ ])                                      │
└─────────────────────────────────────────┘

Now:
Frontend Origin          Backend Origin
http://localhost:5173    http://localhost:5000
      │                         │
      │    ✅ ALLOWED           │
      ├─────────────────────>   │
      │                         │


IMPORTANT: Why List Instead of Function?

❌ WRONG:
def is_localhost(origin):
    return 'localhost' in origin

CORS(app, origins=is_localhost)
     └─> TypeError: argument of type 'function' is not iterable


✅ CORRECT:
CORS(app, origins=[
    "http://localhost:5173",
    "http://localhost:5174"
])
     └─> List of strings - works perfectly!
```

---

## 📱 Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      REACT COMPONENT TREE                        │
└─────────────────────────────────────────────────────────────────┘

                           App.jsx
                               │
                    ┌──────────┴──────────┐
                    │   HashRouter        │
                    │                     │
             ┌──────┴──────┐              │
             │   Routes    │              │
             └──────┬──────┘              │
                    │                     │
        ┌───────────┼───────────┬─────────┴─────────┐
        │           │           │                   │
        ▼           ▼           ▼                   ▼
  ┌──────────┐ ┌─────────┐ ┌──────────────┐ ┌───────────┐
  │Register  │ │  Login  │ │ForgotPassword│ │ Dashboard │
  │  .jsx    │ │  .jsx   │ │    .jsx      │ │   .jsx    │
  └──────────┘ └─────────┘ └──────────────┘ └───────────┘
       │
       │
       └─> Components inside Register:
           ┌─────────────────────────────┐
           │ • Account Type Selector     │
           │ • Full Name Input           │
           │ • Email Input               │
           │ • Password Input (w/ eye)   │
           │ • Confirm Password (w/ eye) │
           │ • Error Display             │
           │ • Submit Button (w/ loader) │
           │ • Success Screen            │
           └─────────────────────────────┘
```

---

## 💾 Database Schema Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                       DATABASE SCHEMA                           │
└────────────────────────────────────────────────────────────────┘

┌─────────────────────┐    ┌─────────────────────┐
│   STUDENTS TABLE    │    │   TEACHERS TABLE    │
├─────────────────────┤    ├─────────────────────┤
│ id (PK)             │    │ id (PK)             │
│ fullName            │    │ fullName            │
│ email (UNIQUE)      │    │ email (UNIQUE)      │
│ password (HASHED)   │    │ password (HASHED)   │
│ createdAt           │    │ createdAt           │
└─────────────────────┘    └─────────────────────┘
         │                          │
         │                          │
         └──────────┬───────────────┘
                    │
                    │ Separate tables for:
                    │ • Future flexibility
                    │ • Different fields possible
                    │ • Easier queries
                    │
         ┌──────────▼────────────┐
         │   USERS TABLE         │
         │   (Legacy - unused)   │
         ├───────────────────────┤
         │ id (PK)               │
         │ username              │
         │ email                 │
         │ password              │
         │ createdAt             │
         └───────────────────────┘

DATA TYPES:
  • id: INTEGER (auto-increment)
  • fullName: VARCHAR(100)
  • email: VARCHAR(100)
  • password: VARCHAR(100) - stores bcrypt hash
  • createdAt: DATETIME - default current timestamp
```

---

## 🔄 State Management Flow

```
┌────────────────────────────────────────────────────────────────┐
│                 REACT STATE FLOW (Register.jsx)                 │
└────────────────────────────────────────────────────────────────┘

INITIAL STATE:
┌──────────────────────────────────────┐
│ formData = {                         │
│   fullName: "",                      │
│   email: "",                         │
│   password: "",                      │
│   confirmPassword: "",               │
│   accountType: "student"             │
│ }                                    │
│                                      │
│ error = ""                           │
│ isLoading = false                    │
│ showSuccess = false                  │
│ showPassword = false                 │
│ showConfirmPassword = false          │
└──────────────────────────────────────┘


USER TYPES IN INPUT:
┌─────────────┐
│ User types  │
│  "John"     │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│ onChange fires       │
│ handleInputChange()  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────┐
│ setFormData({                │
│   ...formData,               │
│   fullName: "John"  ← NEW    │
│ })                           │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────┐
│ Component re-renders │
│ Input shows "John"   │
└──────────────────────┘


USER SUBMITS FORM:
┌─────────────┐
│ User clicks │
│  Register   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ setIsLoading(true)  │ ← Show spinner
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Validate data       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Call API            │
└──────┬──────────────┘
       │
   ┌───┴────┐
   │Success?│
   └───┬────┘
       │
  Yes  │  No
   ┌───┴────────┐
   │            │
   ▼            ▼
┌────────┐  ┌────────────────┐
│setShow │  │setError("...")│
│Success │  │setIsLoading   │
│(true)  │  │(false)        │
└───┬────┘  └───┬───────────┘
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│Success │  │Error   │
│Screen  │  │Message │
└────────┘  └────────┘
```

---

## 🎨 UI/UX Flow

```
┌────────────────────────────────────────────────────────────────┐
│                      USER INTERFACE FLOW                        │
└────────────────────────────────────────────────────────────────┘

REGISTRATION PAGE STATES:

1. INITIAL STATE
   ┌─────────────────────────────┐
   │     Create Account          │
   │                             │
   │ [Student] [Teacher]         │
   │                             │
   │ Full Name: [_________]      │
   │ Email:     [_________]      │
   │ Password:  [_________] 👁️   │
   │ Confirm:   [_________] 👁️   │
   │                             │
   │      [Register Button]      │
   │                             │
   │ Already have account? Login │
   └─────────────────────────────┘


2. LOADING STATE (during API call)
   ┌─────────────────────────────┐
   │     Create Account          │
   │                             │
   │ All inputs DISABLED         │
   │                             │
   │   [⟳ Registering...]        │
   │   (Spinning loader)         │
   │                             │
   └─────────────────────────────┘


3. ERROR STATE (validation/API error)
   ┌─────────────────────────────┐
   │     Create Account          │
   │                             │
   │ ┌─────────────────────────┐ │
   │ │ ⚠️ Passwords don't match│ │
   │ └─────────────────────────┘ │
   │   (Red error box)           │
   │                             │
   │      [Register Button]      │
   │                             │
   └─────────────────────────────┘


4. SUCCESS STATE (registration successful)
   ┌─────────────────────────────┐
   │                             │
   │         ✅                   │
   │   (Animated checkmark)      │
   │                             │
   │  Registration Successful!   │
   │                             │
   │ Your account has been       │
   │    created successfully     │
   │                             │
   │ Redirecting to login...     │
   │                             │
   └─────────────────────────────┘
   (Auto-redirect after 3 seconds)
```

---

## 🔌 Port Configuration

```
┌────────────────────────────────────────────────────────────────┐
│                     PORT CONFIGURATION                          │
└────────────────────────────────────────────────────────────────┘

BACKEND PORT: 5000
━━━━━━━━━━━━━━━━━━
Set in: backend/app.py
Line: app.run(debug=True, host='127.0.0.1', port=5000)

Accessible at:
  • http://localhost:5000
  • http://127.0.0.1:5000


FRONTEND PORT: 5173
━━━━━━━━━━━━━━━━━━━
Set in: emexa/vite.config.js
Lines:
  server: {
    port: 5173,
    strictPort: true  ← IMPORTANT!
  }

Accessible at:
  • http://localhost:5173


CORS CONFIGURATION:
━━━━━━━━━━━━━━━━━━━
Backend allows these frontend origins:
  • http://localhost:5173  ← Primary
  • http://localhost:5174
  • http://localhost:5175
  • ... (5176-5183)
  • http://127.0.0.1:5173
  • ... (5174-5183)


WHY strictPort: true?
━━━━━━━━━━━━━━━━━━━━

WITHOUT strictPort (old behavior):
  Port 5173 busy → Vite uses 5174
  Port 5174 busy → Vite uses 5175
  Port 5175 busy → Vite uses 5176
  → CORS breaks (backend doesn't allow that port)

WITH strictPort: true (current):
  Port 5173 busy → ERROR
  → Forces you to stop old server
  → Keeps port consistent
  → CORS always works
```

---

## 🚀 Deployment Architecture (Future)

```
┌────────────────────────────────────────────────────────────────┐
│                 PRODUCTION DEPLOYMENT DIAGRAM                   │
│                        (Future Setup)                           │
└────────────────────────────────────────────────────────────────┘

                          INTERNET
                             │
                             │
                             ▼
                    ┌────────────────┐
                    │  Domain Name   │
                    │ emexa.com      │
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │   Web Server   │
                    │ (Nginx/Apache) │
                    └────┬───────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
      ┌──────────────┐      ┌──────────────┐
      │   Frontend   │      │   Backend    │
      │ (Static HTML)│      │   (Flask)    │
      │   + React    │      │   Gunicorn   │
      └──────────────┘      └──────┬───────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  PostgreSQL  │
                            │  (Database)  │
                            └──────────────┘

Changes for Production:
  • SQLite → PostgreSQL
  • Flask dev server → Gunicorn
  • React dev → Production build (npm run build)
  • Hash routing → Browser routing (optional)
  • Environment variables for secrets
  • HTTPS certificates
  • Database backups
  • Logging and monitoring
```

---

**Use these diagrams to**:
- Understand system architecture
- Explain to new team members
- Plan new features
- Debug issues
- Document changes

**Last Updated**: November 3, 2025
