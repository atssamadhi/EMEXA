# 📂 DATA STORAGE - SIMPLE VISUAL GUIDE

## 🎯 Where is Everything Saved?

```
YOUR COMPUTER
│
└── C:\Users\nipun\Desktop\EMEXA\
    │
    └── backend\
        │
        └── emexa.db  ← 🎯 ALL DATA IS HERE!
            │
            ├── students table    (Student accounts)
            ├── teachers table    (Teacher accounts)
            └── users table       (Legacy - not used)
```

---

## 📊 Visual Data Flow

### When User Registers:

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: User Fills Form                                    │
│  Browser: http://localhost:5173/#/register                  │
├─────────────────────────────────────────────────────────────┤
│  Name: Nipun Fernando                                        │
│  Email: nipun@student.com                                    │
│  Password: mypassword123                                     │
│  Account Type: [✓] Student                                  │
│                                                              │
│  [Register Button Clicked]                                  │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Frontend Sends Data                                │
│  POST http://localhost:5000/auth/register                   │
├─────────────────────────────────────────────────────────────┤
│  {                                                           │
│    "fullName": "Nipun Fernando",                            │
│    "email": "nipun@student.com",                            │
│    "password": "mypassword123",                             │
│    "accountType": "student"                                 │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Backend Processes (Flask)                          │
│  File: backend/routes/auth.py                               │
├─────────────────────────────────────────────────────────────┤
│  1. Validate email format                                   │
│  2. Check password length (8+ chars)                        │
│  3. Encrypt password with bcrypt                            │
│     → "mypassword123" becomes                               │
│     → "$2b$12$KIXyZ9p7Q4N2Rm..."                            │
│  4. Choose table: accountType = "student"                   │
│     → Use STUDENTS table                                    │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Save to Database                                   │
│  File: C:\...\backend\emexa.db                              │
├─────────────────────────────────────────────────────────────┤
│  INSERT INTO students (                                     │
│    full_name,                                               │
│    email,                                                   │
│    password_hash,                                           │
│    created_at                                               │
│  ) VALUES (                                                 │
│    'Nipun Fernando',                                        │
│    'nipun@student.com',                                     │
│    '$2b$12$KIXyZ9p7Q4N2Rm...',                              │
│    '2025-11-03 10:30:45'                                    │
│  )                                                          │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: Success Response                                   │
│  Backend → Frontend                                         │
├─────────────────────────────────────────────────────────────┤
│  {                                                           │
│    "message": "Registration successful",                    │
│    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",             │
│    "user": {                                                │
│      "id": 1,                                               │
│      "full_name": "Nipun Fernando",                         │
│      "email": "nipun@student.com",                          │
│      "type": "student"                                      │
│    }                                                         │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: Success Screen Shown                               │
│  Frontend displays animated checkmark                       │
├─────────────────────────────────────────────────────────────┤
│             ✓ Registration Successful!                      │
│                                                              │
│  Redirecting to login page in 3 seconds...                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database File Structure

### emexa.db File Contains:

```
┌──────────────────────────────────────────────────────────────┐
│                      emexa.db                                │
│                  (SQLite Database File)                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Table: students                                   │     │
│  ├────────────────────────────────────────────────────┤     │
│  │  id | full_name      | email             | ...    │     │
│  │  ───────────────────────────────────────────────  │     │
│  │  1  | Nipun Fernando | nipun@student.com | ...    │     │
│  │  2  | Saman Silva    | saman@student.com | ...    │     │
│  │  3  | Amal Perera    | amal@student.com  | ...    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Table: teachers                                   │     │
│  ├────────────────────────────────────────────────────┤     │
│  │  id | full_name      | email             | ...    │     │
│  │  ───────────────────────────────────────────────  │     │
│  │  1  | Ms. Silva      | silva@teacher.com | ...    │     │
│  │  2  | Mr. Fernando   | fernando@tchr.com | ...    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔐 Password Encryption Visual

### How Passwords are Stored:

```
User Types:          Backend Encrypts:         Stored in Database:
─────────────        ─────────────────         ──────────────────

"mypassword123"  →   bcrypt.hashpw()      →   "$2b$12$KIXyZ..."
                     (12 salt rounds)          (encrypted hash)

                           ✓ SECURE
                     Cannot be decrypted!
                     One-way encryption
```

### Why This is Safe:

```
❌ BAD (Old Way):
Database: password = "mypassword123"
→ Anyone with database access sees real password!

✅ GOOD (Our Way):
Database: password_hash = "$2b$12$KIXyZ..."
→ Even with database access, cannot get real password!
```

---

## 📁 Folder Structure with Data Files

```
EMEXA/
│
├── backend/                    ← Backend code
│   ├── emexa.db               ← 🎯 YOUR DATA FILE (Created when server runs)
│   ├── app.py                 ← Main server file
│   ├── show_data.py           ← Script to view data
│   │
│   ├── models/
│   │   ├── student.py         ← Students table definition
│   │   └── teacher.py         ← Teachers table definition
│   │
│   └── routes/
│       └── auth.py            ← Registration/Login code
│
└── emexa/                     ← Frontend code
    └── src/
        └── pages/
            └── Register.jsx   ← Registration form
```

---

## 🔍 How to See Your Data

### Option 1: Run Python Script

```bash
cd C:\Users\nipun\Desktop\EMEXA\backend
python show_data.py
```

**Output:**
```
============================================================
  ALL REGISTERED USER DATA
============================================================

STUDENTS TABLE
------------------------------------------------------------
Total Students: 3

  ID: 1
  Name: Nipun Fernando
  Email: nipun@student.com
  Registered: 2025-11-03 10:30:45

  ID: 2
  Name: Saman Silva
  Email: saman@student.com
  Registered: 2025-11-03 11:15:22
```

### Option 2: Use DB Browser (Visual Tool)

1. Download: https://sqlitebrowser.org/
2. Open `emexa.db`
3. Click "Browse Data" tab
4. See all your data in a table!

---

## 📊 Data Examples

### Student Entry Example:

```
ID: 1
Full Name: Nipun Fernando
Email: nipun@student.com
Password Hash: $2b$12$KIXyZ9p7Q4N2RmJxYzVlZOGH8vQ...
Created At: 2025-11-03 10:30:45
```

### Teacher Entry Example:

```
ID: 1
Full Name: Ms. Silva
Email: silva@teacher.com
Password Hash: $2b$12$abcXYZ123def456ghi789jkl...
Created At: 2025-11-03 11:15:22
```

---

## ⚡ Quick Reference

| Question | Answer |
|----------|--------|
| Where is data saved? | `C:\Users\nipun\Desktop\EMEXA\backend\emexa.db` |
| What file type? | SQLite database (single file) |
| Student data table? | `students` table |
| Teacher data table? | `teachers` table |
| Are passwords visible? | No! Encrypted with bcrypt |
| How to view data? | Run `python show_data.py` |
| How to backup? | Copy `emexa.db` file |
| When is it created? | First time you run `python app.py` |

---

## 🚨 Important Warnings

```
⚠️  DON'T DELETE emexa.db
    → You'll lose ALL user data!

⚠️  DON'T EDIT emexa.db MANUALLY
    → You might corrupt the database!

⚠️  DON'T SHARE emexa.db FILE
    → Contains user passwords (encrypted, but still sensitive)!

✅  DO BACKUP emexa.db REGULARLY
    → Copy the file to safe location!
```

---

## 💡 For Your Team

**Simple Explanation:**

> "When someone registers on our website, their information (name, email, encrypted password) gets saved in a file called `emexa.db` in the `backend` folder. It's like an Excel file, but for databases. Students go in the `students` table, teachers go in the `teachers` table. Passwords are scrambled with bcrypt encryption, so even if someone steals the file, they can't see the real passwords!"

---

**Created:** November 3, 2025  
**File Location:** `C:\Users\nipun\Desktop\EMEXA\backend\emexa.db`  
**Database Type:** SQLite (single file, no server needed)
