# 🗺️ SIMPLE PROJECT MAP - FOR YOUR TEAM

## 📍 Where is Everything?

### The Simple Answer:
```
Your Computer
  → Desktop
    → EMEXA Folder
      → backend Folder
        → emexa.db  ← ALL YOUR DATA IS HERE! 🎯
```

---

## 🏢 Project Layout

```
C:\Users\nipun\Desktop\EMEXA\
│
├── 📁 backend\                 ← PYTHON CODE (Server)
│   │
│   ├── 🗄️ emexa.db            ← YOUR DATA FILE (Registration, Login)
│   │
│   ├── 📄 app.py               ← Main server file
│   ├── 📄 show_data.py         ← View registered users
│   ├── 📄 test_backend.py      ← Test server
│   │
│   ├── 📁 models\              ← Database tables
│   │   ├── student.py          ← Students table
│   │   └── teacher.py          ← Teachers table
│   │
│   └── 📁 routes\              ← API endpoints
│       └── auth.py             ← Register/Login/Forgot Password
│
└── 📁 emexa\                   ← REACT CODE (Website)
    │
    ├── 📄 index.html           ← Main HTML file
    ├── 📄 package.json         ← Dependencies list
    ├── 📄 vite.config.js       ← Frontend settings (Port 5173)
    │
    └── 📁 src\                 ← Source code
        ├── 📄 App.jsx          ← Main app component
        ├── 📄 main.jsx         ← Entry point
        │
        └── 📁 pages\           ← Website pages
            ├── Login.jsx       ← Login page
            ├── Register.jsx    ← Registration page
            ├── ForgotPassword.jsx
            └── Dashboard.jsx
```

---

## 🎯 What Does What?

### Backend (Server) - Port 5000
```
backend/
├── app.py          → Starts the server
├── emexa.db        → Stores all user data (Students & Teachers)
├── models/         → Defines database structure
└── routes/         → Handles requests (register, login, etc.)
```

**What it does:**
- Receives registration/login requests
- Saves data to `emexa.db`
- Encrypts passwords with bcrypt
- Sends back responses

### Frontend (Website) - Port 5173
```
emexa/src/
└── pages/
    ├── Register.jsx    → Registration form
    ├── Login.jsx       → Login form
    └── Dashboard.jsx   → Main page after login
```

**What it does:**
- Shows registration/login forms
- Sends user data to backend
- Displays success/error messages
- Handles navigation between pages

---

## 🔄 How Data Flows

### Registration Example:

```
1. USER fills form
   ├── Name: Nipun Fernando
   ├── Email: nipun@student.com
   ├── Password: mypassword123
   └── Type: Student
              ↓
2. FRONTEND (Register.jsx)
   ├── Validates form
   ├── Shows loading spinner
   └── Sends to backend
              ↓
3. BACKEND (routes/auth.py)
   ├── Receives data
   ├── Encrypts password
   ├── Checks if Student or Teacher
   └── Saves to database
              ↓
4. DATABASE (emexa.db)
   ├── Opens students table
   ├── Inserts new row
   └── Saves file
              ↓
5. BACKEND responds
   ├── Success message
   └── User token
              ↓
6. FRONTEND shows
   └── ✓ Registration Successful!
```

---

## 📊 Database Tables Inside emexa.db

### Students Table
```
┌────┬──────────────┬───────────────────┬──────────────┬────────────────┐
│ ID │ Full Name    │ Email             │ Password     │ Created        │
├────┼──────────────┼───────────────────┼──────────────┼────────────────┤
│ 1  │ Nipun        │ nipun@student.com │ [encrypted]  │ 2025-11-03     │
│ 2  │ Saman        │ saman@student.com │ [encrypted]  │ 2025-11-03     │
└────┴──────────────┴───────────────────┴──────────────┴────────────────┘
```

### Teachers Table
```
┌────┬──────────────┬───────────────────┬──────────────┬────────────────┐
│ ID │ Full Name    │ Email             │ Password     │ Created        │
├────┼──────────────┼───────────────────┼──────────────┼────────────────┤
│ 1  │ Ms. Silva    │ silva@teacher.com │ [encrypted]  │ 2025-11-03     │
└────┴──────────────┴───────────────────┴──────────────┴────────────────┘
```

