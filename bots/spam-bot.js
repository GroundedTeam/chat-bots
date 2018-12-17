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
        (async function loop(socket, apiServer, user) {
            const {data} = await axios.get(`${apiServer}/chats/users/${user.id}`);
            const rand = Math.round(Math.random() * (12000 - 1000)) + 1000;

            const sendSpam = function (chats, message = "Spam message") {
                for (const chat of chats) {
                    socket.emit("message", {
                        text: message,
                        senderId: user.id,
                        roomId: chat.id,
                    })
                }
            };

            setTimeout((chats, socket, user) => {
                sendSpam(chats);
                loop(socket, apiServer, user);
            }, rand, data.data, socket, user);

        }(socket, this.apiServer, this.user));
    }
}

module.exports = {
    SpamBot
};
