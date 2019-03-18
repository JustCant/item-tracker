app.directive("myCloseChar", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element[0].onclick = function() {
                $(element[0].parentElement.parentElement.parentElement).remove();
            };            
        }
    };
}]);