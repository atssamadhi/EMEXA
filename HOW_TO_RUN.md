# 🚀 EMEXA Project - Quick Start Guide# 🚀 How to Run EMEXA Project - Step by Step Guide



## ✅ Problem Fixed: Port Consistency## 📋 Complete Guide for Beginners



### What Was WrongFollow these steps exactly to run your EMEXA project and see how data is saved!

- Vite kept changing ports (5173→5174→5175→5184→5185) every time you ran it

- Each port change caused CORS errors---

- Backend couldn't connect to frontend

## STEP 1: Start the Backend Server 🖥️

### What's Fixed

- ✅ Vite now ALWAYS uses port **5173**### Option A: Easy Way (Double-Click)

- ✅ Backend always uses port **5000**1. Open File Explorer

- ✅ CORS configured for ports 5173-5185 (backup support)2. Navigate to: `C:\Users\nipun\Desktop\EMEXA\backend`

- ✅ No more port conflicts or connection errors3. **Double-click** on `start_server.bat`



---### Option B: Using Terminal

1. Open PowerShell or Terminal in VS Code

## 🎯 How to Run the Complete Project2. Run these commands:

   ```bash

### Option 1: Easy Way (One-Click Start)   cd C:\Users\nipun\Desktop\EMEXA\backend

   .\venv\Scripts\activate.ps1

**Double-click:** `START_PROJECT.bat`   python app.py

   ```

This will:

1. ✅ Kill any old processes### ✅ What You Should See:

2. ✅ Start Backend on port 5000```

3. ✅ Start Frontend on port 5173✅ Database tables created successfully!

4. ✅ Open browser automatically   └─ users table

   └─ students table

### Option 2: Manual Start   └─ teachers table

 * Serving Flask app 'app'

#### Step 1: Start Backend * Running on http://127.0.0.1:5000

```bashPress CTRL+C to quit

cd backend```

venv\Scripts\activate

python app.py**✅ Backend is now running on port 5000!** Keep this window open.

```

Keep this window open! Backend runs on **http://localhost:5000**---



#### Step 2: Start Frontend (New Terminal)## STEP 2: Start the Frontend 🌐

```bash

cd emexa1. Open **NEW** Terminal/PowerShell window (keep backend running)

npm run dev2. Navigate to frontend folder:

```   ```bash

Keep this window open! Frontend runs on **http://localhost:5173**   cd C:\Users\nipun\Desktop\EMEXA\emexa

   ```

---3. Run the frontend:

   ```bash

## 🛑 How to Stop Everything   npm run dev

   ```

**Double-click:** `STOP_PROJECT.bat`

### ✅ What You Should See:

---```

  ROLLDOWN-VITE v7.1.14  ready in 207 ms

## 📋 Port Configuration

  ➜  Local:   http://localhost:5173/

| Service  | Port | URL |  (or http://localhost:5174/ or http://localhost:5175/)

|----------|------|-----|```

| Backend  | 5000 | http://localhost:5000 |

| Frontend | 5173 | http://localhost:5173 |**✅ Frontend is now running!** Note the port number (5173, 5174, or 5175).



**These ports are now FIXED!** No more changing.---



---## STEP 3: Open the Application in Browser 🌍



## 🎉 Testing Registration1. Open your web browser (Chrome, Edge, Firefox)

2. Go to the URL shown in terminal (example):

1. Go to: http://localhost:5173/#/register   ```

2. Fill the form and click Register   http://localhost:5173/

3. You should see beautiful green success message!   ```

   or

---   ```

   http://localhost:5174/

**Created:** November 3, 2025     ```

**Status:** ✅ ALL ISSUES FIXED     or

**Next Step:** Double-click START_PROJECT.bat!   ```

   http://localhost:5175/
   ```

### ✅ What You Should See:
- **Login Page** will appear (this is the default page)

---

## STEP 4: Register Your First User 📝

Since you don't have an account yet, let's create one!

### 4.1 Go to Registration Page
- Click the **"Register"** link at the bottom of the login page
- OR go directly to: `http://localhost:5173/#/register` (replace 5173 with your port)

### 4.2 Fill the Registration Form - STUDENT EXAMPLE

