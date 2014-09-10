/*
 *
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT DIRECTLY, INSTEAD BUILD WITH grunt. 
 * 
 */
(function(RV) {
  "use strict";

  var DASHBOARD_DURATION = 2000;
  var PROMO_DURATION = 2000;

  function startToggling(model) {
    showDashboard(model);
  }

  function showDashboard(model) {
    model.dashboardVisible(true);
    model.promoVisible(false);

    setTimeout(function() {
      showPromo(model);
    }, DASHBOARD_DURATION);
  }

  function showPromo(model) {
    model.dashboardVisible(false);
    model.promoVisible(true);

    setTimeout(function() {
      showDashboard(model);
    }, PROMO_DURATION);
  }

  RV.DashboardToggle = {
    start: startToggling
  };

})(window.RV || (window.RV={}));

(function(RV) {
  "use strict";

  function DashboardViewModel() {
    this.winners = ko.observableArray([]);
    this.dashboardVisible = ko.observable(true);
    this.promoVisible = ko.observable(false);

    this.toggle = function() {
      var showingDash = this.dashboardVisible();
      this.dashboardVisible(!showingDash);
      this.promoVisible(showingDash);
    };
  }

  RV.DashboardViewModel = DashboardViewModel;
})(window.RV || (window.RV={}));


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

(function(RV, ko) {
  "use strict";

  function Winner() {
    this.name = ko.observable("");
    this.score = ko.observable("");
    this.completionTime = ko.observable("");
  }

  Winner.fromSocketIOResponse = function(response) {
    var winner = new Winner();
    winner.name(response.Name);
    winner.score(response.PollResult);
    winner.completionTime(response.FormatedTimeCompleted);
    return winner;
  };

  RV.Winner = Winner;
})(window.RV || (window.RV = {}), ko);
