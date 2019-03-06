angular.module("carryingCapacity", ["ngRoute"])
.config(function($locationProvider, $routeProvider) {
    $locationProvider
        .hashPrefix("");

    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
        .when("/home", {
            templateUrl: "app/character/character.html",
            controller: "charCtrl"
        })
        .otherwise({
            redirectTo: "/home"
        });
});