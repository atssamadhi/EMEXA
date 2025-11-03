# Backend Explained - For Team Members

## 🎯 Purpose
This document explains EVERY file in the backend folder and how they work together.

---

## 📂 File Structure Overview

```
backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python package dependencies
├── venv/                  # Virtual environment (Python packages)
├── emexa.db              # SQLite database (auto-created)
├── models/
│   ├── __init__.py       # Makes 'models' a Python package
│   ├── user.py           # User model (legacy)
│   ├── student.py        # Student model
│   └── teacher.py        # Teacher model
└── routes/
    ├── __init__.py       # Makes 'routes' a Python package
    └── auth.py           # Authentication routes
```

---

## 📄 File-by-File Explanation

### 1. `app.py` - The Heart of the Backend

**Purpose**: Main entry point for the Flask application.

**What it does**:
1. Initializes Flask app
2. Configures CORS (allows frontend to connect)
3. Sets up database
4. Registers routes
5. Starts the development server

**Full Code with Explanations**:

```python
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from routes.auth import auth

# Create Flask application instance
app = Flask(__name__)

# Secret key for JWT token encryption
# In production, use environment variable
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Database configuration
# SQLite database will be created as 'emexa.db' in backend folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///emexa.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database with Flask app
db = SQLAlchemy(app)

# ⚠️ CRITICAL: CORS Configuration
# This list tells the backend which frontend URLs are allowed to connect
# Without this, you get "CORS policy" errors in browser
CORS(app, origins=[
    # Localhost addresses (IPv4 loopback)
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    # ... more ports for flexibility
    
    # 127.0.0.1 addresses (alternative localhost)
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    # ... more ports
])

# Import models AFTER db is initialized
# This prevents circular import issues
from models.user import User
from models.student import Student
from models.teacher import Teacher

# Register blueprints (routes)
# Blueprint is a way to organize routes into modules
app.register_blueprint(auth, url_prefix='/auth')

# Create database tables if they don't exist
with app.app_context():
    db.create_all()
    print("\nDatabase tables created successfully!")
    print("   - users table")
    print("   - students table")
    print("   - teachers table")

# Start the Flask development server
if __name__ == '__main__':
    print("\n>> Starting Flask server on http://127.0.0.1:5000")
    print(">> CORS enabled for localhost ports 5173-5183\n")
    
    # debug=True: Auto-reloads on code changes, shows detailed errors
    # host='127.0.0.1': Only accessible from this computer
    # port=5000: Listen on port 5000 (FIXED - matches CORS config)
    app.run(debug=True, host='127.0.0.1', port=5000)
```

**Key Concepts**:

**Flask Instance**: `app = Flask(__name__)`
- Creates the web application
- `__name__` helps Flask find resources

**Secret Key**: `app.config['SECRET_KEY']`
- Used to encrypt JWT tokens
- Should be random and secret in production
- Never commit real secret keys to git!

**Database URI**: `sqlite:///emexa.db`
- `sqlite://` = Use SQLite database
- `///emexa.db` = Database file location (3 slashes = relative path)
- Full path becomes: `backend/emexa.db`

**CORS Origins**: Explicit list of allowed URLs
- ❌ WRONG: `origins=is_localhost` (function - causes crash!)
- ✅ CORRECT: `origins=["http://localhost:5173", ...]` (list)

**Blueprint Registration**: `app.register_blueprint(auth, url_prefix='/auth')`
- Adds all routes from `auth.py`
- `url_prefix='/auth'` means routes become `/auth/register`, `/auth/login`, etc.

