const http = require('http');
const connector = require("./bots-connector");

const port = 3001;

const server = http.createServer((request, response) => {
});

connector.connect();

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
