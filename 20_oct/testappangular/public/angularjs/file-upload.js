sampleapp.controller('MyCtrl', ['$scope', 'Upload','$location', function ($scope, Upload,$location) {
    // upload later on form submit or something similar
    $scope.submit = function() {
      if ($scope.file && !$scope.file.$error) {
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: '/users/fileupload',
            data: {file: file}
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' );
        }).success(function (data, status, headers, config) {
            $location.path('/managecategory');
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };
    // for multiple files:
    /*$scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          Upload.upload({..., data: {file: files[i]}, ...})...;
        }
        // or send them all together for HTML5 browsers:
        Upload.upload({..., data: {file: files}, ...})...;
      }
    }*/
}]);