angular.module('myChirperAngularApp.controllers', []) // no 'rule' that says this module must be named after the main module's name, it's just a handy convention. Must put in an array, even if it is empty. Otherwise, Angular will try to go out and find the module called myApp.controllers...which doesn't exist.
    .controller('WelcomeController', ['$scope', 'ChirpFactory', function ($scope, ChirpFactory) {
        getChirps();

        $http({
            method: 'GET',
            url: '/api/users'
        }).then(function (response) {
            $scope.users = response.data;
        }, function (err) {
            console.log(err);
        });

        $scope.createChirp = function () {
            var payload = {
                message: $scope.newMessage,
                userid: $scope.newUserId
            };
            $http({
                method: 'POST',
                url: '/api/chirps',
                data: payload
            }).then(function(reponse) {
                $scope.newMessage = '';
                $scope.newUserId = '';
                getChirps();
            }, function (err) {
                console.log(err);
            })
}

        function getChirps() {
            return $http({
                method: 'GET',
                url: '/api/chirps'
            }).then(function(response) {
                $cope.chirps = response.data;
            }, function (err) {
                console.log(err);
            });
        }
    }])
    .controller('SingleChirpController', ['$scope', '$http', '$location', 'routeParams', function($scope, $http, $location, $routeParams) {
    $http({
        method: 'GET',
        url: '/api/chirps/' + $routeParams.theChirpId
    }).then(function(response) {
        $scope.chirp = response.data;
    }, function(err) {
        console.log(err);
    });

    $scope.editChirp = function() {
        $location.path('/api/chirps/' + $routeParams.theChirpId + '/update');
            }

    $scope.deleteChirp = function() {
        if (confirm('Are you sure you want to delete this chirp?')) {
        $http({
            method: 'DELETE',
            url: '/api/chirps/' + $routeParams.theChirpId 
        }).then(function(response) {
            $location.replace('/chirps');
        },function(err) {
            console.log(err);
        });
    }
    }
}])
.controller('UpdateChirpController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
$http({
    method: 'GET',
    url: '/api/chirps/' +$routeParams.theChirpId
}).then(function(response) {
    $scope.chirp = response.data;
}, function(err) {
    console.log(err);
});
$scope.updateChirp = function() {
    var payload = {
        message: $scope.chirp.message
    };
    $http({
        method: 'PUT',
        url: '/api/chirps/' + $routeParams.theChirpId,
    }).then(function(response) {
        $location.path('/chirps/'  + $routeParams.theChirpId);
    }, function(err) {
        console.log(err);
    });
}
}]);
    
    //     $scope.greeting = 'Welcome to Chirper!';
    //     $scope.ChirpOfDay = ChirpFactory.getChirpOfTheDay();
    // }])
    // .controller('ChirpListController', ['$scope', '$http', function ($scope, $http) {

    //     $scope.chirps = Chirp.query();  // .query = all, .get = just one

    //     $scope.createChirp = function () {
    //         var c = new Chirp({
    //             name: $scope.newName,
    //             chirp: $scope.newChirp
    //         });
    //         p.$save(function (success) {
    //             alert("Your Chirp has been saved!");
    //             $scope.chirps = Chirp.query();
    //             $scope.newName = '';
    //             $scope.newChirp = '';
    //         }, function (err) {
    //             console.log(err);
    //         });
    //     }
    // }])
    // .controller('SingleChirpController', ['$scope', 'Chirp', '$routeParams', function ($scope, Chirp, $routeParams) {

    //     $scope.chirp = Chirp.get({ id: $routeParams.theChirpId });

    //     $scope.deleteChirp = function () {
    //         if (confirm('Are you sure you want to delete this chirp?')) {
    //             $scope.chirp.$delete(function () {
    //                 window.history.back();
    //             }, function (err) {
    //                 console.log(err);
    //             });
    //         }
    //     }
    // }])