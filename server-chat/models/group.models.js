const mongoose = require('mongoose');

module.exports = mongoose.model(
    "Group",
    new mongoose.Schema({
        members: Array,
    },{
        timestamps: true
    })
);