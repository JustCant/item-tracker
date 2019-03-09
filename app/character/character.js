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
    }//end currentItems

    $scope.load = 0;

    function assignByType(list, item) {
        list[item.type].push(item);
        $log.log(item);
    }//end assignByType
     
    $scope.addItem = function(item) {
        $scope.load += parseFloat(item.weight);
        if(!item.quantity)
            item.quantity = 1;
        for(let key in $scope.currentItems) {
            if(item.type === key) {
                if($scope.currentItems[key].length >= 1) {
                    $scope.currentItems[key].forEach(x => {
                        if(item.name === x.name) 
                            x.quantity += 1;
                        else
                            assignByType($scope.currentItems, item); 
                    }); 
                } else 
                    assignByType($scope.currentItems, item);
            }//end if
        }//end for
    };//end addItem

    $scope.removeItem = function(item, array) {
        $scope.load -= parseFloat(item.weight);
        item.quantity -= 1;
        $log.log(item.quantity);
        if(item.quantity === 0)    
            array.splice(array.indexOf(item), 1);
        $log.log(item.quantity);
    };//end removeItem
}]);
