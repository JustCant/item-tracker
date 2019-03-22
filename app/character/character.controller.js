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

    // Populate load list
    db.collection('characters').get().then(snap => {
        snap.forEach(childSnap => {
            $scope.$apply(() => {
                $scope.characters.push(childSnap.data().name);
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
        else
            quantity = parseInt(quantity);

        //If item does not have a quantity property add one
        if(!item.quantity) 
            item.quantity = quantity; 

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
                            item.quantity += quantity;   
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
     * Clear search name and type
     */
    $scope.clearSearchName = function() {
        $scope.searchName = "";
        $scope.searchType = "";
    };//end clearSearchName

    /**
     * Save character
     */
    $scope.saveChar = function(id) {  
        let obj = {
            name: $scope.charName,
            strength: $scope.strScore,
            item: $scope.currentItems,
            load: $scope.load
        }
        if (!id)
            db.collection('characters').add(obj).then(snap => {$scope.id = snap.id});
        else    
            db.collection('characters').doc(id).update(obj);        
    };// end saveChar

    /**
     * Load character
     */
    $scope.loadChar = function(character) {
        db.collection('characters').where('name', '==', character).get()
        .then(snap => {
            let char = snap.docs[0].data();
            $scope.$apply(function() {
                $scope.currentItems = char.item;
                $scope.charName = char.name;
                $scope.strScore = char.strength;
                $scope.load = char.load; 
                $scope.id = snap.docs[0].id;
                $scope.characters.push(char.name);   
            });         
        });
    };// end loadChar       
}]);
