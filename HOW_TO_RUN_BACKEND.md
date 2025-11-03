# 🚀 How to Run Backend - Step by Step

## Method 1: Using PowerShell (Recommended)

### Step 1: Open PowerShell in VS Code
1. In VS Code, press `` Ctrl + ` `` (backtick key, next to number 1)
2. This opens a terminal at the bottom
3. Make sure you're in the EMEXA folder

### Step 2: Navigate to Backend Folder
```powershell
cd backend
```

### Step 3: Activate Virtual Environment
```powershell
.\venv\Scripts\Activate.ps1
```

**You should see:** `(venv)` appear at the start of your prompt
```
(venv) PS C:\Users\nipun\Desktop\EMEXA\backend>
```

### Step 4: Start the Backend Server
```powershell
python app.py
```

**You should see:**
```
 * Serving Flask app 'app'
 * Debug mode: off
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### ✅ Backend is Now Running!
- **URL:** http://127.0.0.1:5000 or http://localhost:5000
- **To Stop:** Press `Ctrl+C`

---

## Method 2: Using the Batch File (Easiest!)

### Step 1: Open File Explorer
1. Go to: `C:\Users\nipun\Desktop\EMEXA\backend`

### Step 2: Double-Click
2. Find file: `start_server.bat`
3. Double-click it
4. A black window will open showing the server running

### ✅ Backend is Running!
- To stop: Close the black window

---

## Method 3: Using VS Code Terminal (New Terminal)

### Step 1: Open New Terminal
1. In VS Code, click: `Terminal` → `New Terminal`
2. Or press: `Ctrl+Shift+\``

### Step 2: Run Commands One by One
```powershell
cd c:\Users\nipun\Desktop\EMEXA\backend
.\venv\Scripts\Activate.ps1
python app.py
```

---

## 🔍 How to Check if Backend is Running

### Method 1: Open in Browser
1. Open Chrome/Edge/Firefox
2. Go to: http://localhost:5000
3. **You should see:**
```json
{
  "message": "EMEXA API is running",
  "version": "1.0.0"
}
```

### Method 2: Use PowerShell Test
```powershell
# In a NEW terminal (don't close the backend terminal)
Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get
```

**You should see:**
```
message              version
-------              -------
EMEXA API is running 1.0.0
```

---

## ❌ Troubleshooting

### Problem 1: "Cannot be loaded because running scripts is disabled"
**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then try again.

### Problem 2: "python: command not found"
**Solution:**
Make sure you activated the virtual environment:
```powershell
.\venv\Scripts\Activate.ps1
```
You should see `(venv)` at the start.

### Problem 3: Port 5000 already in use
**Solution:**
1. Stop any running Python processes:
```powershell
Get-Process python | Stop-Process -Force
```
2. Try starting backend again

### Problem 4: "Module not found"
**Solution:**
Install requirements again:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

## 📝 Quick Reference

| Action | Command |
|--------|---------|
| Go to backend | `cd backend` |
| Activate venv | `.\venv\Scripts\Activate.ps1` |
| Start server | `python app.py` |
| Stop server | Press `Ctrl+C` |
| Check if running | Open http://localhost:5000 in browser |

---

## ✅ Next Steps

Once backend is running:
1. ✅ Go to: [How to View Saved Data](#how-to-view-saved-data)
2. ✅ Go to: [How to Test Registration](#testing-guide)

**Backend needs to be running for the frontend to work!**
