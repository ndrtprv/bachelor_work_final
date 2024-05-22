const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const feedbackRouter = require('./feedbackRouter')
//const noticeRouter = require('./noticeRouter');
//const fundraiseRouter = require('./fundraiseRouter');
//const resultRouter = require('./resultRouter');

router.use('/user', userRouter);
router.use('/feedback', feedbackRouter);
//router.use('/notice', noticeRouter);
//router.use('/fundraise', fundraiseRouter);
//router.use('/result', resultRouter);

module.exports = router;