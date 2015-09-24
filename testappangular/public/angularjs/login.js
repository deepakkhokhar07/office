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
sampleapp.controller('loginController', ['$sessionStorage', '$rootScope', '$scope', '$routeParams', 'user', '$location',
    function($sessionStorage, $rootScope, $scope, $routeParams, user,$location) {
     if ($sessionStorage.isUserLoggedin) {
      $location.path('/home');
      return;
     }
     $scope.error_occur=false;
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
    function($sessionStorage, $rootScope, $scope,logoutservice,$location) {
      $scope.error_occur=false;
      $scope.logout=function(){
        log='{}';
        var userlogout=logoutservice.logout(log,function(){
           if (userlogout.success=='logout') {
           
              $location.path('/login');
              //$scope.error_occur="You have successfully logout.";
              $rootScope.isUserLoggedin = false;
              $sessionStorage.isUserLoggedin = false;
           }
          })
      }
}]);