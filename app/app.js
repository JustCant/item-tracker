const app = angular.module("itemTracker", ["ngRoute"]);

app.config(function($locationProvider, $routeProvider) {
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
})
.filter("normalize", function() {
    return function(input) {
        input = input || '';
        let output = input.replace('_', ' ')
                          .replace(input.charAt(0), input.charAt(0).toUpperCase());
        return output;
    };
});