import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function EditSongForm({ song, show, onHide, onSongUpdated }) {
  const [title, setTitle] = useState(song?.title || '');
  const [author, setAuthor] = useState(song?.author || '');
  const [genre, setGenre] = useState(song?.genre || 'rock');
  const [text, setText] = useState(song?.text || '');
  const [key, setKey] = useState(song?.key || 'C');
  const [chords, setChords] = useState(song?.chords || [{ chord: '', section: 'verse' }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setTitle(song?.title || '');
    setAuthor(song?.author || '');
    setGenre(song?.genre || 'rock');
    setText(song?.text || '');
    setKey(song?.key || 'C');
    setChords(song?.chords || [{ chord: '', section: 'verse' }]);
  }, [song]);

  const handleChordChange = (index, field, value) => {
    setChords(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
  };
  const handleAddChord = () => {
    setChords(prev => [...prev, { chord: '', section: 'verse' }]);
  };
  const handleRemoveChord = (index) => {
    setChords(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.put(`/song/${song.id}`,
        {
          title,
          author,
          genre,
          text,
          key,
          chords: chords.filter(c => c.chord.trim() !== '')
        }
      );
      if (onSongUpdated) onSongUpdated(res.data.data);
      onHide();
    } catch (err) {
      setError('Chyba při ukládání změn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit song</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required maxLength={20} />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input type="text" className="form-control" value={author} onChange={e => setAuthor(e.target.value)} required maxLength={20} />
          </div>
          <div className="mb-3">
            <label className="form-label">Genre</label>
            <select className="form-select" value={genre} onChange={e => setGenre(e.target.value)}>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="jazz">Jazz</option>
              <option value="blues">Blues</option>
              <option value="country">Country</option>
              <option value="metal">Metal</option>
              <option value="hiphop">HipHop</option>
              <option value="folk">Folk</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Key</label>
            <select className="form-select" value={key} onChange={e => setKey(e.target.value)}>
              <option value="C">C</option>
              <option value="C#">C#</option>
              <option value="Db">Db</option>
              <option value="D">D</option>
              <option value="D#">D#</option>
              <option value="Eb">Eb</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="F#">F#</option>
              <option value="Gb">Gb</option>
              <option value="G">G</option>
              <option value="G#">G#</option>
              <option value="Ab">Ab</option>
              <option value="A">A</option>
              <option value="A#">A#</option>
              <option value="Bb">Bb</option>
              <option value="B">B</option>
              <option value="Am">Am</option>
              <option value="A#m">A#m</option>
              <option value="Bbm">Bbm</option>
              <option value="Bm">Bm</option>
              <option value="Cm">Cm</option>
              <option value="C#m">C#m</option>
              <option value="Dbm">Dbm</option>
              <option value="Dm">Dm</option>
              <option value="D#m">D#m</option>
              <option value="Ebm">Ebm</option>
              <option value="Em">Em</option>
              <option value="Fm">Fm</option>
              <option value="F#m">F#m</option>
              <option value="Gbm">Gbm</option>
              <option value="Gm">Gm</option>
              <option value="G#m">G#m</option>
              <option value="Abm">Abm</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Text</label>
            <textarea className="form-control" value={text} onChange={e => setText(e.target.value)} rows={3} />
          </div>
          <div className="mb-3">
            <label className="form-label">Akordy</label>
            {chords.map((c, idx) => (
              <div className="d-flex mb-2" key={idx}>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Akord"
                  value={c.chord}
                  onChange={e => handleChordChange(idx, 'chord', e.target.value)}
                  style={{ maxWidth: 100 }}
                />
                <select
                  className="form-select me-2"
                  value={c.section}
                  onChange={e => handleChordChange(idx, 'section', e.target.value)}
                  style={{ maxWidth: 120 }}
                >
                  <option value="verse">Sloka</option>
                  <option value="chorus">Refrén</option>
                  <option value="bridge">Bridge</option>
                </select>
                <Button variant="outline-danger" onClick={() => handleRemoveChord(idx)} disabled={chords.length === 1}>-</Button>
              </div>
            ))}
            <Button variant="outline-primary" onClick={handleAddChord} size="sm">Přidat akord</Button>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? 'Ukládám...' : 'Uložit změny'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditSongForm;
