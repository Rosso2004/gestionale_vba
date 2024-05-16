const express = require('express');
const OrderTypes = require('../models/orderTypesModel');
const authenticateToken = require("../middleware/authentication");

const router = express.Router();

router.get('/getAllOrderTypes', authenticateToken, async (req, res) => {
    const orderStatus = await OrderTypes.getAllOrderTypes();
    res.json(orderStatus);
});

router.post('/createOrderTypes', authenticateToken, async (req, res) => {
    const { name } = req.body;
    const newOrderStatus = await OrderTypes.createOrderTypes(name);
    if (newOrderStatus.status === 200) {
        res.json(newOrderStatus);
    } else {
        res.status(newOrderStatus.status).json(newOrderStatus.message);
    }
});

router.put('/updateOrderTypes/:id', authenticateToken, async (req, res) => {
    const { name } = req.body;
    const updOrderStatus = await OrderTypes.updateOrderTypes(req.params.id, name);
    if (updOrderStatus.status === 200) {
        res.json(updOrderStatus);
    } else {
        res.status(updOrderStatus.status).json(updOrderStatus.message);
    }
});

router.delete('/deleteOrderTypes/:id', authenticateToken, async (req, res) => {
    const delOrderStatus = await OrderTypes.deleteOrderTypes(req.params.id);
    if (delOrderStatus.status === 200) {
        res.json(delOrderStatus);
    } else {
        res.status(delOrderStatus.status).json(delOrderStatus.message);
    }
});

module.exports = router;
