# ⚠️ IMPORTANT: Database File Viewing Guide

## Why Does the `.db` File Show as Binary?

When you click on `emexa.db` in VS Code, you see this warning:

```
⚠️ The file is not displayed in the text editor because it is either binary 
   or uses an unsupported text encoding.
```

**This is NORMAL and EXPECTED!**

---

## 🔍 What is a `.db` File?

- **Type:** SQLite Database File
- **Format:** BINARY (not text)
- **Cannot be read:** As plain text
- **Must be accessed:** Using special tools or Python scripts

Think of it like trying to open a `.jpg` image in Notepad - it won't work!

---

## ✅ How to View Your Database Data

### Method 1: Use Our Python Script (EASIEST!)

```bash
cd C:\Users\nipun\Desktop\EMEXA\backend
python show_data.py
```

**Output:**
```
============================================================
  ALL REGISTERED USER DATA
============================================================

STUDENTS REGISTERED: 6
  ID: 1
  Name: abc
  Email: ab@gmil.com
  Registered: 2025-11-03 03:45:50

  ID: 2
  Name: ravi
  Email: ra@gmail.com
  Registered: 2025-11-03 04:40:53

  ... (and more)

TEACHERS REGISTERED: 1
  ID: 1
  Name: k
  Email: k@gmail.com
  Registered: 2025-11-03 05:10:45
```

---

### Method 2: Use DB Browser for SQLite (VISUAL TOOL)

1. **Download DB Browser:**
   - Visit: https://sqlitebrowser.org/
   - Download and install (FREE software)

2. **Open Your Database:**
   - Launch DB Browser for SQLite
   - Click "Open Database"
   - Navigate to: `C:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db`
   - Click "Browse Data" tab

3. **View Tables:**
   - Select `students` from dropdown
   - See all student data in a table
   - Select `teachers` to see teacher data

**This gives you a visual Excel-like interface!**

---

### Method 3: VS Code SQLite Extension

1. **Install Extension:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search: "SQLite Viewer"
   - Install "SQLite Viewer" by qwtel

2. **View Database:**
   - Right-click on `emexa.db`
   - Select "Open with SQLite Viewer"
   - Browse your data visually!

---

## 📂 IMPORTANT: Actual Database Location

Your data is **NOT** in `backend/emexa.db`!

**Actual location:**
```
C:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db
```

Flask creates the database in the `instance/` folder by default.

### Why Two Locations?

```
backend/
├── emexa.db              ← EMPTY (0 KB) - Created by mistake
└── instance/
    └── emexa.db          ← REAL DATABASE (36 KB) - Has all your data!
```

The script `show_data.py` now automatically finds the correct one!

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| **View all data** | `python show_data.py` |
| **Database location** | `backend/instance/emexa.db` |
| **Total Students** | 6 |
| **Total Teachers** | 1 |
| **File size** | 36 KB |

---

## 📊 Current Database Contents

**As of November 3, 2025:**

### Students (6 total):
1. abc - ab@gmil.com
2. ravi - ra@gmail.com
3. t - t@gmail.com
4. ama - a@gmail.com
5. v - v@gmail.com
6. l - l@gmail.com

### Teachers (1 total):
1. k - k@gmail.com

---

## ❌ Common Mistakes

### ❌ DON'T:
- Try to open `.db` files in VS Code text editor
- Try to edit `.db` files manually
- Expect to see readable text in `.db` files

### ✅ DO:
- Use `python show_data.py` to view data
- Use DB Browser for SQLite for visual viewing
- Use SQLite Viewer extension in VS Code

---

## 💡 For Your Team

**Tell your team:**

> "The `emexa.db` file is a binary database file - you can't read it like a text file. To see what's inside, run `python show_data.py` in the backend folder. The actual database is in `backend/instance/emexa.db` and currently has 6 students and 1 teacher registered!"

---

## 🔧 Troubleshooting

**Q: I see "The file is not displayed..." warning**  
A: This is normal! Database files are binary. Use `python show_data.py` instead.

**Q: show_data.py says "no such table"**  
A: Make sure the backend server has run at least once to create tables.

**Q: I see two emexa.db files**  
A: The real one is in `backend/instance/emexa.db` (36 KB). The other is empty.

**Q: Can I edit data directly in the file?**  
A: No! Use the web interface or write Python scripts to modify data.

---

**Last Updated:** November 3, 2025  
**Database Location:** `C:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db`  
**Database Size:** 36 KB  
**Total Users:** 7 (6 students + 1 teacher)
