'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    gallery: '<',
  },
  controller:[
    '$log',
    'picService',
    function($log, picService){
      this.$onInit = () =>{
        $log.debug('thumbnailCtrl');
        console.log('-----------HERE---------', this);
        this.deletePic = () =>{
          $log.debug('#thumbnailCtrl.deletePic');

          picService.deletePic(this.gallery, this.pic);
        };
      };
    },
  ],
};
