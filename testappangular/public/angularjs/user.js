sampleapp.factory('getUser', ['$resource', function($resource) {
  return $resource('/users/getUser', null,
    {
       getUserlist: {method: 'get',isArray:true}
    });
}]);

sampleapp.controller('manageuserController', ['$sessionStorage', '$rootScope', '$scope','getUser','$location',
    function($sessionStorage, $rootScope, $scope,getUser,$location) {
    var getUserdetail=getUser.getUserlist({},function(){
        $scope.userlist=getUserdetail;
        });
    }]);