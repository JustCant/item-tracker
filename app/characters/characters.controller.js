angular.module("carryingCapacity")
.controller("charsCtrl", ["$scope", "$compile", function($scope, $compile) {
    
    $scope.deleteNewChar = false;

    $scope.characters = [];

    let ref = database.ref('characters');

    ref.once('value').then(function(snap) {
        snap.forEach(function(childSnap) {
            $scope.$apply(function() {
                let character = JSON.parse(childSnap.val()).name;
                $scope.characters.push(character);
            });            
        });      
    });    

    $scope.createNewChar = function() {
        let $characters = $("#characters");
        let character = $compile("<character></character>")($scope);
        $characters.append(character);
    };//end createNewChar

    $scope.deleteChar = function(character) {
        let cn = character.toLowerCase();
        let ref = database.ref(`characters/${cn}`);
        ref.remove();
        $scope.character = "";
        $scope.characters.splice($scope.characters.indexOf(character), 1);
    };//end deleteChar
}]);
