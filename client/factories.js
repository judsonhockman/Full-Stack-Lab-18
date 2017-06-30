angular.module('myChirperAngularApp.factories', [])
.factory('Chirpfactory', [function() {
var f = {};

f.getWordOfTheDay = function() {
    return "Nooga";
}
return f;
}])
.factory('Chirp', ['$resource', function ($resource) {
    return $resource('/api/chirps/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}]);