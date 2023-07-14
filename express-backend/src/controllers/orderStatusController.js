const express = require('express');
const OrderStatus = require('../models/orderStatusModel');

const router = express.Router();

router.get('/getAllOrderStatus', async (req, res) => {
    const orderStatus = await OrderStatus.getAllOrderStatus();
    res.json(orderStatus);
});

router.post('/createOrderStatus', async (req, res) => {
    const { name } = req.body;
    const newOrderStatus = await OrderStatus.createOrderStatus(name);
    if (newOrderStatus.status === 200) {
        res.json(newOrderStatus);
    } else {
        res.status(newOrderStatus.status).json(newOrderStatus.message);
    }
});

router.put('/updateOrderStatus/:id', async (req, res) => {
    const { name } = req.body;
    const updOrderStatus = await OrderStatus.updateOrderStatus(req.params.id, name);
    if (updOrderStatus.status === 200) {
        res.json(updOrderStatus);
    } else {
        res.status(updOrderStatus.status).json(updOrderStatus.message);
    }
});

router.delete('/deleteOrderStatus/:id', async (req, res) => {
    const delOrderStatus = await OrderStatus.deleteOrderStatus(req.params.id);
    if (delOrderStatus.status === 200) {
        res.json(delOrderStatus);
    } else {
        res.status(delOrderStatus.status).json(delOrderStatus.message);
    }
});

module.exports = router;
