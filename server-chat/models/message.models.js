const mongoose = require('mongoose');

const messageShema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String
},{
    timestamps: true,
});

const messageModel = mongoose.model("Message" , messageShema);

module.exports = messageModel;