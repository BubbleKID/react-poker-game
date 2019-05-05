var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var openBrowsers = require('open-browsers');
import { getCard } from './controllers/createCards';
import { PokerHand, Helper } from './controllers/rankController';

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/src', express.static(__dirname + '/src'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(3300, function(err) {
  openBrowsers('http://localhost:3300');
  console.log('Listening at *:3300');
});

io.on('connection', function(socket) {
  // 监听客户端的登陆
  socket.on('chat message', function(msg) {
    var hand = getCard();
    var playerOneHand = new PokerHand(hand);
    //console.log(getCard());
    io.emit('chat message', [hand, Helper.getResult(playerOneHand)]);
  });
});
