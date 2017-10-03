app.controller('department-ctrl', function ($scope, $http, $filter, $modal, ngTableParams, appServices) {

    $scope.searchKeyword = "";
    $scope.getList = function (callback) {
        $http({
            method: 'GET',
            url: '/departments',
            params: {
                page: 0,
                size: 2000,
                sort: 'name'
            }
        }).then(function (response) {
            if (typeof response.data._embedded != 'undefined') {
                $scope.departments = response.data._embedded.departments;
            }
            else {
                $scope.departments = [];
            }
            callback.call(this);
        }, function (response) {

        });
    };


    $scope.deleteItem = function (link) {
        var r = confirm("Are you sure you want to delete?");

        if (!r) {
            return
        }

        $http({
            method: 'DELETE',
            url: link
        }).then(function (response) {
            $scope.getList($scope.initTable);
        }, function (response) {

        });
    };

    $scope.initTable = function () {
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 25,
            sorting: {
                "name": "asc"
            }
        }, {
            counts: [],
            getData: function ($defer, params) {
                appServices.tablePagination($defer, $filter, params, $scope.departments, $scope.searchKeyword);

            }
        });
    }

    $scope.addEdit = function (action, id) {
        $scope.action = action;
        $scope.selectedId = id;
        $scope.modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'pages/modal/department.html',
            controller: 'departmentModalCtrl',
            size: 'md',
            backdrop: 'static',
            resolve: {
                dataToModal: function () {
                    return {
                        action: $scope.action,
                        id: $scope.selectedId
                    }
                }
            }
        });

        $scope.modalInstance.result.then(function (modalData) {
            $scope.submitData(modalData);
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.submitData = function (modalData) {
        if (modalData.action == 'add') {
            $http({
                method: 'POST',
                url: '/departments',
                data: modalData.submitData

            }).then(function (response) {
                $scope.getList($scope.initTable);
            }, function (response) {

            });
        }

        else if (modalData.action == 'edit') {
            $http({
                method: 'PUT',
                url: '/departments/' + $scope.selectedId,
                data: modalData.submitData

            }).then(function (response) {
                $scope.getList($scope.initTable);
            }, function (response) {

            });
        }
    };


    $scope.init = function () {
        $scope.getList($scope.initTable);
    }

    $scope.init();

});

app.controller('departmentModalCtrl', function ($scope, $http, $modalInstance, dataToModal) {
    $scope.action = dataToModal.action;

    $scope.submitData = {};
    $scope.ok = function () {
        $modalInstance.close({
            submitData: $scope.submitData,
            action: $scope.action
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    $scope.getData = function () {
        if ($scope.action == 'edit') {
            $http({
                method: 'GET',
                url: '/departments/' + dataToModal.id
            }).then(function (response) {
                if (response.status == '200') {
                    $scope.submitData = response.data;
                }

            }, function (response) {

            });
        }
    };

    $scope.init = function () {
        $scope.getData();
    };


    $scope.init();
});