const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register' , authController.register);
router.post('/login', authController.login);
router.post('/login/firebase', authController.loginToFirebase);
router.get('/authenticate-token', authMiddleware ,authController.authenticateToken)
router.get('/get/:id', authController.getById);

module.exports = router;