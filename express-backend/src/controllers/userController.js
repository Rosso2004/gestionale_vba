const express = require('express');
const User = require('../models/userModel');
const authenticateToken = require("../middleware/authentication");
const jwt = require("jsonwebtoken");

const router = express.Router();

function generateAccessToken(username) {
    return jwt.sign({ username: username, type: 'access' }, process.env.TOKEN_SECRET, { expiresIn: '6h' });
}

router.get('/checkToken', authenticateToken, (req, res) => {
    res.send({
        "status": 200,
        "message": "Verificato!"
    });
})

router.get('/getAllUser', authenticateToken, async (req, res) => {
    const users = await User.getAllUser();
    res.json(users);
});

router.post('/createUser', authenticateToken, async (req, res) => {
    const { lastname, firstname, username, email, phone_number, password } = req.body;
    const newUser = await User.createUser(lastname, firstname, username, email, phone_number, password);
    if (newUser.status === 200) {
        res.json(newUser);
    } else {
        res.status(newUser.status).json(newUser.message);
    }
});

router.put('/updateUser/:id', authenticateToken, async (req, res) => {
    const { username, lastname, firstname, email, phone_number, password } = req.body;
    const updUser = await User.updateUser(req.params.id, username, lastname, firstname, email, phone_number, password);
    if (updUser.status === 200) {
        res.json(updUser);
    } else {
        res.status(updUser.status).json(updUser.message);
    }
});

router.put('/changeUserPassword/:id', authenticateToken, async (req, res) => {
    const { password } = req.body;
    const chPwdUser = await User.changeUserPassword(req.params.id, password);
    if (chPwdUser.status === 200) {
        res.json(chPwdUser);
    } else {
        res.status(chPwdUser.status).json(chPwdUser.message);
    }
});

router.post('/verifyUser', async (req, res) => {
    const { email, username, password } = req.body;
    const verUser = await User.verifyUser(email, username, password);
    if (verUser.status === 200) {
        const token = generateAccessToken(verUser.username)
        res.cookie('token', token, { httpOnly: true });
        res.json(verUser);
    } else {
        res.status(verUser.status).json(verUser.message);
    }
});

router.delete('/deleteUser/:id', authenticateToken, async (req, res) => {
    const delUser = await User.deleteUser(req.params.id);
    if (delUser.status === 200) {
        res.json(delUser);
    } else {
        res.status(delUser.status).json(delUser.message);
    }
});

module.exports = router;
