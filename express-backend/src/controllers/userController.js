const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

router.get('/getAllUser', async (req, res) => {
    const users = await User.getAllUser();
    res.json(users);
});

router.post('/createUser', async (req, res) => {
    const { lastname, firstname, username, email, phone_number, password } = req.body;
    const newUser = await User.createUser(lastname, firstname, username, email, phone_number, password);
    if (newUser.status === 200) {
        res.json(newUser);
    } else {
        res.status(newUser.status).json(newUser.message);
    }
});

// router.put('/updateAdmin/:id', async (req, res) => {
//     const { lastname, firstname, email, password } = req.body;
//     const admin = await User.updateUser(req.params.id, lastname, firstname, email, password);
//     res.json(admin);
// });

router.post('/verifyUser', async (req, res) => {
    const { email, username, password } = req.body;
    const verUser = await User.verifyUser(email, username, password);
    if (verUser.status === 200) {
        res.json(verUser);
    } else {
        res.status(verUser.status).json(verUser.message);
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    const delUser = await User.deleteUser(req.params.id);
    if (delUser.status === 200) {
        res.json(delUser);
    } else {
        res.status(delUser.status).json(delUser.message);
    }
});

module.exports = router;
