const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv();

const songFilePath = path.join(__dirname, '../../dao/storage/songList/songList.json');
const { allowedGenres, allowedKeys } = require('../../shared/allowedValues');

const updateSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        text: { type: 'string' },
        genre: { type: 'string', enum: allowedGenres },
        rating: { type: 'integer', minimum: 1, maximum: 5 },
        key: { type: 'string', enum: allowedKeys },
        chords: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    section: { type: 'string' }
                },
                required: ['id', 'section']
            }
        }
    },
    additionalProperties: false
};

const validateUpdate = ajv.compile(updateSchema);

module.exports = (req, res) => {
    const songId = parseInt(req.params.id);
    if (!validateUpdate(req.body)) {
        return res.status(400).json({ error: 'Invalid input', details: validateUpdate.errors });
    }

    if (!fs.existsSync(songFilePath)) {
        return res.status(404).json({ error: 'Song list not found' });
    }

    const songList = JSON.parse(fs.readFileSync(songFilePath, 'utf8'));
    const songIndex = songList.findIndex(s => s.id === songId);
    if (songIndex === -1) {
        return res.status(404).json({ error: 'Song not found' });
    }

    songList[songIndex] = { ...songList[songIndex], ...req.body };
    fs.writeFileSync(songFilePath, JSON.stringify(songList, null, 2));
    res.status(200).json({ message: 'Song updated', data: songList[songIndex] });
};