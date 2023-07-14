const express = require('express');
const orderStatusRouter = require('../controllers/orderStatusController');

const router = express.Router();

router.use('/orderStatus', orderStatusRouter);

module.exports = router;