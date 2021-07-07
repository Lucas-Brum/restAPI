const  Mongoose = require("mongoose")
// conecção com mongoDB Pode ser usado para connnectar com outros bancos
class connection {
    constructor() {
        this.dataBaseConnectionMongoDB()
    }
    //mongo
    dataBaseConnectionMongoDB(){
        this.mongoDBConnection = Mongoose.connect("mongodb://localhost/nodejs", {
            userNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() =>{
            console.log("Conexão estabelecida com Mongo com sucesso")
        })
        .catch((error) =>{
            console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`)
        })
    }
}

module.exports = new connection();