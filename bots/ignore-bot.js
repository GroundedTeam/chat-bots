const io = require('socket.io-client');
const Bot = require('./bot').Bot;

class IgnoreBot extends Bot {
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
    }
}

module.exports = {
    IgnoreBot
};
