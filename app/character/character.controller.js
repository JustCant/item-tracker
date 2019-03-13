angular.module("carryingCapacity")
.controller("charCtrl", ["$scope", "$http", "$log", function($scope, $http, $log) {
    
    $scope.itemList = [];
    $http({
        method: 'GET',
        url: '/items.json'
    }).then(function(response) {        
        for(let key in response.data)                   
            $scope.itemList.push(response.data[key]);          
    });

    // $scope.currentItems = {
    //     weapon: [],
    //     armor: [],
    //     potion: [],
    //     ammunition: [],
    //     clothing: [],
    //     arcane_focus: [],
    //     druidic_focus: [],
    //     holy_symbol: [],
    //     artisans_tools: [],
    //     gaming_set: [],
    //     kit: [],
    //     musical_instrument: [],
    //     miscellaneous: []
    // }//end currentItems

    // $scope.data = $http({
    //     method: 'GET',
    //     url: '/char.json'
    // }).then(function(response) {   
    //     return response.data;         
    // }).then(function(data) {
    //     $scope.currentItems = data.items;
    //     $scope.charName = data.name;
    //     $scope.strScore = data.strength;
    //     $scope.load = data.load;
    // });    

    let ref = database.ref(`characters/Tork`);
    ref.once('value').then(function(snap) {
        $log.log(snap.val());
        let char = JSON.parse(snap.val());
        $log.log(char);
        $scope.$apply(function() {
            $scope.currentItems = char.item;
            $scope.charName = char.name;
            $scope.strScore = char.strength;
            $scope.load = char.load;
            $log.log($scope.currentItems);
        });        
    });

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
        //Remove item weight from $scope.load
        $scope.load -= parseFloat(item.weight);

        //Lower item's quantity amount by 1
        item.quantity -= 1;

        //If the item's quantity amount is 0 then remove it from array
        if(item.quantity === 0)    
            array.splice(array.indexOf(item), 1);
    };//end removeItem

    $scope.clearSearchName = function() {
        $scope.searchName = "";
    };//end clearSearchName

    $scope.saveChar = function(charName) {   
        let ref = database.ref(`characters/${charName}`);
        let obj = {
            name: $scope.charName,
            strength: $scope.strScore,
            item: $scope.currentItems,
            load: $scope.load
        }   
        $log.log(obj);
        obj = angular.toJson(obj);
        ref.set(obj);
    };

    $scope.showItems = function() {
        $log.log($scope.currentItems);
    };

    $scope.retrieveData = function() {
        let ref = database.ref(`characters/Tork`);
        ref.once('value').then(function(snap) {
            $log.log(snap.val());     
        });
    };
}]);
