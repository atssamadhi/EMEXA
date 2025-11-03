# 📊 EMEXA SYSTEM FLOW DIAGRAMS

## 1. REGISTRATION FLOW (Student Example)

```
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 1: USER FILLS REGISTRATION FORM                               │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Browser: http://localhost:5173/#/register                    │  │
│  │                                                                │  │
│  │  Full Name:    [Demo Student                    ]             │  │
│  │  Email:        [demo@student.com                ]             │  │
│  │  Password:     [••••••••••••]  👁️                             │  │
│  │  Confirm:      [••••••••••••]  👁️                             │  │
│  │  Account Type:  ◉ Student  ○ Teacher                          │  │
│  │                                                                │  │
│  │                    [  Register  ]                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 2: FRONTEND VALIDATION (Register.jsx)                         │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  ✓ Check full name is not empty                               │  │
│  │  ✓ Check email format: /\S+@\S+\.\S+/                        │  │
│  │  ✓ Check password length ≥ 8 characters                       │  │
│  │  ✓ Check passwords match                                      │  │
│  │                                                                │  │
│  │  If validation fails → Show error messages                    │  │
│  │  If validation passes → Continue to API call                  │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 3: API CALL (api.js)                                          │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  POST http://localhost:5000/auth/register                     │  │
│  │  Content-Type: application/json                               │  │
│  │                                                                │  │
│  │  Body:                                                         │  │
│  │  {                                                             │  │
│  │    "fullName": "Demo Student",                                │  │
│  │    "email": "demo@student.com",                               │  │
│  │    "password": "password123",                                 │  │
│  │    "accountType": "student"                                   │  │
│  │  }                                                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Console Output:                                                     │
│  📤 Sending registration to backend                                  │
│  📍 Backend URL: http://localhost:5000/auth/register                 │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 4: BACKEND RECEIVES REQUEST (routes/auth.py)                  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  1. Extract data from request.get_json()                      │  │
│  │     fullName = "Demo Student"                                 │  │
│  │     email = "demo@student.com"                                │  │
│  │     password = "password123"                                  │  │
│  │     accountType = "student"                                   │  │
│  │                                                                │  │
│  │  2. Server-side validation:                                   │  │
│  │     ✓ Email format (email-validator library)                  │  │
│  │     ✓ Password length ≥ 8 characters                          │  │
│  │     ✓ Check if email already exists                           │  │
│  │                                                                │  │
│  │  3. If validation fails:                                      │  │
│  │     return { "message": "Error" }, 400/409                    │  │
│  │                                                                │  │
│  │  4. If validation passes:                                     │  │
│  │     Continue to password hashing                              │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Terminal Output:                                                    │
│  ============================================================         │
│  REGISTRATION REQUEST RECEIVED                                       │
│  ============================================================         │
│  Full Name: Demo Student                                             │
│  Email: demo@student.com                                             │
│  Password: *********** (11 characters)                               │
│  Account Type: student                                               │
│  Validation passed - Creating student account...                     │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 5: PASSWORD HASHING (bcrypt)                                  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Original Password:  "password123"                            │  │
│  │           ⬇                                                    │  │
│  │  Generate Salt:      "$2b$12$KIXyZ9p7Q4N2Rm..."               │  │
│  │           ⬇                                                    │  │
│  │  Combine & Hash:                                              │  │
│  │    bcrypt.hashpw("password123", salt)                         │  │
│  │           ⬇                                                    │  │
│  │  Password Hash:      "$2b$12$KIXyZ9p7Q4N2RmJxYzVlZO..."       │  │
│  │                                                                │  │
│  │  Security:                                                     │  │
│  │  • One-way encryption (cannot be reversed)                    │  │
│  │  • Unique salt per password                                   │  │
│  │  • 12 rounds = 2^12 = 4,096 iterations                        │  │
│  │  • Takes ~100ms (prevents brute-force)                        │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 6: DATABASE INSERT (SQLAlchemy ORM)                           │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  # Create Student object                                      │  │
│  │  new_user = Student(                                          │  │
│  │      full_name="Demo Student",                                │  │
│  │      email="demo@student.com"                                 │  │
│  │  )                                                             │  │
│  │  new_user.set_password("password123")  # Hashes password      │  │
│  │                                                                │  │
│  │  # Save to database                                           │  │
│  │  db.session.add(new_user)                                     │  │
│  │  db.session.commit()                                          │  │
│  │                                                                │  │
│  │  # Translates to SQL:                                         │  │
│  │  INSERT INTO students (full_name, email, password_hash,       │  │
│  │                        created_at)                            │  │
│  │  VALUES ('Demo Student', 'demo@student.com',                  │  │
│  │          '$2b$12$KIXy...', '2025-11-03 10:45:23')            │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Terminal Output:                                                    │
│  Student saved to 'students' table!                                  │
│     Student ID: 7                                                    │
│     Created at: 2025-11-03 10:45:23.456789                           │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 7: GENERATE JWT TOKEN                                         │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  access_token = create_access_token(                          │  │
│  │      identity={'id': 7, 'type': 'student'}                    │  │
│  │  )                                                             │  │
│  │                                                                │  │
│  │  Token Structure:                                             │  │
│  │  ┌────────────────────────────────────────────────────────┐   │  │
│  │  │ HEADER (Algorithm + Type)                              │   │  │
│  │  │ { "alg": "HS256", "typ": "JWT" }                       │   │  │
│  │  ├────────────────────────────────────────────────────────┤   │  │
│  │  │ PAYLOAD (User Data)                                    │   │  │
│  │  │ {                                                      │   │  │
│  │  │   "sub": {"id": 7, "type": "student"},                │   │  │
│  │  │   "iat": 1699009523,  // Issued at                    │   │  │
│  │  │   "exp": 1699013123   // Expires                      │   │  │
│  │  │ }                                                      │   │  │
│  │  ├────────────────────────────────────────────────────────┤   │  │
│  │  │ SIGNATURE (Tamper-proof)                               │   │  │
│  │  │ HMACSHA256(header + payload, secret_key)              │   │  │
│  │  └────────────────────────────────────────────────────────┘   │  │
│  │                                                                │  │
│  │  Result:                                                       │  │
│  │  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOns..."      │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Terminal Output:                                                    │
│  JWT Token generated: eyJhbGciOiJIUzI1NiIs...                        │
│  ============================================================         │
│  STUDENT REGISTRATION SUCCESSFUL                                     │
│  ============================================================         │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 8: SEND RESPONSE TO FRONTEND                                  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  HTTP/1.1 201 Created                                         │  │
│  │  Content-Type: application/json                               │  │
│  │                                                                │  │
│  │  {                                                             │  │
│  │    "message": "Registration successful",                      │  │
│  │    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",               │  │
│  │    "user": {                                                  │  │
│  │      "id": 7,                                                 │  │
│  │      "fullName": "Demo Student",                              │  │
│  │      "email": "demo@student.com",                             │  │
│  │      "accountType": "student",                                │  │
│  │      "createdAt": "2025-11-03T10:45:23.456789"               │  │
│  │    }                                                           │  │
│  │  }                                                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 9: FRONTEND RECEIVES RESPONSE (Register.jsx)                  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  api.post('/auth/register', data)                             │  │
│  │    .then(res => {                                             │  │
│  │      // Save JWT token to localStorage                        │  │
│  │      localStorage.setItem('token', res.token)                 │  │
│  │                                                                │  │
│  │      // Show success animation                                │  │
│  │      setUserName(res.user.full_name)                          │  │
│  │      setRegistered(true)                                      │  │
│  │                                                                │  │
│  │      // Redirect to login after 3 seconds                     │  │
│  │      setTimeout(() => {                                       │  │
│  │        window.location.hash = '#/login'                       │  │
│  │      }, 3000)                                                 │  │
│  │    })                                                          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Console Output:                                                     │
│  ✅ Registration response: { message: "...", token: "...", ... }     │
│  👤 User created: { id: 7, fullName: "Demo Student", ... }           │
│  🔑 JWT Token: eyJhbGciOiJIUzI1NiIs...                                │
│  ✨ SUCCESS! Showing success message...                               │
│  ⏱️ Will redirect to login in 3 seconds...                           │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 10: SUCCESS ANIMATION DISPLAYED                                │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │                    ┌─────────────────────┐                    │  │
│  │                    │                     │                    │  │
│  │                    │         ✓           │                    │  │
│  │                    │                     │                    │  │
│  │                    │ Registration        │                    │  │
│  │                    │   Successful!       │                    │  │
│  │                    │                     │                    │  │
│  │                    │ Welcome,            │                    │  │
│  │                    │ Demo Student!       │                    │  │
│  │                    │                     │                    │  │
│  │                    │ Redirecting to      │                    │  │
│  │                    │ login...            │                    │  │
│  │                    │                     │                    │  │
│  │                    └─────────────────────┘                    │  │
│  │                                                                │  │
│  │  Animations:                                                   │  │
│  │  • Card fades in (0.5s)                                       │  │
│  │  • Checkmark pops (0.6s scale animation)                      │  │
│  │  • Text slides up (0.4s)                                      │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
                   [After 3 seconds]
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 11: REDIRECT TO LOGIN PAGE                                    │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  URL changes to: http://localhost:5173/#/login                │  │
│  │  User can now log in with their new credentials               │  │
│  │                                                                │  │
│  │  Token stored in localStorage (auto-login possible)           │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. LOGIN FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│  USER ENTERS CREDENTIALS                                             │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Email:    [demo@student.com                ]                 │  │
│  │  Password: [••••••••••••]  👁️                                  │  │
│  │  ☑ Remember me                                                 │  │
│  │                  [ Log In ]                                    │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  FRONTEND: Validate → Send API Request                               │
│  POST http://localhost:5000/auth/login                               │
│  { "email": "demo@student.com", "password": "password123" }          │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  BACKEND: Search Database                                            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  1. Check Students table:                                     │  │
│  │     student = Student.query.filter_by(email=email).first()   │  │
│  │                                                                │  │
│  │  2. If found:                                                 │  │
│  │     if student.check_password(password):                      │  │
│  │         ✓ Password correct!                                   │  │
│  │         Generate JWT token for student                        │  │
│  │         Return success                                        │  │
│  │                                                                │  │
│  │  3. If not found in Students:                                 │  │
│  │     teacher = Teacher.query.filter_by(email=email).first()   │  │
│  │     Check password same way                                   │  │
│  │                                                                │  │
│  │  4. If not found in either table:                             │  │
│  │     return { "message": "Invalid email or password" }, 401    │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  PASSWORD VERIFICATION (bcrypt)                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  User Input:       "password123"                              │  │
│  │  Stored Hash:      "$2b$12$KIXyZ9p7Q4N2RmJxYzVlZO..."         │  │
│  │                                                                │  │
│  │  bcrypt.checkpw(                                              │  │
│  │      "password123".encode(),                                  │  │
│  │      "$2b$12$KIXyZ9p7Q4N2RmJxYzVlZO...".encode()             │  │
│  │  )                                                             │  │
│  │                                                                │  │
│  │  Returns: True ✓ (passwords match)                            │  │
│  │       or: False ✗ (passwords don't match)                     │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  BACKEND: Send Response                                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  HTTP/1.1 200 OK                                              │  │
│  │  {                                                             │  │
│  │    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",               │  │
│  │    "user": {                                                  │  │
│  │      "id": 7,                                                 │  │
│  │      "fullName": "Demo Student",                              │  │
│  │      "email": "demo@student.com",                             │  │
│  │      "accountType": "student"                                 │  │
│  │    }                                                           │  │
│  │  }                                                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ⬇
┌─────────────────────────────────────────────────────────────────────┐
│  FRONTEND: Save Token & Redirect                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  localStorage.setItem('token', res.token)                     │  │
│  │  Show success message                                         │  │
│  │  Redirect to dashboard                                        │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. DATABASE STRUCTURE

```
┌──────────────────────────────────────────────────────────────────┐
│               SQLite Database: emexa.db                          │
│         Location: backend/instance/emexa.db                      │
│                  Size: ~36-40 KB                                 │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  TABLE: students                                                 │
├─────┬──────────────┬───────────────────┬──────────────┬─────────┤
│ ID  │ full_name    │ email             │ password_hash│ created │
├─────┼──────────────┼───────────────────┼──────────────┼─────────┤
│ 1   │ abc          │ ab@gmil.com       │ $2b$12$KIX...│ 03:45  │
│ 2   │ ravi         │ ra@gmail.com      │ $2b$12$abc...│ 04:40  │
│ 3   │ t            │ t@gmail.com       │ $2b$12$xyz...│ 04:43  │
│ 4   │ ama          │ a@gmail.com       │ $2b$12$def...│ 05:08  │
│ 5   │ v            │ v@gmail.com       │ $2b$12$ghi...│ 05:19  │
│ 6   │ l            │ l@gmail.com       │ $2b$12$jkl...│ 06:00  │
│ 7   │ Demo Student │ demo@student.com  │ $2b$12$mno...│ 10:45  │
└─────┴──────────────┴───────────────────┴──────────────┴─────────┘

