angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: '/views/home.html',
			controller: 'mainController'
		})

		.when('/polls/', {
			templateUrl: '/views/polls.html',
			controller: 'mainController'
		})

	$locationProvider.html5Mode(true);

}]);
