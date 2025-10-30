import { useState } from 'react'
import logo from '../assets/EMEXA Logo.png'

export default function Register(){
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [accountType, setAccountType] = useState('student')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if(!fullName) e.fullName = 'Full name is required'
    if(!email) e.email = 'Email is required'
    if(!password) e.password = 'Password is required'
    if(password && password.length < 6) e.password = 'Password must be at least 6 characters'
    if(password !== confirm) e.confirm = 'Please confirm your password'
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if(Object.keys(e).length === 0){
      alert('Registered (demo)')
    }
  }

  return (
    <div className="auth-container">
      <div className="brand">
        <img src={logo} alt="EMEXA logo" className="brand-logo" />
      </div>
  <div className="auth-title">Create your account</div>

  <div className="auth-inner">
  <form onSubmit={onSubmit}>
        <div className={`field ${errors.fullName ? 'error' : ''}`}>
          <label>Full Name</label>
          <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Enter your full name" />
          {errors.fullName && <div className="error-text">{errors.fullName}</div>}
        </div>

        <div className={`field ${errors.email ? 'error' : ''}`}>
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className={`field ${errors.password ? 'error' : ''}`}>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password" />
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>

        <div className={`field ${errors.confirm ? 'error' : ''}`}>
          <label>Confirm Password</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm your password" />
          {errors.confirm && <div className="error-text">{errors.confirm}</div>}
        </div>

        <div className="field">
          <label>Account Type</label>
          <div className="radio-row">
            <label><input type="radio" name="acct" checked={accountType==='student'} onChange={()=>setAccountType('student')} /> Student</label>
            <label><input type="radio" name="acct" checked={accountType==='teacher'} onChange={()=>setAccountType('teacher')} /> Teacher</label>
          </div>
        </div>

        <button className="btn" type="submit">Register</button>

        <div className="small-note">Already have an account? <a className="link" href="#/login">Log in</a></div>
      </form>
      </div>
    </div>
  )
}
