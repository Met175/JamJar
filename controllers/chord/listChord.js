const fs = require('fs');
const path = require('path');

const chordFilePath = path.join(__dirname, '../../dao/storage/chordList/chordList.json');

module.exports = (req, res) => {
    try {
        const rawData = fs.readFileSync(chordFilePath);
        const chords = JSON.parse(rawData);

        res.status(200).json(chords);
    } catch (error) {
        console.error('Error reading chords:', error);
        res.status(500).json({ error: 'Failed to load chords.' });
    }
};
