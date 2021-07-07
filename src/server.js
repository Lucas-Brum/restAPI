const app = require('./app')

var PORT = process.env.PORT || 8080 // esta direcionado para uma porta, talvez tenha que alterar no futurocl
app.listen(PORT, () => {
    console.log(`app listen on port ${PORT}`)
})