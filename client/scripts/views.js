var ChatView = Backbone.View.extend({

  el: 'div',

  template: _.template('<span class="username"><%= chat.username %></span><span class="text"><%= chat.text %></span>'),

  initialize: function(){

  },
  //this.template({chat: this.model.toJSON()}
  render: function(){
    var chat = this.model;
    return this.$el.html(this.template({chat: chat.toJSON()}));
  },

});

var AppView = Backbone.View.extend({

  el: '#chats',

  initialize: function() {
    this.listenTo(chats,'add',this.addChat);
  },

  addChat: function(chat) {
    var chatView = new ChatView({model:chat});
    this.$el.append(chatView.render().el);
  }

});

$(function(){
  var appView = new AppView();
  chats.add({username: 'bob', text: 'yooo'});
});
