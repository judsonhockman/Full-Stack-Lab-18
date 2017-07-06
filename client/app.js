angular.module('myChirperAngularApp', ['chirper.controllers', 'chirper.factories', 'ngRoute', 'ngResource']) // Name (myChirperAngularApp in this case) has to match exactly what we call it in index.html. ngRoute is a dependancy
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/welcome.html',
    })
    .when('/chirps', {
        templateUrl: 'views/list.html',
        controller: 'ChirpListController'
    })
    .when('/chirps/:theChirpId/update', {
        templateUrl: 'views/single_update.html',
        controller: 'UpdateChirpController'
    })
    .when('/chirps/:theChirpId', {
        templateUrl: 'views/single_view.html',
        controller: 'SingleChirpController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);


