const fs = require('fs');
const path = require('path');
const AjvUpdate = require('ajv');
const ajvUpdate = new AjvUpdate();

const chordFilePathUpdate = path.join(__dirname, '../../dao/storage/chordList/chordList.json');

const updateSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        section: { type: 'string', enum: ['verse', 'chorus', 'bridge'] }
    },
    additionalProperties: false
};

const validateUpdate = ajvUpdate.compile(updateSchema);

module.exports = (req, res) => {
    const chordId = parseInt(req.params.id);
    if (!validateUpdate(req.body)) {
        return res.status(400).json({ error: 'Invalid input', details: validateUpdate.errors });
    }

    if (!fs.existsSync(chordFilePathUpdate)) {
        return res.status(404).json({ error: 'Chord list not found' });
    }

    const chordList = JSON.parse(fs.readFileSync(chordFilePathUpdate, 'utf8'));
    const chordIndex = chordList.findIndex(c => c.id === chordId);
    if (chordIndex === -1) {
        return res.status(404).json({ error: 'Chord not found' });
    }

    chordList[chordIndex] = { ...chordList[chordIndex], ...req.body };
    fs.writeFileSync(chordFilePathUpdate, JSON.stringify(chordList, null, 2));
    res.status(200).json({ message: 'Chord updated', data: chordList[chordIndex] });
};