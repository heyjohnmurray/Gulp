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
