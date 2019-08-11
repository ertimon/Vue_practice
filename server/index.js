let express = require('express');

let app = express();

let http = require('http').createServer(app);

let io = require('socket.io')(http);

http.listen(3000, () => {
    console.log('listening on *:3000')
})

io.on('connection', (socket) => {
    console.log("user: " + socket.id);
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('NEW_MESSAGE', data);
    });
});