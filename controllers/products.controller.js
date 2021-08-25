const create =  async (req,res) => {
    console.log("create impl");
    res.status(200).json({msg: "create products route"})
}

exports.create = create;