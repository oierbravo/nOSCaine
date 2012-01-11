$(document).ready(function(){
var socket = io.connect('http://127.0.0.1',{port:3000});
      socket.on('connect',function(){
        console.log('con');
      });
      socket.on('oscMessage', function (data) {
        //console.log(data);
        console.log(data.message);
        $('#messages').append($('<li></li>').text(data.message.address + ' ' +  data.message.args.join(',')));
      });
      $('#sniff-btn').click(function(){
        server = {
          host: $('input[name="host"]').val()
          ,port: $('input[name="port"]').val()
        }
      socket.emit('sniff', server);

      });
 });