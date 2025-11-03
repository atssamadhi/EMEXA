import { useState } from 'react'
import '../styles/Layout.css'

// Import images from assets
import Logo from '../assets/Logo 3.png'
import DashboardIcon from '../assets/Frame.png'
import QuizIcon from '../assets/Button.png'
import WellnessIcon from '../assets/Container (3).png'
import ProfileIcon from '../assets/Span.png'
import UserManagementIcon from '../assets/Frame (1).png'
import SettingsIcon from '../assets/react.svg'

export default function Layout({ children }) {
  const [activeMenu, setActiveMenu] = useState('user-management')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'quizzes', label: 'Quizzes', icon: QuizIcon },
    { id: 'wellness', label: 'Wellness Centre', icon: WellnessIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
    { id: 'user-management', label: 'User Management', icon: UserManagementIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ]

  return (
    <div className="app-layout">

      {/* Top Navigation Bar */}
      <header className="top-navbar">
        <div className="logo-section">
          <img src={Logo} alt="EMEXA" className="app-logo" />
        </div>

        <div className="nav-actions">
          <button className="icon-btn">
            <span className="bell-icon">🔔</span>
          </button>
          <button className="icon-btn">
            <span className="help-icon">❓</span>
          </button>
          <div className="user-profile">
            <span className="user-avatar">👤</span>
            <span className="user-name">Admin</span>
          </div>
        </div>
      </header>

      <div className="app-body">

        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => setActiveMenu(item.id)}
              >
                <img src={item.icon} alt="" className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <button className="logout-btn">
            <span className="logout-icon">🚪</span>
            <span>Log Out</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>

      </div>
    </div>
  )
}
