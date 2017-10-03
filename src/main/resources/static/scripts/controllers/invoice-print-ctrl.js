app.controller('invoice-print-ctrl', function ($scope, $http, $routeParams) {
    
    $scope.id = $routeParams.id;

    $scope.getData = function () {
        $http({
            method: 'GET',
            url: '/invoices/' + $scope.id + "?projection=invoice_details"
        }).then(function (response) {
            if (response.status == '200') {
                $scope.data = response.data;
                
            }

        }, function (response) {

        });
    };

    $scope.init = function () {
        $scope.getData();
    };

    $scope.print = function(){
        window.print();
    }


    $scope.init();
});