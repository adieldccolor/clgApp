// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('clg', [
    'ionic',
    'ngCordova',
    'clg.config',
    'clg.factories',
    'clg.controllers'
  ])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope, $window, $cordovaNetwork) {
  $ionicPlatform.ready(function() {

    $rootScope.backgroundServiceRunning = false;

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if (window.cordova) {
      $rootScope.database = $cordovaSQLite.openDB({name: "clg.db", 
        location: "/data/data/com.ionicframework.clgapp556963/databases/"});
    }else{
      if (  window.openDatabase != undefined ) {
        $rootScope.database = window.openDatabase("clg.db", '1', 'my', 1024 * 1024 * 100); // browser
      } else {
        $rootScope.database = 'NOT_SUPPORTED';
      }
    }



    if ( window.cordova ) {

      cordova.plugins.backgroundMode.setDefaults({ 
          title:  'CLG Syncing Service',
          text:   'Executing background tasks.',
          silent: true
      });

      // Enable background mode
      cordova.plugins.backgroundMode.enable();

      // Called when background mode has been activated
      cordova.plugins.backgroundMode.onactivate = function () {

        $rootScope.backgroundServiceRunning = true;
        $rootScope.syncManager.startBackgroundSyncing();
        
      }

      cordova.plugins.backgroundMode.ondeactivate = function () {
        $rootScope.backgroundServiceRunning = false;
        $rootScope.syncManager.stopBackgroundSyncing();
      }

    }

    // $cordovaSQLite.execute($rootScope.database,  "DROP TABLE Maestro_Productos");
    // $cordovaSQLite.execute($rootScope.database,  "DROP TABLE Cartera_Clientes");
    // $cordovaSQLite.execute($rootScope.database,  "DROP TABLE sync_tasks");
    // $cordovaSQLite.execute($rootScope.database,  "DROP TABLE syncs");
    // $cordovaSQLite.execute($rootScope.database,  "DROP TABLE users");

    $rootScope.online = typeof navigator.connection !== "undefined" ? $cordovaNetwork.isOnline() : true;

    $rootScope.deviceReady = true;

    var $jqwindow = angular.element($window); // Name the variable whatever makes sense

    $jqwindow.on("offline", function() {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    });

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    });

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    })


  });
});



angular.module('clg.config', []);
angular.module('clg.factories', []);
angular.module('clg.controllers', []);
