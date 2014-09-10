(function(RV) {
  "use strict";

  var SOCKET_IO_POLL_INTERVAL = 5000;

  function startPolling(viewModel) {
    var io = window.io.connect();
    io.emit('ready');

    setInterval(function() {
      io.emit('ready');
    }, SOCKET_IO_POLL_INTERVAL);

    io.on('TopUserResponse', function(data) {
      if(data.topResults){
        var results = data.topResults;

        var winners = results.map(function(r) {
          return RV.Winner.fromSocketIOResponse(r);
        });

        viewModel.winners(winners);
      }
    });
  }

  RV.SocketIO = {
    start : startPolling
  };

})( window.RV || (window.RV={}) );
