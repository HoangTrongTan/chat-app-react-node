const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');

const controller = require('../controller/page.controller');

router.get('/user', [ authJwt.verifyToken ] , controller.user );
router.get('/admin', [ authJwt.verifyToken , authJwt.isAdmin ] ,controller.admin );
router.get('/board',[authJwt.verifyToken , authJwt.isBoard] , controller.board );

module.exports = router;