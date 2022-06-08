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
    console.log(`Client ${socket.handshake.address} is connected`)

    socket.on('disconnect', () => {
        console.log(`is disconnected`)
    })

    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`)
        io.emit('chat message', msg)
    })

    socket.emit('messages', messages)
})

server.listen(PORT, () => {
    console.log(`Listening on port :${PORT}`)
})
