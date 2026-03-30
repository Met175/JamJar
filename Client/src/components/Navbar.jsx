import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddChordForm from '../chords/AddChordForm';

function Navbar() {
  const [showChordForm, setShowChordForm] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">JamJar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Songs
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/chords' ? 'active' : ''}`} 
                to="/chords"
              >
                Chords
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <AddChordForm show={showChordForm} onHide={() => setShowChordForm(false)} />
    </nav>
  );
}

export default Navbar;
