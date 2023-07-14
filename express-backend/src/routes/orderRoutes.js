const express = require('express');
const orderRouter = require('../controllers/orderController');

const router = express.Router();

router.use('/order', orderRouter);

module.exports = router;