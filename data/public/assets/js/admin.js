(function() {

  function AddUserViewModel() {
    this.firstName = ko.observable("");
    this.lastName = ko.observable("");
    this.message = ko.observable("");

    this.save = function() {
      var data = {
        FirstName: this.firstName(),
        LastName: this.lastName()
      };

      if (data.FirstName == "" || data.LastName == "") {
        this.message("First and Last names are required");
        return;
      }

      var self = this;

      $.post("/admin/user/", data).error(function(err) {
        if (obj = JSON.parse(err.responseText)) {
          self.message(obj.message);
        } else {
          self.message("unknown error: " + err.responseText);
        }
      }).success(function(data) {
        self.firstName("");
        self.lastName("");
        self.message("User created successfully");
      });
    };
  }

  function ResetUserViewModel() {
    this.firstName = ko.observable("");
    this.lastName  = ko.observable("");
    this.message   = ko.observable("");

    this.reset = function() {
      var self = this;

      var data = {
        FirstName: this.firstName(),
        LastName: this.lastName()
      };

      $.post("/admin/reset/", data).error(function(err) {
        try{
          obj = JSON.parse(err.responseText);
          self.message(obj.message);
        } catch(ex) {
          self.message("unknown error: " + err.responseText);
        }
      }).success(function(data) {
        self.firstName("");
        self.lastName("");
        self.message("User reset successfully");
      });
    };
  }


  window.RV = {
    AddUserViewModel : AddUserViewModel,
    ResetUserViewModel: ResetUserViewModel
  };
})();
