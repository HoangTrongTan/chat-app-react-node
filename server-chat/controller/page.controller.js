
class PageTest{
    admin(req,res,next){
        res.send({
            role: 'admin',
        });
    }
    user(req,res,next){
        res.send({
            role: 'user',
        });
    }
    board(req,res,next){
        res.send({
            role: 'board',
        });
    }
};

module.exports = new PageTest;