const express = require('express');
const router = express.Router();
const lib = require('../middleware/verifiled');
const controller = require('../controller/user.controller');

router.get('/all/acc' , controller.allUser);
router.get('/find/:id' , controller.findUser);
router.post('/sign-up' , lib.veryfiled , controller.signup); 
router.post('/sign-in', lib.veryfiledlogin , controller.signin); 

module.exports = router;
