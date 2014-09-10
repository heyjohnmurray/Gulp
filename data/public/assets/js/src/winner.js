(function(RV, ko) {
  "use strict";

  function Winner() {
    this.name = ko.observable("");
    this.numCorrect = ko.observable("");
    this.completionTime = ko.observable("");

    this.score = ko.computed(function() {
      return this.numCorrect() + "/12";
    }, this);
  }

  Winner.fromSocketIOResponse = function(response) {
    var winner = new Winner();
    winner.name(response.Name);
    winner.numCorrect(response.PollResult);
    winner.completionTime(response.FormatedTimeCompleted);
    return winner;
  };

  RV.Winner = Winner;
})(window.RV || (window.RV = {}), ko);
