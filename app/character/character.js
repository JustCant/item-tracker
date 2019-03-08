angular.module("carryingCapacity")
.controller("charCtrl", ["$scope", "$http", "$log", function($scope, $http, $log) {
    $scope.itemList = [];
    $http({
        method: 'GET',
        url: '/items.json'
    }).then(function(response) {        
        // $scope.itemList = response.data; 
        for(let key in response.data)                   
            $scope.itemList.push(response.data[key]);          
    });

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

    function assignByType(list, item) {
        list[item.type].push(item);
    }
     
    $scope.addItem = function(item) {
        $scope.load += parseFloat(item.weight);
        assignByType($scope.currentItems, item);        
    };
}]);
