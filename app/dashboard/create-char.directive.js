app.directive("myCharCreate", ["$compile", function($compile) {
    return {
        restrict: "A",
        link: (scope, element, attrs) => {
            element[0].onclick = () => {
                $(element[0].parentElement).append($compile("<character></character>")(scope));
            };            
        }
    };
}]);