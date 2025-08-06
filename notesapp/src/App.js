import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import UsersList from './pages/UsersList'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('currentUser'));
    if (stored) setCurrentUser(stored);
  }, []);

  const login = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div>
      <h1>Welcome to Notes App</h1>
       <div>
    <nav style={{ padding: '10px', background: '#eee' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', margin: 0, padding: 0 }}>
        <li>
          <NavLink to="/home" style={{ textDecoration: 'none', color: 'black' }}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" style={{ textDecoration: 'none', color: 'black' }}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" style={{ textDecoration: 'none', color: 'black' }}>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" style={{ textDecoration: 'none', color: 'black' }}>
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
    <Routes>
      <Route path="/" element={currentUser ? <Dashboard user={currentUser} logout={logout} /> : <Navigate to="/home" />} />
      <Route path="/login" element={<Login login={login} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/users" element={<UsersList/>}/>
    </Routes>
    </div>
  );
};

export default App;
