const express = require('express');
const router = express.Router();
const fireBaseController = require('../controllers/firebaseController');
const {upload} = require('../config/multer.config');

router.post('/post', upload.single('file'), fireBaseController.postImage);

module.exports = router;