const express = require('express');
const orderTypesRouter = require('../controllers/orderTypesController');

const router = express.Router();

router.use('/orderTypes', orderTypesRouter);

module.exports = router;