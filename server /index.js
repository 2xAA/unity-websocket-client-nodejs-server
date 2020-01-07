// this is the websocket server, it's got "readline"
// also which just lets you type in stuff to the
// terminal and read it easily so you can send
// commands to your websocket clients
//
// interactive sessions - so 1980s 😍

const WebSocket = require('ws');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// create the server on port 3333
const wss = new WebSocket.Server({
  port: 3333
});

// an array to store current connected clients
const connections = []

// broadcasts something to every client connected
function broadcastMessage(command) {
  connections.forEach(connection => {
    try {
      connection.send(command)
    } catch(e) {
      console.error(`urrgh fuck ${e}`)
    }
  })
}

// recursive function for reading text input from
// the terminal
function badger() {
  // answer defaults to an empty string
  rl.question('what do you want?: ', (answer = '') => {
    // trim off any spaces and send the input to our clients
    broadcastMessage(answer.trim());

    // restart our interactive input
    badger();
  });
}

// do something when a client connects
wss.on('connection', (client) => {
  // say hello to our new connection
  client.send('yo, hey! message from da server');

  // push the client to your connected clients array
  connections.push(client);

  // listen for when a client sends something to the server
  client.on('message', (message) => {
    console.log('got: %s', message);
  });

  // listen for when the client disconnects
  client.on('close', () => {
    console.log('a connection has closed, l8r m8r');

    // find the index of the closing client in the
    // connections array
    const index = connections.indexOf(client);

    // if we found it, remove it - we don't want to
    // send any message to a closed client
    if (index > -1) {
      connections.splice(index, 1);
      console.log('(we were also able to find that connection and remove it from our connections array, nice)');
    }
  });
});

// start our recursive terminal input so we can type
// stuff and send messages to our clients
badger();
