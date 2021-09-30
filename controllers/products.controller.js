const sequelize = require('../conexion');
const bcrypt = require('bcrypt')
const jwt =  require("jsonwebtoken");
require('dotenv').config();

const create =  async (req,res) => {
    const { name, description, price, img } = req.body;
    let arrayInsertProduct = [`${name}`,`${description}`,`${price}`,`${img}`];
    try {
        let resp = await sequelize.query('INSERT into productos (nombre, descripcion, precio, imagen) values (?,?,?,?)',
        {replacements: arrayInsertProduct, type: sequelize.QueryTypes.INSERT});
        res.status(200).json({msg: "Producto creado con exito"})
    }catch(error) {
        if (error.name) {
            res.status(400).json({
                error,
                message : 'error en la creación'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const all = async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM productos', {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const by_id = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM productos 
        WHERE id_producto = ${req.params.id}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const edit = async ( req, res) => {
    const { nombre, price, img, description } = req.body

    try {
        const result = await sequelize.query(`UPDATE products 
        SET nombre = "${nombre}",  
        precio = "${price}", img = "${img}" , description = "${description}" 
        WHERE id_producto = ${req.params.id}`,
        { type: sequelize.QueryTypes.INSERT })
        res.status(204).json({
            message: 'Plato actulizado',
            result,
    })

    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message: 'error en la actualización'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const remove = async ( req, res) => {
    try {
        const result = await sequelize.query(`DELETE FROM productos WHERE id_producto = ${req.params.id}`)
        res.status(204).json({
            message: 'Plato eliminado',
            result
        })
    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message: 'error en la eliminación'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

exports.all = all;
exports.create = create;
exports.edit = edit;
exports.remove = remove;
exports.by_id = by_id;