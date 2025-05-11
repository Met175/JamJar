// 📁 controllers/song/createSong.js
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv();

const { allowedGenres, allowedKeys } = require('../../shared/allowedValues');

const songSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        genre: { type: 'string', enum: allowedGenres },
        text: { type: 'string' },
        key: { type: 'string', enum: allowedKeys },
        rating: { type: 'integer', minimum: 1, maximum: 5  },
        chords: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    chord: { type: 'string' },
                    section: { type: 'string', enum: ['verse', 'chorus', 'bridge'] },
                },
                required: ['chord', 'section'],
            },
        },
    },
    required: ['title', 'author', 'genre', 'key', 'rating', 'chords'],
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

    // Chords load
    const chordData = fs.readFileSync(chordFilePath, 'utf8');
    const existingChords = JSON.parse(chordData);

    const missingChords = songData.chords.filter(chord => !existingChords.some(existingChord => existingChord.chord === chord.chord));

    // Adding missing chords
    if (missingChords.length > 0) {
        missingChords.forEach(missingChord => {
            const newChordId = existingChords.length + 1; // Generování nového ID pro akord
            existingChords.push({ id: newChordId, chord: missingChord.chord });
        });

        fs.writeFileSync(chordFilePath, JSON.stringify(existingChords, null, 2));
    }

    const rawSongData = fs.readFileSync(songFilePath, 'utf8');
    const songs = JSON.parse(rawSongData);


    const newSongId = songs.length + 1;

    const newSong = {
        id: newSongId,
        title: songData.title,
        author: songData.author,
        text: songData.text,
        genre: songData.genre,
        key: songData.key,
        rating: songData.rating,
        chords: songData.chords,
    };

    songs.push(newSong);

    fs.writeFileSync(songFilePath, JSON.stringify(songs, null, 2));

    res.status(201).json(newSong);
};

