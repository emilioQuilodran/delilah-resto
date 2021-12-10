const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({error: 'Acceso denegado'})
    }
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verify
        next()
    } catch (error) {
        res.status(400).json({error: 'token no válido'})
    }
}

const isAdmin = async (req, res, next) =>{
    const token = req.header('Authorization')
    const verify = jwt.verify(token, process.env.TOKEN_SECRET)
        if (verify.id_role === 2) {
            next()
            console.log(verify.nombre_usuario);
            return
        }

    return res.status(403).json({message: 'Requiere role de administrador'})
}

exports.verifyToken = verifyToken;
exports.isAdmin = isAdmin;