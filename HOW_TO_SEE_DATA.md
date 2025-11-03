# 🎓 EMEXA Backend - How Registration Works

## 📝 Complete Data Flow Explanation

### **When You Register a New User:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        REGISTRATION FLOW                             │
└─────────────────────────────────────────────────────────────────────┘

1️⃣ USER FILLS FORM
   ┌──────────────────┐
   │ Full Name:       │ → John Doe
   │ Email:           │ → john@example.com
   │ Password:        │ → mypassword123
   │ Confirm:         │ → mypassword123
   │ Account Type:    │ → Student
   │ [Register]       │
   └──────────────────┘

2️⃣ FRONTEND VALIDATION (Register.jsx)
   ✓ Check all fields filled
   ✓ Email format valid
   ✓ Password at least 6 characters
   ✓ Passwords match
   
3️⃣ SEND TO BACKEND (api.js)
   POST http://localhost:5000/auth/register
   Headers: Content-Type: application/json
   Body: {
     "fullName": "John Doe",
     "email": "john@example.com",
     "password": "mypassword123",
     "accountType": "student"
   }

4️⃣ BACKEND RECEIVES (routes/auth.py)
   @auth_bp.route('/register', methods=['POST'])
   
   ↓ Extract data from request
   ↓ Validate email format
   ↓ Check if email already exists
   ↓ Create User object
   ↓ Hash password with bcrypt
   ↓ Save to database
   ↓ Generate JWT token
   ↓ Return response

5️⃣ DATABASE SAVES (SQLite)
   INSERT INTO users (
     full_name,
     email,
     password_hash,
     account_type,
     created_at
   ) VALUES (
     'John Doe',
     'john@example.com',
     '$2b$12$xyz...', ← bcrypt hashed
     'student',
     '2025-11-02 10:30:00'
   );
   
   ✅ User ID: 1 (auto-generated)

6️⃣ BACKEND RESPONDS
   Status: 201 Created
   Body: {
     "message": "Registration successful",
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": 1,
       "full_name": "John Doe",
       "email": "john@example.com",
       "account_type": "student",
       "created_at": "2025-11-02T10:30:00"
     }
   }

7️⃣ FRONTEND RECEIVES (Register.jsx)
   ↓ Shows alert with user details
   ↓ Saves JWT token to localStorage
   ↓ Redirects to login page
```

---

## 🔍 How to SEE the Saved Data

### **Method 1: Browser Console (Real-time Logging)**

When you register, open **Browser DevTools** (F12):

**Console Tab will show:**
```
📤 Sending to backend: {fullName: "John Doe", email: "john@...", password: "***", accountType: "student"}
✅ Backend response: {message: "Registration successful", token: "eyJ...", user: {...}}
👤 User created: {id: 1, full_name: "John Doe", email: "john@...", ...}
🔑 JWT Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Network Tab will show:**
- Request URL: http://localhost:5000/auth/register
- Request Method: POST
- Status Code: 201 Created
- Request Payload: {fullName, email, password, accountType}
- Response: {message, token, user}

---

### **Method 2: Backend Terminal (Server Logs)**

When Flask server is running, you'll see:

```
============================================================
📥 REGISTRATION REQUEST RECEIVED
============================================================
📝 Full Name: John Doe
📧 Email: john@example.com
🔒 Password: *************** (15 characters)
👤 Account Type: student
✅ Validation passed - Creating user...
💾 User saved to database!
   └─ User ID: 1
   └─ Created at: 2025-11-02 10:30:00.123456
🔑 JWT Token generated: eyJhbGciOiJIUzI1NiIsInR5cCI...
============================================================
✅ REGISTRATION SUCCESSFUL
============================================================
```

---

### **Method 3: View All Users Page**

**NEW! I created a Users List page for you:**

1. **Start your servers** (frontend + backend)

2. **Go to:** http://localhost:5175/#/users

3. **You'll see a table** with ALL registered users:

```
┌────┬─────────────┬───────────────────┬──────────────┬─────────────────────┐
│ ID │ Name        │ Email             │ Account Type │ Created At          │
├────┼─────────────┼───────────────────┼──────────────┼─────────────────────┤
│ 1  │ John Doe    │ john@example.com  │ STUDENT      │ 11/2/2025, 10:30 AM │
│ 2  │ Jane Smith  │ jane@example.com  │ TEACHER      │ 11/2/2025, 11:15 AM │
└────┴─────────────┴───────────────────┴──────────────┴─────────────────────┘
```

---

### **Method 4: Database Direct Query**

**Using Python:**

```bash
cd backend
.\venv\Scripts\activate
python view_users.py
```

