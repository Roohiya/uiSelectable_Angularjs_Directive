'use strict';

var app = angular.module('SelectableApp', ['ui.bootstrap']).controller("SelectableCtrl", ['$scope', '$http', function($scope, $http){
    $scope.numAll = ["1","2","3","4","5","10","11"];
    
    $scope.items = [];
    
    var promise = $http({
        method: 'GET',
        url: './data/data.json'
    });
    promise.success(function (response) {
        $scope.numList = response;
        $scope.items = $scope.numList.lineNum;
    });
    
    $scope.getClass = function(item,list){
        for(var i = 0; i < list.length; i++){
            if(list[i] == item){
                return true
            }
        }
    }
}]).directive('uiSelectable', function () {
    return function (scope, el, attrs) {
        el.selectable({
            stop:function(evt,ui){
                var selected=el.find('.ui-selected').map(function(){
                    var idx=$(this).index();
                    return {name: scope.items[idx].name, index:idx}
                }).get();
                
                var selectedEdited = _.pluck(selected, 'name')
                scope.numAll=selectedEdited;
                scope.$apply();
            }
        });
    };
});