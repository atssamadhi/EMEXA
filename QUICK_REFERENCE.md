# 🎯 EMEXA - Quick Reference Card

## 🚀 START EVERYTHING

### Option 1: Start Both Together
```
Not recommended - use separate terminals
```

### Option 2: Start Separately (RECOMMENDED)
```
Terminal 1: START_BACKEND.bat
Terminal 2: START_FRONTEND.bat
```

---

## 🧪 TESTING COMMANDS

| What to Test | Command | What You'll See |
|--------------|---------|-----------------|
| **Backend Status** | `CHECK_BACKEND.bat` | ✓ Running or ✗ Not running |
| **All API Tests** | `backend\TEST_BACKEND.bat` | 6 tests with PASS/FAIL |
| **Database Contents** | `backend\VIEW_STUDENTS_TEACHERS.bat` | Students & Teachers tables |
| **Stop Everything** | `STOP_ALL.bat` | All processes stopped |

---

## 🔍 TESTING STEP BY STEP

### 1️⃣ Test Backend is Running
```bash
# Run this:
CHECK_BACKEND.bat

# Expected output:
[OK] Python process is running
[OK] Backend is responding on http://127.0.0.1:5000
```

### 2️⃣ Test All Backend APIs
```bash
# Run this:
cd backend
TEST_BACKEND.bat

# Expected output:
✓ PASS - Server is running
✓ PASS - Registration endpoint
✓ PASS - Login endpoint
✓ PASS - Forgot password endpoint
✓ PASS - Get users endpoint
✓ PASS - CORS allows all localhost ports

✓ ALL TESTS PASSED! Backend is working perfectly!
```

### 3️⃣ Test Frontend Registration
```bash
# 1. Start frontend:
START_FRONTEND.bat

# 2. Open browser to shown URL (e.g., http://localhost:5173)

# 3. Fill registration form:
Full Name: Test User
Email: test@example.com
Password: test12345
Confirm Password: test12345
Account Type: Student

# 4. Click "Register"

# Expected: Beautiful success message appears! ✓
```

### 4️⃣ Verify Data is Saved
```bash
# Run this:
cd backend
VIEW_STUDENTS_TEACHERS.bat

# Expected output:
STUDENTS TABLE (1 students)
+--------+------------+------------------+--------+
|   id   | full_name  |      email       |  type  |
+--------+------------+------------------+--------+
|   1    | Test User  | test@example.com | student|
+--------+------------+------------------+--------+
```

---

## ⚠️ COMMON ISSUES & FIXES

### Issue: "Cannot connect to server"
```bash
# Fix:
1. Run: CHECK_BACKEND.bat
2. If not running: START_BACKEND.bat
3. Wait 5 seconds
4. Refresh browser
```

### Issue: Frontend won't start
```bash
# Fix:
1. Run: STOP_ALL.bat
2. Wait 2 seconds
3. Run: START_FRONTEND.bat
```

### Issue: "Port already in use"
```bash
# This is NORMAL and FIXED!
# Frontend will use: 5173, 5174, 5175, 5176, etc.
# Backend accepts ALL localhost ports
# Just use whatever port Vite shows you
```

### Issue: No data in database after registration
```bash
# Fix:
1. Check backend terminal for errors
2. Run: backend\TEST_BACKEND.bat
3. If "Registration endpoint" PASSES, backend is OK
4. Try registration again in browser
5. Check: backend\VIEW_STUDENTS_TEACHERS.bat
```

---

## 📂 FILE LOCATIONS

### Main Files:
```
EMEXA/
├── START_BACKEND.bat         ← Start backend server
├── START_FRONTEND.bat        ← Start frontend server
├── STOP_ALL.bat             ← Stop everything
├── CHECK_BACKEND.bat        ← Check backend status
├── TESTING_GUIDE.md         ← Full documentation
└── backend/
    ├── TEST_BACKEND.bat         ← Test all APIs
    ├── test_backend.py          ← Testing script
    └── VIEW_STUDENTS_TEACHERS.bat ← View database
```

---

## 🎯 DAILY WORKFLOW

### Morning Start:
```
1. Run: START_BACKEND.bat
2. Wait for "Running on http://127.0.0.1:5000"
3. Run: START_FRONTEND.bat
4. Browser opens automatically
5. Start coding!
```

### Testing Changes:
```
1. Make changes to code
2. Save files
3. Frontend auto-reloads (Vite hot reload)
4. Test in browser
5. If changing backend: Stop & restart backend
```

### End of Day:
```
1. Run: STOP_ALL.bat
2. Done!
```

---

## ✅ SUCCESS INDICATORS

### Backend is Working When:
- ✅ CHECK_BACKEND.bat shows "Backend is responding"
- ✅ TEST_BACKEND.bat shows "ALL TESTS PASSED"
- ✅ Browser shows success messages on registration/login

### Frontend is Working When:
- ✅ Browser opens to login/register page
- ✅ Forms are visible and styled correctly
- ✅ Eye icons work on password fields
- ✅ Success messages show with animations

### Everything is Connected When:
- ✅ Can register new user
- ✅ See beautiful success message
- ✅ Can login with registered user
- ✅ VIEW_STUDENTS_TEACHERS.bat shows the user

---

## 🎨 FEATURES WORKING NOW

### ✓ Registration Page:
- Password visibility toggle (eye icon)
- 8-character minimum validation
- Email format validation
- Student/Teacher selection
- **Beautiful animated success message**
- Auto-redirect to login (3 seconds)

### ✓ Login Page:
- Password visibility toggle
- Email validation
- Remember me checkbox
- **Beautiful welcome back message**
- Auto-redirect to dashboard (2 seconds)

### ✓ Forgot Password:
- Email validation
- **Beautiful confirmation message**
- Auto-redirect to login (4 seconds)

### ✓ Backend:
- Accepts ALL localhost ports (CORS fixed!)
- Separate Student/Teacher tables
- JWT authentication
- Error handling
- Network detection

---

## 🚨 EMERGENCY FIXES

### Everything is broken!
```bash
1. STOP_ALL.bat
2. Wait 5 seconds
3. START_BACKEND.bat
4. Wait for "Running on http://127.0.0.1:5000"
5. START_FRONTEND.bat
6. Try again
```

### Backend won't start!
```bash
1. Check if Python installed: python --version
2. Check if venv exists: dir backend\venv
3. Reinstall dependencies if needed
4. Check port 5000 not in use: netstat -an | find "5000"
```

### Tests keep failing!
```bash
1. Make sure backend is running first
2. Run: CHECK_BACKEND.bat
3. If OK, run: backend\TEST_BACKEND.bat
4. Check which specific test fails
5. Check TESTING_GUIDE.md for that test
```

---

## 📞 HELP COMMANDS

### Check what's running:
```powershell
# Python processes:
Get-Process python -ErrorAction SilentlyContinue

# Node processes:
Get-Process node -ErrorAction SilentlyContinue

# Port 5000 (backend):
netstat -an | find "5000"

# Vite ports (frontend):
netstat -an | find "5173"
```

---

## 🎉 REMEMBER

1. ✅ Backend MUST be running before frontend
2. ✅ Backend accepts ANY localhost port now
3. ✅ Use batch files for easy start/stop
4. ✅ Run TEST_BACKEND.bat to verify everything
5. ✅ Check terminal outputs for error messages

**You've got this! 🚀**
