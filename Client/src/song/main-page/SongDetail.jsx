import React from 'react';

function SongDetail({ song, onClose, onEdit }) {
  if (!song) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{song.title} <span className="text-muted">({song.author})</span></h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Genre:</strong> {song.genre}</p>
            {song.text && <p><strong>Text:</strong><br />{song.text}</p>}
            {song.chords && song.chords.length > 0 && (
              <div>
                <strong>Chords:</strong>
                <ul>
                  {song.chords.map((ch, idx) => (
                    <li key={idx}>{ch.chord} <span className="text-muted">({ch.section})</span></li>
                  ))}
                </ul>
              </div>
            )}
            {song.rating && <p><strong>Rating:</strong> {song.rating}/5</p>}
            {song.key && <p><strong>Key:</strong> {song.key}</p>}
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onEdit}>
              Edit song
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetail;
