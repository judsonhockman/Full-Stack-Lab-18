angular.module('chirper.controllers', []) // no 'rule' that says this module must be named after the main module's name, it's just a handy convention. Must put in an array, even if it is empty. Otherwise, Angular will try to go out and find the module called myApp.controllers...which doesn't exist.
    .controller('ChirpListController', ['$scope', 'Chirp', 'User', function ($scope, Chirp, User) {
        getChirps();

        $scope.users = User.query();

        $scope.createChirp = function () {
            var payload = {
                message: $scope.newMessage,
                userid: $scope.newUserId
            };
            var c = new Chirp(payload);
            c.$save(function (success) {
                $scope.newMessage = '';
                $scope.newUserId = '';
                getChirps();
            }, function (err) {
                console.log(err);
            });
        }

        function getChirps() {
            $scope.chirps = Chirp.query();
        }
    }])
    .controller('SingleChirpController', ['$scope', 'Chirp', '$location', '$routeParams', function ($scope, Chirp, $location, $routeParams) {  // SingleChirpController also appears in applicationCache.js //
       
        $scope.chirp = Chirp.get({ id: $routeParams.theChirpId }); // .get is a $resource app

        $scope.editChirp = function() {
            $location.path('/api/chirps/' + $routeParams.theChirpId + '/update');
        }
        
        $scope.deleteChirp = function () {
            if (confirm('Are you sure you want to delete this chirp?')) {
                    $scope.chirp.$delete(function(success) {
                            $location.replace().path('/chirps');
                    }, function(err) {
                        console.log(err);
                    });
            }
        }
    }])
    .controller('UpdateChirpController', ['$scope', 'Chirp', '$location', '$routeParams', function ($scope, Chirp, $location, $routeParams) {
        $scope.chirp = Chirp.get({ id: $routeParams.theChirpId });
        
        $scope.updateChirp = function() {
            $scope.chirp.$update(function() {
// $location.path('/chirps/' + $routeParams.theChirpId); not this, but this...:window
        window.history.back();
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