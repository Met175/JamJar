import React, { useState } from 'react';
import AddChordForm from '../chords/AddChordForm';

function AddChordButton() {
  const [showChordForm, setShowChordForm] = useState(false);

  return (
    <>
      <button
        style={{ marginBottom: '10px',
        }}
        className="btn btn-dark"
        onClick={e => { e.preventDefault(); setShowChordForm(true); }}
      >
        Add Chord
      </button>
      <AddChordForm show={showChordForm} onHide={() => setShowChordForm(false)} />
     </>
  );
}

export default AddChordButton;
