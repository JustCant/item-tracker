app.controller("charCtrl", ["$scope", "$log", "appService", function($scope, $log, appService) {
    $scope.characters = [];
    $scope.itemList = appService.items;
    $scope.currentItems = {
        "weapon": [],
        "armor": [],
        "potion": [],
        "ammunition": [],
        "clothing": [],
        "arcane_focus": [],
        "druidic_focus": [],
        "holy_symbol": [],
        "artisans_tools": [],
        "gaming_set": [],
        "kit": [],
        "musical_instrument": [],
        "miscellaneous": []
    };

    const ref = database.ref('characters');

    ref.once('value').then(function(snap) {
        snap.forEach(function(childSnap) {
            $scope.$apply(function() {
                let character = JSON.parse(childSnap.val()).name;
                $scope.characters.push(character);
            });            
        });      
        $scope.selected = $scope.characters[0];
    });       

    /**
     * Helper function
     * assigns an item to the proper array within currentItems
     */
    function assignByType(list, item) {
        list[item.type].push(item);
    }//end assignByType
     
    /** 
     * Add items  
     */
    $scope.addItem = function(item, quantity) {
        //if quantity is not defined then default it to 1
        if (!quantity)
            quantity = 1;

        //If item does not have a quantity property add one
        if(!item.quantity) 
        item.quantity = parseFloat(quantity); 

        //Add item weight to $scope.load
        $scope.load += parseFloat(item.weight * quantity);                    

        //Loop through properties of $scope.currentItems
        for(let key in $scope.currentItems) {
            //find appropriate array
            if(item.type === key) {
                //check if array is empty or not
                if($scope.currentItems[key].length >= 1) {
                    //check if item is already in array
                    $scope.currentItems[key].forEach(x => {
                        if(x.name === item.name) 
                            item.quantity += parseFloat(quantity);   
                        //if at the end of the array with no match
                        else if (($scope.currentItems[key].indexOf(x) + 1) === $scope.currentItems[key].length)  
                            assignByType($scope.currentItems, item);                   
                    });                      
                } else 
                    assignByType($scope.currentItems, item);
            }//end if
        }//end for
    };//end addItem

    /**
     * Remove items 
     */
    $scope.removeItem = function(item, array, quantity) {
        if (!quantity)
            quantity = 1;
        else 
            quantity = parseInt(quantity);

        item.quantity = parseInt(item.quantity);

        //Remove item weight from $scope.load
        if (quantity > item.quantity)
            $scope.load -= item.weight * item.quantity;
        else
            $scope.load -= item.weight * quantity;

        //Lower item's quantity amount by quantity
        if (quantity > item.quantity)
            item.quantity -= item.quantity;
        else
            item.quantity -= quantity;

        //If the item's quantity amount is 0 then remove it from array
        if(item.quantity === 0)    
            array.splice(array.indexOf(item), 1);
    };//end removeItem

    /**
     * Clear search bar
     */
    $scope.clearSearchName = function() {
        $scope.searchName = "";
    };//end clearSearchName

    /**
     * Save character
     */
    $scope.saveChar = function(charName) {   
        let cn = charName.toLowerCase();
        let ref = database.ref(`characters/${cn}`);
        let obj = {
            name: $scope.charName,
            strength: $scope.strScore,
            item: $scope.currentItems,
            load: $scope.load
        }   
        obj = angular.toJson(obj);
        ref.set(obj);
    };// end saveChar

    /**
     * Load character
     */
    $scope.loadChar = function(character) {
        let cn = character.toLowerCase();
        let ref = database.ref(`characters/${cn}`);
        //error handilng in case character does not exist
        ref.once('value').then(function(snap) {
            let char = JSON.parse(snap.val());
            $scope.$apply(function() {
                $scope.currentItems = char.item;
                $scope.charName = char.name;
                $scope.strScore = char.strength;
                $scope.load = char.load;
            });        
        });
    };// end loadChar       
}]);
