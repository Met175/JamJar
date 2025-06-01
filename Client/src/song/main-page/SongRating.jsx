import React from 'react';

function SongRating({ rating, onRate, readonly = false }) {
  const renderNote = (index) => {
    const filled = index <= rating;
    return (
      <span
        key={index}
        className={`note-symbol ${filled ? 'filled' : ''} ${readonly ? '' : 'clickable'}`}
        onClick={() => !readonly && onRate(index)}
        style={{
          cursor: readonly ? 'default' : 'pointer',
          color: filled ? '#007bff' : '#dee2e6',
          fontSize: '1.2rem',
          marginRight: '2px'
        }}
      >
        ♪
      </span>
    );
  };

  return (
    <div className="d-inline-block">
      {[1, 2, 3, 4, 5].map(index => renderNote(index))}
    </div>
  );
}

export default SongRating;
