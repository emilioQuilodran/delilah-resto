const sequelize = require('../conexion');
const jwt =  require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    const {user, email, phone, address, password, id_role} = req.body;
    // validar body

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let arrayInsertUser = [`${user}`,`${email}`,`${phone}`,`${address}`,`${hashedPassword}`, `${id_role}`];

    try{
        const response = await sequelize.query('INSERT into usuarios (nombre_usuario, email, telefono, direccion, contrasenia, id_tipo_usuario) values (?,?,?,?,?,?)',
        {replacements: arrayInsertUser, type: sequelize.QueryTypes.INSERT});
        res.status(201).json({
            message: `registro exitoso, bienvenido ${user}`
        })

    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError'){
            res.status(400).json({
                error,
                message: 'Usuario ya existe'
            })
        } else {
            console.log(error);
            res.status(500).json({
                error: error.name,
                message: 'Error inesperado'
            })
        }
    };    
}

const signIn =  async (req,res) => {
    try {
        
        let user = await sequelize.query(`SELECT * FROM usuarios WHERE email = '${req.body.email}'`, 
        {type: sequelize.QueryTypes.SELECT})

        user = user[0];
        if(!user){
            return res.status(400).json({error: 'usuario o contraseña incorrecta'})
        }

        const validPass = await bcrypt.compare(req.body.password, user.contrasenia, (err, response) => {
            if(err){
                return response.status(400);
            }

            if(response){
                const token = jwt.sign({
                    name: user.nombre_usuario,
                    id_user: user.id_usuario 
                }, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.EXPIRES_TOKEN
                })
                
                const { nombre_usuario } = user;
                res.status(200).header('Authorization', token).json({
                    error: null,
                    data: `Bienvenido ${nombre_usuario}`,
                    token
                })
            } else {
                return res.status(400).json({error: 'Usuario y/o contraseña inválida'})
            }
        })

    } catch (error){
        res.status(500).json({
            error,
            message : 'Error inesperado'
        })
    }
}

exports.signIn = signIn;
exports.signUp = signUp;