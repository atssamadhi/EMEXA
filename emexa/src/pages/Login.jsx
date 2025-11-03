import { useState } from 'react'
import logo from '../assets/EMEXA Logo.png'
import api from '../lib/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if(!email.trim()){
      setError('Please enter your email address')
      return
    }
    if(!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    if(!password){
      setError('Please enter your password')
      return
    }
    
    setLoading(true)
    console.log('📤 Attempting login for:', email)
    
    api.post('/auth/login', { email, password })
      .then((res) => {
        console.log('✅ Login successful:', res)
        console.log('👤 User:', res.user)
        console.log('🔑 Token:', res.token)
        
        // Save token
        if(res.token){
          localStorage.setItem('token', res.token)
          if(remember) {
            localStorage.setItem('rememberMe', 'true')
          }
        }
        
        // Show beautiful success message
        setUserName(res.user.full_name)
        setLoggedIn(true)
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.hash = '#/'
        }, 2000)
      })
      .catch(err => {
        console.error('❌ Login failed:', err)
        
        // Handle different types of errors
        let errorMessage = 'Login failed. Please check your credentials.'
        
        if (err.isNetworkError) {
          errorMessage = 'Cannot connect to server. Please check if backend is running.'
        } else if (err.message) {
          errorMessage = err.message
        }
        
        setError(errorMessage)
      })
      .finally(()=>setLoading(false))
  }

  return (
    <div className="auth-container">
      {!loggedIn ? (
        <>
          <div className="brand">
            <img src={logo} alt="EMEXA logo" className="brand-logo" />
          </div>
          <div className="auth-title">Log in to your account</div>
          <div className="auth-sub">Enter your details to access your account</div>

          <div className="auth-inner">
            <form onSubmit={onSubmit}>
              <div className={`field`}>
                <label>Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" />
              </div>

              <div className={`field`}>
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={e=>setPassword(e.target.value)} 
                    placeholder="Enter your password"
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '20px',
                      color: '#888',
                      padding: '0',
                      outline: 'none',
                      lineHeight: '1',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#333'}
                    onMouseLeave={(e) => e.target.style.color = '#888'}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {error && <div className="error-text" style={{marginTop: '8px', marginBottom: '12px', textAlign: 'center'}}>{error}</div>}

              <div className="actions">
                <label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Remember me</label>
                <a className="link" href="#/forgot">Forgot your password?</a>
              </div>

              <button className="btn" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Log in'}</button>

              <div className="small-note">Don't have an account? <a className="link" href="#/register">Register</a></div>
            </form>
          </div>
        </>
      ) : (
        <div className="success-message-container">
          <div className="brand">
            <img src={logo} alt="EMEXA logo" className="brand-logo" />
          </div>
          
          <div className="success-card">
            <div className="success-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" fill="#155724" stroke="#155724" strokeWidth="2"/>
                <path d="M20 30L26 36L40 22" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="success-title">Login Successful!</h2>
            
            <p className="success-subtitle">
              Welcome back {userName}! You have successfully logged in.
              Redirecting to dashboard...
            </p>
          </div>
          
          <div style={{marginTop: '20px', textAlign: 'center'}}>
            <a className="link" href="#/">Go to dashboard</a>
          </div>
        </div>
      )}
    </div>
  )
}
