import React from 'react';

const CHORD_DIAGRAMS = {
  // Major chords
  'C': { positions: [[0,1,0,2,3,0]], fret: 0, barre: null },
  'D': { positions: [[2,3,2,0,0,2]], fret: 0, barre: null },
  'E': { positions: [[0,0,1,2,2,0]], fret: 0, barre: null },
  'F': { positions: [[1,1,2,3,3,1]], fret: 0, barre: 1 },
  'G': { positions: [[3,3,0,0,0,3]], fret: 0, barre: null },
  'A': { positions: [[0,0,2,2,2,0]], fret: 0, barre: null },
  'B': { positions: [[2,2,4,4,4,2]], fret: 0, barre: 2 },
  
  // Minor chords
  'Am': { positions: [[0,0,2,2,1,0]], fret: 0, barre: null },
  'Bm': { positions: [[2,2,4,4,3,2]], fret: 0, barre: 2 },
  'Cm': { positions: [[3,3,5,5,4,3]], fret: 0, barre: 3 },
  'Dm': { positions: [[1,3,2,0,0,1]], fret: 0, barre: null },
  'Em': { positions: [[0,0,0,2,2,0]], fret: 0, barre: null },
  'Fm': { positions: [[1,3,3,1,1,1]], fret: 0, barre: 1 },
  'Gm': { positions: [[3,5,5,3,3,3]], fret: 0, barre: 3 },
};

function ChordDiagram({ chord }) {
  const diagramData = CHORD_DIAGRAMS[chord];
  if (!diagramData) {
    return (
      <div className="text-center text-muted">
        <small>Diagram není k dispozici</small>
      </div>
    );
  }

  const stringCount = 6;
  const fretCount = 5;
  const width = 100;
  const height = 120;
  const stringSpacing = width / (stringCount - 1);
  const fretSpacing = (height - 20) / fretCount;

  const renderDot = (string, fret, x, y) => {
    if (fret === 0) {
      return <text x={x} y="15" textAnchor="middle" fontSize="12">○</text>;
    } else if (fret === -1) {
      return <text x={x} y="15" textAnchor="middle" fontSize="12">×</text>;
    } else {
      return (
        <circle
          cx={x}
          cy={y + (fret - 0.5) * fretSpacing}
          r="5"
          fill="#007bff"
        />
      );
    }
  };

  return (
    <div className="chord-diagram">
      <svg width={width} height={height}>
        {/* Strings */}
        {[...Array(stringCount)].map((_, i) => (
          <line
            key={`string-${i}`}
            x1={i * stringSpacing}
            y1="20"
            x2={i * stringSpacing}
            y2={height}
            stroke="black"
            strokeWidth="1"
          />
        ))}

        {/* Frets */}
        {[...Array(fretCount + 1)].map((_, i) => (
          <line
            key={`fret-${i}`}
            x1="0"
            y1={20 + i * fretSpacing}
            x2={width}
            y2={20 + i * fretSpacing}
            stroke="black"
            strokeWidth={i === 0 ? "2" : "1"}
          />
        ))}

        {/* Finger positions */}
        {diagramData.positions[0].map((fret, string) => (
          renderDot(
            string,
            fret,
            string * stringSpacing,
            20
          )
        ))}

        {/* Barre if exists */}
        {diagramData.barre && (
          <rect
            x={0}
            y={20 + (diagramData.barre - 0.7) * fretSpacing}
            width={width}
            height="8"
            fill="#007bff"
            rx="4"
            opacity="0.5"
          />
        )}
      </svg>
    </div>
  );
}

export default ChordDiagram;