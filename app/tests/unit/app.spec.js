describe('Testing main app', function() {
    beforeEach(module('itemTracker'));

    describe('Testing charsCtrl', function() {
        var scope, ctrl, $controller, $rootScope;

        beforeEach(inject(function(_$controller_, _$rootScope_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            scope = $rootScope.$new();
            ctrl = $controller('charsCtrl', {$scope:scope});
        }));

        it('should initialize a delete property on the scope', function() {
            expect(scope.delete).toBe(false);
        });

        it('should initialize a characters property as an empty array', function() {
            expect(scope.characters).toBeTruthy();
            expect(scope.characters.length).toBe(0);
            expect(typeof scope.characters).toBe('object');

            scope.characters.push("test");

            expect(scope.characters.length).toBe(1);
            expect(scope.characters[0]).toBe("test");
        });
        
    });
});