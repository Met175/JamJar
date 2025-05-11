const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv();

const chordFilePath = path.join(__dirname, '../../dao/storage/chordList/chordList.json');

const schema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        section: { type: 'string', enum: ['verse', 'chorus', 'bridge'] }
    },
    required: ['name', 'section'],
    additionalProperties: false
};

const validate = ajv.compile(schema);

module.exports = (req, res) => {
    const { name, section } = req.body;

    if (!validate(req.body)) {
        return res.status(400).json({ error: 'Invalid input', details: validate.errors });
    }

    let chordList = [];
    if (fs.existsSync(chordFilePath)) {
        chordList = JSON.parse(fs.readFileSync(chordFilePath, 'utf8'));
    }

    // Check if chord already exists (by name)
    const existing = chordList.find(c => c.name === name);

    if (existing) {
        return res.status(200).json({ message: 'Chord already exists', data: existing });
    }

    const newChord = {
        id: Date.now(),
        name,
        section
    };
    chordList.push(newChord);
    fs.writeFileSync(chordFilePath, JSON.stringify(chordList, null, 2));
    res.status(201).json({ message: 'Chord created', data: newChord });
};