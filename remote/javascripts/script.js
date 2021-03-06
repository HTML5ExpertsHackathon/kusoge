

////////////////////////////////////////////////////////////////
//

var voiceAnalyzer, classifier;


$(function(){
  navigator.GetUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  // make instance
  voiceAnalyzer = new VoiceAnalyzer();
  classifier = new Classifier();


  navigator.GetUserMedia_({audio:true, video:false}, function(stream) {
    voiceAnalyzer.start(stream);
  }, function(err) {
    console.warn(err);
  });

  var changeAciton = function(str) {
    $("#"+str).text(str);
    setTimeout(function() {
      $("#"+str).text("...");
      if(connect) connect.send(str);
    }, 300);
  }

  $(function(){
    $("button").on("touchstart", function(ev){
      var command = $(this).data("command");
      if(connect) connect.send(command);
    });


    $(window).on("fft_delta", function(ev, data) {
      var d = [];
      for(var i = 0, l = data.length; i < l; i++) {
        d.push(data[i] / 255);
      }
      var predict = classifier.predict(d);
      if(predict.clap > 0) {
        changeAciton("clap");
      }

      if(predict.whistle > 0) {
        changeAciton("whistle");
      }
    });
  });
});


