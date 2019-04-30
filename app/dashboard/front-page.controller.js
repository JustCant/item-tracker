app.controller("charsCtrl", ["$scope", "$compile", function($scope, $compile) {
    
    $scope.delete = false;

    $scope.characters = [];

    // Populate character load selection
    db.collection('characters').get().then(snap => {
        snap.forEach(childSnap => {
            $scope.$apply(() => {
                $scope.characters.push(childSnap.data().name);
            });            
        });
        setSelected();
    });

    $scope.deleteChar = (character) => {
        db.collection('characters').where('name', '==', character).get()
        .then(snap => {
            let id = snap.docs[0].id;
            db.collection('characters').doc(id).delete();
            $scope.characters.splice($scope.characters.indexOf(character), 1);
        });
        setSelected();
    };//end deleteChar

    function setSelected() {
        $scope.selected = $scope.characters[0];
    }//end setSelected
    
    // $scope.loadChar = function(character) {
    //     let cn = character.toLowerCase();
    //     let ref = database.ref(`characters/${cn}`);
    //     ref.once('value').then(function(snap) {
    //         let character = JSON.parse(snap.val());
    //         console.log(character);
    //     });
    //     //$scope.createNewChar();
    // };
}]);
