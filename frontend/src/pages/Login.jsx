import React, { useState } from 'react';
import { loginUser } from '../api.jsx';
import './Login.css';

function Login({ setUser }) { // ACCEPTS setUser AS PROP
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email) {
      setError('Name and email are required');
      return;
    }
    try {
      const userData = await loginUser(name, email);
      setUser(userData); // CALLS setUser PROP
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h1>Moodify</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Enter your name and email to continue
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Enter Moodify
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;   