const jwt =  require("jsonwebtoken");
require('dotenv').config();
const key = process.env.LANG;

const login =  async (req,res) => {
    try {
        const {user, pass} = req.body;
        if (user !== process.env.USER || pass !== process.env.PASSWORD) {
            return res.status(401).json({message: "usuarrio o contraseña invalido"});
        }
        const usuario = {
            usuario: user,
            tipo: true
        }
        const jwtToken = jwt.sign(usuario, key, {expiresIn: '1h'});
        res.status(200).json({token: jwtToken});
    } catch (e){
        return res.status(400).json({msg: "ha ocurrido un error"});
    }
}

const register = async (req, res) => {
    console.log("register route")
    res.status(200).json({msg: "register route"})
}

exports.login = login;
exports.register = register;