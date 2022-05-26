const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/home', function (req, res) {
    res.status(200).send('Hello express')
})

server.listen(9090, function(){
    console.log('It just works :)')
})
