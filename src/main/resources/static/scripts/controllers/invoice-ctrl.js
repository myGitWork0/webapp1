app.controller('invoice-ctrl', function ($scope, $http, $filter, $modal, ngTableParams, appServices) {

    $scope.searchKeyword = "";
    $scope.getList = function (callback) {

        $http({
            method: 'GET',
            url: '/invoices',
            params: {
                page: 0,
                size: 9999999,
                sort: 'date,desc',
                projection: 'invoice_details'
            }
        }).then(function (response) {
            if (typeof response.data._embedded != 'undefined') {
                $scope.invoices = response.data._embedded.invoices;
            }
            else {
                $scope.invoices = [];
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
                "date": "desc"
            }
        }, {
            counts: [],
            getData: function ($defer, params) {
                appServices.tablePagination($defer, $filter, params, $scope.invoices, $scope.searchKeyword);

            }
        });
    };


    $scope.addEdit = function (action, id) {
        $scope.action = action;
        $scope.selectedId = id;

        $scope.modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'pages/modal/invoice.html',
            controller: 'invoiceModalCtrl',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                dataToModal: function () {
                    return {
                        action: $scope.action,
                        id: $scope.selectedId,
                        fares: $scope.fares,
                        departments: $scope.departments
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

    $scope.printItem = function (id) {
        window.open('invoice_print.html?invoice_id=' + id, "", "width=1024, height=768");
    };

    $scope.submitData = function (modalData) {
        dataToSend = modalData.submitData;
        dataToSend.fromDepartment = "departments/" + modalData.submitData.fromDepartment
        dataToSend.toDepartment = "departments/" + modalData.submitData.toDepartment
        dataToSend.faremap = "fares/" + modalData.submitData.faremap

        if (modalData.action == 'add') {
            $http({
                method: 'POST',
                url: '/invoices',
                data: dataToSend
            }).then(function (response) {
                $scope.getList($scope.initTable);
            }, function (response) {

            });
        }

        else if (modalData.action == 'edit') {
            $http({
                method: 'PUT',
                url: '/invoices/' + $scope.selectedId,
                data: dataToSend
            }).then(function (response) {
                $scope.getList($scope.initTable);
            }, function (response) {

            });
        }
    };

    $scope.getAllFares = function () {
        $http({
            method: 'GET',
            url: '/fares',
            params: {
                page: 0,
                size: 2000,
                sort: 'fromStation.stationName,toStation.stationName',
                projection: 'fare_details'
            }
        }).then(function (response) {
            if (typeof response.data._embedded != 'undefined') {
                $scope.fares = response.data._embedded.fares;
            }
            else {
                $scope.fares = [];
            }

        }, function (response) {

        });
    };

    $scope.getAllDepartments = function () {
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

        }, function (response) {

        });
    };


    $scope.init = function () {
        $scope.getAllFares();
        $scope.getAllDepartments();
        $scope.getList($scope.initTable);
    }

    $scope.init();

});


app.controller('invoiceModalCtrl', function ($scope, $http, $modalInstance, dataToModal) {
    $scope.action = dataToModal.action;
    $scope.departments = dataToModal.departments;
    $scope.fares = dataToModal.fares;
    $scope.fareRate = 0;

    $scope.setFareRate = function() {
        var isDefined = false;
        for(var i = 0; i < $scope.fares.length; i++) {
            if($scope.submitData.faremap == $scope.fares[i].id) {
                $scope.fareRate =  $scope.fares[i].fare;
                isDefined = true;
                break;               
            }
        }

        if(isDefined == false) {
            $scope.fareRate = 0;
        }
    }
    
    $scope.ok = function () {
        $scope.submitData.valueSurcharge = $scope.submitData.goodsValue/1000;
        if($scope.submitData.valueSurcharge < 5)
            $scope.submitData.valueSurcharge = 5.00;

        $scope.submitData.articleCharges = 1 * $scope.submitData.packageCount;
        $scope.submitData.handlingCharges = 0 * $scope.submitData.packageCount;

        $scope.submitData.otherCharges = $scope.submitData.valueSurcharge +
                        $scope.submitData.doordelCharges + 
                        $scope.submitData.articleCharges + 
                        $scope.submitData.statCharges + 
                        $scope.submitData.handlingCharges;

        $scope.submitData.freight = $scope.submitData.weight * $scope.fareRate/100;
        if(($scope.submitData.freight+$scope.submitData.otherCharges)>750){
			$scope.submitData.gst=($scope.submitData.freight + $scope.submitData.otherCharges)*0.05;
		}
		else{
			$scope.submitData.gst=0;
		}
		$scope.submitData.otherCharges = $scope.submitData.otherCharges + $scope.submitData.gst;
		$scope.submitData.total = $scope.submitData.freight + $scope.submitData.otherCharges;
		
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
                url: '/invoices/' + dataToModal.id + "?projection=invoice_details"
            }).then(function (response) {
                if (response.status == '200') {
                    $scope.submitData = response.data; 
                    $scope.submitData.faremap = response.data.faremap.id;
                    $scope.submitData.fromDepartment = response.data.fromDepartment.id;
                    $scope.submitData.toDepartment = response.data.toDepartment.id;
                    $scope.submitData.date = new Date($scope.submitData.date);
                    $scope.setFareRate();
                    
                }

            }, function (response) {

            });
        } else {
            $scope.submitData = {};
            $scope.submitData.doordelCharges = 200;
            $scope.submitData.statCharges = 10;
        }
    };

    $scope.init = function () {
        $scope.getData();
    };


    $scope.init();
});

