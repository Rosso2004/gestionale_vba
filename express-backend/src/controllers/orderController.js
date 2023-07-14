const express = require('express');
const Order = require('../models/orderModel');

const router = express.Router();

router.get('/getAllOrder', async (req, res) => {
    const order = await Order.getAllOrder();
    res.json(order);
});

router.post('/createOrder', async (req, res) => {
    const { manager, customer, name, status, type, start_date, end_date, note } = req.body;
    const newOrder = await Order.createOrder(manager, customer, name, status, type, start_date, end_date, note);
    if (newOrder.status === 200) {
        res.json(newOrder);
    } else {
        res.status(newOrder.status).json(newOrder.message);
    }
});

router.put('/updateOrder/:id', async (req, res) => {
    const { manager, customer, name, status, type, start_date, end_date, note } = req.body;
    const updOrder = await Order.updateOrder(req.params.id, manager, customer, name, status, type, start_date, end_date, note);
    if (updOrder.status === 200) {
        res.json(updOrder);
    } else {
        res.status(updOrder.status).json(updOrder.message);
    }
});

router.delete('/deleteOrder/:id', async (req, res) => {
    const delOrder = await Order.deleteOrder(req.params.id);
    if (delOrder.status === 200) {
        res.json(delOrder);
    } else {
        res.status(delOrder.status).json(delOrder.message);
    }
});

module.exports = router;
