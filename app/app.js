angular.module("carryingCapacity", ["ngRoute"])
.config(function($locationProvider, $routeProvider) {
    $locationProvider
        .hashPrefix("");

    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
        .when("/home", {
            templateUrl: "/app/characters/characters.html"
        })
        .otherwise({
            redirectTo: "/home"
        });
});