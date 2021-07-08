const User = require('../Models/User')
const bcrypt = require('bcryptjs')

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

    }
}

module.exports = new LoginController()