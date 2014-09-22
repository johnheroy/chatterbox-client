// YOUR CODE HERE:
var app = {

  init: function(){
    this.server = 'https://api.parse.com/1/classes/chatterbox';
    $('#username-input').val(window.location.search.substring(1).split('=')[1]);
  },

  send: function(message){
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data){
        console.log('success');
      },
      error: function(data){
        console.log('error on send');
      }
    });
  },

  fetch: function(){
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {
        order: '-createdAt'
      },
      success: function(data){
        var results = data.results;
        app.clearMessages();
        for (var i = 0; i < results.length; i++) {
          app.addMessage(results[i]);
        }
      }
    });
  },

  addMessage: function(data){
    var newChat = $('<div>').addClass('chat');1
    var user = $('<span>').addClass('username').text(data.username);
    var text = $('<span>').addClass('text').text(data.text);
    newChat.append(user);
    newChat.append(text);
    $('#chats').prepend(newChat);
  },

  updateChat: function(){
    app.fetch();
    setInterval(function(){
      app.fetch();
    }, 1000); // andre 3000
  },

  clearMessages: function(){
    $('#chats').html('');
  }

};

$(function(){
  app.init();
  app.updateChat();

  $('#form').submit(function(e){
    e.preventDefault();
    var message = {
      username: $('#username-input').val(),
      text: $('#text').val(),
      roomname: "lobby"
    };
    $('#text').val('');
    app.send(message);
  });

});



