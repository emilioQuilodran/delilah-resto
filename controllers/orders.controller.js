const create =  async (req,res) => {
    console.log("create impl");
    res.status(200).json({msg: "create order route"})
}

exports.create = create;