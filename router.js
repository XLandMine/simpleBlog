app.config(function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    var apps = ["index"],
        dictionary = [];
    angular.forEach(apps, function (data) {
        var item = {};
        item.name = data;
        item.serie = true;
        item.files = ['modules/'+data + '/'+data+'.css','modules/'+data + '/'+data+'.js'];
        dictionary.push(item);
    });
    $ocLazyLoadProvider.config({
        debug: true,
        events: true,
        modules: dictionary
    });

    $urlRouterProvider.when("/","/index");
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        // 首页
        .state("index",{
            url: '/index',
            templateUrl: 'modules/index/index.html',
            controller: 'indexCtrl',
            resolve: {
                des: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('index');
                }]
            }
        })

});