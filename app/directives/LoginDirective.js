app.directive('loginDirective', function () {
    return {
        restrict: 'A',
        replace: false,
        scope: true,
        templateUrl: '/App/templates/LoginTemplate.html',
        controller: ['$scope', '$element', '$attrs', 'notificationFactory', 'UserService',
            function ($scope, $element, $attrs, notificationFactory, UserService) {
                $scope.objects = [];
                
                $scope.login = function () {
                    if (UserService.login($scope.emailaddress, $scope.password, $scope.rememberMe))
                    {
                        toastr.success('Logged In');
                    }
                        
                }

                $scope.createUser = function () {
                    if(UserService.createUser($scope.emailaddress, $scope.password, $scope.rememberMe))
                    {
                        toastr.success('Created');
                    }
                }
            }]//,
        //link: function ($scope, $element, attr, exampleDirectiveCtrl) {
        //    // some awesome jquery pluggin which replaces things and bits
        //    $element.replaceWith(angular.element('<pre>' + exampleDirectiveCtrl.awesomeVariable + '</pre>'));
        //}
    };
});