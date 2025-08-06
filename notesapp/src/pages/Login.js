import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      login(user);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '50px', border: '1px solid #ccc', borderRadius: '9px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>

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
        onClick={handleLogin}
        style={{ width: '100%', padding: '10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Login
      </button>

      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
