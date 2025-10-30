import { useState } from 'react'
import logo from '../assets/EMEXA Logo.png'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if(!email || !password){
      setError('Invalid email or password')
      return
    }
    // placeholder: perform auth
    setError('')
    alert('Logged in (demo)')
  }

  return (
    <div className="auth-container">
      <div className="brand">
        <img src={logo} alt="EMEXA logo" className="brand-logo" />
      </div>
  <div className="auth-title">Log in to your account</div>
  <div className="auth-sub">Enter your details to access your account</div>

  <div className="auth-inner">
  <form onSubmit={onSubmit}>
        <div className={`field ${error && !email ? 'error' : ''}`}>
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" />
        </div>

        <div className={`field ${error && !password ? 'error' : ''}`}>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" />
        </div>

        {error && <div className="validation-error">{error}</div>}

        <div className="actions">
          <label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Remember me</label>
          <a className="link" href="#/forgot">Forgot your password?</a>
        </div>

        <button className="btn" type="submit">Log in</button>

        <div className="small-note">Don't have an account? <a className="link" href="#/register">Register</a></div>
      </form>
      </div>
    </div>
  )
}
