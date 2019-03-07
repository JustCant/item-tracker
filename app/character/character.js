angular.module("carryingCapacity")
.controller("charCtrl", ["$scope", "$log", function($scope, $log) {
    $scope.currentItems = [];
    $scope.currentWeapons = [];
    $scope.currentArmor = [];
    $scope.currentPotions = [];
    $scope.load = 0;
    $scope.itemList = [{name: "Pike", weight: 18, type: "weapon"},
                       {name: "Crossbow, heavy", weight: 18, type: "weapon"},
                       {name: "Plate", weight: 65, type: "armor"}, 
                       {name: "Shield", weight: 6, type: "armor"}, 
                       {name: "Potion of Healing", weight: 0.5, type: "potion"},
                       {name: "Potion of Growth", weight: 0.5, type: "potion"}];

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