**Output:**
```
======================================================================
EMEXA DATABASE - USER RECORDS
======================================================================

Total Users: 2

┌────────────────────────────────────────────────────────────────────┐
│ User ID: 1                                                           │
│ Name: John Doe                                                       │
│ Email: john@example.com                                              │
│ Account Type: STUDENT                                                │
│ Created: 2025-11-02 10:30:00.123456                                  │
│ Updated: 2025-11-02 10:30:00.123456                                  │
└────────────────────────────────────────────────────────────────────┘
```

---

### **Method 5: Success Alert**

After successful registration, you'll see a **popup alert**:

```
✅ Registration successful!

Name: John Doe
Email: john@example.com
Account Type: student
```

---

## 🧪 TEST IT NOW - Step by Step

### **Step 1: Start Backend**
```bash
cd c:\Users\nipun\Desktop\EMEXA\backend
.\venv\Scripts\activate
python app.py
```

**You should see:**
```
* Running on http://127.0.0.1:5000
```

### **Step 2: Start Frontend**
```bash
cd c:\Users\nipun\Desktop\EMEXA\emexa
npm run dev
```

**You should see:**
```
VITE ready in 500 ms
➜  Local:   http://localhost:5175/
```

### **Step 3: Open Browser**
- Go to: http://localhost:5175/#/register
- Open DevTools (F12) → Console tab

### **Step 4: Fill the Form**
```
Full Name: Test User
Email: testuser@emexa.com
Password: password123
Confirm Password: password123
Account Type: Student (selected)
```

### **Step 5: Click "Register"**

**Watch the magic happen! 🎉**

**Browser Console shows:**
```
📤 Sending to backend: {...}
✅ Backend response: {...}
👤 User created: {...}
🔑 JWT Token: eyJ...
```

**Backend Terminal shows:**
```
📥 REGISTRATION REQUEST RECEIVED
📝 Full Name: Test User
📧 Email: testuser@emexa.com
✅ REGISTRATION SUCCESSFUL
```

**Alert Popup:**
```
✅ Registration successful!
Name: Test User
Email: testuser@emexa.com
Account Type: student
```

### **Step 6: View Saved Users**
- Go to: http://localhost:5175/#/users
- See your new user in the table!

---

## 📊 Data Storage Explained

### **Where is the data?**

```
c:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db
```

### **What's inside?**

**users table:**
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  ← bcrypt encrypted
    account_type VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### **Example record:**
```
id: 1
full_name: "Test User"
email: "testuser@emexa.com"
password_hash: "$2b$12$Lk3x9zF8qW..."  ← NOT plain text!
account_type: "student"
created_at: "2025-11-02 10:30:00"
updated_at: "2025-11-02 10:30:00"
```

---

## 🔐 Security Features

### **Password is NEVER stored as plain text:**

**What you type:**
```
password123
```

**What gets stored:**
```
$2b$12$Lk3x9zF8qWr2HnF5Jx9aO.vZ8qY3pN7mK1dL6sT4bR8eA9cF5gH2i
```

**How it works:**
```python
# models/user.py
def set_password(self, password):
    salt = bcrypt.gensalt()  # Random salt
    self.password_hash = bcrypt.hashpw(
        password.encode('utf-8'), 
        salt
    ).decode('utf-8')
```

**Even the same password produces different hashes:**
- User 1: `password123` → `$2b$12$abc...xyz`
- User 2: `password123` → `$2b$12$def...uvw` ← Different!

---

## 🎯 Quick Reference

### **All Available Routes:**

| Route | Page | What it does |
|-------|------|--------------|
| `#/login` | Login | Authenticate user |
| `#/register` | Register | Create new account |
| `#/forgot` | Forgot Password | Request password reset |
| `#/users` | **Users List** | **View all registered users** |

### **Backend Endpoints:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/register` | POST | Create new user |
| `/auth/login` | POST | Authenticate user |
| `/auth/forgot-password` | POST | Request password reset |
| `/auth/me` | GET | Get current user (requires token) |
| `/auth/users` | **GET** | **Get all users (NEW!)** |

---

## ✅ Checklist to Confirm Registration Works

- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 5175)
- [ ] Fill registration form completely
- [ ] Click "Register" button
- [ ] See success alert with user details ✅
- [ ] Redirected to login page ✅
- [ ] Check browser console - see logs ✅
- [ ] Check backend terminal - see logs ✅
- [ ] Visit #/users page - see user in table ✅
- [ ] Run `python view_users.py` - see user ✅

---

## 🚀 Next Steps

Now that you can SEE the data, you can:

1. **Test Login** with the registered user
2. **Create multiple users** (student and teacher)
3. **View all users** on the users list page
4. **Check database** anytime with view_users.py
5. **Monitor logs** in browser console and terminal

---

**Everything is working and you can now SEE exactly where your data goes! 🎉**
