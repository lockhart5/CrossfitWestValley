﻿app.controller('Error404Controller', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    $scope.$root.title = 'Error 404: Page Not Found';
    $scope.$on('$viewContentLoaded', function () {
        $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
}]);