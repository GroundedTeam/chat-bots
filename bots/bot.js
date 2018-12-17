class Bot {
    constructor(name) {
        this.apiServer = 'http://localhost:3000/api';
        this.wsServer = 'http://localhost:3000';
        this.user = undefined;
        this.name = name;
        this.type = 'bot';
    }

    /**
     * Implementation required
     */
    connect() {
        throw new Error('You have to implement the method connect!');
    }
}

module.exports = {
    Bot
};
