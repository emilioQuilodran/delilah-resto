const { Sequelize } = require("../conexion");
const jwt = require('jsonwebtoken');
const sequelize = require("../conexion");
require('dotenv').config()

const create =  async (req,res) => {
    const {id_order, id_user, id_payment_method, id_status} = req.body;
    let arrayInsertOrder = [`${id_order}`,`${id_user}`,`${id_payment_method}`,`${id_status}`];
    try {
        const result = await Sequelize.query('INSERT into orders (id_pedido, id_usuario, id_metodo_pago, id_estado) VALUES (?,?,?,?)',
        {replacements: arrayInsertOrder, type: sequelize.queryTypes.INSERT })
        res.status(201).json({
            message: "orden creada",
            result
        })
    }catch(error){
        if (error.name) {
            res.status(400).json({
                error,
                message: 'error en la creación del pedido'
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
        const result = await sequelize.query(`SELECT id_pedido, hora, p.nombre, mp.nombre, u.nombre_usuario, u.direccion, u.email, e.nombre
        FROM pedidos left join usuarios u using(id_usuario)
        left join productos p using(id_producto)
        left join estado e using(id_estado)
        left join metodo_pago mp using(id_metodo_pago)`, {type: sequelize.queryTypes.SELECT})
        res.status(201).json({result})
    }catch(err){
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

const getUserOrders = async(req,res) => {
    const token = req.header('Authorization')
    const verify = jwt.verify(token, process.env.TOKEN_SECRET)

    try {
        const result = await sequelize.query(`SELECT id_pedido, hora, p.nombre, mp.nombre, u.nombre_usuario, u.direccion, u.email, e.nombre
        FROM pedidos left join usuarios u using(id_usuario)
        left join productos p using(id_producto)
        left join estado e using(id_estado)
        left join metodo_pago mp using(id_metodo_pago) WHERE id_usuario = ${verify.id_user}`, 
        {type: sequelize.queryTypes.SELECT})
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
    const {id_status} = req.body;
    try {
        const result = await sequelize.query(`UPDATE pedidos 
        SET id_estado = "${id_status}" 
        WHERE id_pedido = ${req.params.orderId}`,
        { type: sequelize.QueryTypes.INSERT })
        res.status(204).json({
            message: 'orden actulizada',
            result
    })

    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message : 'error en la actualización'
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
        const result = await sequelize.query(`DELETE FROM pedidos WHERE id_pedido = ${req.params.orderId}`)
        res.status(204).json({
            message: 'orden eliminada',
            result
        })
    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message : 'error al querer eliminar la orden'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

exports.create = create;
exports.all = all;
exports.getUserOrders = getUserOrders;
exports.edit = edit;
exports.remove = remove;