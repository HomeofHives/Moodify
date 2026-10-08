import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) { // ACCEPTS user and onLogout AS PROPS

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-brand">
                Moodify
            </Link>
            <div className="navbar-user">
                <span>{user?.name}</span>
                <button onClick={onLogout} className="btn btn-secondary btn-sm">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;