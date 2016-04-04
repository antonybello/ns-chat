var labelModule = require("ui/label");
var view = require("ui/core/view");
var page, panel;

exports.pageLoaded = function(args) {
  page = args.object;
  panel = view.getViewById(page, "layout");
  appendMessage('iPhone Connected.');
}

exports.send = function() {
  var textFieldInput = view.getViewById(page, "task").text;
  if (!textFieldInput) return;
  PUBNUB.publish({
    channel: CHANNEL,
    message: {
      "text": 'iPhone: ' + textFieldInput
    },
    error: function(error) {
      console.log(error);
    }
  });
  appendMessage('iPhone: ' + textFieldInput);
}

var startChat = function() {
PUBNUB.subscribe({
    channel: CHANNEL,
    callback: console.log('cb called!?'),
    // function(m) {
    //   appendMessage(m.text);
    // },
    message: function(m) {
      appendMessage(m.text);
    },
    connect:
      PUBNUB.publish({
        channel: CHANNEL,
        message: {
          'text': 'iPhone connected.'
        }
      }),
    error: function(error) {
      console.log(error);
    }
  });
  // getChatRoomOccupancy();
  // var number = getChatRoomOccupancy();
  // appendMessage('There are ' + number +' people in this room.');
}

var appendMessage = function(m) {
  var label = new labelModule.Label();
  label.text = '' + m;
  label.textWrap = true;
  panel.addChild(label);
}
