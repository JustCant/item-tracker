app.directive("myCharCreate", ["$compile", function($compile) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element[0].onclick = function() {
                $(element[0].parentElement).append($compile("<character></character>")(scope));
            };            
        }
    };
}]);