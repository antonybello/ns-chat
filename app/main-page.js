var labelModule = require("ui/label");
var view = require("ui/core/view");
var CHANNEL = 'chat';
var page, panel;

var pubnub = require('./pubnub')({
  publish_key: 'pub-c-bc44ba83-7118-4b40-b642-e6a33b0f4516',
  subscribe_key: 'sub-c-034cb7f6-1ea7-11e5-9205-0619f8945a4f',
  ssl: false,
  origin: 'pubsub.pubnub.com'
});

exports.pageLoaded = function(args) {
  page = args.object;
  panel = view.getViewById(page, "layout");
  startChat();
}

var startChat = function() {
  pubnub.subscribe({
    channel: CHANNEL,
    message: 'hi',
    callback: 'i wonder',
    connect: pubnub.publish({
      channel: CHANNEL,
      message: 'iPhone connected.'
    }),
    error: function(error) {
      console.log(JSON.stringify(error));
    }
  });
}

exports.send = function() {
  var textFieldInput = view.getViewById(page, "task").text;
  if (!textFieldInput) return;
  pubnub.publish({
    channel: CHANNEL,
    message: 'iPhone: ' + textFieldInput,
    callback: function() {
      console.log('callback called from send');
    },
    error: function(error) {
      console.log(JSON.stringify(error));
    }
  });
  appendMessage('iPhone: ' + textFieldInput);
}


var appendMessage = function(m) {
  var label = new labelModule.Label();
  label.text = '' + m;
  label.textWrap = true;
  panel.addChild(label);
}
