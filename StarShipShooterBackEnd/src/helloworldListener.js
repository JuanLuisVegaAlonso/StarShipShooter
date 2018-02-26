module.exports = function (app) {

    app.get('/helloWorld', (req, res) => res.send('Hello World!'))

    var WebSocketServer = require('websocket').server;
    var http = require('http');


    var server = http.createServer(function (request, response) {
        // process HTTP request. Since we're writing just WebSockets
        // server we don't have to implement anything.
    });

    


    server.listen(1337, () => { });
    wsServer = new WebSocketServer({ httpServer: server });

    let connections = [];
    wsServer.on('request', (request) =>  {
        var connection = request.accept(null, request.origin);
        connections.push(connection);
            // This is the most important callback for us, we'll handle
            // all messages from users here.
            connection.on('message', message => {
                console.log(message);
                if (message.type === 'utf8') {
                    // process WebSocket message
                    for(let connection of connections ){
                        connection.sendUTF(JSON.stringify(message));

                    }   

                }
            });

        connection.on('close', function (connection) {
            // close user connection
            connections.splice(connections.indexOf(connection));
        });
    });
    //other routes..
}