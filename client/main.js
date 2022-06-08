const SOCKET_MSG = 0
const CHAT_MSG = 1

var socket = io()
var form = document.getElementById('form')
var input = document.getElementById('input')
var messages = document.getElementById('messages')

input.focus()

form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (input.value) {
        socket.emit('chat message', input.value)
        input.value = ''
    }
})

socket.on('socket message', function (data) {
    renderMessage(data, SOCKET_MSG)
})
socket.on('chat message', function (data) {
    renderMessage(data, CHAT_MSG)
})

function renderMessage(data, type) {
    var item = document.createElement('div')
    var msg = document.createElement('p')

    item.classList.add(type == SOCKET_MSG ? 'socket-message' : 'chat-message')
    msg.textContent = data
    item.appendChild(msg)

    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
}