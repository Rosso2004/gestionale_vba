const express = require('express');
const ResourceType = require('../models/resourceTypeModel');
const authenticateToken = require("../middleware/authentication");

const router = express.Router();

router.get('/getAllResourceType', authenticateToken, async (req, res) => {
    const resourceType = await ResourceType.getAllResourceType();
    res.json(resourceType);
});

router.post('/createResourceType', authenticateToken, async (req, res) => {
    const { name, description, note } = req.body;
    const newResourceType = await ResourceType.createResourceType(name, description, note);
    if (newResourceType.status === 200) {
        res.json(newResourceType);
    } else {
        res.status(newResourceType.status).json(newResourceType.message);
    }
});

router.put('/updateResourceType/:id', authenticateToken, async (req, res) => {
    const { name, description, note } = req.body;
    const updResourceType = await ResourceType.updateResourceType(req.params.id, name, description, note);
    if (updResourceType.status === 200) {
        res.json(updResourceType);
    } else {
        res.status(updResourceType.status).json(updResourceType.message);
    }
});

router.delete('/deleteResourceType/:id', authenticateToken, async (req, res) => {
    const delResourceType = await ResourceType.deleteResourceType(req.params.id);
    if (delResourceType.status === 200) {
        res.json(delResourceType);
    } else {
        res.status(delResourceType.status).json(delResourceType.message);
    }
});

module.exports = router;
