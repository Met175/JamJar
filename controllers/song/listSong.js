const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ajv = new Ajv();

const { allowedGenres, allowedKeys } = require('../../shared/allowedValues');

const querySchema = {
    type: 'object',
    properties: {
        genre: { type: 'string', enum: allowedGenres },
        key: { type: 'string', enum: allowedKeys },
    },
    additionalProperties: false,
};

const validateQuery = ajv.compile(querySchema);

const songFilePath = path.join(__dirname, '../../dao/storage/songList/songList.json');

module.exports = (req, res) => {
    const query = req.query;

    if (!validateQuery(query)) {
        return res.status(400).json({ error: 'Invalid query parameters', details: validateQuery.errors });
    }

    try {
        const rawData = fs.readFileSync(songFilePath);
        const songs = JSON.parse(rawData);

        let filteredSongs = songs;

        if (query.genre) {
            filteredSongs = filteredSongs.filter(song => song.genre.toLowerCase() === query.genre.toLowerCase());
        }

        if (query.key) {
            filteredSongs = filteredSongs.filter(song => song.key.toLowerCase() === query.key.toLowerCase());
        }

        res.status(200).json(filteredSongs);
    } catch (error) {
        console.error('Error reading songs:', error);
        res.status(500).json({ error: 'Failed to load songs.' });
    }
};

