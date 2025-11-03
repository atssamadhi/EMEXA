# Frontend Explained - For Team Members

## 🎯 Purpose
This document explains EVERY file in the frontend (emexa folder) and how they work together.

---

## 📂 File Structure Overview

```
emexa/
├── src/
│   ├── main.jsx           # React app entry point
│   ├── App.jsx            # Main component with routing
│   ├── App.css            # App-specific styles
│   ├── index.css          # Global styles
│   ├── pages/
│   │   ├── Register.jsx   # Registration page
│   │   ├── Login.jsx      # Login page
│   │   ├── ForgotPassword.jsx  # Password recovery
│   │   └── Dashboard.jsx  # User dashboard
│   └── assets/            # Images, icons, etc.
├── public/                # Static files
├── index.html             # HTML template
├── package.json           # Node dependencies
└── vite.config.js         # Vite configuration
```

---

## 📄 File-by-File Explanation

### 1. `index.html` - HTML Template

**Purpose**: The single HTML file that loads the React app.

**Full Code**:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EMEXA</title>
  </head>
  <body>
    <!-- React app mounts here -->
    <div id="root"></div>
    
    <!-- This loads main.jsx which starts the React app -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Key Points**:
- `<div id="root"></div>`: React app renders inside this div
- `<script type="module" src="/src/main.jsx">`: Loads React
- This file rarely needs changes

---

### 2. `src/main.jsx` - React Entry Point

**Purpose**: Initializes and renders the React application.

**Full Code**:
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Global styles
import App from './App.jsx'  // Main app component

// Find the 'root' div from index.html
const rootElement = document.getElementById('root')

// Create React root and render app
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**What happens**:
1. Finds `<div id="root">` in HTML
2. Creates React root
3. Renders `<App />` component inside it
4. `<StrictMode>`: Helps catch bugs during development

**You rarely need to modify this file!**

---

### 3. `src/App.jsx` - Main Component & Router

**Purpose**: Sets up routing and defines which component shows for each URL.

**Full Code with Explanations**:
```javascript
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import page components
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    // HashRouter uses # in URLs: localhost:5173/#/register
    // Why? Works without server configuration
    <Router>
      <div className="App">
        {/* Routes define URL → Component mapping */}
        <Routes>
          {/* Default route: / shows Login */}
          <Route path="/" element={<Login />} />
          
          {/* /register shows Register component */}
          <Route path="/register" element={<Register />} />
          
          {/* /forgot-password shows ForgotPassword */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* /dashboard shows Dashboard (after login) */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
```

**Understanding Routing**:

| URL | Component Rendered | Purpose |
|-----|-------------------|---------|
| `/#/` | Login | Default page |
| `/#/register` | Register | Create account |
| `/#/login` | Login | Sign in |
| `/#/forgot-password` | ForgotPassword | Reset password |
| `/#/dashboard` | Dashboard | User home page |

**Hash Routing vs Browser Routing**:
```javascript
// HashRouter (we use this)
URL: http://localhost:5173/#/register
Pro: Works everywhere, no server config needed
Con: Has # in URL

// BrowserRouter (alternative)
URL: http://localhost:5173/register
Pro: Clean URLs
Con: Needs server configuration for production
```

**Adding New Route**:
```javascript
// 1. Import component
import Profile from './pages/Profile'

// 2. Add route
<Route path="/profile" element={<Profile />} />

// 3. Navigate to it
<Link to="/profile">Profile</Link>
// or
window.location.hash = '#/profile'
```

---

### 4. `src/pages/Register.jsx` - Registration Page

**Purpose**: Complete user registration with form validation, API calls, and success/error handling.

**Full Code with Detailed Explanations**:

