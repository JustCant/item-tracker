app.directive("character", [function() {
    return {
        restrict: "E",
        templateUrl: "/app/character/character.html",
        controller: "charCtrl",
        scope: {}
    };
}]);