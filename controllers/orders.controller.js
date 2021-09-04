const create =  async (req,res) => {
    console.log("create impl");
    res.status(200).json({msg: "create order route"})
}

const all = async (req, res) => {
    console.log("obtener todos los productos");
    res.status(200).json({msg: "get all"})
}

const edit = async ( req, res) => {
    res.status(200).json({msg: "edit response"})
}

const remove = async ( req, res) => {
    res.status(200).json({msg: "delete  response"})
}

exports.create = create;
exports.all = all;
exports.edit = edit;
exports.remove = remove;