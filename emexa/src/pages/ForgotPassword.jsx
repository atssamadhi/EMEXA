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
    if(!email){
      setError('Please enter your email')
      return
    }
    setLoading(true)
    api.post('/auth/forgot-password', { email })
      .then(()=>{
        setSent(true)
        setTimeout(()=>setSent(false),3000)
      })
      .catch(err => setError(err.message || 'Failed to send reset link'))
      .finally(()=>setLoading(false))
  }

  return (
    <div className="auth-container">
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

      {sent && <div className="success-overlay">Your reset link has been sent successfully!</div>}
    </div>
  )
}
