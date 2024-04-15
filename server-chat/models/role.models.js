const mongoose = require('mongoose');

const Roles = mongoose.model(
    "Roles",
    new mongoose.Schema({
        name: String
    })
);
module.exports = Roles;