const express = require('express');
const ResourceFunction = require('../models/resourceFunctionModel');
const authenticateToken = require("../middleware/authentication");

const router = express.Router();

router.get('/getAllResourceFunction', authenticateToken, async (req, res) => {
    const resourceFunction = await ResourceFunction.getAllResourceFunction();
    res.json(resourceFunction);
});

router.post('/createResourceFunction', authenticateToken, async (req, res) => {
    const { name } = req.body;
    const newResourceFunction = await ResourceFunction.createResourceFunction(name);
    if (newResourceFunction.status === 200) {
        res.json(newResourceFunction);
    } else {
        res.status(newResourceFunction.status).json(newResourceFunction.message);
    }
});

router.put('/updateResourceFunction/:id', authenticateToken, async (req, res) => {
    const { name } = req.body;
    const updResourceFunction = await ResourceFunction.updateResourceFunction(req.params.id, name);
    if (updResourceFunction.status === 200) {
        res.json(updResourceFunction);
    } else {
        res.status(updResourceFunction.status).json(updResourceFunction.message);
    }
});

router.delete('/deleteResourceFunction/:id', authenticateToken, async (req, res) => {
    const delResourceFunction = await ResourceFunction.deleteResourceFunction(req.params.id);
    if (delResourceFunction.status === 200) {
        res.json(delResourceFunction);
    } else {
        res.status(delResourceFunction.status).json(delResourceFunction.message);
    }
});

module.exports = router;
