# 🎓 Complete Beginner's Guide - EMEXA

## 🚀 Part 1: How to Start Everything

### Option A: Super Easy Way (Recommended!)

#### Step 1: Start Backend
1. Open File Explorer
2. Go to: `C:\Users\nipun\Desktop\EMEXA\backend`
3. **Double-click:** `start_server.bat`
4. A black window opens - **DON'T CLOSE IT!**
5. You should see: "Running on http://127.0.0.1:5000"

#### Step 2: Start Frontend
1. Open another File Explorer window
2. Go to: `C:\Users\nipun\Desktop\EMEXA\emexa`
3. Right-click in the folder
4. Select "Open in Terminal" or "Open PowerShell here"
5. Type: `npm run dev`
6. Press Enter
7. You should see: "Local: http://localhost:5174/"

#### Step 3: Open in Browser
1. Open Chrome/Edge/Firefox
2. Go to: **http://localhost:5174**
3. You should see the login page!

✅ **Done! Everything is running!**

---

### Option B: Using VS Code (Developer Way)

#### Step 1: Open VS Code
1. Open VS Code
2. File → Open Folder
3. Select: `C:\Users\nipun\Desktop\EMEXA`

#### Step 2: Open Terminal
1. Press `` Ctrl+` `` (backtick key)
2. Or click: Terminal → New Terminal

#### Step 3: Start Backend
Type these commands one by one:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python app.py
```

**Keep this terminal open!**

#### Step 4: Start Frontend
1. Click the `+` button in terminal to open a new one
2. Type these commands:
```powershell
cd emexa
npm run dev
```

**Keep this terminal open too!**

#### Step 5: Open in Browser
1. Hold `Ctrl` and click the link: http://localhost:5174
2. Or manually go to that address in your browser

✅ **Both servers are running!**

---

## 👀 Part 2: How to See Your Data

### Method 1: The Super Easy Way! (Recommended)

#### After You Register a User:

**Step 1: View Users Using Batch File**
1. Go to: `C:\Users\nipun\Desktop\EMEXA\backend`
2. **Double-click:** `VIEW_USERS.bat`
3. A window will show all your users!

**Example output:**
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
│ Created: 2025-11-03 12:30:45                                         │
└────────────────────────────────────────────────────────────────────┘
```

---

### Method 2: See Users in Your Browser

1. Make sure both backend and frontend are running
2. Open browser
3. Go to: **http://localhost:5174/#/users**
4. You'll see a nice table with all users!

---

### Method 3: Watch Real-Time When Users Register

**Look at the backend terminal window:**

When someone fills the registration form and clicks "Register", you'll immediately see:

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
   └─ Created at: 2025-11-03 12:30:45.123456
🔑 JWT Token generated: eyJhbGc...
============================================================
✅ REGISTRATION SUCCESSFUL
============================================================
```

This happens **INSTANTLY** when you click Register!

---

## 🧪 Part 3: Complete Test - Let's Try It!

### Test 1: Register a New User

#### Step 1: Make Sure Servers Are Running
- Backend window should be open (black window or terminal showing Flask)
- Frontend should be running (terminal showing Vite)

#### Step 2: Open Registration Page
1. Browser: http://localhost:5174/#/register
2. You should see the green registration form

#### Step 3: Fill the Form
```
Full Name: Test User
Email: testuser@example.com
Password: testpass123
Confirm Password: testpass123
Account Type: Student (click the radio button)
```

#### Step 4: Click "Register" Button

#### Step 5: Watch What Happens!

**In the Browser:**
- Green message appears: "✅ Registration successful! Welcome Test User!"
- After 2 seconds, redirects to login page

**In the Backend Terminal:**
- You'll see the complete log with user details
- Shows User ID, creation time, everything!

**In Browser Console (F12):**
- Press F12 to open Developer Tools
- Click "Console" tab
- You'll see detailed logs

#### Step 6: Verify User Was Saved
**Option A:**
- Double-click: `backend/VIEW_USERS.bat`
- See "Test User" in the list!

**Option B:**
- Go to: http://localhost:5174/#/users
- See "Test User" in the table!

✅ **Your data is saved!**

---

### Test 2: Login with the User You Just Created

#### Step 1: Go to Login Page
- http://localhost:5174/#/login

#### Step 2: Enter Credentials
```
Email: testuser@example.com
Password: testpass123
```

#### Step 3: Click "Log in"

#### Step 4: Watch What Happens!
- Green message: "✅ Login successful! Welcome back Test User!"
- Backend terminal shows login logs
- Token is saved to your browser
- Redirects to home page

✅ **Login works!**

---

## 📍 Where Is My Data Stored?

### Database File Location:
```
C:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db
```

### This file contains:
- All registered users
- Their names, emails, encrypted passwords
- Account types (student/teacher)
- Creation dates

### Password Security:
Your password "testpass123" is NOT stored as plain text!
It's stored as: `$2b$12$xyz...` (encrypted with bcrypt)
**Nobody can see your original password, not even you!**

---

## 🎯 Quick Reference - Common Tasks

| What I Want to Do | How to Do It |
|-------------------|--------------|
| **Start backend** | Double-click `backend/start_server.bat` |
| **Start frontend** | Terminal: `cd emexa; npm run dev` |
| **View all users** | Double-click `backend/VIEW_USERS.bat` |
| **View users in browser** | Go to: http://localhost:5174/#/users |
| **Register new user** | Go to: http://localhost:5174/#/register |
| **Login** | Go to: http://localhost:5174/#/login |
| **Stop backend** | Close the backend window or press Ctrl+C |
| **Stop frontend** | Press Ctrl+C in the frontend terminal |

---

## ❓ Common Questions

### Q: How do I know if backend is running?
**A:** Open browser, go to http://localhost:5000
- If you see: `{"message": "EMEXA API is running", "version": "1.0.0"}`
- ✅ Backend is running!

### Q: How do I know if frontend is running?
**A:** Look at the terminal
- If you see: `Local: http://localhost:5174/`
- ✅ Frontend is running!

### Q: Where can I see the data I saved?
**A:** Three ways:
1. Double-click `VIEW_USERS.bat` in backend folder
2. Browser: http://localhost:5174/#/users
3. Watch the backend terminal in real-time

### Q: Is my password safe?
**A:** Yes! It's encrypted with bcrypt (industry standard)
- You enter: `testpass123`
- Stored as: `$2b$12$Lk3x9zF8qWr...` (60 characters of gibberish)
- Impossible to reverse!

### Q: Can I see the database file?
**A:** Yes! Location: `backend/instance/emexa.db`
- It's a binary file (can't open in Notepad)
- Use `VIEW_USERS.bat` to see contents
- Or download "DB Browser for SQLite" to view it

---

## 🎉 You're All Set!

### What You Now Know:
✅ How to start backend (double-click bat file)
✅ How to start frontend (npm run dev)
✅ How to register a user (fill form and click)
✅ How to view saved data (VIEW_USERS.bat or browser)
✅ How to see real-time logs (backend terminal)
✅ Where your data is stored (database file)
✅ How passwords are encrypted (bcrypt)

### Next Steps:
1. Practice registering a few users
2. Try logging in with them
3. View the users list
4. Watch the backend terminal logs
5. Check the browser console (F12)

**You're now a pro at running and monitoring EMEXA!** 🚀
