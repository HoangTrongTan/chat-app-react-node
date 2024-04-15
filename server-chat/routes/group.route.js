const express = require('express');
const route = express.Router();
const controller = require('../controller/group.controller');

route.post("/create", controller.create );
route.get("/:userId", controller.findUserGroupChat );

module.exports = route;