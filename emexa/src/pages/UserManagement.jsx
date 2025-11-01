import { useState, useEffect } from 'react'
import api from '../lib/api'
import '../styles/UserManagement.css'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState({
    admin: true,
    teacher: true,
    student: true
  })
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    is_active: true
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
  try {
    setLoading(true)
    setError('') // Clear previous errors
    
    const token = localStorage.getItem('token')
    
    if (!token) {
      setError('You need to login first to view users')
      setUsers([])
      setLoading(false)
      return
    }
    
    const response = await api.get('/users', token)
    setUsers(response.users || [])
    setError('')
  } catch (err) {
    console.error('Fetch users error:', err)
    setError(err.error || err.message || 'Failed to fetch users')
    setUsers([])
  } finally {
    setLoading(false)
  }
}

  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await api.post('/users', formData, token)
      setShowAddModal(false)
      resetForm()
      fetchUsers()
      alert('User added successfully!')
    } catch (err) {
      alert(err.error || 'Failed to add user')
    }
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await api.put(`/users/${selectedUser.id}`, formData, token)
      setShowEditModal(false)
      resetForm()
      fetchUsers()
      alert('User updated successfully!')
    } catch (err) {
      alert(err.error || 'Failed to update user')
    }
  }

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('token')
      await api.delete(`/users/${selectedUser.id}`, token)
      setShowDeleteModal(false)
      setSelectedUser(null)
      fetchUsers()
      alert('User deleted successfully!')
    } catch (err) {
      alert(err.error || 'Failed to delete user')
    }
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      password: ''
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'student',
      is_active: true
    })
    setSelectedUser(null)
  }

  const handleRoleToggle = (role) => {
    setSelectedRoles(prev => ({
      ...prev,
      [role]: !prev[role]
    }))
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRoles[user.role]
    return matchesSearch && matchesRole
  })

  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  return (
    <div className="user-management-page">
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p className="subtitle">Add, edit, and manage users in your quiz system</p>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="role-filter-container">
  <button 
    className="role-filter-btn"
    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
  >
    <span>All Roles</span>
    <span className="dropdown-arrow">{showRoleDropdown ? '▲' : '▼'}</span>
  </button>
  
  {showRoleDropdown && (
    <>
      <div className="dropdown-backdrop" onClick={() => setShowRoleDropdown(false)}></div>
      <div className="role-dropdown">
        <label className="role-option">
          <input
            type="checkbox"
            checked={selectedRoles.admin}
            onChange={() => handleRoleToggle('admin')}
          />
          <span>Admin</span>
        </label>
        <label className="role-option">
          <input
            type="checkbox"
            checked={selectedRoles.teacher}
            onChange={() => handleRoleToggle('teacher')}
          />
          <span>Teacher</span>
        </label>
        <label className="role-option">
          <input
            type="checkbox"
            checked={selectedRoles.student}
            onChange={() => handleRoleToggle('student')}
          />
          <span>Student</span>
        </label>
      </div>
    </>
  )}
</div>

        <button 
          className="add-user-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add User
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No users found</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => openDeleteModal(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New User</h2>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.value === 'true'})}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit User</h2>
            <form onSubmit={handleEditUser}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.value === 'true'})}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn update-btn">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete the user <strong>{selectedUser?.name}</strong>? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleDeleteUser}>
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}