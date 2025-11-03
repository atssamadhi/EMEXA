# 📂 WHERE IS YOUR DATA SAVED?

## 🎯 Quick Answer

**ALL your login, registration, and user data is saved in:**

```
C:\Users\nipun\Desktop\EMEXA\backend\emexa.db
```

---

## 📊 Database Structure

### Database Type: **SQLite**
- **File Name:** `emexa.db`
- **Location:** `backend` folder
- **Type:** Single file database (no installation needed!)

---

## 📋 What Data is Stored?

### 1️⃣ **STUDENTS Table**
When someone registers as a **Student**, their data goes here:

| Column | Data Type | Description |
|--------|-----------|-------------|
| `id` | INTEGER | Unique student ID (auto-increment) |
| `full_name` | TEXT | Student's full name |
| `email` | TEXT | Student's email (unique) |
| `password_hash` | TEXT | Encrypted password (bcrypt) |
| `created_at` | TIMESTAMP | Registration date & time |

**Example:**
```
ID: 1
Name: Nipun Fernando
Email: nipun@student.com
Password: [encrypted with bcrypt]
Created: 2025-11-03 10:30:45
```

---

### 2️⃣ **TEACHERS Table**
When someone registers as a **Teacher**, their data goes here:

| Column | Data Type | Description |
|--------|-----------|-------------|
| `id` | INTEGER | Unique teacher ID (auto-increment) |
| `full_name` | TEXT | Teacher's full name |
| `email` | TEXT | Teacher's email (unique) |
| `password_hash` | TEXT | Encrypted password (bcrypt) |
| `created_at` | TIMESTAMP | Registration date & time |

**Example:**
```
ID: 1
Name: Ms. Silva
Email: silva@teacher.com
Password: [encrypted with bcrypt]
Created: 2025-11-03 11:15:22
```

---

## 🔐 Security Features

### Password Storage
- ✅ **NOT stored as plain text**
- ✅ **Encrypted using bcrypt** (industry standard)
- ✅ **Salt rounds: 12** (very secure)
- ✅ **Cannot be decrypted** (one-way hash)

**Example:**
```python
# Plain password: "mypassword123"
# Stored in database: "$2b$12$KIXyZ9p7Q4N2Rm..."
```

---

## 📁 Complete File Path

### Full Path Structure
```
C:\Users\nipun\Desktop\EMEXA\
│
└── backend\
    ├── app.py              ← Main Flask application
    ├── emexa.db            ← 🎯 YOUR DATA IS HERE!
    ├── models\
    │   ├── student.py      ← Student table definition
    │   └── teacher.py      ← Teacher table definition
    └── routes\
        └── auth.py         ← Registration/Login logic
```

---

## 🔍 How to View Your Data

### Method 1: Using Python Script
```bash
cd C:\Users\nipun\Desktop\EMEXA\backend
python show_data.py
```

### Method 2: Using SQLite Browser (Recommended)
1. Download **DB Browser for SQLite** (free)
   - https://sqlitebrowser.org/

2. Open `emexa.db` file

3. Click "Browse Data" tab

4. Select table: `students` or `teachers`

### Method 3: Using Python Command
```bash
cd backend
python -c "import sqlite3; conn = sqlite3.connect('emexa.db'); cursor = conn.cursor(); cursor.execute('SELECT * FROM students'); print(cursor.fetchall())"
```

---

## 🗂️ Database Tables Overview

### Tables Created Automatically
When you start the backend server (`python app.py`), these tables are created:

1. **students** - Stores student accounts
2. **teachers** - Stores teacher accounts
3. **users** - Legacy table (not used anymore)

### Table Creation Code
Location: `backend/models/student.py` and `backend/models/teacher.py`

```python
# Student table creation
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

# Teacher table creation  
CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

---

## 📥 When Data is Saved

### Registration Flow
```
User fills form → Click "Register" button
         ↓
Frontend sends POST to /auth/register
         ↓
Backend receives data
         ↓
Password encrypted with bcrypt
         ↓
Data saved to emexa.db
         ↓
Success message shown
```

### Login Flow
```
User enters email + password → Click "Login"
         ↓
Frontend sends POST to /auth/login
         ↓
Backend searches emexa.db
         ↓
Password verified (bcrypt compare)
         ↓
JWT token generated
         ↓
User logged in
```

---

## 🔧 Database Management

### Backup Your Database
```bash
# Copy the database file
cd C:\Users\nipun\Desktop\EMEXA\backend
copy emexa.db emexa_backup_2025-11-03.db
```

### Reset Database (Delete All Data)
```bash
cd C:\Users\nipun\Desktop\EMEXA\backend
del emexa.db
# Restart server to recreate empty database
python app.py
```

### Export Data to CSV
```bash
cd backend
python -c "import sqlite3, csv; conn = sqlite3.connect('emexa.db'); cursor = conn.cursor(); cursor.execute('SELECT * FROM students'); with open('students.csv', 'w', newline='') as f: writer = csv.writer(f); writer.writerow(['ID', 'Name', 'Email', 'Password Hash', 'Created']); writer.writerows(cursor.fetchall())"
```

---

## 📊 Check Database Status

### Quick Check Script
Save this as `check_database.py` in `backend` folder:

```python
import sqlite3
import os

db_path = 'emexa.db'

if os.path.exists(db_path):
    print(f"✅ Database exists: {os.path.abspath(db_path)}")
    print(f"📦 Size: {os.path.getsize(db_path) / 1024:.2f} KB")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM students")
    student_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM teachers")
    teacher_count = cursor.fetchone()[0]
    
    print(f"👨‍🎓 Total Students: {student_count}")
    print(f"👨‍🏫 Total Teachers: {teacher_count}")
    
    conn.close()
else:
    print("❌ Database not found! Run the server first.")
```

Run with:
```bash
python check_database.py
```

---

## ⚠️ Important Notes

1. **Don't Delete emexa.db** - You'll lose all user data!
2. **Backup Regularly** - Copy the file before major changes
3. **Passwords Cannot Be Recovered** - They're encrypted (bcrypt)
4. **Database Created on First Run** - Run `python app.py` once
5. **One File = All Data** - Everything is in `emexa.db`

---

## 🚀 Summary for Your Team

**Tell your team:**

> "All registration and login data is saved in a single file called `emexa.db` in the `backend` folder. When someone registers as a Student, their info goes to the `students` table. When someone registers as a Teacher, it goes to the `teachers` table. Passwords are encrypted with bcrypt, so they're super secure. To view the data, use DB Browser for SQLite or run `python show_data.py`."

---

## 📞 Need Help?

- View data: `python show_data.py`
- Check database: `python check_database.py`
- Backup: `copy emexa.db emexa_backup.db`
- Reset: Delete `emexa.db` and restart server

---

**Last Updated:** November 3, 2025  
**Database Version:** SQLite 3  
**Location:** `C:\Users\nipun\Desktop\EMEXA\backend\emexa.db`
