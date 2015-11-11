angular.module('mfuApp', ['ngNewRouter', 'ngMaterial', 'ngAnimate', 'firebase', 'home'])
    .controller('mfuCtrl', ['$router', mfuCtrl]);

function mfuCtrl ($router) {
    //Router Configuration
    $router.config([
        {path: '/', component: 'home' },
    ]);
}