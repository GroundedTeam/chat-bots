const io = require('socket.io-client');
const axios = require('axios');
const Bot = require('./bot').Bot;

class SpamBot extends Bot {
    constructor(name) {
        super(name);
    }

    connect() {
        const socket = io(this.wsServer, {
            query: {
                type: this.type,
                name: this.name
            }
        });

        socket.on('register', async data => {
            this.user = data.user;

            try {
                this.loopSpam(socket);
            } catch (e) {
                console.error(e);
            }
        });
    }

    loopSpam(socket) {
        (async function loop(socket, apiServer, userId) {
            const {data} = await axios.get(`${apiServer}/chats/users/${userId}`);
            const rand = Math.round(Math.random() * (120000 - 10000)) + 10000;
            setTimeout((chats, socket, userId) => {
                for (const chat of chats) {
                    socket.emit("message", {
                        text: "Spam message",
                        senderId: userId,
                        roomId: chat.id,
                    })
                }
                loop(socket, apiServer, userId);
            }, rand, data.data, socket, userId);

        }(socket, this.apiServer, this.user.id));
    }
}

module.exports = {
    SpamBot
};
