const messageModel = require('../models/message.models');

class Message{
    async ceateMessage(req,res,next){
        try{
            const { chatId , senderId , text } = req.body;
            const message = new messageModel({
                chatId , senderId, text
            });

            const response = await message.save();
            res.status(200).json(response);
        }catch(e){
            console.log(">>>Lỗi:..", e);
            res.status(500).json(e);
        }
    }

    async getMessages(req,res,next){
        try{
            const { chatId }  = req.params;
            const message = await messageModel.find({
                chatId
            });
            res.status(200).json(message);
        }catch(e){
            console.log(">>>Lỗi:..", e);
            res.status(500).json(e);
        }
    }
};

module.exports = new Message; 
//5:17