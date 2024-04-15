const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.USER;
const Roles = db.ROLES;

const verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token , config.secretKey , (err , decoded) => {
        // decoded  là biến đại diện cho đối tượng được giải mã từ mã token. Đối tượng này chứa các thông tin mà bạn đã mã hóa vào trong token khi tạo nó
        if(err){
            return res.status(401).send({ message: "Unauthorized! (Không được phép)" });
        }
        req.userID = decoded._id;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try{
        const userFinded = await User.findById(req.userID).exec();

        const RolesFinded = await Roles.find( { _id : { $in : userFinded.roles } } ).exec();

        for( let i = 0 ; i < RolesFinded.length ; i ++ ){
            if( RolesFinded[i].name === "admin" ){
                next();
                return;
            }
        }

        res.status(404).send({ message: "Require Admin Role!" });
    }catch(e){
        return res.status(500).send({ message: e });
    }
}

const isBoard = async (req, res, next) => {
    try{
        const userFinded = await User.findById(req.userID).exec();

        const RolesFinded = await Roles.find( { _id : { $in : userFinded.roles } } ).exec();

        for( let i = 0 ; i < RolesFinded.length ; i ++ ){
            if( RolesFinded[i].name === "board" ){
                next();
                return;
            }
        }

        res.status(406).send({ message: "Require Board Role!" });
    }catch(e){
        return res.status(500).send({ message: e });
    }
}

module.exports = {
    verifyToken,
    isAdmin,
    isBoard
};
