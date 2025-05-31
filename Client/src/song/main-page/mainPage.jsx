import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import AddSongForm from './AddSongForm';
import DeleteSongButton from './DeleteSongButton';
import SongDetail from './SongDetail';
import EditSongForm from './EditSongForm';

function MainPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    axios.get('/song')
      .then(res => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Nepodařilo se načíst písně.');
        setLoading(false);
        console.error('Chyba při načítání písní:', err);
      });
  }, []);

  const handleDeleteSong = async (id) => {
    try {
      await axios.delete(`/song/${id}`);
      setSongs(songs => songs.filter(song => song.id !== id));
    } catch (err) {
      alert('Chyba při mazání písně.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">Songs list</h1>
        <div className="d-flex justify-content-end">
          <button className="btn btn-dark mb-3" onClick={() => setShowForm(true)}>
            Jam in
          </button>
        </div>
        <AddSongForm show={showForm} onHide={() => setShowForm(false)} onSongAdded={song => setSongs(s => [...s, song])} />
        {loading && <div>Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <ul className="list-group">
          {songs.map(song => (
            <li
              key={song.id}
              className="list-group-item d-flex justify-content-between align-items-center song-list-item position-relative"
              onMouseEnter={() => setHoveredSong(song.id)}
              onMouseLeave={() => setHoveredSong(null)}
              onClick={() => setSelectedSong(song)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <strong>{song.title}</strong> <span className="text-muted">({song.author})</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="badge bg-secondary me-2">{song.genre}</span>
                <DeleteSongButton songId={song.id} onDelete={handleDeleteSong} visible={hoveredSong === song.id} />
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
    </>
  );
}

export default MainPage;
