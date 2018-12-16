const io = require('socket.io-client');
const axios = require('axios');

class SpamBot {
    constructor() {
        this.user = undefined;
        this.apiServer = 'http://localhost:3000';
    }

    connect() {
        const socket = io(this.apiServer, {
            query: {
                type: 'bot',
                name: "Spam bot"
            }
        });

        socket.on('register', async data => {
            this.user = data.user;

            try {
                const {data} = await axios.get(`${this.apiServer}/api/chats/users/${this.user.id}`);

                (function loop(user, chats) {
                    const rand = Math.round(Math.random() * (3000 - 500)) + 500;

                    setTimeout((chats) => {
                        for (const chat of chats) {
                            socket.emit("message", {
                                text: "Spam message",
                                senderId: user.id,
                                roomId: chat.id,
                            })
                        }
                        loop(rand, chats);
                    }, rand, chats);

                }(this.user, data.data));
            } catch (e) {
                console.error(e);
            }
        });
    }
}

module.exports = {
    SpamBot
};
