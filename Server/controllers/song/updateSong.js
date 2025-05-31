const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv({
    removeAdditional: true // This will strip unknown properties instead of failing
});

const { allowedGenres, allowedKeys } = require('../../shared/allowedValues');
const { title } = require('process');

const songFilePath = path.join(__dirname, '../../dao/storage/songList/songList.json');
const chordFilePath = path.join(__dirname, '../../dao/storage/chordList/chordList.json');

const updateSchema = {
    type: 'object',
    properties: {
        title: { type: 'string', maxLength: 20 },
        author: { type: 'string', maxLength: 20 },
        genre: { type: 'string', enum: allowedGenres },
        text: { type: 'string' },
        rating: { type: 'integer', minimum: 1, maximum: 5 },
        key: { type: 'string', enum: allowedKeys },
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
    additionalProperties: false, // Remove 'required' so partial updates are allowed
};

const validateUpdate = ajv.compile(updateSchema);

module.exports = (req, res) => {
    const songId = parseInt(req.params.id);
    const songData = req.body;

    // Validate input data
    if (!validateUpdate(songData)) {
        return res.status(400).json({ error: 'Invalid input', details: validateUpdate.errors });
    }

    try {
        // Read song and chord data
        const chordData = fs.readFileSync(chordFilePath, 'utf8');
        const existingChords = JSON.parse(chordData);

        // Handle missing chords (if any)
        const missingChords = songData.chords?.filter(chord =>
            !existingChords.some(existingChord => existingChord.chord === chord.chord)
        );

        if (missingChords?.length > 0) {
            missingChords.forEach(missingChord => {
                const newChordId = existingChords.length > 0 ? Math.max(...existingChords.map(c => c.id)) + 1 : 1;
                existingChords.push({ id: newChordId, chord: missingChord.chord });
            });
            // Save updated chords list
            fs.writeFileSync(chordFilePath, JSON.stringify(existingChords, null, 2));
        }

        // Read song list
        if (!fs.existsSync(songFilePath)) {
            return res.status(404).json({ error: 'Song list not found' });
        }

        const songList = JSON.parse(fs.readFileSync(songFilePath, 'utf8'));
        const songIndex = songList.findIndex(s => s.id === songId);

        if (songIndex === -1) {
            return res.status(404).json({ error: 'Song not found' });
        }

        // Update song details
        const updatedSong = songList[songIndex];

        // Update all editable fields if provided
        if (songData.title !== undefined) {
            updatedSong.title = songData.title;
        }
        if (songData.author !== undefined) {
            updatedSong.author = songData.author;
        }
        if (songData.genre !== undefined) {
            updatedSong.genre = songData.genre;
        }
        if (songData.text !== undefined) {
            updatedSong.text = songData.text;
        }
        if (songData.rating !== undefined) {
            updatedSong.rating = songData.rating;
        }
        if (songData.chords) {
            updatedSong.chords = songData.chords;
        }
        if (songData.key) {
            updatedSong.key = songData.key;
        }

        // Save the updated song list
        songList[songIndex] = updatedSong;
        fs.writeFileSync(songFilePath, JSON.stringify(songList, null, 2));

        res.status(200).json({ message: 'Song updated', data: updatedSong });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed to update song' });
    }
};
