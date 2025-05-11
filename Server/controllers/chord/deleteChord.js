const fs = require('fs');
const path = require('path');

const chordFilePathDelete = path.join(__dirname, '../../dao/storage/chordList/chordList.json');

module.exports = (req, res) => {
    const chordId = parseInt(req.params.id);
    if (isNaN(chordId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (!fs.existsSync(chordFilePathDelete)) {
        return res.status(404).json({ error: 'Chord list not found' });
    }

    let chordList = JSON.parse(fs.readFileSync(chordFilePathDelete, 'utf8'));
    const index = chordList.findIndex(c => c.id === chordId);

    if (index === -1) {
        return res.status(404).json({ error: 'Chord not found' });
    }

    const deleted = chordList.splice(index, 1);
    fs.writeFileSync(chordFilePathDelete, JSON.stringify(chordList, null, 2));
    res.status(200).json({ message: 'Chord deleted', data: deleted[0] });
};
