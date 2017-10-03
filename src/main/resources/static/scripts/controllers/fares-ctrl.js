app.controller('fares-ctrl', function ($scope, $http, $filter, $modal, ngTableParams, appServices) {

    $scope.searchKeyword = "";
    $scope.getList = function (callback) {

        $http({
            method: 'GET',
            url: '/fares',
            params: {
                page: 0,
                size: 2000,
                sort: 'fromStation.stationName'
            }
        }).then(function (response) {
            if (typeof response.data._embedded != 'undefined') {

                $scope.fares = response.data._embedded.fares;
            }
            else {
                $scope.fares = [];
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
            count: 10,
            sorting: {
                "fromStation.stationName": "asc"
            }
        }, {
            counts: [],
            getData: function ($defer, params) {
                appServices.tablePagination($defer, $filter, params, $scope.fares, $scope.searchKeyword);

            }
        });
    };


    $scope.addEdit = function (action, id) {
        $scope.action = action;
        $scope.selectedId = id;

        $scope.modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'pages/modal/fare.html',
            controller: 'fareModalCtrl',
            size: 'md',
            backdrop: 'static',
            resolve: {
                dataToModal: function () {
                    return {
                        action: $scope.action,
                        id: $scope.selectedId,
                        stations: $scope.stations
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
                url: '/fares',
                data: {
                    fromStation: "stations/" + modalData.submitData.fromStation,
                    toStation: "stations/" + modalData.submitData.toStation,
                    fare: modalData.submitData.fare
                }

            }).then(function (response) {
                $scope.getList($scope.initTable);
            }, function (response) {

            });
        }

        else if (modalData.action == 'edit') {
            $http({
                method: 'PUT',
                url: '/fares/' + $scope.selectedId,
                data: {
                    fromStation: "stations/" + modalData.submitData.fromStation,
                    toStation: "stations/" + modalData.submitData.toStation,
                    fare: modalData.submitData.fare
                }
            }).then(function (response) {
                $scope.getList($scope.initTable);
            }, function (response) {

            });
        }
    };

    $scope.getAllStations = function () {
        $http({
            method: 'GET',
            url: '/stations',
            params: {
                page: 0,
                size: 2000,
                sort: 'stationName'
            }
        }).then(function (response) {
            if (typeof response.data._embedded != 'undefined') {
                $scope.stations = response.data._embedded.stations;
            }
            else {
                $scope.stations = [];
            }

        }, function (response) {

        });
    };

    $scope.init = function () {
        $scope.getAllStations();
        $scope.getList($scope.initTable);
    }

    $scope.init();

});


app.controller('fareModalCtrl', function ($scope, $http, $modalInstance, dataToModal) {
    $scope.action = dataToModal.action;
    $scope.stations = dataToModal.stations;

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
                url: '/fares/' + dataToModal.id + "?projection=fare_details"
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