// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.internet', {
      url: "/internet",
      views: {
        'menuContent' :{
          templateUrl: "templates/internet.html"
        }
      }
    })
    .state('app.momo', {
      url: "/momo",
      views: {
        'menuContent' :{
          templateUrl: "templates/momo.html"
        }
      }
    })
    .state('app.me2u', {
      url: "/me2u",
      views: {
        'menuContent' :{
          templateUrl: "templates/me2u.html"
        }
      }
    })
    .state('app.rapide', {
      url: "/rapide",
      views: {
        'menuContent' :{
          templateUrl: "templates/rapide.html"
        }
      }
    })
    .state('app.infos', {
      url: "/infos",
      views: {
        'menuContent' :{
          templateUrl: "templates/infos.html"
        }
      }
    })
    .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('app.favori', {
      url: "/favori",
      views: {
        'menuContent' :{
          templateUrl: "templates/favori.html"
        }
      }
    })
   .state('app.sim', {
      url: "/sim",
      views: {
        'menuContent' :{
          templateUrl: "templates/sim.html"
        }
      }
    })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');
});
