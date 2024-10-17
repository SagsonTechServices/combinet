const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {upload} = require('../config/multer.config');

router.post('/add', authMiddleware, roleMiddleware, upload.single('file'), categoryController.addCategory);
router.put('/update/:id', authMiddleware, roleMiddleware, upload.single('file'), categoryController.update);
router.delete('/delete/:id', authMiddleware, roleMiddleware, categoryController.del);
router.get('/get-all', categoryController.readAll);
router.get('/get/:id', categoryController.readByID);

module.exports = router;