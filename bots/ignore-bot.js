const io = require('socket.io-client');

class IgnoreBot {
    connect() {
        const socket = io('http://localhost:3000', {
            query: {
                type: 'bot',
                name: "Ignore bot"
            }
        });
    }
}

module.exports = {
    IgnoreBot
};
