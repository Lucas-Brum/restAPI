const User = require("../Models/User")
const bcrypt = require("bcryptjs")
const yup = require('yup')

class UserController {

    show(req, res) {
        var users = ["Kaio", "Larissa", "Denver"]
        return res.status(200).json({
            error: false,
            users
        })
    }

    async store(req, res) {

        /**
         * validação atravez di yup schema
         * inicio
         */
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res,status(400).json({
                erro: true,
                message: 'Dados invalidos'
            })
        }

        /**
         * validação atravez di YUP schema
         * Fim
         */

        /**
         * Validação no banco de dados
         * Verifica se o usuario já existe por o email
         */

        let userExist = await User.findOne ({ email: req.body.email })
        if(userExist){
            return res.status(400).json({
                error: true,
                message: "Esse usuario já existe"
            })
        }
        /**
         * Desistruturação dos dados da requisição
         */

        const { name, email, password } = req.body
        
        /**
         * Criação da constante data
         */

        const data = { name, email, password }

        /**
         * Cripitografar a senha
         */

        data.password = await bcrypt.hash(data.password, 8)

        /**
         *  Inserir dentro do bando de dados Mongo
         */

        await User.create(data, (err) =>{
            if(err)
                return res.status(400).json({
                    error: true,
                    message: 'Erro ao tentar inseirir usuario no MongoDB'
                })

            return res.status(200).json({
                erro: false,
                message: "Usuario Cadastrado com Sucesso"
            })
        })
    }   
}

module.exports = new UserController()