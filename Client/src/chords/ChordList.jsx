import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ChordDiagram from './ChordDiagram';

function ChordList() {
  const [chords, setChords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChords = async () => {
      try {
        const response = await axios.get('/chords');
        setChords(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chords:', err);
        setError('Failed to load chords');
        setLoading(false);
      }
    };

    fetchChords();
  }, []);

  const handleDeleteChord = async (chordId) => {
    try {
      await axios.delete(`/chords/${chordId}`);
      setChords(prevChords => prevChords.filter(chord => chord.id !== chordId));
    } catch (err) {
      console.error('Error deleting chord:', err);
      setError('Failed to delete chord');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Chord Library</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {chords.map((chord) => (
          <Col key={chord.id}>
            <Card className="h-100 position-relative">
              <button
                className="position-absolute btn-close"
                style={{
                  top: '10px',
                  right: '10px',
                  zIndex: 1,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: '#dc3545',
                }}
                onClick={() => handleDeleteChord(chord.id)}
                aria-label="Delete chord"
              >×</button>
              <Card.Body>
                <Card.Title className="text-center">{chord.chord}</Card.Title>
                <div className="text-center mb-3">
                  <ChordDiagram chord={chord.chord} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {chords.length === 0 && !loading && !error && (
        <div className="alert alert-info">No chords have been added yet.</div>
      )}
    </Container>
  );
}

export default ChordList;