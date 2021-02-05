require("dotenv").config()
const app = require("express")();
const cors = require('cors');
let users = []
let messages = []
let index = 0

const corsOptions = {
    origin: [
        'http://localhost:8080'
    ],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port %s', process.env.PORT || 3000);
});
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", socket => {
    console.log('started...');
	socket.emit('loggedIn', {
		users: users.map(s => s.username),
		messages
	});

    socket.on('newuser', username => {
		console.log(`${username} подключился к чату.`);
		socket.username = username;
		
		users.push(socket);

		io.emit('userOnline', socket.username);
	});

    socket.on("msg", msg => {
        let message = {
            index,
            username: socket.username,
            msg
        }

        messages.push(message)

        io.emit("msg", message);

        index++;
    });

    //disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} покинул чат.`);
        io.emit("userLeft", socket.username)
        users.splice(users.indexOf(socket), 1);
    });
})
