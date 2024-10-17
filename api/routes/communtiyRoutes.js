const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const {upload} = require('../config/multer.config');

router.post('/post', authMiddleware, upload.single('file'), communityController.postCommunity);
router.get('/get-by-user/:id', communityController.getCommunitiesByUserId);

module.exports = router;