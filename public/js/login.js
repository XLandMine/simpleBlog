/**
 * Created by Adhub on 2017/7/19.
 * Author xy
 */
 var loginApp = angular.module('login.model',[]);
loginApp.controller('loginCtr',function($scope,$http){
    //立即登录
    $scope.login = function(){
        window.location.href = './index.html';
    }
});