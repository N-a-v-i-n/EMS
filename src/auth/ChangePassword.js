import React, { useState } from 'react';
import axios from '../api/axios';

function ChangePassword() {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('accounts/change-password/', formData);
      setMessage('✅ Password changed successfully!');
      setFormData({ old_password: '', new_password: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to change password.');
    }
  };

  return (
    <div>
      <h3>Change Password</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="old_password"
          placeholder="Old Password"
          value={formData.old_password}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          value={formData.new_password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
