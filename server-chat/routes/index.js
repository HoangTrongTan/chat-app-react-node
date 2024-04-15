const UserRouter = require('./user.route');
const TestRouter = require('./page-test.route');
const ChatRouter = require('../routes/chat.route');
const MessageRouter = require('../routes/message.route');
const GroupRouter = require('../routes/group.route');

function route(app){
    app.use( (req,res,next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    } )
    app.use('/api/user', UserRouter );
    app.use('/api/test', TestRouter );
    app.use('/api/chats', ChatRouter );
    app.use('/api/messages', MessageRouter );
    app.use('/api/groups', GroupRouter );
}
module.exports = route;
