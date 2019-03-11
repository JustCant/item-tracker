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
    }//end assignByType
     
    $scope.addItem = function(item) {
        //Add item weight to $scope.load
        $scope.load += parseFloat(item.weight);

        //If item does not have a quantity property add one
        if(!item.quantity)
            item.quantity = 1;

        //Loop through properties of $scope.currentItems
        for(let key in $scope.currentItems) {
            //find appropriate array
            if(item.type === key) {
                //check if array is empty or not
                if($scope.currentItems[key].length >= 1) {
                    //check if item is already in array
                    $scope.currentItems[key].forEach(x => {
                        if(x.name === item.name) 
                            x.quantity += 1;   
                        //if at the end of the array with no match
                        else if (($scope.currentItems[key].indexOf(x) + 1) === $scope.currentItems[key].length)  
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
        if(item.quantity === 0)    
            array.splice(array.indexOf(item), 1);
    };//end removeItem

    $scope.clearSearchName = function() {
        $scope.searchName = "";
    }
}]);
