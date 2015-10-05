function checkSessionLoggedIn($sessionStorage, $location) {
  if ($sessionStorage.isUserLoggedin) {
    $location.path('/home');
  } else {
    $location.path('/login');
  }
}

function checkloggedIn($sessionStorage, $rootScope, $http, $location) {
    $http.get('/users/checklogged/user').success(function(data) {
     
      if (data.error) {
            $location.path('/login');
            $rootScope.isUserLoggedin = false;
            $sessionStorage.isUserLoggedin = false;
        }
        else{
            $rootScope.user = data;
            $rootScope.isUserLoggedin = true;
            $sessionStorage.isUserLoggedin = true;
        }
    });
    
}
sampleapp.factory('user', ['$resource', function($resource) {
  return $resource('/users/login', null,
    {
       login: {method: 'post'}
    });
}]);
sampleapp.controller('CarouselDemoCtrl', function ($scope) {
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push(
      {image: './slider_image/img00.jpg'},
{image: './slider_image/img01.jpg'},
{image: './slider_image/img02.jpg'},
{image: './slider_image/img03.jpg'},
{image: './slider_image/img04.jpg'}
    );
  };
  for (var i=1; i<2; i++) {
    $scope.addSlide();
  }
  
});
sampleapp.controller('loginController', ['$sessionStorage', '$rootScope', '$scope', '$routeParams', 'user', '$location',
    function($sessionStorage, $rootScope, $scope, $routeParams, user,$location) {
   
     if ($sessionStorage.isUserLoggedin) {
      $location.path('/home');
      return;
     }
     $scope.error_occur=false;
     $scope.login_div=true;
     $scope.register_div=true;
     $scope.register = function(){
      $scope.register_div=false;
      $scope.login_div=false;
     }
      $scope.login = function(){
      $scope.register_div=true;
      $scope.login_div=true;
     }
     $scope.submitForm = function(isValid) {
      formData = $scope.user;
      var userdetail=user.login(formData, function(){
        if (userdetail.code=='401') {
          $scope.error_occur=userdetail.message;
        }else{
          $rootScope.isUserLoggedin = true;
          $sessionStorage.isUserLoggedin = true;
          $location.path('/home');
        }
       });
     }
}]);

sampleapp.factory('logoutservice',['$resource',function($resource){
  return $resource('/users/logout',null,
    {
    logout:{method:'post'}
    });
  }]);

sampleapp.controller('homeController', ['$sessionStorage', '$rootScope', '$scope','logoutservice','$location',
    'Flash',function($sessionStorage, $rootScope, $scope,logoutservice,$location,Flash) {
     
  
      //$scope.error_occur=false;
      $scope.logout=function(message){
        log='{}';
        var userlogout=logoutservice.logout(log,function(){
           if (userlogout.success=='logout') {
             var message = 'You have successfully logout.';
Flash.create('success', message, 'custom-class'); 
             
           
              $location.path('/login');
              //$scope.error_occur="You have successfully logout.";
              $rootScope.isUserLoggedin = false;
              $sessionStorage.isUserLoggedin = false;
           }
          })
      }
}]);