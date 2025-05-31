const express = require('express');
const app = express();
const PORT = 3001;
const songRoutes = require('./routes/song');
const chordRoutes = require('./routes/chord');

app.use(express.json());

app.use('/song', songRoutes);
app.use('/chords', chordRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});