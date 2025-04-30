// frontend/src/components/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ username: '', role: 'user' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch users.');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const createUser = async () => {
    try {
      const response = await axios.post('/api/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '', role: 'user' });
      setMessage('User created successfully.');
      setError('');
    } catch (err) {
      setError('Failed to create user.');
      console.error(err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditFormData({ username: user.username, role: user.role });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(`/api/users/${editingUser}`, editFormData);
      setUsers(users.map(usr =>
        usr._id === editingUser ? response.data : usr
      ));
      setEditingUser(null);
      setMessage('User updated successfully.');
      setError('');
    } catch (err) {
      setError('Failed to update user.');
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        setUsers(users.filter(usr => usr._id !== id));
        setMessage('User deleted successfully.');
        setError('');
      } catch (err) {
        setError('Failed to delete user.');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <h3>Create New User</h3>
      <input name="username" placeholder="Username" value={newUser.username} onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange} />
      <select name="role" value={newUser.role} onChange={handleInputChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={createUser}>Create User</button>

      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                {editingUser === user._id ? (
                  <input name="username" value={editFormData.username} onChange={handleEditFormChange} />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUser === user._id ? (
                  <select name="role" value={editFormData.role} onChange={handleEditFormChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser === user._id ? (
                  <>
                    <button onClick={updateUser}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(user)}>Edit</button>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;