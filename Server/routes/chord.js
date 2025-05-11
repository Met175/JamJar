const express = require('express');
const router = express.Router();

const createChord = require('../controllers/chord/createChord');
const getChord = require('../controllers/chord/getChord');
const listChord = require('../controllers/chord/listChord');
const updateChord = require('../controllers/chord/updateChord');
const deleteChord = require('../controllers/chord/deleteChord');

router.post('/', createChord);
router.get('/:id', getChord);
router.get('/list', listChord);
router.put('/:id', updateChord);
router.delete('/:id', deleteChord);

module.exports = router;