┌──────────────────────────────────────────────────────────────────┐
│  TABLE: teachers                                                 │
├─────┬──────────────┬───────────────────┬──────────────┬─────────┤
│ ID  │ full_name    │ email             │ password_hash│ created │
├─────┼──────────────┼───────────────────┼──────────────┼─────────┤
│ 1   │ k            │ k@gmail.com       │ $2b$12$pqr...│ 05:10  │
│ 2   │ Mr. Smith    │ smith@teacher.com │ $2b$12$stu...│ 10:50  │
└─────┴──────────────┴───────────────────┴──────────────┴─────────┘

┌──────────────────────────────────────────────────────────────────┐
│  TABLE: users (legacy - not used)                                │
│  Empty                                                            │
└──────────────────────────────────────────────────────────────────┘

KEY POINTS:
• password_hash: Encrypted with bcrypt (cannot be decrypted)
• email: Unique constraint (no duplicates)
• created_at: Automatic timestamp
• Separate tables allow different fields per user type
```

---

## 4. TECHNOLOGY STACK

```
┌─────────────────────────────────────────────────────────────────┐
│                      FULL STACK OVERVIEW                        │
└─────────────────────────────────────────────────────────────────┘

FRONTEND (Client-Side)
├── React 19.1.1
│   └── Component-based UI library
├── Vite 7.1.14
│   └── Fast build tool and dev server
├── Hash-based Routing
│   └── Simple routing without React Router
└── Modern CSS
    └── Animations, gradients, responsive design

