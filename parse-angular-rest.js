'use strict';

var User = function() {
  var _this = this;
}

angular.module("ParseClient",[])
	.factory('ParseClient', function($q, $http, PARSE_CONFIG){
  		
  		var _this = this;

        var config = angular.extend({
            BASE_URL : 'https://api.parse.com/1/'
        }, PARSE_CONFIG);

        var fileUrl = config.BASE_URL + "files/";
        var usersUrl = config.BASE_URL + "users";
        var loginUrl = config.BASE_URL + "login";
        var defaultParams = config.defaultParams;
        
        if (Object.keys(defaultParams).length == 0) {
            defaultParams = null;       // Prevent angular from adding ? on a url with no parameters
        }

        var defaultHeaders = config.defaultHeaders;

        this.post = function (dataUrl, data) {
            var dataJson = angular.toJson(data);
			console.log(dataUrl + dataJson);
            var httpPromise = $http.post(dataUrl, dataJson, {params:defaultParams,headers:defaultHeaders});
            var deferred = $q.defer();

			httpPromise.success(function(data) {
				console.log(data);
				// var user = data.response.user;
				deferred.resolve(true);
		  	}).error(function(data, status, headers, config) {
				if (chrome.runtime.lasterror){
		            console.error(chrome.runtime.lasterror.message + ": " + data);
		        } else {
		        	console.error("http error retrieving post with data " + data)
		        }
		        deferred.resolve(false);
		  	});
		  	return deferred.promise;
        };

		return {
			signUp: function(username, password, email) {
				console.log(usersUrl);
				return _this.post(usersUrl, {
				    username: username,
				    password: password,
				    email: email
				});
			},
			logIn: function(username, password) {
				
				return null;
			}
		}
	});
