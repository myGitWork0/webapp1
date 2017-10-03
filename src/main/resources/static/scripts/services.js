app.service('appServices', function ($http, $q, $timeout, $log, $rootScope, $location, appSettings) {

    var appServices = this;

    appServices.tablePagination = function ($defer, $filter, params, data, searchKeyword) {
        var filteredData = params.filter() ? $filter('filter')(data, searchKeyword) : data;
        var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
        var paginatedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        params.total(filteredData.length);

        if (paginatedData.length > 0) {
            $defer.resolve(paginatedData);
        }
        else {
            var currentPage = params.page();
            if (currentPage > 1) {
                params.page(currentPage - 1);
            } else {
                $defer.resolve(paginatedData);
            }
        }
    };


    appServices.getStaticFile = function (settingsPath) {
        var defer = $q.defer();
        var url = appSettings.static.baseURL + settingsPath.url;
        var httpParams = {
            url: url
        };

        $timeout(function () {
            $http(httpParams)
                .success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (error, status, headers, config) {
                    if (status == 400) {
                        return error;
                    } else {
                        $log.debug('Error: Could not fetch data from:\n----------------------------------\n' + httpParams.url);
                    }
                    defer.resolve(error);
                    defer.reject(error);
                })
        }, 0);

        return defer.promise;
    };


    appServices.doAPIRequest = function (callAPISettings, requestParams, headerParams) {
        var defer = $q.defer();
        var requestMethod = callAPISettings.method;
        var url = appSettings.appAPI.baseURL + callAPISettings.url;


        var httpParams = {
            method: requestMethod,
            url: url
        };

        if (typeof requestParams != "undefined" && requestParams != null) {
            httpParams.data = requestParams;
        }


        if (callAPISettings.auth == "true") {
            var requestHeader = {
                "Content-Type": "application/json",
                "Authorization": lclStorage.get('userDetails').auth_token
            };
            httpParams.headers = requestHeader;
        }


        if (headerParams != null && typeof headerParams != 'undefined') {
            if (headerParams.appendToURL == true) {
                if (headerParams.noTrailingSlash) {
                    httpParams.url = url + headerParams.value;
                }
                else {
                    httpParams.url = url + headerParams.value + "/";
                }

            }


            if (headerParams.fileUpload == true) {
                if (typeof httpParams.headers != 'undefined') {
                    httpParams.headers["Content-Type"] = undefined;
                }
                else {
                    httpParams.headers = {
                        "Content-Type": undefined,
                    }
                }

                //httpParams.headers.transformRequest = angular.identity;

                var fd = new FormData();
                fd.append("file", requestParams)

                httpParams.data = fd;

            }
        }

        console.log('httpParams');
        console.log(httpParams);

        $timeout(function () {
            $http(httpParams)
                .success(function (data, status, headers, config) {
                    appServices.loginError = '';

                    if (data.status == 'error') {

                        var errMsg = {
                            msg: data.errorMessage
                        }

                        appServices.errors.push(errMsg)
                        $rootScope.errorFlag = true;
                    }

                    defer.resolve(data);
                })
                .error(function (error, status, headers, config) {

                    if (status == 400) {
                        var errMsg = null;

                        if (typeof error.errorMessage != "undefined") {
                            errMsg = {
                                msg: error.errorMessage
                            }
                            appServices.errors.push(errMsg)
                        }

                        else if (typeof error.non_field_errors != "undefined") {
                            appServices.loginError = error.non_field_errors[0];

                        }
                        else {
                            errMsg = {
                                msg: error
                            }
                            appServices.errors.push(errMsg)
                        }
                        $rootScope.errorFlag = true;
                        return error;
                    } else {
                        $log.debug('Error: Could not fetch data from:\n----------------------------------\n' + httpParams.url);
                    }
                    //defer.resolve(error);
                    defer.reject(error);
                })
        }, 0);

        return defer.promise;
    }


    appServices.getUtilizationColor = function (val) {
        var color = "";
        angular.forEach(appSettings.threshold, function (value, key) {
            if (val >= value.range[0] && val <= value.range[1]) {
                color = value.color;
                return false;
            }
        })


        return color;
    };


    return appServices;
})

