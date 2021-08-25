const login =  async (req,res) => {
    console.log("login route");
    res.status(200).json({msg: "login route"})
}

exports.login = login;