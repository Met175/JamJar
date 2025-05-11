const express = require("express");
const router = express.Router();

const createSong = require('../controllers/song/createSong');
const getSong = require('../controllers/song/getSong');
const listSong = require('../controllers/song/listSong');
const updateSong = require('../controllers/song/updateSong');
const deleteSong = require('../controllers/song/deleteSong');

router.post('/', createSong);
router.get('/:id', getSong);
router.get('/list', listSong); // filtering
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

module.exports = router;