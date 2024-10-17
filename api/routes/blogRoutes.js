const express = require('express');
const router = express.Router();
const blogControllers = require('../controllers/blogControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const {upload} = require('../config/multer.config');

router.post("/post", authMiddleware, upload.single('file'), blogControllers.post);
router.get("/get/:id", blogControllers.readByID);
router.put("/update/:id", authMiddleware , blogControllers.update);
router.delete("/delete/:id", authMiddleware , blogControllers.del);
router.get('/get-all', blogControllers.readAll);
router.get('/toggle-like/:id', authMiddleware, blogControllers.changeLikes);
router.get('/save-blog/:id', authMiddleware, blogControllers.save);
router.post('/post-comment/:id', authMiddleware, blogControllers.addComment);
router.get('/get-by-user/:id', blogControllers.readByUserId);

module.exports = router;