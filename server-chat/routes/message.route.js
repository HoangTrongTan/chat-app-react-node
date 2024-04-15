const express = require('express');
const router = express.Router();
const controller = require('../controller/message.controller');

router.post('/' , controller.ceateMessage);
router.get('/:chatId' , controller.getMessages);


module.exports = router;