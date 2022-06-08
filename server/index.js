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
    
    socket.on('disconnect', () => {
        console.log(`Client ${CLIENT_ADDRESS} is disconnected`)
    })

    socket.on('chat message', (msg) => {
        console.log(`${CLIENT_ADDRESS} says: ${msg}`)
        socket.broadcast.emit('chat message', msg)
    })
    
    socket.on('nickname', (nickname) => {
        console.log(`Client ${CLIENT_ADDRESS} now has a nickname: ${nickname}`)
        io.emit('socket message', `${nickname} is connected`)
    })

})

server.listen(PORT, () => {
    console.log(`Listening on port :${PORT}`)
})