**Register a Student:**
1. **Full Name:** Enter `John Doe`
2. **Email:** Enter `john@student.com`
3. **Password:** Enter `password123` (must be 8+ characters)
4. **Confirm Password:** Enter `password123` again
5. **Account Type:** Select **Student** (radio button)
6. Click **Register** button

### ✅ What Happens:
- ✅ Green success box appears: "Registration successful! Welcome John Doe!"
- ✅ Automatically redirects to login page after 2 seconds
- ✅ Data is saved to `students` table in database!

### 4.3 Check Backend Console

Look at your backend terminal window. You'll see:

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
🔑 JWT Token generated: eyJ0eXAiOiJKV1Qi...
============================================================
✅ STUDENT REGISTRATION SUCCESSFUL
============================================================
```

**🎉 Your data is now saved in the database!**

---

## STEP 5: Register a Teacher (Optional) 👨‍🏫

Let's register a teacher to see the difference!

1. Go back to registration page: `http://localhost:5173/#/register`
2. Fill the form:
   - **Full Name:** `Ms. Sarah Smith`
   - **Email:** `sarah@teacher.com`
   - **Password:** `teacher123`
   - **Confirm Password:** `teacher123`
   - **Account Type:** Select **Teacher** ← Important!
3. Click **Register**

### ✅ Backend Console Shows:
```
============================================================
✅ TEACHER REGISTRATION SUCCESSFUL
💾 Teacher saved to 'teachers' table!
============================================================
```

**🎉 Teacher data saved to separate table!**

---

## STEP 6: View Saved Data in Database 📊

Now let's see the data you just saved! You have **3 easy ways**:

### Method 1: VIEW_STUDENTS_TEACHERS.bat (EASIEST!) ⭐

1. Open File Explorer
2. Navigate to: `C:\Users\nipun\Desktop\EMEXA\backend`
3. **Double-click** on `VIEW_STUDENTS_TEACHERS.bat`

### ✅ What You'll See:
```
================================================================================
                        STUDENTS TABLE (1 students)
================================================================================
ID    | Full Name                | Email                         | Created At
--------------------------------------------------------------------------------
1     | John Doe                 | john@student.com              | 2025-11-03 14:30:00
================================================================================

================================================================================
                        TEACHERS TABLE (1 teachers)
================================================================================
ID    | Full Name                | Email                         | Created At
--------------------------------------------------------------------------------
1     | Ms. Sarah Smith          | sarah@teacher.com             | 2025-11-03 14:32:00
================================================================================

================================================================================
                                   SUMMARY
================================================================================
Students:  1
Teachers:  1
Total:     2
================================================================================
```

**🎉 You can see all saved data in formatted tables!**

### Method 2: Browser API (Alternative)

1. Open browser
2. Go to: `http://localhost:5000/auth/users`

### ✅ What You'll See:
```json
{
  "users": [
    {
      "id": 1,
      "fullName": "John Doe",
      "email": "john@student.com",
      "accountType": "student",
      "createdAt": "2025-11-03T14:30:00"
    },
    {
      "id": 1,
      "fullName": "Ms. Sarah Smith",
      "email": "sarah@teacher.com",
      "accountType": "teacher",
      "createdAt": "2025-11-03T14:32:00"
    }
  ],
  "total": 2,
  "studentCount": 1,
  "teacherCount": 1
}
```

### Method 3: Python Script (Advanced)

1. Open terminal in backend folder
2. Activate virtual environment:
   ```bash
   cd C:\Users\nipun\Desktop\EMEXA\backend
   .\venv\Scripts\activate.ps1
   ```
3. Run viewer script:
   ```bash
   python view_students_teachers.py
   ```

---

## STEP 7: Test Login 🔐

Now let's test logging in with the account you created!

1. Go to login page: `http://localhost:5173/#/login`
2. Enter credentials:
   - **Email:** `john@student.com`
   - **Password:** `password123`
3. Click **Log in**

### ✅ What Happens:
- ✅ Green success message: "Login successful! Welcome back John Doe!"
- ✅ Redirects to home page after 1.5 seconds

### Backend Console Shows:
```
📤 Attempting login for: john@student.com
✅ Login successful
👤 User: John Doe
🔑 Token: eyJ0eXAi...
```

---

## STEP 8: Test Password Visibility Toggle 👁️

