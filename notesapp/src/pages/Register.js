import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
      alert('User already exists');
      return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '50px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>

      <input
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        type="password"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button
        onClick={handleRegister}
        style={{ width: '100%', padding: '10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Register
      </button>

      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
