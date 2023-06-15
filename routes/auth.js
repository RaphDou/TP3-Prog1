"use strict";

const express = require('express');



const router = express.Router();

const authController = require('../controllers/authController');

// /auth/login/ => POST
router.post('/login', authController.login);

// /auth/signup/ => POST
router.post('/signup', authController.signup);

module.exports = router;
