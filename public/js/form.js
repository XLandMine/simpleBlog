(function(){
    var app = angular.module('app', []);
    app.directive("check",function(){
        return {
            restrict: 'E',
            // 不存在value,check值与module值相同,为true或false,
            // 存在value,module值为数组,value在数组中存在则check为true反之为false
            template: '<div class="check" ng-class="{checked:value === undefined?module:module.indexOf(value) !== -1}" ng-click="clickFunc()"><b></b><span ng-transclude></span></div>',
            scope : {
                callback : '=',
                module: '=',
                value: '@',
            },
            replace: true,
            transclude: true,
            link:function(scope, element, attrs){
                scope.clickFunc = function() {
                    var check;
                    if(scope.value === undefined) {
                        // 不存在value,module值为true或false
                        check = scope.module = !scope.module;
                    } else {
                        // 存在value,module值为数组
                        var index = scope.module.indexOf(scope.value);
                        check = index==-1;
                        if(check) {
                            scope.module.push(scope.value);
                        } else {
                            scope.module.splice(index,1);
                        }
                    }
                    // callback存在则调用callback
                    scope.callback && scope.callback(check,element);
                    console.log(scope.value === undefined?scope.module:scope.module.indexOf(scope.value) !== -1);
                }
            }
        }
    })
    app.directive("radio",function(){
        return {
            restrict: 'E',
            template: '<div class="radio" ng-class="{checked:module==value}" ng-click="clickFunc()"><b></b><span ng-transclude></span></div>',
            scope : {
                callback : '=',
                module: '=',
                value: '='
            },
            replace: true,
            transclude: true,
            link:function(scope, element, attrs){
                scope.clickFunc = function(){
                    console.log(scope.module, scope.value);
                    scope.module = scope.value;
                    scope.callback && scope.callback(scope.module);
                }
            }
        }
    })
})();