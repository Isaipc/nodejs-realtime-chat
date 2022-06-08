const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 5000

app.use(express.static('client'))

var clients = []
var clientId = 0

var messageId = 0
var messages = [
    {
        id: ++messageId,
        text: 'Welcome',
        nickname: 'Chatbot'
    },
    {
        id: ++messageId,
        text: 'This is a test',
        nickname: 'Chatbot'
    },
    {
        id: ++messageId,
        text: 'This is another test',
        nickname: 'Chatbot'
    }
]


io.on('connection', function (socket) {
    const CLIENT_ADDRESS = socket.handshake.address

    console.log(`Client ${CLIENT_ADDRESS} is connected`)

    messages.forEach(msg => {
        console.log(msg)
        io.emit('chat message', msg)
    });

    socket.on('disconnect', () => {
        console.log(`Client ${CLIENT_ADDRESS} is disconnected`)

        const data = {
            text: `A user is disconnected`
        }

        socket.broadcast.emit('socket message', data)
    })

    socket.on('chat message', (data) => {
        messages.push({
            id: ++messageId,
            text: data.text,
            nickname: data.nickname
        })
        console.log(messages)

        console.log(`${CLIENT_ADDRESS} says: ${data.text}`)
        socket.broadcast.emit('chat message', data)

    })

    socket.on('nickname', (nickname) => {
        console.log(`Client ${CLIENT_ADDRESS} now has a nickname: ${nickname}`)

        const data = {
            text: `${nickname} is connected`,
        }

        io.emit('socket message', data)

        clients.push({
            id: ++clientId,
            address: CLIENT_ADDRESS,
            nickname: nickname
        })

        console.log(clients)
    })

    socket.on('typing', (data) => {
        console.log(`Client ${data.nickname} is typing`)
        socket.broadcast.emit('client is typing', data)
    })

})

server.listen(PORT, () => {
    console.log(`Listening on port :${PORT}`)
})