```javascript
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // Form data state - stores all input values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "student"  // default to student
  })
  
  // UI state
  const [showPassword, setShowPassword] = useState(false)  // Password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')  // Error message
  const [isLoading, setIsLoading] = useState(false)  // Loading state
  const [showSuccess, setShowSuccess] = useState(false)  // Success screen
  
  // ============================================
  // EVENT HANDLERS
  // ============================================
  
  /**
   * Handle input changes - updates state when user types
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Update specific field in formData
    setFormData(prev => ({
      ...prev,  // Keep all other fields
      [name]: value  // Update changed field
    }))
    
    // Clear error when user starts typing
    if (error) setError('')
  }
  
  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault()  // Prevent page reload
    
    console.log('📤 Registration form submitted:', formData)
    
    // ============================================
    // CLIENT-SIDE VALIDATION
    // ============================================
    
    // Check all fields filled
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      console.log('❌ Validation failed: Missing fields')
      return
    }
    
    // Check password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      console.log('❌ Validation failed: Password too short')
      return
    }
    
    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      console.log('❌ Validation failed: Passwords don\'t match')
      return
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      console.log('❌ Validation failed: Invalid email')
      return
    }
    
    console.log('✅ Client-side validation passed')
    
    // ============================================
    // API CALL
    // ============================================
    
    setIsLoading(true)  // Show loading spinner
    setError('')  // Clear previous errors
    
    try {
      console.log('💡 Sending request to backend...')
      
      // Prepare data for backend
      const requestData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        accountType: formData.accountType
      }
      
      console.log('Request data:', requestData)
      
      // Make POST request to backend
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })
      
      console.log('Response status:', response.status)
      
      // Parse JSON response
      const data = await response.json()
      console.log('Response data:', data)
      
      // ============================================
      // HANDLE RESPONSE
      // ============================================
      
      if (response.ok) {
        // Success! (status 200-299)
        console.log('✅ Registration successful!')
        
        // Store token in localStorage (for future authenticated requests)
        if (data.token) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          console.log('Token saved to localStorage')
        }
        
        // Show success screen
        setShowSuccess(true)
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          window.location.hash = '#/login'
        }, 3000)
        
      } else {
        // Error response (status 400, 500, etc.)
        console.log('❌ Registration failed:', data.message)
        setError(data.message || 'Registration failed. Please try again.')
      }
      
    } catch (err) {
      // Network error or other exception
      console.error('💥 Error during registration:', err)
      setError('Cannot connect to server. Please check if backend is running.')
    } finally {
      setIsLoading(false)  // Hide loading spinner
    }
  }
  
  // ============================================
  // RENDER
  // ============================================
  
  // Success screen (shows after successful registration)
  if (showSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #f8fff9 0%, #ffffff 100%)',
          borderRadius: '20px',
          padding: '60px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center',
          maxWidth: '500px',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          {/* Animated Checkmark */}
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 30px',
            animation: 'checkmarkPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          }}>
            <svg viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="28" fill="#10b981" stroke="#059669" strokeWidth="2"/>
              <path d="M17 30 L26 39 L43 22" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2 style={{
            color: '#10b981',
            fontSize: '32px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>
            Registration Successful!
          </h2>
          
          <p style={{
            color: '#6b7280',
            fontSize: '18px',
            marginBottom: '30px'
          }}>
            Your account has been created successfully.
          </p>
          
          <div style={{
            background: '#f3f4f6',
            padding: '15px',
            borderRadius: '10px',
            color: '#4b5563',
            fontSize: '14px'
          }}>
            Redirecting to login page...
          </div>
        </div>
      </div>
    )
  }
  
  // Registration form
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join EMEXA today</p>
        
        <form onSubmit={handleSubmit}>
          {/* Account Type Selection */}
          <div className="account-type-selector">
            <button
              type="button"
              className={formData.accountType === "student" ? "active" : ""}
              onClick={() => setFormData(prev => ({...prev, accountType: "student"}))}
            >
              👨‍🎓 Student
            </button>
            <button
              type="button"
              className={formData.accountType === "teacher" ? "active" : ""}
              onClick={() => setFormData(prev => ({...prev, accountType: "teacher"}))}
            >
              👨‍🏫 Teacher
            </button>
          </div>
          
          {/* Full Name Input */}
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          
          {/* Email Input */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          
          {/* Password Input with Eye Icon */}
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min 8 characters)"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
          
          {/* Confirm Password Input with Eye Icon */}
          <div className="input-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🙈"}
            </button>
          </div>
          
          {/* Error Message */}
          {error && (
            <div style={{
              background: '#f8d7da',
              color: '#721c24',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '15px',
              border: '1px solid #f5c6cb',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid #fff',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                  marginRight: '8px'
                }}></span>
                Registering...
              </span>
            ) : 'Register'}
          </button>
        </form>
        
        {/* Link to Login */}
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes checkmarkPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Register
```

