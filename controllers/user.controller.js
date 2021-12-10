const sequelize = require('../conexion');
const bcrypt = require('bcrypt')
const jwt =  require("jsonwebtoken");
require('dotenv').config();
const key = process.env.LANG;

const createUser =  async (req,res) => {
    const {name, email, phone, address, password, role} = req.body;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let arrayInsertUser = [`${name}`,`${email}`,`${phone}`,`${address}`,`${hashedPassword}`, `${role}`];
    try{
        const result = await sequelize.query('INSERT into usuarios (nombre_usuario, email, telefono, direccion, contrasenia, id_tipo_usuario) values (?,?,?,?,?,?)',
        {replacements: arrayInsertUser, type: sequelize.QueryTypes.INSERT});
        res.status(201).json({
            message: 'usuario creado con exito',
            result
        })
    }catch(err){
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                err,
                message : 'Usuario ya existe'
            })
        } else {
            res.status(500).json({
                err,
                message : 'Error inesperado'
            })
        }
    }
}

const getUsers = async (req, res) => {
    try{
        const result = await sequelize.query('SELECT * FROM usuarios', {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    }catch(error){
        if (error.name) {
            res.status(404).json({
                error,
                message: 'Usuarios no encontrados'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const getUsersById = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM usuarios 
        WHERE id_usuario = ${req.params.userId}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'Usuario no encontrado'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const updateUsersById = async (req, res) => {
    const {id_role} = req.body

    try {
        const result = await sequelize.query(`UPDATE usuarios 
        SET id_tipo_usuario = ${id_role} WHERE id_usuario = ${req.params.userId}`,
        { type: sequelize.QueryTypes.UPDATE })
        res.status(204).json({
            message: 'user actulizado',
            result
    })

    }catch(err){
        if (err.name) {
            res.status(400).json({
                err,
                message : 'error en la actualizacion'
            })
        } else {
            res.status(500).json({
                err,
                message : 'Error inesperado'
            })
        }
    }
}

const deleteUsersById = async (req, res) => {
    try {
        const result = await sequelize.query(`DELETE FROM usuarios WHERE id_usuario = ${req.params.userId}`)
        res.status(204).json({
            message: 'user eliminado',
            result
        })
    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message : 'error en la eliminación'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUsersById = getUsersById;
exports.updateUsersById = updateUsersById;
exports.deleteUsersById = deleteUsersById;