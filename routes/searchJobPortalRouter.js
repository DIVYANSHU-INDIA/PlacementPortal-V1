const express = require('express');

const router = express.Router();

const searchJobController = require('../controllers/searchJobPortalController');

router.get('/',searchJobController.searchJob);
router.get('/result',searchJobController.searchJobResult);

module.exports = router;