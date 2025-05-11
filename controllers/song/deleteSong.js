const fs = require('fs');
const path = require('path');

const songFilePath = path.join(__dirname, '../../dao/storage/songList/songList.json');

module.exports = (req, res) => {
    const songId = parseInt(req.params.id);
    if (isNaN(songId)) return res.status(400).json({ error: 'Invalid ID' });
    if (!fs.existsSync(songFilePath)) return res.status(404).json({ error: 'Song list not found' });

    let songList = JSON.parse(fs.readFileSync(songFilePath, 'utf8'));
    const index = songList.findIndex(s => s.id === songId);
    if (index === -1) return res.status(404).json({ error: 'Song not found' });

    const deleted = songList.splice(index, 1);
    fs.writeFileSync(songFilePath, JSON.stringify(songList, null, 2));
    res.status(200).json({ message: 'Song deleted', data: deleted[0] });
};
