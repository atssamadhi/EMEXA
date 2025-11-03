# ⚡ QUICK START - Run EMEXA in 3 Minutes

## 🚀 Fast Setup (3 Steps)

### STEP 1: Start Backend ⚙️
```bash
# Double-click this file:
backend\start_server.bat

# ✅ You should see: "Running on http://127.0.0.1:5000"
```

### STEP 2: Start Frontend 🌐
```bash
# Open terminal in emexa folder and run:
cd emexa
npm run dev

# ✅ You should see: "Local: http://localhost:5173/"
```

### STEP 3: Open in Browser 🌍
```
Open: http://localhost:5173/
(or whichever port shown in terminal)
```

---

## 📝 First-Time Use

### 1. Register a Student
1. Click **"Register"** link on login page
2. Fill form:
   ```
   Full Name: John Doe
   Email: john@student.com
   Password: password123
   Confirm: password123
   Account Type: [●] Student
   ```
3. Click **"Register"** button
4. ✅ **Success!** Data saved to database

### 2. View Your Saved Data
```bash
# Double-click this file:
backend\VIEW_STUDENTS_TEACHERS.bat

# ✅ See all students and teachers in formatted tables!
```

### 3. Login
1. Go back to login page
2. Use credentials:
   ```
   Email: john@student.com
   Password: password123
   ```
3. Click **"Log in"**
4. ✅ **Success!** You're logged in

---

## 🎯 What Each Part Does

| Component | What It Does | How to Access |
|-----------|--------------|---------------|
| **Backend** | Stores data in database | `backend\start_server.bat` |
| **Frontend** | Registration/Login pages | `npm run dev` → Browser |
| **Database** | SQLite file with 3 tables | `backend\instance\emexa.db` |
| **Data Viewer** | Shows saved students/teachers | `backend\VIEW_STUDENTS_TEACHERS.bat` |

---

## 📊 Data Flow Explained

```
You fill form → Click Register → Backend saves → View with .bat file
   (Browser)       (Button)      (students table)  (See your data!)
```

### Example:
1. **You type:** Name="John", Email="john@student.com", Type=Student
2. **Click Register** → Backend receives data
3. **Backend saves** to `students` table in database
4. **You run:** `VIEW_STUDENTS_TEACHERS.bat`
5. **You see:**
   ```
   ID | Full Name | Email              | Account Type
   ---+-----------+--------------------+-------------
   1  | John Doe  | john@student.com   | STUDENT
   ```

---

## 🔍 Where Data is Stored

### Student Registration:
- **Table:** `students`
- **File:** `backend/instance/emexa.db`
- **Fields:** id, full_name, email, password_hash, created_at

### Teacher Registration:
- **Table:** `teachers`
- **File:** `backend/instance/emexa.db`
- **Fields:** id, full_name, email, password_hash, created_at

### How to View:
```bash
# Method 1: Easiest!
Double-click: backend\VIEW_STUDENTS_TEACHERS.bat

# Method 2: Browser
Open: http://localhost:5000/auth/users

# Method 3: Python
cd backend
python view_students_teachers.py
```

---

## 🎨 Visual Guide

### Your Journey:
```
START
  |
  ├─> 1. Start Backend (port 5000)
  |        ↓
  ├─> 2. Start Frontend (port 5173)
  |        ↓
  ├─> 3. Open Browser
  |        ↓
  ├─> 4. Click "Register"
  |        ↓
  ├─> 5. Fill Form (Student or Teacher)
  |        ↓
  ├─> 6. Click "Register" Button
  |        ↓
  |    [Backend saves to database]
  |        ↓
  ├─> 7. See Success Message
  |        ↓
  └─> 8. Run VIEW_STUDENTS_TEACHERS.bat
           ↓
       SEE YOUR DATA! ✅
```

---

## 💡 Pro Tips

### See Real-Time Activity:
Watch the **backend terminal** while registering users!

Example output:
```
============================================================
📥 REGISTRATION REQUEST RECEIVED
============================================================
📝 Full Name: John Doe
📧 Email: john@student.com
🔒 Password: ******** (11 characters)
👤 Account Type: student
✅ Validation passed - Creating student account...
💾 Student saved to 'students' table!
   └─ Student ID: 1
   └─ Created at: 2025-11-03 14:30:00
============================================================
✅ STUDENT REGISTRATION SUCCESSFUL
============================================================
```

**You can see EXACTLY when data is saved!** 📊

---

## 🎯 Testing Checklist

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5173/5174/5175)
- [ ] Opened browser to localhost
- [ ] Clicked "Register" link
- [ ] Filled form with student data
- [ ] Clicked "Register" button
- [ ] Saw green success message
- [ ] Checked backend console (saw "Student saved")
- [ ] Ran VIEW_STUDENTS_TEACHERS.bat
- [ ] Saw student in the table ✅

---

## 🎉 That's It!

You now know:
- ✅ How to start the project (2 commands)
- ✅ How to register users (students/teachers)
- ✅ How to view saved data (3 methods)
- ✅ Where data is stored (database tables)

**Total time: 3 minutes!** 🚀

---

## 📁 Quick File Reference

| File | Purpose | How to Use |
|------|---------|------------|
| `backend\start_server.bat` | Start backend | Double-click |
| `backend\VIEW_STUDENTS_TEACHERS.bat` | View data | Double-click |
| `emexa\` folder | Frontend code | `npm run dev` |
| `backend\instance\emexa.db` | Database file | Stores all data |
| `HOW_TO_RUN.md` | Detailed guide | Read for details |

---

## 🆘 Quick Help

### Backend not starting?
```bash
cd backend
.\venv\Scripts\activate.ps1
python app.py
```

### Frontend not connecting?
- Make sure backend is running first!
- Check backend shows: "Running on http://127.0.0.1:5000"

### Can't see data?
- Register at least one user first!
- Then run: `backend\VIEW_STUDENTS_TEACHERS.bat`

---

**Ready? Let's go!** 🚀

1. Double-click `backend\start_server.bat`
2. Run `npm run dev` in emexa folder
3. Open browser → Register → View data!
