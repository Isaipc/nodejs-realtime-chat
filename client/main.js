var socket = io()

socket.on('messages', function (data) {
    render(data)
})

function render(data) {
    var html = data.map(function (message, index) {
        return (`
         <div class="message">
            
            <strong>${message.nickname}</strong>
            <p>${message.text}</p>
         </div>
        `)
    })

    document.getElementById('messages').innerHTML = html
}

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

socket.on('chat message', function (data) {
    var item = document.createElement('div')
    var msg = document.createElement('p')
    item.classList.add('message')
    msg.textContent = data
    item.appendChild(msg)

    messages.appendChild(item)

    window.scrollTo(0, document.body.scrollHeight)

})