const UserModel = require('../models/user.models');
const RoleModel = require('../models/role.models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const Roles = require('../models/role.models');
class User{
    //[GET] /api/user/all/acc
    async allUser(req,res,next){
        try{
            const rs = await UserModel.find({}).exec();
            res.json(rs);
        }catch(e){
            next(e);
        }
    }
    //[GET] /api/user/find/:id
    async findUser(req,res,next){
        try{
            const { id } = req.params;
            const rs = await UserModel.findOne({ _id : id }).exec();
            res.json(rs);
        }catch(e){
            console.log("ERROR! ", e);
            next(e);
        }
    }
    //[POST] api/user/sign-up
    async signup(req,res,next){
        try{
            const user = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            const savedUser = await user.save();

            if(req.body.roles){
                const roles = await Roles.find({
                    name: { $in: req.body.roles }
                });

                savedUser.roles = roles.map(role => role._id);

                await savedUser.save();
            }else{
                const userOne = await Roles.findOne({ name: "user" }).exec();

                savedUser.roles = [userOne._id];

                await savedUser.save();
            }

            // console.log(">>>Body: ",req.body);
            res.json({ sucess: "Thêm thành công !!", savedUser });
        }catch(e){
            console.log(e); 
            next(e);
        }
    }
    //[POST] api/user/sign-in
    async signin(req,res,next){
        try{
            const response = await UserModel.findOne({ email: req.body.email, password: req.body.password });
            if(response){
                const token = jwt.sign({ _id: response._id },
                                        config.secretKey,
                                        {
                                            algorithm:'HS256',
                                            allowInsecureKeySizes: true,
                                            expiresIn: 86400,
                                        }
                                        );
                                        // , chúng ta sử dụng Date.now() để lấy thời gian hiện tại dưới dạng timestamp (miligiây kể từ 1/1/1970). Chia cho 1000 để chuyển đổi thành giây. Sau đó, chúng ta cộng thêm thời lượng muốn token hết hạn, ví dụ 5 phút là 60 giây nhân 5.
                return res.json({
                    ...response,
                    accessToken: token
                });
            }
            res.status(400).send({
                status: 400,
                message: "User not found !!",
            });
        }catch(e){
            console.log(e);
            next(e);
        }
    }
}

module.exports = new User;