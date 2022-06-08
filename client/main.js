var socket = io()
var form = document.getElementById('form')
var input = document.getElementById('input')
var messages = document.getElementById('messages')

var nickname = prompt('Please give us a nickname')
if (nickname === null || nickname === '')
    nickname = generateName()

socket.emit('nickname', nickname)
document.getElementById('nickname').textContent = nickname


input.focus()

// Events
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

socket.on('socket message', function (data) {
    renderMessage(data, 'socket')
})
socket.on('chat message', function (data) {
    renderMessage(data, 'chat')
})

// Functions
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
        emitter: 'emitter-message'
    }

    return classTypes[type] ?? 'class not found'
}