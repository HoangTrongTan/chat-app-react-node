const groupModel = require("../models/group.models");

class Group {
  //[POST] api/groups/create
  async create(req, res, next) {
    try {
      const members = req.body.members;
      const group = await groupModel.findOne({
        members: { $all: members },
      });

      if (group) return res.status(200).json(group);

      const newGroup = new groupModel({
        members: members,
      });

      const response = await newGroup.save();

      res.status(200).json(response);
    } catch (e) {
      console.log(">>>Lỗi: ", e);
      next(e);
    }
  }
  async findUserGroupChat(req, res, next) {
    try {
        const userId = req.params.userId;

        const groupChats = await groupModel.find({
            members: { $in: [userId] }
        });

        res.status(200).json(groupChats);
    } catch (e) {
      console.log(">>>Lỗi: ", e);
      next(e);
    }
  }
}

module.exports = new Group();