Try clicking the eye icon in password fields to see your password!

1. Go to any page with password field (Login or Register)
2. Type a password
3. Click the **eye icon** on the right side
4. **Password becomes visible!**
5. Click again to hide it

---

## STEP 9: Test Forgot Password 🔑

1. Click **"Forgot your password?"** link on login page
2. Enter email: `john@student.com`
3. Click **Send Reset Link**

### ✅ What Happens:
- ✅ Green success message appears
- ✅ Backend console shows: `Password reset requested for: john@student.com`

**Note:** Email won't actually be sent (that feature needs to be implemented later), but the endpoint works!

---

## 📊 Quick Reference Table

| Action | What to Do | Where to Look |
|--------|-----------|---------------|
| **Start Backend** | Double-click `backend/start_server.bat` | Terminal shows "Running on http://127.0.0.1:5000" |
| **Start Frontend** | Run `npm run dev` in emexa folder | Browser at http://localhost:5173/ |
| **Register Student** | Fill form, select Student, submit | Backend console shows "Student saved to 'students' table!" |
| **Register Teacher** | Fill form, select Teacher, submit | Backend console shows "Teacher saved to 'teachers' table!" |
| **View Saved Data** | Double-click `backend/VIEW_STUDENTS_TEACHERS.bat` | See formatted table with all users |
| **Login** | Use registered email/password | Green success message, redirects to home |
| **See Real-Time Logs** | Watch backend terminal while using app | All actions logged with emojis |

---

## 🎯 Complete Test Flow (Start to Finish)

### Quick Test in 5 Minutes:

1. ✅ **Start backend:** Double-click `backend/start_server.bat`
2. ✅ **Start frontend:** Run `npm run dev` in emexa folder
3. ✅ **Open browser:** Go to http://localhost:5173/
4. ✅ **Click "Register"** (at bottom of login page)
5. ✅ **Fill form:**
   - Name: Test User
   - Email: test@student.com
   - Password: test1234
   - Confirm: test1234
   - Select: **Student**
6. ✅ **Click Register** → See green success message
7. ✅ **Check backend console** → See "Student saved to 'students' table!"
8. ✅ **View data:** Double-click `backend/VIEW_STUDENTS_TEACHERS.bat`
9. ✅ **See your user** in the Students table! 🎉

---

## 🎨 Visual Guide

### Your Workflow:
```
1. Start Backend (port 5000)
          ↓
2. Start Frontend (port 5173/5174/5175)
          ↓
3. Browser → Open localhost:5173
          ↓
4. Click "Register" link
          ↓
5. Fill form → Select Student/Teacher
          ↓
6. Click Register button
          ↓
7. Backend saves to students/teachers table
          ↓
8. Success message → Auto redirect to login
          ↓
9. View data → Double-click VIEW_STUDENTS_TEACHERS.bat
          ↓
10. See your saved data! ✅
```

---

## 🐛 Troubleshooting

### Problem: Backend won't start
**Solution:** Make sure virtual environment exists
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate.ps1
pip install -r requirements.txt
python app.py
```

### Problem: Frontend shows "Cannot connect to server"
**Solution:** Make sure backend is running on port 5000
- Check backend terminal - should show "Running on http://127.0.0.1:5000"

### Problem: Port already in use
**Solution:** Frontend will auto-select next available port (5173 → 5174 → 5175)
- Just use whichever port it shows

### Problem: Data not showing in viewer
**Solution:** Make sure you registered at least one user first!

---

## 🎉 Summary

**You now know how to:**
1. ✅ Start the backend and frontend servers
2. ✅ Register students and teachers
3. ✅ View saved data in the database (3 different ways!)
4. ✅ Login with registered accounts
5. ✅ See real-time logs in backend console
6. ✅ Test all features (password visibility, validation, etc.)

**Your data flow:**
```
Registration Form → Backend API → Database Tables → VIEW_STUDENTS_TEACHERS.bat
     (Frontend)      (Port 5000)    (students/teachers)        (View Data)
```

---

## 📞 Need More Help?

- **Backend logs:** Check the terminal running `python app.py` - shows everything!
- **Frontend errors:** Open browser console (F12) to see any errors
- **Database location:** `backend/instance/emexa.db` (SQLite file)

**Happy testing! 🚀**
