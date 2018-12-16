const io = require('socket.io-client');

class EchoBot {
    constructor() {
        this.user = undefined;
    }

    connect() {
        const socket = io('http://localhost:3000', {
            query: {
                type: 'bot',
                name: "Echo bot"
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
