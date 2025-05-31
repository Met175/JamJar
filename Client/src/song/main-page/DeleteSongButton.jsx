import React from 'react';

function DeleteSongButton({ songId, onDelete, visible }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this song?')) return;
    try {
      await onDelete(songId);
    } catch (err) {
      alert('Error deleting song.');
    }
  };

  if (!visible) return null;

  return (
    <button
      className="btn btn-sm btn-outline-danger delete-song-btn"
      title="Delete song"
      onClick={handleDelete}
      style={{ lineHeight: 1, padding: '0 8px', fontSize: '1.3rem', background: 'none', border: 'none' }}
    >
      <span role="img" aria-label="delete song">&#119136;&#x0336;</span>
    </button>
  );
}

export default DeleteSongButton;
