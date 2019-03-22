app.service("appService", ["$http", function($http) {
    let self = this;
    this.items = [];

    // get list of items
    $http({
        method: 'GET',
        url: 'data/items.json'
    }).then(function(response) {        
        for(let key in response.data)                   
            self.items.push(response.data[key]);          
    });
    
}]);