(function() {
  var RV = window.RV || (window.RV = {});

  var SOCKET_IO_POLL_INTERVAL = 5000;
  var DASHBOARD_DURATION = 2000;
  var PROMO_DURATION = 2000;

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

  function startPolling(viewModel) {
    io = io.connect();
    io.emit('ready');

    setInterval(function() {
      io.emit('ready');
    }, 5000);

    io.on('TopUserResponse', function(data) {
      if(data.topResults){
        var results = data.topResults;
        console.log(results);
        var winners = results.map(function(r) {
          return Winner.fromSocketIOResponse(r);
        });

        console.log(winners);

        viewModel.winners(winners);
      }
    });
  }

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


  var model = new DashboardViewModel();

  $(function() {
    ko.applyBindings(model);
    startPolling(model);
    startToggling(model);
  });
})();
