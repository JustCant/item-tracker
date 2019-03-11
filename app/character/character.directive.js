angular.module("carryingCapacity")
.directive("character", ["$compile", function($compile) {
    return {
        templateUrl: "/app/character/character.html"
    };
}]);