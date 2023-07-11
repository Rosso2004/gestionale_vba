const express = require('express');
const resourceTypeRouter = require('../controllers/resourceTypeController');

const router = express.Router();

router.use('/resourceType', resourceTypeRouter);

module.exports = router;