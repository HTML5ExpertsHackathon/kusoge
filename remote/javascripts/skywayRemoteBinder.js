util.supports.sctp = false;

// Connect to PeerJS, have server assign an ID instead of providing one
// Showing off some of the configs available with PeerJS :).

var peer, connect;

var peerjsLauncher = function(host, port, key){

  peer = new Peer({
    host: host,
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

  // Show this peer's ID.
  peer.on('open', function(id){
    console.log('My ID is ' +id);
    connect = peer.connect('kusoge-server', {serialization: 'json'});
  });

  window.onunload = window.onbeforeunload = function(e) {
    if (!!peer && !peer.destroyed) {
      peer.destroy();
    }
  };
}



  var address = "peerserver.skyway.io";
  var port = "9000";
  var key = 'sacdj23r2fjx7q93f';

  peerjsLauncher(address, port, key);



