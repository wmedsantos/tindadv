const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const assert = require('assert')
const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

const mongoURL = 'mongodb+srv://tadvusr:tadv123@cluster0-ox348.mongodb.net/test?retryWrites=true&w=majority';
//const mongoURL = 'mongodb://localhost/Tindev';
//mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-jxhrd.mongodb.net/omnistack8?retryWrites=true&w=majority', 
mongoose.connect(mongoURL, {
    useNewUrlParser: true
});

const Proc = require('./models/Proc');

const procs = Proc.find();
var procCount = 0;
Proc.countDocuments({}).exec((err, count) => {
  console.log('count'); 
  console.log(count);
  procCount = count;
  console.log('procCount');
  console.log(procCount);
  if (procCount==0){
    var path = process.cwd();
    fs.readFile(path + '/src/models/Procs.json', 'utf8', function (err, data) {
      if (err) throw err;
      console.log(data);
      var json = JSON.parse(data);
      
      Proc.collection.insertMany(json, function(err,r) {
            //assert.equal(null, err);
            //assert.equal(3, r.insertedCount);
            
      });
    });
  }    
 });
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
