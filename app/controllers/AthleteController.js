app.controller('AthleteController', ['$scope', '$location', '$window', 'AthleteService', 'User',
    function ($scope, $location, $window, AthleteService, User) {
    $scope.$root.title = 'Crossfit West Valley';
    $scope.$on('$viewContentLoaded', function () {
        $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });

    $scope.athletes = AthleteService.getAllAthletes();

    $scope.saveAthlete = function () {
        if(AthleteService.saveAthlete($scope.athlete))
        {
            toastr.success($scope.athlete.fistname);
        }

    }

    $scope.getAthlete = function () {
        var ath = AthleteService.getAthlete($scope.searchemail);
        toastr.info(ath.firstname);
        return ath;
    }


    
}])