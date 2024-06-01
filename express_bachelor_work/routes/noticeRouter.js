const Router = require('express');
const multer = require('multer');
const noticeController = require('../controllers/NoticeController');
const router = new Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.single('photo'), noticeController.addNotice);
router.post('/getUsersNotices', noticeController.getUsersNotices);

module.exports = router;