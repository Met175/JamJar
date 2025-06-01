const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv();

const { allowedGenres, allowedKeys } = require('../../shared/allowedValues');

const songSchema = {
    type: 'object',
    properties: {
        title: { type: 'string', maxLength: 20 },
        author: { type: 'string', maxLength: 20 },
        genre: { type: 'string', enum: allowedGenres },
        text: { type: 'string' },
        key: { type: 'string', enum: allowedKeys },
         chords: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    chord: { type: 'string' },
                    section: { type: 'string', enum: ['verse', 'chorus', 'bridge'] }
                },
                required: ['chord', 'section'],
                additionalProperties: false
            }
    },
    },
    required: ['title', 'author', 'genre', 'key'],
    additionalProperties: false,
};

const validateSong = ajv.compile(songSchema);

const chordFilePath = path.join(__dirname, '../../dao/storage/chordList/chordList.json');
const songFilePath = path.join(__dirname, '../../dao/storage/songList/songList.json');

module.exports = (req, res) => {
    const songData = req.body;

    // Input validation
    if (!validateSong(songData)) {
        return res.status(400).json({ error: 'Invalid input', details: validateSong.errors });
    }

    const rawSongData = fs.readFileSync(songFilePath, 'utf8');
    const songs = JSON.parse(rawSongData);


    const newSongId = Date.now();

    const newSong = {
        id: newSongId,
        title: songData.title,
        author: songData.author,
        text: songData.text,
        genre: songData.genre,
        key: songData.key,
        chords: songData.chords || [],
        rating: null,
    };

    songs.push(newSong);

    fs.writeFileSync(songFilePath, JSON.stringify(songs, null, 2));

    res.status(201).json(newSong);

};

