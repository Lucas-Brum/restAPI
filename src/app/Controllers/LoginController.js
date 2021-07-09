const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/auth')

class LoginController {

    async index(req, res) {
        const { email, password } = req.body;

        const userExist = await User.findOne()

        if(userExist) {
            return res.status(400).json({
                error: true,
                message: "usuario não existe"
            })
        }

       if(!(await bcrypt.compare(userExist.password, userExist))) {
           return res.status(400).json({
               erro:true,
               message: "A senha esta invalida!"
           })
       }

       return res.status(200).json({
        user: {
            name: userExist.name,
            email: userExist.email
        },
        token: jwt.sign(
            {id: userExist._id},
            {}, config.secret,
            {expiresIn: config.expiresIn},)
       })
    }
}

module.exports = new LoginController()