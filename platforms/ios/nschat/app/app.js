var application = require("application");
global.PUBNUB;

application.onLaunch = function() {
  console.log('initializing pubnub...');

  global.CHANNEL = 'chat';

  global.PUBNUB = PUBNUB = require('./pubnub')({
    publish_key: 'pub-c-bc44ba83-7118-4b40-b642-e6a33b0f4516',
    subscribe_key: 'sub-c-034cb7f6-1ea7-11e5-9205-0619f8945a4f',
    jsonp: true,
    uuid: 'iPhone'
  });

  PUBNUB.subscribe({
    channel: CHANNEL,
    callback: console.log('cb called!?'),
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

}

application.mainModule = "main-page";
application.cssFile = "./app.css";
application.start();
