angular.module("carryingCapacity")
.controller("charCtrl", ["$scope", "$log", function($scope, $log) {
    $scope.currentItems = [];
    
    $scope.itemList = ["Sword", "Shield", "Potion"];

    $scope.addItem = function(item) {
        $log.log(item);
        $scope.currentItems.push(item);
    };
}]);