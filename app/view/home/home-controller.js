'use strict';

require('./_home.scss');

module.exports = [
  '$log',
  '$rootScope',
  '$location',
  'galleryService',
  'authService',
  HomeController];

function HomeController($log, $rootScope, $location, galleryService, authService) {
  this.$onInit = () => {
    $log.debug('HomeController()');
    this.galleries = [];

    this.logout = function(){
      $log.log('successfully signed out');
      authService.logout()
      .then(() => $location.url('/join'));
    };

    this.fetchGalleries = () => {
      return galleryService.fetchGalleries()
      .then(galleries => {
        this.galleries = galleries;
        this.currentGallery = this.galleries[0];
        console.log(this.currentGallery);
      })
      .catch(err => $log.error(err));
    };

    $rootScope.$on('locationChangeSuccess', this.fetchGalleries);
    return this.fetchGalleries();
  };
}
