import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function AddChordForm({ show, onHide, onChordAdded }) {
  const [chord, setChord] = useState('');
  const [section, setSection] = useState('verse');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await axios.post('/chords', {
        name: chord,
        section
      });
      setSuccess('Chord was successfully added!');
      setChord('');
      setSection('verse');
      if (onChordAdded) onChordAdded(res.data);
    } catch (err) {
      setError('Error adding chord.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Chord</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="mb-3">
            <label className="form-label">Chord Name</label>
            <input type="text" className="form-control" value={chord} onChange={e => setChord(e.target.value)} required maxLength={10} />
          </div>
          <div className="mb-3">
            <label className="form-label">Section</label>
            <select className="form-select" value={section} onChange={e => setSection(e.target.value)}>
              <option value="verse">Verse</option>
              <option value="chorus">Chorus</option>
              <option value="bridge">Bridge</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Add Chord'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChordForm;
