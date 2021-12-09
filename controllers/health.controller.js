const check = async (req, res) => {

    res.status(201).json({
        message: 'Server corriendo'
    })
}

exports.check = check;