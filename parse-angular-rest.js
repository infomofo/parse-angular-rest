'use strict';

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
				deferred.resolve(data);
		  	}).error(function(data, status, headers, config) {
				if (chrome.runtime.lasterror){
		            console.error(chrome.runtime.lasterror.message + ": " + data);
		        } else {
		        	console.error("http error retrieving post with data " + data)
		        }
		        deferred.reject(data);
		  	});
		  	return deferred.promise;
        };

        this.get = function (dataUrl, data) {
			console.log(dataUrl);
            var httpPromise = $http.get(dataUrl, {params:data,headers:defaultHeaders});
            var deferred = $q.defer();

			httpPromise.success(function(data) {
				deferred.resolve(data);
		  	}).error(function(data, status, headers, config) {
				if (chrome.runtime.lasterror){
		            console.error(chrome.runtime.lasterror.message + ": " + data);
		        } else {
		        	console.error("http error retrieving get with data " + angular.toJson(data))
		        }
		        deferred.reject(data);
		  	});
		  	return deferred.promise;
        };
		return {
			/**
			 * @ngdoc method
			 * @name ParseClient.signUp
			 *
			 * @param {string} username a unique user identifier
			 * @param {string} password a secure password for the user
			 * @param {string} email an email address where the user can be contacted
			 * @return {Promise} The value this promise will be resolved to will be the user json object 
			 */
			signUp: function(username, password, email) {
				return _this.post(usersUrl, {
				    username: username,
				    password: password,
				    email: email
				});
			},
			/**
			 * @ngdoc method
			 * @name ParseClient.logIn
			 *
			 * @param {string} username a unique user identifier
			 * @param {string} password a secure password for the user
			 * @return {Promise} The value this promise will be resolved to will be the user json object 
			 */
			logIn: function(username, password) {
				return _this.get(loginUrl, {
				    username: username,
				    password: password
				});
			}
		}
	});
