// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=f5c5a070acd0539e4f99ade0bd7560ad", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

    console.log($scope.weatherResult);
    
    $scope.convertToFahrenheight = function(degK) {
        
    return Math.round((1.8 * (degK - 273)) + 32);
               

    };

    
    $scope.convertToDate = function(dt) { 
      
        return new Date(dt * 1000);
        
    };
    
}]);