
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

var io = require('socket.io');
io = io.listen(app);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var osc = require('./node-osc/lib/osc');

var oscServer = new osc.Server(9001, '0.0.0.0');
// bind callbacks.
io.sockets.on('connection', function(socket) {
  socket.broadcast.emit('info', socket.sessionId + ' connected');
  socket.on('sniff',function (serverInfo){
    console.log(serverInfo);
  });
  oscServer.on("message", function (msg, rinfo) {
  console.log("OSC message:");
  console.log(msg);
  socket.emit('oscMessage', { message: parseMessage(msg) });
});
    });
function parseMessage(msg){
  
  return {
    address: msg.shift()
    ,args: msg
    }
}