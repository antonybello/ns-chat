var pubnub = require('pubnub')({
  publish_key: 'pub-c-bc44ba83-7118-4b40-b642-e6a33b0f4516',
  subscribe_key: 'sub-c-034cb7f6-1ea7-11e5-9205-0619f8945a4f',
  ssl: false,
  origin: 'pubsub.pubnub.com'
});

exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = vmModule.mainViewModel;
  chat();
}

var chat = function() {
    pubnub.subscribe({
      channel: 'dualchat',
      message: function(message, env, channel) {
        // RECEIVED A MESSAGE.
        console.log(message)
      },
      connect: function() {
        console.log("Phone Connected")
      },
      disconnect: function() {
        console.log("Disconnected")
      },
      reconnect: function() {
        console.log("Reconnected")
      },
      error: function() {
        console.log("Network Error")
      }
    });
