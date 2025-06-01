import React, { useState } from 'react';
import DeleteConfirmDialog from './DeleteConfirmDialog';

function DeleteSongButton({ songId, onDelete, visible, songTitle, onSuccess }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(songId);
      setShowDialog(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Error deleting song.');
    }
  };

  if (!visible) return null;

  return (
    <>
      <button
        className="btn btn-sm btn-outline-danger delete-song-btn"
        title="Delete song"
        onClick={() => setShowDialog(true)}
        style={{ lineHeight: 1, padding: '0 8px', fontSize: '1.5rem', background: 'none', border: 'none', color: '#dc3545' }}
      >
        <span role="img" aria-label="delete song">×</span>
      </button>
      <DeleteConfirmDialog
        show={showDialog}
        onHide={() => setShowDialog(false)}
        onConfirm={handleDelete}
        songTitle={songTitle}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default DeleteSongButton;
