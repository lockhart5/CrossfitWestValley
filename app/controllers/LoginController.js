app.controller('LoginController', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    $scope.$root.title = 'CFWV | Sign In';
    // TODO: Authorize a user
    $scope.login = function () {
        $location.path('/');
        return false;
    };
    $scope.$on('$viewContentLoaded', function () {
        $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
}])