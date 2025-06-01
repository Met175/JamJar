import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddSongForm from './AddSongForm';
import DeleteSongButton from './DeleteSongButton';
import SongDetail from './SongDetail';
import EditSongForm from './EditSongForm';
import SongRating from './SongRating';

function MainPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  const fetchSongs = async (filters = {}) => {
    setLoading(true);
    try {
      const params = {};
      if (filters.genre) params.genre = filters.genre;
      if (filters.key) params.key = filters.key;
      
      const res = await axios.get('/song', { params });
      setSongs(res.data);
    } catch (err) {
      setError('Failed loading songs.');
      console.error('Error loading songs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs({ genre: selectedGenre, key: selectedKey });
  }, [selectedGenre, selectedKey]);

  const handleDeleteSong = async (id) => {
    try {
      await axios.delete(`/song/${id}`);
      setSongs(songs => songs.filter(song => song.id !== id));
    } catch (err) {
      alert('Failed to delete song.');
    }
  };

  const handleRating = async (songId, rating) => {
    try {
      const res = await axios.put(`/song/${songId}`, { rating });
      setSongs(songs => songs.map(s => s.id === songId ? { ...s, rating: res.data.data.rating } : s));
    } catch (err) {
      alert('Failed to rate song.');
    }
  };
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Songs list</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <select 
            className="form-select" 
            value={selectedGenre} 
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
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
        <div className="col-md-4">
          <select 
            className="form-select" 
            value={selectedKey} 
            onChange={(e) => setSelectedKey(e.target.value)}
          >
            <option value="">All Keys</option>
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
        <div className="col-md-4 text-end">
          <button className="btn btn-dark" onClick={() => setShowForm(true)}>
            Jam in
          </button>
        </div>
      </div>
      <AddSongForm show={showForm} onHide={() => setShowForm(false)} onSongAdded={song => setSongs(s => [...s, song])} />
      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && songs.length === 0 && (
        <div className="alert alert-info">No songs found matching your criteria.</div>
      )}
      <ul className="list-group">
        {songs.map(song => (
          <li
            key={song.id}
            className="list-group-item d-flex justify-content-between align-items-center song-list-item position-relative"
            onMouseEnter={() => setHoveredSong(song.id)}
            onMouseLeave={() => setHoveredSong(null)}
            onClick={(e) => {
              
              if (!e.target.closest('.delete-song-btn') && !e.target.classList.contains('note-symbol')) {
                setSelectedSong(song);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <div>
              <strong>{song.title}</strong> <span className="text-muted">({song.author})</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <SongRating
                rating={song.rating || 0}
                onRate={(rating) => handleRating(song.id, rating)}
              />
              <span className="badge bg-secondary">{song.genre}</span>
              <span className="badge bg-info">{song.key}</span>                
              <DeleteSongButton 
                songId={song.id} 
                songTitle={song.title}
                onDelete={handleDeleteSong} 
                visible={hoveredSong === song.id}
                onSuccess={() => setSelectedSong(null)}
              />
            </div>
          </li>
        ))}
      </ul>
      <SongDetail song={selectedSong} onClose={() => setSelectedSong(null)} onEdit={() => setEditModalOpen(true)} />
      <EditSongForm
        song={selectedSong}
        show={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        onSongUpdated={updatedSong => {
          setSongs(songs => songs.map(s => s.id === updatedSong.id ? updatedSong : s));
          setSelectedSong(updatedSong);
        }}
      />
    </div>
  );
}

export default MainPage;
