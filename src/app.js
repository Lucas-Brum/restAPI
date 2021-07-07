const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const morgan = require('morgan')
require('./config/connection')

class app {
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }
    
    middlewares(){
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use((req, res, next) => {
            res.header('Access-Controll-Allow-Origin', '*')
            res.header('Access-Controll-Allow-Methods', 'Get, POST, PUT, DELETE')
            res.header('Access-Controll-Allow-Headers', 'Access, content-type, Autorization, Acept, Origin, X-R requested-With')

            this.app.use(cors())
            next()
        })
    }
    
    routes(){
        this.app.use(routes)
    }
}

module.exports = new app().app

var teste