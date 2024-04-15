
const veryfiled = (req,res,next) => {
    if( !req.body?.username )
        return res.status(400).send({ error : true , message: "user name is null !!" });
    if( !req.body.email )
        return res.status(400).send({ error : true , message: "email is null !!" });
    if( !req.body.password )
        return res.status(400).send({ error : true , message: "password is null !!" });
    next();
};

const veryfiledlogin = (req,res,next) => {
    if( !req.body.email )
        return res.status(400).send({ error : true , message: "email is null !!" });
    if( !req.body.password )
        return res.status(400).send({ error : true , message: "password is null !!" });
    next();
};

module.exports = {
    veryfiled,
    veryfiledlogin
}