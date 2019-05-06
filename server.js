import express from 'express';
import path from 'path';
import getCard from './controllers/createCards';
import { PokerHand, Helper } from './controllers/rankController';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const openBrowsers = require('open-browsers');

app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.use('/src', express.static(path.join(__dirname, '/src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(3300, (err) => {
  // openBrowsers('http://localhost:3300');
  console.log('Listening at *:3300');
  console.log(err);
});

io.on('connection', (socket) => {
  // 监听客户端的登陆
  socket.on('chat message', (msg) => {
    const hand = getCard();
    const playerOneHand = new PokerHand(hand);
    // console.log(getCard());
    console.log(msg);
    io.emit('chat message', [hand, Helper.getResult(playerOneHand)]);
  });
});
