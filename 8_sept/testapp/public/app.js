sampleapp=angular.module('myapp1', ['ngRoute', 'ngAnimate']);
sampleapp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/Book/:bookId', {
        templateUrl: 'html/Book.html',
        controller: 'BookCtrl',
        controllerAs: 'book'
      })
      .when('/Book/:bookId/ch/:chapterId', {
        templateUrl: 'html/chapter.html',
        controller: 'ChapterCtrl',
        controllerAs: 'chapter'
      }).when('/User/:UserId', {
        templateUrl: 'html/User.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      });

    $locationProvider.html5Mode(true);
}])