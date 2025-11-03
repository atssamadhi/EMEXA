import { useState } from 'react'
import logo from '../assets/EMEXA Logo.png'
import api from '../lib/api'

export default function ForgotPassword(){
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    
    setLoading(true)
    console.log('📤 Sending password reset request for:', email)
    
    api.post('/auth/forgot-password', { email })
      .then((res)=>{
        console.log('✅ Password reset response:', res)
        setSent(true)
        
        // Redirect after 4 seconds
        setTimeout(()=>{
          window.location.hash = '#/login'
        }, 4000)
      })
      .catch(err => {
        console.error('❌ Password reset failed:', err)
        
        // Handle different types of errors
        let errorMessage = 'Failed to send reset link. Please try again.'
        
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
      {!sent ? (
        <>
          <div className="brand">
            <img src={logo} alt="EMEXA logo" className="brand-logo" />
          </div>
          <div className="auth-title">Reset your password</div>
          <div className="auth-sub">Enter your email address and we'll send you a link to reset your password.</div>

          <div className="auth-inner">
            <form onSubmit={onSubmit}>
              <div className={`field ${error ? 'error' : ''}`}>
                <label>Email address</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" />
                {error && <div className="error-text">{error}</div>}
              </div>

              <button className="btn" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send reset link'}</button>

              <div style={{marginTop:12,textAlign:'center'}}><a className="link" href="#/login">Back to login</a></div>
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
            
            <h2 className="success-title">Your reset link has been sent successfully!</h2>
            
            <p className="success-subtitle">
              Check your email inbox for the password reset link.
              Redirecting to login page...
            </p>
          </div>
          
          <div style={{marginTop: '20px', textAlign: 'center'}}>
            <a className="link" href="#/login">Back to login</a>
          </div>
        </div>
      )}
    </div>
  )
}
