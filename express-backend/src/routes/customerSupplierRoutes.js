const express = require('express');
const customerSupplierRouter = require('../controllers/customerSupplierController');

const router = express.Router();

router.use('/customerSupplier', customerSupplierRouter);

module.exports = router;