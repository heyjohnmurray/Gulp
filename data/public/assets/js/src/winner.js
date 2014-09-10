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
