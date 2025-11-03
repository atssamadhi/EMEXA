# 🎓 Separate Student & Teacher Tables - Guide

## 📋 Overview

The backend has been updated to create **separate database tables** for Students and Teachers instead of storing them together in one User table.

## 🗄️ Database Structure

### **Before (Old)**
```
users table
├── id
├── full_name
├── email
├── password_hash
├── account_type (student/teacher)
└── created_at
```

### **After (New)**
```
students table
├── id
├── full_name
├── email
├── password_hash
├── student_id (optional)
├── grade_level (optional)
└── created_at

teachers table
├── id
├── full_name
├── email
├── password_hash
├── teacher_id (optional)
├── subject (optional)
├── department (optional)
└── created_at

users table (kept for compatibility)
├── id
├── full_name
├── email
├── password_hash
├── account_type
└── created_at
```

## ✨ What Changed?

### 1. **New Models Created**
   - `Student` model → Saves to `students` table
   - `Teacher` model → Saves to `teachers` table
   - `User` model → Still exists (kept for compatibility)

### 2. **Registration Flow**
   When a user registers:
   - **Selects "Student"** → Creates record in `students` table
   - **Selects "Teacher"** → Creates record in `teachers` table
   
### 3. **Login Flow**
   When a user logs in:
   - System checks `students` table first
   - If not found, checks `teachers` table
   - Returns appropriate user data with account type

### 4. **JWT Token**
   Token now includes both user ID and type:
   ```json
   {
     "id": 1,
     "type": "student"  // or "teacher"
   }
   ```

## 🚀 How to Use

### **Step 1: Start Backend**
```bash
# Option 1: Double-click
backend/start_server.bat

# Option 2: Command line
cd backend
python app.py
```

### **Step 2: Register Users**
1. Go to registration page
2. Select **Student** or **Teacher**
3. Fill in details
4. Submit

### **Step 3: View Saved Data**

#### **Method 1: New Viewer Script (Recommended)**
```bash
# Double-click this file:
backend/VIEW_STUDENTS_TEACHERS.bat
```

You'll see:
```
================================================================================
                        STUDENTS TABLE (2 students)
================================================================================
ID    | Full Name                | Email                         | Created At
--------------------------------------------------------------------------------
1     | John Doe                 | john@student.com              | 2025-11-03 14:30:00
2     | Jane Smith               | jane@student.com              | 2025-11-03 14:31:00
================================================================================

================================================================================
                        TEACHERS TABLE (1 teachers)
================================================================================
ID    | Full Name                | Email                         | Created At
--------------------------------------------------------------------------------
1     | Mr. Brown                | brown@teacher.com             | 2025-11-03 14:32:00
================================================================================

================================================================================
                                   SUMMARY
================================================================================
Students:  2
Teachers:  1
Total:     3
================================================================================
```

#### **Method 2: Browser API Endpoint**
Visit: `http://localhost:5000/auth/users`

Response:
```json
{
  "users": [...all users...],
  "students": [...student records...],
  "teachers": [...teacher records...],
  "total": 3,
  "studentCount": 2,
  "teacherCount": 1
}
```

#### **Method 3: Python Script**
```bash
cd backend
python view_students_teachers.py
```

## 📊 Backend Console Logs

When a student registers:
```
============================================================
📥 REGISTRATION REQUEST RECEIVED
============================================================
📝 Full Name: John Doe
📧 Email: john@student.com
🔒 Password: ******** (8 characters)
👤 Account Type: student
✅ Validation passed - Creating student account...
💾 Student saved to 'students' table!
   └─ Student ID: 1
   └─ Created at: 2025-11-03 14:30:00
🔑 JWT Token generated: eyJ0eXAiOiJKV1QiLCJhbGc...
============================================================
✅ STUDENT REGISTRATION SUCCESSFUL
============================================================
```

When a teacher registers:
```
============================================================
📥 REGISTRATION REQUEST RECEIVED
============================================================
📝 Full Name: Mr. Brown
📧 Email: brown@teacher.com
🔒 Password: ******** (10 characters)
👤 Account Type: teacher
✅ Validation passed - Creating teacher account...
💾 Teacher saved to 'teachers' table!
   └─ Teacher ID: 1
   └─ Created at: 2025-11-03 14:32:00
🔑 JWT Token generated: eyJ0eXAiOiJKV1QiLCJhbGc...
============================================================
✅ TEACHER REGISTRATION SUCCESSFUL
============================================================
```

## 🔍 Verify Changes

### 1. **Check Database Tables**
After starting the backend, you should see:
```
✅ Database tables created successfully!
   └─ users table
   └─ students table
   └─ teachers table
```

### 2. **Test Registration**
- Register as **Student** → Check students table
- Register as **Teacher** → Check teachers table

### 3. **Test Login**
- Login with student email → Returns student data
- Login with teacher email → Returns teacher data

## 📁 Files Modified

1. **backend/models/user.py**
   - Added `Student` class
   - Added `Teacher` class
   - Kept `User` class

2. **backend/models/__init__.py**
   - Exported `Student` and `Teacher`

3. **backend/routes/auth.py**
   - Updated registration to save to correct table
   - Updated login to check both tables
   - Updated `/users` endpoint to return both

4. **backend/app.py**
   - Imports all models
   - Creates all tables on startup

## 📝 New Files Created

1. **backend/view_students_teachers.py**
   - Python script to view data in formatted tables

2. **backend/VIEW_STUDENTS_TEACHERS.bat**
   - Windows batch file for easy viewing

## 🎯 Benefits

1. ✅ **Organized Data** - Students and teachers in separate tables
2. ✅ **Scalability** - Easy to add student/teacher-specific fields
3. ✅ **Security** - Better data isolation
4. ✅ **Flexibility** - Different features for each user type
5. ✅ **Easy Viewing** - Separate viewer scripts

## 🔄 Migration Notes

- **Old data in `users` table is NOT deleted**
- New registrations go to `students` or `teachers` tables
- Old users can still login (system checks all tables)
- You can manually migrate old data if needed

## 🎉 Quick Test

1. Start backend: `backend/start_server.bat`
2. Start frontend: `npm run dev` (in emexa folder)
3. Register a student at: `http://localhost:5174/#/register`
4. Register a teacher (change radio button)
5. View data: Double-click `backend/VIEW_STUDENTS_TEACHERS.bat`

## 📞 Need Help?

Check the backend console logs - they show exactly what's happening with registration and login!
