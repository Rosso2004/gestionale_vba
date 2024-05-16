const express = require('express');
const CustomerSupplier = require('../models/customerSupplierModel');
const authenticateToken = require("../middleware/authentication");

const router = express.Router();

router.get('/getAllCustomerSupplier', authenticateToken, async (req, res) => {
    const customerSupplier = await CustomerSupplier.getAllCustomerSupplier();
    res.json(customerSupplier);
});

router.post('/createCustomerSupplier', authenticateToken, async (req, res) => {
    const { type, fnc, name, city, address, cap, phone_number, email, piva, iban } = req.body;
    const newCustomerSupplier = await CustomerSupplier.createCustomerSupplier(type, fnc, name, city, address, cap, phone_number, email, piva, iban);
    if (newCustomerSupplier.status === 200) {
        res.json(newCustomerSupplier);
    } else {
        res.status(newCustomerSupplier.status).json(newCustomerSupplier.message);
    }
});

router.put('/updateCustomerSupplier/:id', authenticateToken, async (req, res) => {
    const { type, fnc, name, city, address, cap, phone_number, email, piva, iban } = req.body;
    const updCustomerSupplier = await CustomerSupplier.updateCustomerSupplier(req.params.id, type, fnc, name, city, address, cap, phone_number, email, piva, iban);
    if (updCustomerSupplier.status === 200) {
        res.json(updCustomerSupplier);
    } else {
        res.status(updCustomerSupplier.status).json(updCustomerSupplier.message);
    }
});

router.delete('/deleteCustomerSupplier/:id', authenticateToken, async (req, res) => {
    const delCustomerSupplier = await CustomerSupplier.deleteCustomerSupplier(req.params.id);
    if (delCustomerSupplier.status === 200) {
        res.json(delCustomerSupplier);
    } else {
        res.status(delCustomerSupplier.status).json(delCustomerSupplier.message);
    }
});

module.exports = router;
