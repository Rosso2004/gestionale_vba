const express = require('express');
const resourceFunctionRouter = require('../controllers/resourceFunctionController');

const router = express.Router();

router.use('/resourceFunction', resourceFunctionRouter);

module.exports = router;