BACKEND (Server-Side)
├── Python 3.x
├── Flask 3.0.0
│   └── Lightweight web framework
├── Flask-CORS
│   └── Cross-origin resource sharing
├── Flask-JWT-Extended
│   └── JSON Web Token authentication
├── Flask-SQLAlchemy
│   └── ORM for database operations
├── bcrypt
│   └── Password hashing
└── email-validator
    └── Email format validation

DATABASE
├── SQLite 3
│   └── File-based relational database
└── Tables: students, teachers, users

SECURITY
├── bcrypt (12 rounds)
│   └── One-way password encryption
├── JWT (HMAC SHA256)
│   └── Stateless authentication tokens
└── CORS Configuration
    └── Controlled cross-origin access

DEVELOPMENT TOOLS
├── Git (version control)
├── VS Code (IDE)
├── PowerShell/Terminal
└── Chrome DevTools (debugging)
```

---

## 5. ERROR HANDLING EXAMPLES

```
ERROR SCENARIO 1: Duplicate Email
──────────────────────────────────
User tries: demo@student.com (already exists)

Backend Check:
  existing = Student.query.filter_by(email="demo@student.com").first()
  if existing:
      return {"message": "Email already registered"}, 409

Frontend Display:
  ⚠️ Email already registered
  
──────────────────────────────────

ERROR SCENARIO 2: Wrong Password
──────────────────────────────────
User enters: "wrongpassword"
Database has: "$2b$12$KIXyZ..."

Backend Check:
  bcrypt.checkpw("wrongpassword", stored_hash)
  Returns: False
  
Response:
  {"message": "Invalid email or password"}, 401

Frontend Display:
  ❌ Invalid email or password

──────────────────────────────────

ERROR SCENARIO 3: Weak Password
──────────────────────────────────
User enters: "123" (too short)

Frontend Validation:
  if (password.length < 8) {
      error = 'Password must be at least 8 characters'
  }

Display:
  ⚠️ Password must be at least 8 characters

──────────────────────────────────

ERROR SCENARIO 4: Backend Offline
──────────────────────────────────
User submits form, backend not running

Frontend (api.js):
  try {
      await fetch('http://localhost:5000/auth/register', ...)
  } catch (err) {
      if (!err.status) {
          throw new Error('Cannot connect to server')
      }
  }

Display:
  ⚠️ Cannot connect to server. Please check if backend is running.
```

---

**Use these diagrams during your demo to visually explain the system!**
