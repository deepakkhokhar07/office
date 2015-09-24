var sampleapp=angular.module('myloginapp',['ngResource','ngRoute', 'ngStorage']);
sampleapp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'authentication/login.html',
        controller: 'loginController'
      }).when('/manageusers', {
        templateUrl: 'users/list.html',
        controller: 'manageuserController',
        resolve:{'loggedin': checkloggedIn}
       }).when('/managecategory', {
        templateUrl: 'category/list.html',
        resolve:{'loggedin': checkloggedIn}
       }).when('/managesubcategory', {
        templateUrl: 'subcategory/list.html',
        resolve:{'loggedin': checkloggedIn}
       }).when('/manageprofile', {
        templateUrl: 'profile/list.html',
        resolve:{'loggedin': checkloggedIn}
       }).when('/manageproduct', {
        templateUrl: 'product/list.html',
        resolve:{'loggedin': checkloggedIn}
       }).when('/manageorders', {
        templateUrl: 'order/list.html',
        resolve:{'loggedin': checkloggedIn}
       }).when('/home',{
        templateUrl:'authentication/home.html',
        controller:'homeController',
        resolve:{'loggedin': checkloggedIn}
        }).otherwise({
        resolve:{'loggedin': checkSessionLoggedIn}
      });

}])

