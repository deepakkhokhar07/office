
sampleapp.factory('Calculatorfactory',function(MathFactory){
   this.square = function(a) { return MathFactory.multiply(a,a); };
  }).factory('MathFactory',function(){
  var factory={};
  factory.multiply=function(a,b){ return {"mul":a*b}; };
  factory.subtract=function(a,b){ return {"sub":a-b}; };
  return factory;
  }).controller('CalculatorController',function($scope,CalculatorService,$route){
   $scope.doSquare = function() {
        $scope.answer = CalculatorService.square($scope.number);
    }
  
  }).controller('contain',function($scope){
    $scope.items = ['settings', 'home', 'other'];
  $scope.selection = $scope.items[0];
  $scope.names=['Jani','Hege','Kai'];
    $scope.names1=[
  {name:'Jani',country:'Norway'},
  {name:'Hege',country:'Sweden'},
  {name:'Kai',country:'Denmark'}];
    $scope.firstName="Deepak";
    $scope.lastName="khokhar";
  $scope.projectlist="html/Projectlist.html";
  $scope.testdiv=false;
  $scope.togglediv=function(){
  $scope.testdiv=!$scope.testdiv;  
  }
  }).controller('contain1',function($scope){
  $scope.firty="Kiss Ready :)";

  $scope.projects={ "p1":{'x':'1'},"p2":{"x":"2"},"p3":{"x":"3"}}
  
  })
.controller('BookCtrl', ['$routeParams', function($routeParams) {
  this.name = "BookCtrl";
  this.params = $routeParams;
}])
.controller('ChapterCtrl', ['$routeParams', function($routeParams) {
  this.name = "ChapterCtrl";
  this.params = $routeParams;
}]).controller('UserCtrl',function($scope,$routeParams){
  $scope.users=[
  {
    'userid':1,
    'username':'David Gower',
    'roles':['Programmer','Designer']
  },{
    'userid':2,
    'username':'Michael Gower',
    'roles':['Programmer','Developer']
  },{
    'userid':3,
    'username':'John Gower',
    'roles':['Programmer','Graphics']
  }
  ];

  console.log($scope.users[$routeParams.UserId-1]);
  $scope.userdata=$scope.users[$routeParams.UserId-1];
  }).controller('CalculatorfactoryController',['$scope','Calculatorfactory',function($scope,Calculatorfactory){
  $scope.doSquare1 = function() {
        $scope.answer1 = Calculatorfactory.square1($scope.number1);
    }
  }]).service('CalculatorService',function(MathService){
   this.square = function(a) { return MathService.multiply(a,a); };
  }).service('MathService', function() {
    this.add = function(a, b) { return a + b };
    
    this.subtract = function(a, b) { return a - b };
    
    this.multiply = function(a, b) { return a * b };
    
    this.divide = function(a, b) { return a / b };
}).controller('getcontent',function($scope,$http){
  $http.get('/users/Deepak').success(function(response){
    
    $scope.userlist=response;
  });
  });

