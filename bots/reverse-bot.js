const io = require('socket.io-client');

class ReverseBot {
    constructor() {
        this.user = {};
    }

    connect() {
        const socket = io('http://localhost:3000', {
            query: {
                type: 'bot',
                name: "Reverse bot"
            }
        });

        socket.on('register', data => {
            this.user.id = data.user.id;
        });

        socket.on('new-message', data => {
            setTimeout(() => {
                socket.emit("message", {
                    text: this.reverseText(data.content.text),
                    senderId: this.user.id,
                    roomId: data.chatId,
                    receiverId: data.content.sender.id,
                })
            }, 3000);
        });
    }

    reverseText(text) {
        return text.split('').reverse().join('')
    }
}

module.exports = {
    ReverseBot
};
