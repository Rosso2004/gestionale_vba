const express = require('express');
const CustomerSupplier = require('../models/customerSupplierModel');

const router = express.Router();

router.get('/getAllCustomerSupplier', async (req, res) => {
    const customerSupplier = await CustomerSupplier.getAllCustomerSupplier();
    res.json(customerSupplier);
});

router.post('/createCustomerSupplier', async (req, res) => {
    const { type, fnc, name, city, address, cap, phone_number, email, piva, iban } = req.body;
    const newCustomerSupplier = await CustomerSupplier.createCustomerSupplier(type, fnc, name, city, address, cap, phone_number, email, piva, iban);
    if (newCustomerSupplier.status === 200) {
        res.json(newCustomerSupplier);
    } else {
        res.status(newCustomerSupplier.status).json(newCustomerSupplier.message);
    }
});

router.put('/updateCustomerSupplier/:id', async (req, res) => {
    const { type, fnc, name, city, address, cap, phone_number, email, piva, iban } = req.body;
    const updCustomerSupplier = await CustomerSupplier.updateCustomerSupplier(req.params.id, type, fnc, name, city, address, cap, phone_number, email, piva, iban);
    if (updCustomerSupplier.status === 200) {
        res.json(updCustomerSupplier);
    } else {
        res.status(updCustomerSupplier.status).json(updCustomerSupplier.message);
    }
});

router.delete('/deleteCustomerSupplier/:id', async (req, res) => {
    const delCustomerSupplier = await CustomerSupplier.deleteCustomerSupplier(req.params.id);
    if (delCustomerSupplier.status === 200) {
        res.json(delCustomerSupplier);
    } else {
        res.status(delCustomerSupplier.status).json(delCustomerSupplier.message);
    }
});

module.exports = router;
