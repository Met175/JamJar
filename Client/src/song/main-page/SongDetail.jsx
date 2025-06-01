import React from 'react';
import SongRating from './SongRating';

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
            <div><strong>Genre:</strong> {song.genre}</div>
            <div>
              <strong>Rating:</strong>{' '}
              <SongRating rating={song.rating || 0} readonly />
            </div>
            {song.text && <div><strong>Text:</strong><br />{song.text}</div>}
            {song.chords && song.chords.length > 0 && (
              <div>
                <strong>Chords:</strong>
                <div className="mt-2">
                  {song.chords.some(ch => ch.section === 'verse') && (
                    <div className="mb-2">
                      <div className="text-muted mb-1">Verse:</div>
                      <div className="d-flex gap-2">
                        {song.chords
                          .filter(ch => ch.section === 'verse')
                          .map((ch, idx) => (
                            <span key={idx} className="badge bg-light text-dark border">{ch.chord}</span>
                          ))}
                      </div>
                    </div>
                  )}
                  {song.chords.some(ch => ch.section === 'chorus') && (
                    <div className="mb-2">
                      <div className="text-muted mb-1">Chorus:</div>
                      <div className="d-flex gap-2">
                        {song.chords
                          .filter(ch => ch.section === 'chorus')
                          .map((ch, idx) => (
                            <span key={idx} className="badge bg-light text-dark border">{ch.chord}</span>
                          ))}
                      </div>
                    </div>
                  )}
                  {song.chords.some(ch => ch.section === 'bridge') && (
                    <div className="mb-2">
                      <div className="text-muted mb-1">Bridge:</div>
                      <div className="d-flex gap-2">
                        {song.chords
                          .filter(ch => ch.section === 'bridge')
                          .map((ch, idx) => (
                            <span key={idx} className="badge bg-light text-dark border">{ch.chord}</span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
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