---

## 🔐 Password Security

### Plain Text (What user types):
```
mypassword123
```

### Encrypted (What's saved in database):
```
$2b$12$KIXyZ9p7Q4N2RmJxYzVlZOGH8vQn3mF5pQr7sT9uVwXyZ...
```

**Why?**
- Even if someone steals `emexa.db`, they CAN'T see real passwords!
- Encryption is ONE-WAY (cannot be reversed)
- Uses bcrypt algorithm (industry standard)

---

## 🚀 How to Run

### Option 1: One-Click Start (Easiest!)
```
Double-click: START_PROJECT.bat
```

### Option 2: Manual Start
```
Terminal 1 (Backend):
cd C:\Users\nipun\Desktop\EMEXA\backend
python app.py

Terminal 2 (Frontend):
cd C:\Users\nipun\Desktop\EMEXA\emexa
npm run dev
```

---

## 🔍 How to See Registered Users

### Quick View:
```bash
cd C:\Users\nipun\Desktop\EMEXA\backend
python show_data.py
```

**Output:**
```
STUDENTS TABLE
------------------------------------------------------------
Total Students: 2

  ID: 1
  Name: Nipun Fernando
  Email: nipun@student.com
  Registered: 2025-11-03 10:30:45

  ID: 2
  Name: Saman Silva
  Email: saman@student.com
  Registered: 2025-11-03 11:15:22
```

---

## 📂 Important Files & What They Do

| File | What It Does |
|------|--------------|
| `backend/emexa.db` | **ALL DATA STORED HERE** |
| `backend/app.py` | Starts backend server |
| `backend/routes/auth.py` | Handles register/login |
| `emexa/src/pages/Register.jsx` | Registration form |
| `emexa/src/pages/Login.jsx` | Login form |
| `backend/show_data.py` | View registered users |
| `START_PROJECT.bat` | Start everything |
| `STOP_PROJECT.bat` | Stop everything |

---

## 🎓 For Your Team Members

### New Team Member Checklist:

1. **Understand where data is:**
   - Read: `WHERE_IS_DATA_SAVED.md`
   - Location: `backend/emexa.db`

2. **Learn to run project:**
   - Read: `HOW_TO_RUN.md`
   - Use: `START_PROJECT.bat`

3. **View registered users:**
   - Run: `python backend/show_data.py`

4. **Understand structure:**
   - Read: `PROJECT_STRUCTURE_GUIDE.md`
   - Check: This file!

5. **Know the features:**
   - Student/Teacher separate tables
   - Password encryption (bcrypt)
   - Email validation
   - Success animations

---

## 💡 Quick FAQs

**Q: Where is all the registration data saved?**  
A: In `C:\Users\nipun\Desktop\EMEXA\backend\emexa.db`

**Q: Can I see the passwords?**  
A: No! They're encrypted with bcrypt (one-way hash)

**Q: How do I view registered users?**  
A: Run `python backend/show_data.py`

**Q: Where do Student registrations go?**  
A: `students` table in `emexa.db`

**Q: Where do Teacher registrations go?**  
A: `teachers` table in `emexa.db`

**Q: How do I backup the data?**  
A: Copy the `emexa.db` file to another location

**Q: What if I delete emexa.db?**  
A: All user data will be LOST! Always backup first!

---

## 🎯 Summary

**Tell your team this:**

> "Our project has two parts: a **backend** (Python server) and a **frontend** (React website). When someone registers, the frontend sends their info to the backend. The backend encrypts the password and saves everything to a file called `emexa.db` in the `backend` folder. Students go in the `students` table, teachers go in the `teachers` table. To see who's registered, just run `python show_data.py` in the backend folder!"

---

## 📞 Need More Details?

Check these files:
- **WHERE_IS_DATA_SAVED.md** - Complete data storage guide
- **DATA_STORAGE_VISUAL_GUIDE.md** - Visual diagrams
- **COMPLETE_DOCUMENTATION_INDEX.md** - All documentation

---

**Created:** November 3, 2025  
**For:** EMEXA Project Team  
**Purpose:** Simple explanation of where data is saved and how project works
