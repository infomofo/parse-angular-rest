parse-angular-rest
==================

A client for parse.com's REST api using angular. 

Why did I write this?
---------------------

Parse.com already provides a full-featured javascript api that wraps their REST api.  However, it will throw an error if you try to run it on a browser that does not support html5 local storage.  This makes it incompatible with use in a chrome extension and other applications.  This library will be lower level than the official parse api, and will enable use of alternate storage mechanisms, such as chrome extension storage.

Instructions
------------

### [Optional] Install the module using bower

Install using bower install

    bower install infomofo/parse-angular-rest

Add the following script import

```html
    <script src="bower_components/parse-angular-rest/parse-angular-rest.js"></script>
```

### Import the parse client module

```javascript
angular.module('myapp',['ParseClient']);
```

### Add your config with your app id and password to your angular constants

```javascript
app.constant("PARSE_CONFIG",{
            defaultHeaders: {
                "X-Parse-Application-Id" : "YOUR APPLICATION ID HERE",
                "X-Parse-REST-API-Key" : "YOUR REST API KEY HERE"
            },
            defaultParams: {}
        });
```

### Make API Calls

The following api calls are currently supported by the parse client.

* *ParseClient.signUp* - takes 3 parameters, a username, a password, and an email address. Returns a Promise of the user object.
* *ParseClient.logIn* - takes 2 parameters, a username and a password.  Returns a Promise of the user object.