**db.create_all()**: 
- Checks if tables exist
- Creates them if they don't
- Safe to run every time (won't duplicate tables)

---

### 2. `requirements.txt` - Python Dependencies

**Purpose**: Lists all Python packages needed for the project.

**Content**:
```
Flask==3.0.0              # Web framework
Flask-CORS==4.0.0         # CORS support
Flask-SQLAlchemy==3.0.5   # Database ORM
bcrypt==4.0.1             # Password hashing
PyJWT==2.8.0              # JWT token creation/verification
```

**How to use**:
```powershell
# Install all packages
pip install -r requirements.txt

# Add new package
pip install package-name
pip freeze > requirements.txt  # Update file
```

**What each package does**:

- **Flask**: The web framework that handles HTTP requests/responses
- **Flask-CORS**: Allows frontend (different port) to connect to backend
- **Flask-SQLAlchemy**: Object-Relational Mapping (ORM) - write Python instead of SQL
- **bcrypt**: Securely hashes passwords (one-way encryption)
- **PyJWT**: Creates and verifies JSON Web Tokens for authentication

---

### 3. `models/student.py` - Student Database Model

**Purpose**: Defines the structure of the 'students' table and how to interact with it.

**Full Code with Explanations**:

```python
from app import db
from datetime import datetime
import bcrypt

class Student(db.Model):
    """
    Student model - represents students table in database
    Each instance = one row in the table
    """
    
    # Table name in database
    __tablename__ = 'students'
    
    # Column definitions
    # db.Column(type, constraints)
    
    id = db.Column(db.Integer, primary_key=True)
    # primary_key=True: Auto-increments, unique identifier
    
    fullName = db.Column(db.String(100), nullable=False)
    # String(100): Max 100 characters
    # nullable=False: Cannot be empty
    
    email = db.Column(db.String(100), unique=True, nullable=False)
    # unique=True: No two students can have same email
    
    password = db.Column(db.String(100), nullable=False)
    # Stores HASHED password, not plain text!
    
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    # default=datetime.utcnow: Auto-sets to current time when created
    # Note: datetime.utcnow (no parentheses - pass function reference)
    
    def set_password(self, password):
        """
        Hash the password before storing
        
        Args:
            password (str): Plain text password from user
            
        How it works:
            1. bcrypt.gensalt(): Creates random salt
            2. bcrypt.hashpw(): Hashes password + salt
            3. .decode('utf-8'): Converts bytes to string for storage
        """
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.password = hashed.decode('utf-8')
    
    def check_password(self, password):
        """
        Check if provided password matches stored hash
        
        Args:
            password (str): Plain text password to check
            
        Returns:
            bool: True if password matches, False otherwise
            
        How it works:
            bcrypt automatically uses the same salt from stored hash
        """
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password.encode('utf-8')
        )
    
    def to_dict(self):
        """
        Convert Student object to dictionary (for JSON responses)
        
        Returns:
            dict: Student data without sensitive info
        """
        return {
            'id': self.id,
            'fullName': self.fullName,
            'email': self.email,
            'createdAt': self.createdAt.isoformat() if self.createdAt else None
            # Note: Password is NOT included (security!)
        }
```

**Key Concepts**:

**ORM (Object-Relational Mapping)**:
```python
# Instead of writing SQL:
# CREATE TABLE students (id INTEGER PRIMARY KEY, fullName VARCHAR(100), ...);

# We write Python class:
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
```

**Password Hashing (bcrypt)**:
```python
# Plain text password (from user)
password = "mypassword123"

# Hashed version (stored in database)
# $2b$12$K9Xj5e.../abcd1234... (60 characters, unique every time)

# Why hash?
# - If database is stolen, attackers can't read passwords
# - Even with same password, hashes are different (due to salt)
# - Cannot reverse hash to get original password
```

**Usage Example**:
```python
# Create new student
student = Student(
    fullName="John Doe",
    email="john@example.com"
)
student.set_password("securepass123")

# Save to database
db.session.add(student)
db.session.commit()

# Later, check login
entered_password = "securepass123"
if student.check_password(entered_password):
    print("Login successful!")
```

---

### 4. `models/teacher.py` - Teacher Database Model

**Purpose**: Same as Student model, but for teachers table.

**Why separate tables?**
- Future flexibility (different fields for teachers vs students)
- Example: Teachers might have `subject`, `department` fields
- Students might have `grade`, `classSection` fields
- Easier to manage different user types

**Structure**: Identical to `student.py`
- Same columns: id, fullName, email, password, createdAt
- Same methods: set_password(), check_password(), to_dict()
- Only difference: `__tablename__ = 'teachers'`

---

### 5. `routes/auth.py` - Authentication Endpoints

**Purpose**: Handles all authentication-related API requests.

**Full Code with Explanations**:

```python
from flask import Blueprint, request, jsonify
from app import db
from models.student import Student
from models.teacher import Teacher
import jwt
import datetime
import re

# Create Blueprint (group of related routes)
# 'auth' = blueprint name
auth = Blueprint('auth', __name__)

# ============================================
# POST /auth/register - Create New Account
# ============================================
@auth.route('/register', methods=['POST'])
def register():
    """
    Register new student or teacher
    
    Expected JSON body:
    {
        "fullName": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "accountType": "student" or "teacher"
    }
    
    Returns:
        201: Success + JWT token
        400: Validation error
        500: Server error
    """
    
    try:
        # Get JSON data from request
        data = request.json
        
        # Extract fields
        full_name = data.get('fullName', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        account_type = data.get('accountType', 'student').lower()
        
        # Log request (for debugging)
        print("\n" + "="*60)
        print("REGISTRATION REQUEST RECEIVED")
        print("="*60)
        print(f"Full Name: {full_name}")
        print(f"Email: {email}")
        print(f"Password: {'*' * len(password)} ({len(password)} characters)")
        print(f"Account Type: {account_type}")
        
        # ============================================
        # VALIDATION
        # ============================================
        
        # Check required fields
        if not all([full_name, email, password]):
            return jsonify({
                'success': False,
                'message': 'All fields are required'
            }), 400
        
        # Validate email format
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400
        
        # Validate password length
        if len(password) < 8:
            return jsonify({
                'success': False,
                'message': 'Password must be at least 8 characters'
            }), 400
        
        print("Validation passed - Creating account...")
        
        # ============================================
        # CHECK IF EMAIL EXISTS
        # ============================================
        
        # Check in students table
        existing_student = Student.query.filter_by(email=email).first()
        if existing_student:
            return jsonify({
                'success': False,
                'message': 'Email already registered as Student'
            }), 400
        
        # Check in teachers table
        existing_teacher = Teacher.query.filter_by(email=email).first()
        if existing_teacher:
            return jsonify({
                'success': False,
                'message': 'Email already registered as Teacher'
            }), 400
        
        # ============================================
        # CREATE ACCOUNT (Student or Teacher)
        # ============================================
        
        if account_type == "student":
            # Create Student
            user = Student(
                fullName=full_name,
                email=email
            )
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            
            print(f"Student saved to 'students' table!")
            print(f"   Student ID: {user.id}")
            print(f"   Created at: {user.createdAt}")
            
        elif account_type == "teacher":
            # Create Teacher
            user = Teacher(
                fullName=full_name,
                email=email
            )
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            
            print(f"Teacher saved to 'teachers' table!")
            print(f"   Teacher ID: {user.id}")
            print(f"   Created at: {user.createdAt}")
        
        else:
            return jsonify({
                'success': False,
                'message': 'Invalid account type'
            }), 400
        
        # ============================================
        # CREATE JWT TOKEN
        # ============================================
        
        # Token payload (data stored in token)
        token_payload = {
            'id': user.id,
            'email': user.email,
            'type': account_type,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            # exp: Token expires after 24 hours
        }
        
        # Generate token
        token = jwt.encode(
            token_payload,
            'your-secret-key-here',  # Must match app.config['SECRET_KEY']
            algorithm='HS256'
        )
        
        print(f"JWT Token generated: {token[:50]}...")
        print("="*60)
        print(f"{account_type.upper()} REGISTRATION SUCCESSFUL")
        print("="*60 + "\n")
        
        # ============================================
        # SEND SUCCESS RESPONSE
        # ============================================
        
        return jsonify({
            'success': True,
            'message': f'{account_type.capitalize()} account created successfully!',
            'token': token,
            'user': user.to_dict()
        }), 201  # 201 = Created
        
    except Exception as e:
        # Catch any unexpected errors
        print(f"\nERROR during registration: {str(e)}\n")
        return jsonify({
            'success': False,
            'message': 'Internal server error'
        }), 500


# ============================================
# POST /auth/login - User Login
# ============================================
@auth.route('/login', methods=['POST'])
def login():
    """
    Login for students or teachers
    
    Expected JSON:
    {
        "email": "john@example.com",
        "password": "password123"
    }
    
    Returns:
        200: Success + JWT token
        401: Invalid credentials
    """
    
    try:
        data = request.json
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        print(f"\nLOGIN ATTEMPT: {email}")
        
        # Check Student table first
        user = Student.query.filter_by(email=email).first()
        account_type = 'student'
        
        # If not in Student, check Teacher table
        if not user:
            user = Teacher.query.filter_by(email=email).first()
            account_type = 'teacher'
        
        # User not found in either table
        if not user:
            print(f"LOGIN FAILED: Email not found")
            return jsonify({
                'success': False,
                'message': 'Invalid email or password'
            }), 401  # 401 = Unauthorized
        
        # Check password
        if not user.check_password(password):
            print(f"LOGIN FAILED: Incorrect password")
            return jsonify({
                'success': False,
                'message': 'Invalid email or password'
            }), 401
        
        # Login successful - create token
        token_payload = {
            'id': user.id,
            'email': user.email,
            'type': account_type,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        
        token = jwt.encode(
            token_payload,
            'your-secret-key-here',
            algorithm='HS256'
        )
        
        print(f"LOGIN SUCCESS: {account_type} - {email}")
        
        return jsonify({
            'success': True,
            'message': 'Login successful!',
            'token': token,
            'user': user.to_dict(),
            'accountType': account_type
        }), 200
        
    except Exception as e:
        print(f"LOGIN ERROR: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Internal server error'
        }), 500


# ============================================
# POST /auth/forgot-password - Password Recovery
# ============================================
@auth.route('/forgot-password', methods=['POST'])
def forgot_password():
    """
    Send password reset email
    (Currently just checks if email exists)
    
    TODO: Implement email sending
    """
    
    try:
        data = request.json
        email = data.get('email', '').strip().lower()
        
        # Check if email exists in either table
        student = Student.query.filter_by(email=email).first()
        teacher = Teacher.query.filter_by(email=email).first()
        
        if not student and not teacher:
            return jsonify({
                'success': False,
                'message': 'Email not found'
            }), 404
        
        # TODO: Generate reset token
        # TODO: Send email with reset link
        
        return jsonify({
            'success': True,
            'message': 'Password reset instructions sent to your email'
        }), 200
        
    except Exception as e:
        print(f"FORGOT PASSWORD ERROR: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Internal server error'
        }), 500
```

**Key Concepts**:

**HTTP Methods**:
- `GET`: Retrieve data (not used here)
- `POST`: Send data / Create resource (used for register, login)
- `PUT`: Update resource
- `DELETE`: Delete resource

**HTTP Status Codes**:
- `200`: OK (success)
- `201`: Created (successfully created new resource)
- `400`: Bad Request (validation error)
- `401`: Unauthorized (wrong credentials)
- `404`: Not Found
- `500`: Internal Server Error

**Request Flow**:
```
Frontend                    Backend
   |                           |
   |  POST /auth/register      |
   |  {email, password, ...}   |
   |-------------------------->|
   |                           | 1. Extract data
   |                           | 2. Validate
   |                           | 3. Check duplicates
   |                           | 4. Create user
   |                           | 5. Generate token
   |                           |
   |  {success, token, user}   |
   |<--------------------------|
   |                           |
```

---

## 🔍 Database Operations Explained

### Create (Insert)
```python
# Create new instance
student = Student(fullName="John", email="john@email.com")
student.set_password("pass123")

# Add to session (staging area)
db.session.add(student)

# Commit to database (save permanently)
db.session.commit()

# Auto-generated ID is now available
print(student.id)  # Example: 1
```

### Read (Query)
```python
# Get by primary key
student = Student.query.get(1)

# Get first match
student = Student.query.filter_by(email="john@email.com").first()

# Get all students
all_students = Student.query.all()

# Count
count = Student.query.count()
```

### Update
```python
# Find user
student = Student.query.filter_by(email="john@email.com").first()

# Modify
student.fullName = "John Updated"

# Save
db.session.commit()
```

### Delete
```python
# Find user
student = Student.query.filter_by(email="john@email.com").first()

# Delete
db.session.delete(student)
db.session.commit()
```

---

## 🔐 Security Best Practices

### 1. Never Store Plain Text Passwords
```python
❌ WRONG:
student.password = "mypassword123"

✅ CORRECT:
student.set_password("mypassword123")  # Hashes before storing
```

### 2. Use Environment Variables for Secrets
```python
❌ WRONG (in code):
app.config['SECRET_KEY'] = 'my-secret-key-123'

✅ CORRECT (in production):
import os
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
```

### 3. Validate All Input
```python
# Check data types, formats, lengths
if not re.match(email_regex, email):
    return error_response()
```

### 4. Don't Return Sensitive Data
```python
❌ WRONG:
return jsonify(user.__dict__)  # Includes password hash!

✅ CORRECT:
return jsonify(user.to_dict())  # Excludes password
```

---

## 🧪 Testing the Backend

### Manual Testing with PowerShell

**Test Registration**:
```powershell
$body = @{
    fullName = "Test User"
    email = "test@example.com"
    password = "testpass123"
    accountType = "student"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/auth/register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**Test Login**:
```powershell
$body = @{
    email = "test@example.com"
    password = "testpass123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/auth/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Automated Testing Script

The project includes `backend/test_backend.py`:
```powershell
cd backend
python test_backend.py
```

Tests:
1. ✅ Server is running
2. ✅ Student registration works
3. ✅ Teacher registration works
4. ✅ Login works
5. ✅ Duplicate email rejected
6. ✅ CORS headers present

---

## 📊 Database Schema

### Students Table
```
+------------+-------------+------+-----+---------+
| Field      | Type        | Null | Key | Default |
+------------+-------------+------+-----+---------+
| id         | INTEGER     | NO   | PRI | NULL    |
| fullName   | VARCHAR(100)| NO   |     | NULL    |
| email      | VARCHAR(100)| NO   | UNI | NULL    |
| password   | VARCHAR(100)| NO   |     | NULL    |
| createdAt  | DATETIME    | YES  |     | NOW()   |
+------------+-------------+------+-----+---------+
```

### Teachers Table
Same structure as Students, separate table.

---

## 🚀 Starting the Backend

### Method 1: Manual Start
```powershell
cd backend
.\venv\Scripts\activate.ps1
python app.py
```

### Method 2: Use Batch File
```powershell
cd backend
.\START_BACKEND_FIXED.bat
```

### Expected Output
```
Database tables created successfully!
   - users table
   - students table
   - teachers table

>> Starting Flask server on http://127.0.0.1:5000
>> CORS enabled for localhost ports 5173-5183

 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

---

## 🐛 Common Backend Errors

### Error: "ModuleNotFoundError: No module named 'flask'"
**Cause**: Virtual environment not activated or packages not installed
**Fix**:
```powershell
.\venv\Scripts\activate.ps1
pip install -r requirements.txt
```

### Error: "Address already in use"
**Cause**: Port 5000 occupied by another process
**Fix**:
```powershell
# Stop all Python processes
Stop-Process -Name python -Force

# Or change port in app.py:
app.run(debug=True, port=5001)
```

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Cause**: Frontend port not in CORS allowed list
**Fix**: Add frontend port to `CORS(app, origins=[...])` list

### Error: "sqlalchemy.exc.OperationalError: no such column"
**Cause**: Database schema doesn't match model
**Fix**:
```powershell
# Delete database and recreate
Remove-Item emexa.db
python app.py  # Creates fresh database
```

---

## 📝 Making Changes

### Adding a New Field

**Example: Add phone number to Student**

**Step 1**: Update model
```python
# models/student.py
phoneNumber = db.Column(db.String(20), nullable=True)
```

**Step 2**: Delete old database
```powershell
Remove-Item backend/emexa.db
```

**Step 3**: Restart backend (creates new table)
```powershell
python app.py
```

### Adding a New Endpoint

**Step 1**: Create function in `routes/auth.py`
```python
@auth.route('/check-email', methods=['POST'])
def check_email():
    email = request.json.get('email')
    exists = Student.query.filter_by(email=email).first() is not None
    return jsonify({'exists': exists})
```

**Step 2**: Use from frontend
```javascript
const response = await fetch('http://localhost:5000/auth/check-email', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: 'test@email.com'})
});
```

---

## 🎓 Learning Path

1. **Start Here**: Understand `app.py` - how Flask initializes
2. **Models**: Learn `student.py` - database structure
3. **Routes**: Study `auth.py` - API endpoints
4. **Practice**: Make small changes, test them
5. **Advanced**: Add new features (email verification, password reset)

---

**Questions?** Ask team members or check Flask documentation: https://flask.palletsprojects.com/

**Last Updated**: November 3, 2025
