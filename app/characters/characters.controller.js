angular.module("carryingCapacity")
.controller("charsCtrl", ["$scope", "$compile", function($scope, $compile) {
    $scope.loadNewChar = false;

    $scope.createNewChar = function() {
        let $characters = $("#characters");
        let character = $compile("<character></character>")($scope);
        $characters.append(character);
    };
}]);
