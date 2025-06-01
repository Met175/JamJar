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
        setError('Nepodařilo se načíst akordy');
        setLoading(false);
      }
    };

    fetchChords();
  }, []);

  if (loading) return <div className="text-center mt-5">Načítám...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Knihovna akordů</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {chords.map((chord) => (
          <Col key={chord.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="text-center">{chord.chord}</Card.Title>
                {chord.section && (
                  <Card.Subtitle className="mb-2 text-muted text-center">
                    {chord.section === 'verse' && 'Sloka'}
                    {chord.section === 'chorus' && 'Refrén'}
                    {chord.section === 'bridge' && 'Bridge'}
                  </Card.Subtitle>
                )}
                <div className="text-center mb-3">
                  <ChordDiagram chord={chord.chord} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {chords.length === 0 && !loading && !error && (
        <div className="alert alert-info">Zatím nejsou přidány žádné akordy.</div>
      )}
    </Container>
  );
}

export default ChordList;