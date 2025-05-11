const fs = require('fs');
const path = require('path');

const chordFilePath = path.join(__dirname, '../../dao/storage/chordList/chordList.json');

module.exports = (req, res) => {
    const chordId = parseInt(req.params.id);
    if (isNaN(chordId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (!fs.existsSync(chordFilePath)) {
        return res.status(404).json({ error: 'Chord list not found' });
    }

    const chordList = JSON.parse(fs.readFileSync(chordFilePath, 'utf8'));
    const chord = chordList.find(c => c.id === chordId);

    if (!chord) {
        return res.status(404).json({ error: 'Chord not found' });
    }

    res.status(200).json(chord);
};
