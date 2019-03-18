angular.module("carryingCapacity", ["ngRoute"])
.config(function($locationProvider, $routeProvider) {
    $locationProvider
        .hashPrefix("");

    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
        .when("/home", {
            templateUrl: "/app/dashboard/front-page.html"
        })
        .otherwise({
            redirectTo: "/home"
        });
});