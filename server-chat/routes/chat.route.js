const express = require('express');
const router = express.Router();
const controller = require('../controller/chat.controller');

router.post( "/" ,  controller.createChat);
router.get('/:userId' , controller.findUserChats);
router.get('/find/:firstId/:secondId' , controller.findChats);

module.exports = router;