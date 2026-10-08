import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Playlist from './pages/Playlist.jsx';
import Navbar from './components/Navbar.jsx';
// CSS import remains in index.jsx

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('moodifyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle persistence and navigation
  useEffect(() => {
    if (user) {
      localStorage.setItem('moodifyUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      localStorage.removeItem('moodifyUser');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="App">
      {/* Prop Drilling: Pass user and setUser (for logout) to Navbar */}
      {user && <Navbar user={user} onLogout={() => setUser(null)} />}

      <Routes>
        <Route
          path="/"
          // Prop Drilling: Pass setUser to Login
          element={!user ? <Login setUser={setUser} /> : <Dashboard user={user} />}
        />
        <Route
          path="/dashboard"
          // Prop Drilling: Pass user to Dashboard
          element={user ? <Dashboard user={user} /> : <Login setUser={setUser} />}
        />
        <Route
          path="/playlist/:id"
          // Prop Drilling: Pass user to Playlist
          element={user ? <Playlist user={user} /> : <Login setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;