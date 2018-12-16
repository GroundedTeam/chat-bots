function connect() {
    const ReverseBot = require("./bots").ReverseBot;
    const reverseBot = new ReverseBot();
    reverseBot.connect();

    const EchoBot = require("./bots").EchoBot;
    const echoBot = new EchoBot();
    echoBot.connect();

    const IgnoreBot = require("./bots").IgnoreBot;
    const ignoreBot = new IgnoreBot();
    ignoreBot.connect();

    const SpamBot = require("./bots").SpamBot;
    const spamBot = new SpamBot();
    spamBot.connect();
}

module.exports = {
    connect
}
