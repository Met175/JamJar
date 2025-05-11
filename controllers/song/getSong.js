const fs = require('fs');
const path = require('path');

const songFilePath = path.join(__dirname, '../../dao/storage/songList/songList.json');

module.exports = (req, res) => {
    const songId = parseInt(req.params.id);
    if (isNaN(songId)) return res.status(400).json({error: 'Invalid ID'});
    if (!fs.existsSync(songFilePath)) return res.status(404).json({error: 'Song list not found'});

    const songs = JSON.parse(fs.readFileSync(songFilePath, 'utf8'));
    const song = songs.find(s => s.id === songId);
    if (!song) return res.status(404).json({error: 'Song not found'});

    res.json(song);
};
