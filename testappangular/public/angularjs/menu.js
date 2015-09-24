
sampleapp.controller('menuController',['$sessionStorage', '$rootScope', '$scope','$location',
    function($sessionStorage, $rootScope, $scope,$location) {
      $scope.manage_users=function(){
        $location.path('/manageusers');
      }
       $scope.manage_category=function(){
        $location.path('/managecategory');
      }
       $scope.manage_subcat=function(){
        
        $location.path('/managesubcategory');
      }
       $scope.manage_product=function(){
       
        $location.path('/manageproduct');
      }
       $scope.manage_order=function(){
       
        $location.path('/manageorders');
      }
       $scope.manage_profile=function(){ 
        
      $location.path('/manageprofile');  
      }
      
    }]);