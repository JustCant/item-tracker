angular.module("carryingCapacity")
.controller("charCtrl", ["$scope", "$log", function($scope, $log) {
    $scope.currentItems = [];
    $scope.currentWeapons = [];
    $scope.currentArmor = [];
    $scope.currentPotions = [];
    $scope.load = 0;
    $scope.itemList = [{name: "Sword", weight: 5, type: "weapon"}, 
                       {name: "Shield", weight: 10, type: "armor"}, 
                       {name: "Potion", weight: 1, type: "potion"}];

    function findWeapons() {
        $scope.currentWeapons = $scope.currentItems.filter(function(item) {
            return item.type === "weapon";
        });
    }

    function findArmor() {
        $scope.currentArmor = $scope.currentItems.filter(function(item) {
            return item.type === "armor";
        });
    }

    function findPotions() {
        $scope.currentPotions = $scope.currentItems.filter(function(item) {
            return item.type === "potion";
        });
    }

    $scope.addItem = function(item) {
        $scope.currentItems.push(item);
        $scope.load += item.weight;
        findWeapons();
        findArmor();
        findPotions();
    };
}]);