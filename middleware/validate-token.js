const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err){
                console.log("ah ocurrido un error con la validacion del token");
                return res.status(401).json({msg: "token invalido"})
            }
            next();
        })
    } catch (error) {
        console.log("error:" + error);
        res.status(401).json({ msg: 'debes proporcionar un token' });
    }
}

const isAdmin = async (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err){
                console.log("ah ocurrido un error con la validacion del token");
                return res.status(401).json({msg: "token invalido"})
            }
            if(decoded && decoded.id_role !== 2){
                return res.status(403).json({message: 'Requiere role de administrador'})
            }
            next();
        })
    } catch (error) {
        console.log("error:" + error);
        res.status(401).json({ msg: 'debes proporcionar un token' });
    }

    
}

exports.verifyToken = verifyToken;
exports.isAdmin = isAdmin;