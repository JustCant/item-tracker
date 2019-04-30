app.directive("myCloseChar", [function() {
    return {
        restrict: "A",
        link: (scope, element, attrs) => {
            element[0].onclick = () => {
                $(element[0].parentElement.parentElement.parentElement).remove();
            };            
        }
    };
}]);