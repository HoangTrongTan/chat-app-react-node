const chatModel = require('../models/chatModel.models');
const modelChat = require('../models/chatModel.models');
class ChatController{
    async createChat(req,res,next){
        try{
            const { firstId, secondId } = req.body;
            const chat = await chatModel.findOne({
                members: { $all: [firstId , secondId] }
            });

            if(chat) return res.status(200).json(chat);

            const newChat = new chatModel({
                members: [firstId , secondId]
            });

            const response = await newChat.save();

            res.status(200).json(response);
        }catch(e){
            console.log(">>>Lỗi...", e);
            res.status(500).json(e);
        }
    }

    async findUserChats(req,res,next){
        const userId = req.params.userId;

        try{
            const chats = await chatModel.find({
                members: { $in: [ userId ] }
            });

            res.status(200).json(chats);
        }catch(e){
            console.log(">>>Lỗi...", e);
            res.status(500).json(e);
        }
    }

    async findChats(req,res,next){
        try{
            const { firstId , secondId } = req.params;
            const chats = await chatModel.find({
                members: { $all: [firstId , secondId] }
            });

            res.status(200).json(chats);
        }catch(e){
            console.log(">>>Lỗi...", e);
            res.status(500).json(e);
        }
    }
}

module.exports = new ChatController; 