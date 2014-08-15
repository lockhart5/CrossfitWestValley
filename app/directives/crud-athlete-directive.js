app.directive('crudAthleteGrid', function () {
    return {
        restrict: 'A',
        replace: false,
        scope: true,
        templateUrl: '/App/templates/athlete-crud-template.html',
        controller: ['$scope', '$element', '$attrs', 'crudGridDataFactory', 'notificationFactory', 'AthleteService',
            function ($scope, $element, $attrs, crudGridDataFactory, notificationFactory, AthleteService) {
                $scope.objects = [];
                $scope.addMode = false;
                $scope.orderBy = { field: 'emailaddress', asc: true };
                $scope.loading = true;

                $scope.toggleAddMode = function () {
                    $scope.addMode = !$scope.addMode;
                };

                $scope.toggleEditMode = function (object) {
                    object.editMode = !object.editMode;
                };

                var successCallback = function (e, cb) {
                    notificationFactory.success();
                    $scope.getData(cb);
                };

                var successPostCallback = function (e) {
                    successCallback(e, function () {
                        $scope.toggleAddMode();
                        $scope.object = {};
                    });
                };

                var errorCallback = function (e) {
                    notificationFactory.error(e.data.ExceptionMessage);
                };

                $scope.addObject = function () {
                    AthleteService.saveAthlete($scope.object, successPostCallback, errorCallback);
                    $scope.toggleAddMode();
                    $scope.object = {};
                };

                $scope.deleteObject = function (object) {
                    crudGridDataFactory.remove($attrs.tableName, escapeEmail(object.emailaddress));
                    toastr.info(object.emailaddress + ' deleted');
                };

                //$scope.updateObject = function (object) {
                //    crudGridDataFactory($attrs.tableName).update({ id: object.productID }, object, successCallback, errorCallback);
                //};

                $scope.getData = function (cb) {
                    $scope.objects = crudGridDataFactory.getAll($attrs.tableName);
                    $scope.loading = false;
                    
                };

                $scope.setOrderBy = function (field) {
                    var asc = $scope.orderBy.field === field ? !$scope.orderBy.asc : true;
                    $scope.orderBy = { field: field, asc: asc };
                };

                $scope.getData(function () { $scope.loading = false; });

                function escapeEmail(email) {
                    return (email || '').replace('.', ',');
                }

                function unescapeEmail(email) {
                    return (email || '').replace(',', '.');
                }
            }]
    };
});