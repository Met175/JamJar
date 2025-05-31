import React, { useState } from 'react';
import AddChordForm from '../chords/AddChordForm';

function Navbar() {
  const [showChordForm, setShowChordForm] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">JamJar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Songs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Add Song</a>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link p-0" style={{color: 'inherit', textDecoration: 'none'}} onClick={e => { e.preventDefault(); setShowChordForm(true); }}>Add Chord</button>
            </li>
            {/* Další položky menu lze přidat zde */}
          </ul>
        </div>
      </div>
      <AddChordForm show={showChordForm} onHide={() => setShowChordForm(false)} />
    </nav>
  );
}

export default Navbar;
