const sign_in =  async (req,res) => {
    console.log("register route");
    res.status(200).json({msg: "register route"})
}

exports.sign_in = sign_in;