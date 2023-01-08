const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

const append = (message, position)=>{
    const messageElement = doccument.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append('You: ${message}', 'right');
    socket.emit('sned', message)
    messageInput.value = ''
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name) 

socket.on('user-joined', name=>{
    append('${name} joined the Chat', 'right')
})

socket.on('receive', data=>{
    append('${data.user}: ${data.message}', 'left')
})
