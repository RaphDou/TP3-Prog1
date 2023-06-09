// users.js

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth');

// /users => GET
router.get('/', isAuth, userController.getUsers);

// /users/:userId => GET
router.get('/:userId', isAuth, userController.getUserById);

// /users/:userId => PUT
router.put('/:userId', isAuth, userController.updateUser);

// /users/:userId => DELETE
router.delete('/:userId', isAuth, userController.deleteUser);


module.exports = router;
