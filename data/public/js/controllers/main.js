angular.module('mainController', [])

	.controller('mainController', function($scope, $http, $location) {
        $scope.formData = {};


        // when submitting the login form, send the form to the node API
        $scope.login = function() {
                $http.post('/login/', $scope.formData)
                        .success(function(data) {
                                $location.path('/polls/');
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

});
