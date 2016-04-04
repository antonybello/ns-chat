var pubnub = require('pubnub')({
  publish_key: 'pub-c-bc44ba83-7118-4b40-b642-e6a33b0f4516',
  subscribe_key: 'sub-c-034cb7f6-1ea7-11e5-9205-0619f8945a4f',
  ssl: false,
  origin: 'pubsub.pubnub.com'
});

exports.Chat = function(setup) {
  pubnub.subscribe({
     channel : 'my_channel',
     message : function( message, env, channel ){
        console.log(message)
     },
     connect: function(){console.log("Connected")},
     disconnect: function(){console.log("Disconnected")},
     reconnect: function(){console.log("Reconnected")},
     error: function(){console.log("Network Error")},
  });
}
