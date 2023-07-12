const express = require('express');
const customerSUpplierRouter = require('../controllers/customerSupplierController');

const router = express.Router();

router.use('/customerSupplier', customerSUpplierRouter);

module.exports = router;