const login =  async (req,res) => {
    console.log("login route");
    res.status(200).json({msg: "login route"})
}

const register = async (req, res) => {
    console.log("register route")
    res.status(200).json({msg: "register route"})
}

exports.login = login;
exports.register = register;