**Key Concepts**:

**1. React Hooks**:
```javascript
// useState - manages component state
const [value, setValue] = useState(initialValue)

// Example:
const [email, setEmail] = useState("")  // email = "", setEmail = function to update it

// Update state:
setEmail("new@email.com")  // email becomes "new@email.com"

// Why not just: let email = ""?
// - Component re-renders when state changes
// - UI updates automatically
```

**2. Form Handling**:
```javascript
// Controlled components - React controls the input value
<input
  value={formData.email}  // Value from state
  onChange={handleInputChange}  // Update state when user types
/>

// Flow:
// 1. User types "a"
// 2. onChange fires
// 3. handleInputChange updates state
// 4. Component re-renders
// 5. Input shows "a"
```

**3. Async/Await**:
```javascript
// Instead of:
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))

// We use:
try {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
} catch (err) {
  console.error(err)
}
```

**4. Conditional Rendering**:
```javascript
// Show different UI based on state
if (showSuccess) {
  return <SuccessScreen />  // Show this
}

return <RegistrationForm />  // Otherwise show this

// Or inline:
{error && <ErrorMessage />}  // Only shows if error exists
```

---

### 5. `src/App.css` - App Styles

**Purpose**: Styles for the entire application.

**Key Sections**:

```css
/* Container for auth pages */
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Card containing the form */
.auth-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
}

/* Input fields */
.input-group input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Submit button */
.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Account type selector buttons */
.account-type-selector button {
  flex: 1;
  padding: 12px;
  border: 2px solid #e5e7eb;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.account-type-selector button.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* Password toggle button */
.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}
```

**Customizing Styles**:
- Change colors: Update gradient values, border colors
- Modify spacing: Adjust padding, margin values
- Update effects: Change box-shadow, border-radius

---

### 6. `vite.config.js` - Vite Configuration

**Purpose**: Configures Vite development server and build process.

**Full Code**:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5173,           // FIXED PORT - do not auto-increment
    strictPort: true,     // Error if port 5173 is busy (prevents auto-change)
    host: true,           // Listen on all network interfaces
    open: false           // Don't auto-open browser
  }
})
```

**Why strictPort: true?**
```
Without strictPort:
- Port 5173 busy → Vite uses 5174
- Port 5174 busy → Vite uses 5175
- Each change breaks CORS (backend only allows 5173)

With strictPort: true:
- Port 5173 busy → Vite shows error
- Forces you to stop old server
- Keeps port consistent
```

---

### 7. `package.json` - Dependencies

**Purpose**: Lists all npm packages and scripts.

**Key Sections**:
```json
{
  "name": "emexa",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  
  "scripts": {
    "dev": "vite",                    // Start development server
    "build": "vite build",            // Build for production
    "preview": "vite preview"         // Preview production build
  },
  
  "dependencies": {
    "react": "^19.1.1",               // React library
    "react-dom": "^19.1.1",           // React DOM rendering
    "react-router-dom": "^7.1.1"      // Routing
  },
  
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",  // Vite React plugin
    "vite": "^7.1.14"                   // Build tool
  }
}
```

**Running Scripts**:
```powershell
npm run dev       # Start dev server
npm run build     # Create production build
npm run preview   # Test production build locally
```

---

## 🎨 Styling Guide

### Method 1: Inline Styles (in JSX)
```javascript
<div style={{
  background: 'red',
  padding: '20px',
  borderRadius: '10px'
}}>
  Content
</div>
```

### Method 2: CSS Classes (in .css file)
```javascript
// In JSX:
<div className="my-class">Content</div>

