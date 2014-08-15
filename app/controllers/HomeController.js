app.controller('HomeController', ['$scope', '$location', '$window', '$firebase', function ($scope, $location, $window, $firebase) {
    $scope.$root.title = 'Crossfit West Valley';
    var ref = new Firebase('https://shining-fire-723.firebaseio.com/');
    $scope.athletes = $firebase(ref);
    $scope.$on('$viewContentLoaded', function () {
        $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
}])