<<<<<<< HEAD
import Layout from './components/Layout'
import UserManagement from './pages/UserManagement'
=======
import { useEffect, useState } from 'react'
>>>>>>> Nippa
import './App.css'
import './pages/Forms.css'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

<<<<<<< HEAD
function App() {
  return (
    <Layout>
      <UserManagement />
    </Layout>
  )
}

export default App
=======
export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/login')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || '/login')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const renderRoute = () => {
    if (route === '/register') return <Register />
    if (route === '/forgot') return <ForgotPassword />
    // default to login
    return <Login />
  }

  return (
    <div className="app-root">
      {renderRoute()}
    </div>
  )
}
>>>>>>> Nippa
