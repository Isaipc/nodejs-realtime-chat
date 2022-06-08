var socket = io()
var form = document.getElementById('form')
var input = document.getElementById('input')
var messages = document.getElementById('messages')
var isTyping = document.getElementById('clientIsTyping')
var timeout;

var nickname = prompt('Please give us a nickname')
if (nickname === null || nickname === '')
    nickname = generateName()

socket.emit('nickname', nickname)
document.getElementById('nickname').textContent = nickname


input.focus()

// EVENTS
form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (input.value) {
        const data = {
            text: input.value,
            nickname: nickname
        }

        socket.emit('chat message', data)
        renderMessage(data, 'emitter')
        input.value = ''
    }
})

input.addEventListener('keydown', function () {
    socket.emit('typing', { nickname: nickname })
})

input.addEventListener('keyup', function () {
    isTyping.textContent = ''
    socket.emit('typing', {})
})

// SOCKET.IO EVENTS
socket.on('socket message', (data) => renderMessage(data, 'socket'))
socket.on('chat message', (data) => renderMessage(data, 'chat'))

socket.on('client is typing', (data) =>  showWhoIsTyping(data))

// Functions
function showWhoIsTyping(data) {
    isTyping.textContent = data.nickname ? `${data.nickname} is typing ... ` : ''
}

function renderMessage(data, type) {
    var containerEl = document.createElement('div')
    var nicknameEl = document.createElement('p')
    var textEl = document.createElement('p')

    containerEl.classList.add(getClass(type))
    nicknameEl.textContent = data.nickname
    textEl.textContent = data.text

    if (type == 'chat')
        containerEl.appendChild(nicknameEl)
    containerEl.appendChild(textEl)
    messages.appendChild(containerEl)

    window.scrollTo(0, document.body.scrollHeight)
}

function getClass(type) {
    const classTypes = {
        socket: 'socket-message',
        chat: 'chat-message',
        emitter: 'emitter-message',
    }

    return classTypes[type] ?? 'class not found'
}