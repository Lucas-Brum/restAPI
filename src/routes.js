const { Router } = require('express')


const authMidleware = require('./app/Midlewares/AuthMidlewares')
const LoginController = require('./app/Controllers/LoginController')
const UserController = require('./app/Controllers/UserController')

const routes = new Router();

routes.post('/user', UserController.store )
routes.get('/user', authMidleware, UserController.show )

routes.post("/login", LoginController.index)

module.exports = routes;