# 👀 How to View Saved Data - Step by Step

## When You Register a User, Where Does the Data Go?

```
Your Form → Frontend (React) → Backend (Flask) → Database (SQLite)
                                                         ↓
                                            c:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db
```

---

## Method 1: View All Users Using Python Script (Easiest!)

### Step 1: Open PowerShell Terminal
1. In VS Code, press `` Ctrl+` ``
2. Or click `Terminal` → `New Terminal`

### Step 2: Navigate to Backend Folder
```powershell
cd c:\Users\nipun\Desktop\EMEXA\backend
```

### Step 3: Activate Virtual Environment
```powershell
.\venv\Scripts\Activate.ps1
```
**See:** `(venv)` appears

### Step 4: Run the View Users Script
```powershell
python view_users.py
```

### ✅ You Will See:
```
======================================================================
EMEXA DATABASE - USER RECORDS
======================================================================

Total Users: 3

┌────────────────────────────────────────────────────────────────────┐
│ User ID: 1                                                           │
│ Name: Test Student                                                   │
│ Email: test@emexa.com                                                │
│ Account Type: STUDENT                                                │
│ Created: 2025-11-01 18:33:34.320709                                   │
│ Updated: 2025-11-01 18:33:34.320713                                   │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ User ID: 2                                                           │
│ Name: John Doe                                                       │
│ Email: john@example.com                                              │
│ Account Type: TEACHER                                                │
│ Created: 2025-11-02 10:30:00.123456                                   │
│ Updated: 2025-11-02 10:30:00.123456                                   │
└────────────────────────────────────────────────────────────────────┘
```

**This shows ALL users you've registered!**

---

## Method 2: View Users in Browser (Visual!)

### Step 1: Make Sure Frontend is Running
```powershell
# In a NEW terminal
cd c:\Users\nipun\Desktop\EMEXA\emexa
npm run dev
```

### Step 2: Open Browser
1. Open Chrome/Edge/Firefox
2. Go to: http://localhost:5174/#/users

### ✅ You Will See:
A beautiful table with all registered users:

```
┌────┬─────────────┬───────────────────┬──────────────┬─────────────────────┐
│ ID │ Name        │ Email             │ Account Type │ Created At          │
├────┼─────────────┼───────────────────┼──────────────┼─────────────────────┤
│ 1  │ John Doe    │ john@example.com  │ STUDENT      │ 11/2/2025, 10:30 AM │
│ 2  │ Jane Smith  │ jane@example.com  │ TEACHER      │ 11/2/2025, 11:15 AM │
└────┴─────────────┴───────────────────┴──────────────┴─────────────────────┘
```

---

## Method 3: Watch Real-Time in Terminal

### When Backend is Running, You See Live Logs!

**When someone registers:**
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
   └─ User ID: 3
   └─ Created at: 2025-11-03 12:30:45.123456
🔑 JWT Token generated: eyJhbGciOiJIUzI1NiIs...
============================================================
✅ REGISTRATION SUCCESSFUL
============================================================
```

**When someone logs in:**
```
📤 Login request received for: john@example.com
✅ Login successful!
🔑 Token generated for user ID: 3
```

---

## Method 4: Watch in Browser Console (Developer Mode)

### Step 1: Open Developer Tools
1. Open your frontend: http://localhost:5174/#/register
2. Press `F12` (or right-click → Inspect)
3. Click the "Console" tab

### Step 2: Register a User
1. Fill the registration form
2. Click "Register"

### Step 3: Watch the Console
**You'll see:**
```javascript
📤 Sending registration to backend: {
  fullName: "John Doe",
  email: "john@example.com",
  password: "***",
  accountType: "student"
}

✅ Registration response: {
  message: "Registration successful",
  token: "eyJhbGciOiJIUzI1NiIs...",
  user: {
    id: 3,
    full_name: "John Doe",
    email: "john@example.com",
    account_type: "student",
    created_at: "2025-11-03T12:30:45.123456"
  }
}

👤 User created: {id: 3, full_name: "John Doe", ...}
🔑 JWT Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Method 5: Check Database File Directly

### Step 1: Install DB Browser for SQLite (Optional)
1. Download from: https://sqlitebrowser.org/dl/
2. Install it
3. Open DB Browser
4. Click "Open Database"
5. Navigate to: `c:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db`
6. Click "Browse Data" tab
7. Select "users" table
8. **See all your data!**

### Step 2: Or Use Command Line
```powershell
cd c:\Users\nipun\Desktop\EMEXA\backend\instance
sqlite3 emexa.db "SELECT * FROM users;"
```

---

## 🧪 Complete Test Flow - See Your Data!

### Step 1: Start Backend (Terminal 1)
```powershell
cd c:\Users\nipun\Desktop\EMEXA\backend
.\venv\Scripts\Activate.ps1
python app.py
```
**Leave this running!**

### Step 2: Start Frontend (Terminal 2)
```powershell
# Open NEW terminal (Ctrl+Shift+`)
cd c:\Users\nipun\Desktop\EMEXA\emexa
npm run dev
```
**Leave this running too!**

### Step 3: Open Browser & Register
1. Open: http://localhost:5174/#/register
2. Fill the form:
   ```
   Full Name: Demo User
   Email: demo@test.com
   Password: demopass123
   Confirm: demopass123
   Account Type: Student
   ```
3. Click "Register"

### Step 4: Watch the Data!

**In Backend Terminal (Terminal 1), you'll see:**
```
============================================================
📥 REGISTRATION REQUEST RECEIVED
============================================================
📝 Full Name: Demo User
📧 Email: demo@test.com
...
✅ REGISTRATION SUCCESSFUL
============================================================
```

**In Browser Console (F12), you'll see:**
```javascript
📤 Sending registration to backend: {...}
✅ Registration response: {...}
👤 User created: {id: 4, full_name: "Demo User", ...}
```

### Step 5: View the Saved Data
**Option A: Python Script**
```powershell
# In Terminal 3
cd c:\Users\nipun\Desktop\EMEXA\backend
.\venv\Scripts\Activate.ps1
python view_users.py
```

**Option B: Browser**
```
Open: http://localhost:5174/#/users
```

**You'll see your "Demo User" in the list!**

---

## 📊 Summary - Where to Look

| What You Want to See | Where to Look |
|---------------------|---------------|
| **Real-time registration logs** | Backend terminal (where `python app.py` runs) |
| **All users in a table** | Browser: http://localhost:5174/#/users |
| **All users in terminal** | Run: `python view_users.py` |
| **Frontend requests/responses** | Browser Console (F12) → Console tab |
| **Database file** | `backend/instance/emexa.db` |

---

## 🎯 Quick Commands Reference

### View All Users (Easiest Way)
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python view_users.py
```

### View in Browser
```
http://localhost:5174/#/users
```

### Check How Many Users
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -c "from models.user import User; from app import create_app, db; app=create_app(); app.app_context().push(); print(f'Total users: {User.query.count()}')"
```

---

## ✅ What You've Learned

1. ✅ How to run the backend server
2. ✅ How to see data in real-time (terminal logs)
3. ✅ How to view all users (Python script)
4. ✅ How to view all users (Browser page)
5. ✅ How to watch requests in browser console
6. ✅ Where the database file is stored

**You can now see exactly where your data goes and how to check it!** 🎉
