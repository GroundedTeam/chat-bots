const io = require('socket.io-client');
const Bot = require('./bot').Bot;

class EchoBot extends Bot {
    constructor(name) {
        super(name);
    }

    connect() {
        const socket = io(this.wsServer, {
            query: {
                type: this.type,
                name: this.name,
            }
        });

        socket.on('register', data => {
            this.user = data.user;
        });

        socket.on('new-message', data => {
            socket.emit("message", {
                text: data.content.text,
                senderId: this.user.id,
                roomId: data.chatId,
                receiverId: data.content.sender.id,
            })
        });
    }
}

module.exports = {
    EchoBot
};
