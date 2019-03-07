angular.module("carryingCapacity")
.controller("charCtrl", ["$scope", "$http", "$log", function($scope, $http, $log) {
    $scope.currentItems = [];
    $scope.currentWeapons = [];
    $scope.currentArmor = [];
    $scope.currentPotions = [];
    $scope.currentAmmunition = [];
    $scope.currentClothing = [];
    $scope.currentArcaneFocus = [];
    $scope.currentDruidicFocus = [];
    $scope.currentHolySymbols = [];
    $scope.currentArtisansTools = [];
    $scope.currentGamingSets = [];
    $scope.currentKits = [];
    $scope.currentMusicalInstruments = [];
    $scope.load = 0;
    $http({
        method: 'GET',
        url: '/items.json'
    }).then(function(response) {
        $scope.itemList = response.data;
    });

    function findWeapons() {
        $scope.currentWeapons = $scope.currentItems.filter(item => item.type === "weapon");
    }

    function findArmor() {
        $scope.currentArmor = $scope.currentItems.filter(item => item.type === "armor");
    }

    function findPotions() {
        $scope.currentPotions = $scope.currentItems.filter(item => item.type === "potion");
    }

    function findAmmunition() {
        $scope.currentAmmunition = $scope.currentItems.filter(item => item.type === "ammunition");
    }

    function findClothing() {
        $scope.currentClothing = $scope.currentItems.filter(item => item.type === "clothing");
    }

    function findDruidicFocus() {
        $scope.currentDruidicFocus = $scope.currentItems.filter(item => item.type === "druidic_focus");
    }

    function findArcaneFocus() {
        $scope.currentArcaneFocus = $scope.currentItems.filter(item => item.type === "arcane_focus");
    }

    function findHolySymbol() {
        $scope.currentHolySymbols = $scope.currentItems.filter(item => item.type === "holy_symbol");
    }

    function findArtisansTools() {
        $scope.currentArtisansTools = $scope.currentItems.filter(item => item.type === "artisans_tools");
    }

    function findGamingSet() {
        $scope.currentGamingSets = $scope.currentItems.filter(item => item.type === "gaming_set");
    }

    function findKits() {
        $scope.currentKits = $scope.currentItems.filter(item => item.type === "kit");
    }

    function findMusicalInstruments() {
        $scope.currentMusicalInstruments = $scope.currentItems.filter(item => item.type === "musical_instrument");
    }

    $scope.addItem = function(item) {
        $log.log(item);
        $scope.currentItems.push(item);
        $scope.load += parseInt(item.weight);
        findWeapons();
        findArmor();
        findPotions();
        findAmmunition();
        findClothing();
        findDruidicFocus();
        findArcaneFocus();
        findHolySymbol();
        findArtisansTools();
        findGamingSet();
        findKits();
        findMusicalInstruments();
    };
}]);