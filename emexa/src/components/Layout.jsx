import { useState } from 'react'
import '../styles/Layout.css'

export default function Layout({ children }) {
  const [activeMenu, setActiveMenu] = useState('user-management')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'quizzes', label: 'Quizzes', icon: '📚' },
    { id: 'wellness', label: 'Wellness Centre', icon: '🧘' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'user-management', label: 'User Management', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="app-layout">
      {/* Top Navigation Bar */}
      <header className="top-navbar">
        <div className="logo-section">
          <img src="/src/assets/EMEXA Logo.png" alt="EMEXA" className="app-logo" />
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
                <span className="nav-icon">{item.icon}</span>
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