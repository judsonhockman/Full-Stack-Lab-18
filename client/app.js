angular.module('myChirperAngularApp', ['myChirperAngularApp.controllers', 'myChirperAngularApp.factories', 'myChirperAngularApp.services', 'ngRoute', 'ngResource']) // Name (myChirperAngularApp in this case) has to match exactly what we call it in index.html. ngRoute is a dependancy
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeController'
    })
    .when('/chirps', {
        templateUrl: 'views/list.html',
        controller: 'ChirpListController'
    })
    .when('/chirps/:theChirpId', {
        templateUrl: 'views/single_view.html',
        controller: 'SingleChirpController'
    })
    .when('/chirps/:id/update', {
        templateUrl: 'views/single_update.html',
        controller: 'UpdateChirpController'
    })
    .otherwise({
        redirectTo: '/'
    });
}])
.controller('WelcomeController', ['$scope', function($scope) { // the name of the controller also has to match exactly...$scope is a dependancy
    $scope.name='John';
   
}]) 
.controller('ChirpListController', ['$scope', '$http', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/api/chirps'
    }).then(function(response) {
        $scope.chirps = response.data;
    }, function(err) {
        console.log(err);
    })
}])

