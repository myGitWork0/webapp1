var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngTable']);

app.config(function ($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'pages/stations.html',
            controller: 'station-ctrl',
            activetab: 'stations'
        })

        .when('/stations', {
            templateUrl: 'pages/stations.html',
            controller: 'station-ctrl',
            activetab: 'stations'
        })

        // route for the about page
        .when('/departments', {
            templateUrl: 'pages/departments.html',
            controller: 'department-ctrl',
            activetab: 'departments'
        })

        // route for the about page
        .when('/fares', {
            templateUrl: 'pages/fares.html',
            controller: 'fares-ctrl',
            activetab: 'fares'
        })

        .when('/invoices', {
            templateUrl: 'pages/invoices.html',
            controller: 'invoice-ctrl',
            activetab: 'invoices'
        })

        .when('/invoice/print/:id', {
            templateUrl: 'pages/invoice-print.html',
            controller: 'invoice-print-ctrl',
            activetab: 'print'
        })
});
