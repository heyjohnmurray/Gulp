(function(RV) {
  "use strict";

  var DASHBOARD_DURATION = 10000;
  var PROMO_DURATION = 5000;

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
