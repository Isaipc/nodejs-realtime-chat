const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 5000

app.use(express.static('client'))

var messages = [{
    id: 1,
    text: 'Bienvenido',
    nickname: 'Chatbot'
}]

io.on('connection', function (socket) {
    const CLIENT_ADDRESS = socket.handshake.address
    
    console.log(`Client ${CLIENT_ADDRESS} is connected`)
    socket.emit('socket message', 'a new user is connected')

    socket.on('disconnect', () => {
        console.log(`Client ${CLIENT_ADDRESS} is disconnected`)
    })

    socket.on('chat message', (msg) => {
        console.log(`${CLIENT_ADDRESS} says: ${msg}`)
        io.emit('chat message', msg)
    })

})

server.listen(PORT, () => {
    console.log(`Listening on port :${PORT}`)
})
