angular.module("carryingCapacity")
.controller("charCtrl", ["$scope", "$http", "$log", function($scope, $http, $log) {
    $scope.currentItems = {
        weapon: [],
        armor: [],
        potion: [],
        ammunition: [],
        clothing: [],
        arcane_focus: [],
        druidic_focus: [],
        holy_symbol: [],
        artisans_tools: [],
        gaming_set: [],
        kit: [],
        musical_instrument: [],
        miscellaneous: []
    }
    $scope.load = 0;
    $http({
        method: 'GET',
        url: '/items.json'
    }).then(function(response) {
        $scope.itemList = response.data;
    });
   
    function assignByType(item) {
        $scope.currentItems[item.type].push(item);
    }

    $scope.addItem = function(item) {
        $log.log(item);
        $scope.load += parseInt(item.weight);
        assignByType(item);
    };
}]);