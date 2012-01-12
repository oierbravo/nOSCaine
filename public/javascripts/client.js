$(document).ready(function(){
var socket = io.connect('http://127.0.0.1',{port:3000});
      socket.on('connect',function(){
        console.log('con');
      });
      var oscCollection = new oscMessages();
      var messagesView = new OSCMessagesListView({el:$('#msgs'),collection:oscCollection});
      socket.on('oscMessage', function (data) {
        //console.log(data);
        console.log(data.message);
        message = new oscMessage(data.message);
        messagesView.addMessage(message);
        console.log(messagesView.collection);
        //$('#messages').append($('<li></li>').text(data.message.address + ' ' +  data.message.args.join(',')));
      });
      $('#sniff-btn').click(function(){
        server = {
          host: $('input[name="host"]').val()
          ,port: $('input[name="port"]').val()
        }
      socket.emit('sniff', server);

      });
      
   //   message = new oscMessage({address:'/o',args:[]});
    //  console.log(message.address);
      //messagesView.addMessage(message);
 });