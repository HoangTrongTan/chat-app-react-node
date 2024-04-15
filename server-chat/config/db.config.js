const mongoose = require('mongoose');
async function connect() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Authentication_Authorization');
        console.log("Connect sucesssfully !!!");
    }catch(e){
        console.log("failed !!");
    }
}

module.exports = { connect };