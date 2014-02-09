// for sctp version mismatching, configuration below is safe in current state.
util.supports.sctp = false;

// Connect to PeerJS, have server assign an ID instead of providing one
// Showing off some of the configs available with PeerJS :).
var peer;
var peerjsLauncher = function(address, port, key){


  peer = new Peer('kusoge-server',  {
    host: address,
      port: port,
      key: key,
      'config':{'iceServers': [
        {'url': "stun:stun.l.google.com:19302"},
      {'url': 'turn:153.149.7.185:443?transport=tcp', 'username': 'iac', 'credential': 'webcore'}
  ]},
      secure: false,
      debug: 3,
      logFunction: function() {
      }
  });

  var connectedPeers = {};

  // Show this peer's ID.
  peer.on('open', function(id){
    console.log('This id : ' + id);
  });

  // Await connections from others
  peer.on('connection', connect);

  // Handle a connection object.
  function connect(c) {
    console.log("connected", c);
    c.on('data', function(data) {
      console.log(data);
      setTimeout(function(){
        switch(data){
          case 'clap': 
            jumpKey = true;
            break;
          case 'whistle': 
            console.log('fire!!');
            startKey = true;
            break;
          default:
            break;
        }
      }, 1000);
    });
 
  }


};


window.onunload = window.onbeforeunload = function(e) {
  if (!!peer && !peer.destroyed) {
    peer.destroy();
  }
};



var address = location.host.split(":")[0]; // "peerserver.skyway.io";
var port = "9000";
var key = "peerjs"; // 'sacdj23r2fjx7q93f';

peerjsLauncher(address, port, key);

