function connect() {
    const ReverseBot = require("./bots").ReverseBot;
    const reverseBot = new ReverseBot("Reverse bot");
    reverseBot.connect();

    const EchoBot = require("./bots").EchoBot;
    const echoBot = new EchoBot("Echo bot");
    echoBot.connect();

    const IgnoreBot = require("./bots").IgnoreBot;
    const ignoreBot = new IgnoreBot("Ignore bot");
    ignoreBot.connect();

    const SpamBot = require("./bots").SpamBot;
    const spamBot = new SpamBot("Spam bot");
    spamBot.connect();
}

module.exports = {
    connect
};
