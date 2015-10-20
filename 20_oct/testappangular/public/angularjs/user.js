sampleapp.factory('getUser', ['$resource', function($resource) {
  return $resource('/users/getUser', null,
    {
       getUserlist: {method: 'get', isArray:true}
    });
}]);
sampleapp.factory('updateuser', ['$resource', function($resource) {
  return $resource('/users/updateinfo', null,
    {
       updateuserdata: {method: 'post'}
    });
}]);
sampleapp.service('getUserInfo', ['$resource', function($resource) {
  this.getUserdetail=function(){
    return $resource('/users/detail/:id');
  }
}]);

sampleapp.controller('manageuserController', ['$sessionStorage', '$rootScope', '$scope','getUser','$location','$http','$routeParams','getUserInfo','updateuser',
    function($sessionStorage, $rootScope, $scope,getUser,$location,$http,$routeParams,getUserInfo,updateuser) {
      if ($routeParams.id) {
        $scope.userid=$routeParams.id;
        var getUserInfodetail = getUserInfo.getUserdetail().get({id: $scope.userid}, function(){
        $scope.user=getUserInfodetail;
        });
        $scope.editform=function(){
          formData = $scope.user;
         var updateuserinfo= updateuser.updateuserdata(formData,function(){
          if (updateuserinfo.success) {
            $scope.message="User Updated Successfully.";
          }else{
            $scope.message="Error occured in user update.";
          }
          });
         
        }
        $scope.back=function(){
          $location.path('/manageusers');
        }
      }else{
    var getUserdetail=getUser.getUserlist({},function(){
        $scope.userlist=getUserdetail;
        $scope.predicate = 'name';
      $scope.reverse = true;
      $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };
      $scope.edit=function(userid){
       
        $location.path('/editmanageuser/'+userid);
        };
        $scope.deleteuser=function(key){
       if (confirm("Are you sure you want to delete \""+key+"\"?")) {
        $http.delete('/users/'+key).success(function(res) {
             var getUserdetail=getUser.getUserlist({},function(){
        $scope.userlist=getUserdetail;
             });
              
            })
         /*$http.delete('/users/'+$scope.userlist[key]['_id']).success(function(res) {
            
              $scope.userlist.splice(key, 1);
            })*/
       }
        };
        });
      }
    }]);