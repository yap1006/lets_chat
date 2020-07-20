const socket =io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageINP');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');
const append = (message, position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='l')
{
audio.play();
}
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`You: ${message}`,'r');
    socket.emit('send',message);
    messageInput.value=''
})  
const name = prompt("enter your name");
socket.emit('new-user-joined',name);
socket.on('user-joined',name =>{
append(`${name} joined the group`,'r')
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'l')
    })
socket.on('left',name=>{
append(`${name} left the group`,'r')
    })
