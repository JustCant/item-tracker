angular.module("carryingCapacity")
.directive("myCharCreate", ["$compile", function($compile) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            let elem = element[0];
            let parent = elem.parentElement;
            elem.onclick = function() {
                let par = $(parent);
                let char = $compile("<character></character>")(scope);
                par.append(char);
            };            
        }
    };
}]);