app.controller('contain', function($scope) {
    $scope.names=['Jani','Hege','Kai'];
    $scope.names1=[
{name:'Jani',country:'Norway'},
{name:'Hege',country:'Sweden'},
{name:'Kai',country:'Denmark'}]
   $scope.firstName = "John";
    $scope.lastName = "Doe";
});
app.controller('contain',function($scope){
  $scope.projectlist="Projectlist.html";
  $scope.testdiv=false;
  $scope.togglediv=function(){
  $scope.testdiv=!$scope.testdiv;  
  }
  })