// In CSS:
.my-class {
  background: red;
  padding: 20px;
  border-radius: 10px;
}
```

### Method 3: CSS Modules (scoped styles)
```javascript
// Register.module.css
.container {
  background: red;
}

// Register.jsx
import styles from './Register.module.css'
<div className={styles.container}>Content</div>
```

---

## 🔄 Data Flow Example

**User Registration Flow**:

```
1. User types in form
   ↓
2. handleInputChange updates formData state
   ↓
3. Component re-renders with new value
   ↓
4. User clicks "Register"
   ↓
5. handleSubmit validates data
   ↓
6. fetch() sends POST to backend
   ↓
7. Backend processes request
   ↓
8. Backend sends response
   ↓
9. Frontend receives response
   ↓
10. Success: Show success screen + store token
    Error: Show error message
```

---

## 🐛 Common Frontend Issues

### Issue: "Cannot connect to server"
**Cause**: Backend not running or wrong URL
**Fix**:
```javascript
// Check URL matches backend
const response = await fetch('http://localhost:5000/auth/register', {
  // Make sure port is 5000 ^^^^^
```

### Issue: CORS errors in console
**Cause**: Backend CORS not allowing frontend port
**Fix**: Add frontend port to backend `app.py` CORS list

### Issue: Form not submitting
**Causes**:
1. Missing `e.preventDefault()`
2. Validation failing
3. Button disabled

**Debug**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  console.log('Form submitted!')  // Check if this logs
  console.log('Form data:', formData)  // Check data
  // ...
}
```

### Issue: State not updating
**Wrong**:
```javascript
formData.email = "new@email.com"  // ❌ Don't mutate state directly!
```

**Correct**:
```javascript
setFormData(prev => ({...prev, email: "new@email.com"}))  // ✅
```

---

## 📝 Making Changes

### Adding a New Input Field

**Example: Add Phone Number**

```javascript
// 1. Add to state
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phoneNumber: "",  // NEW
  password: "",
  confirmPassword: "",
  accountType: "student"
})

// 2. Add input field in JSX
<div className="input-group">
  <input
    type="tel"
    name="phoneNumber"
    placeholder="Phone Number"
    value={formData.phoneNumber}
    onChange={handleInputChange}
    disabled={isLoading}
  />
</div>

// 3. Include in API call
const requestData = {
  fullName: formData.fullName,
  email: formData.email,
  phoneNumber: formData.phoneNumber,  // NEW
  password: formData.password,
  accountType: formData.accountType
}

// 4. Update backend to accept phoneNumber
```

### Changing API Endpoint

```javascript
// Find this line:
const response = await fetch('http://localhost:5000/auth/register', {

// Change to:
const response = await fetch('http://localhost:5001/auth/register', {
//                                              ^^^^^ New port
```

### Adding Form Validation

```javascript
// Add validation before API call
if (formData.phoneNumber.length < 10) {
  setError('Phone number must be at least 10 digits')
  return
}
```

---

## 🧪 Testing Frontend

### Browser Console Testing
1. Open DevTools (F12)
2. Go to Console tab
3. Watch for log messages during registration
4. Check Network tab for API requests

### Manual Testing Checklist
- [ ] All fields validate correctly
- [ ] Error messages show for invalid input
- [ ] Success screen appears after registration
- [ ] Loading spinner shows during API call
- [ ] Password toggle works
- [ ] Form clears after successful submission
- [ ] Can switch between Student/Teacher

---

## 🚀 Starting the Frontend

```powershell
# Navigate to folder
cd emexa

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Expected output:
# ROLLDOWN-VITE v7.1.14  ready in 322 ms
# ➜  Local:   http://localhost:5173/
```

---

## 🎓 Learning Resources

- **React Docs**: https://react.dev/learn
- **React Router**: https://reactrouter.com/
- **Vite Guide**: https://vitejs.dev/guide/
- **MDN Web Docs**: https://developer.mozilla.org/

---

**Questions?** Check console logs, inspect network requests, ask team members!

**Last Updated**: November 3, 2025
