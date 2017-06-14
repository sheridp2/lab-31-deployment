'use strict';

const expect = require('chai').expect;

describe('Create Gallery Component', function(){
  beforeEach(done =>{
    angular.mock.module('cfgram');
    //services we are injecting into our mock below
    angular.mock.inject(($rootScope, $httpBackend, $window, $componentController) =>{
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$window =$window;
      this.createGalleryCtrl = $componentController('createGallery');
      done();
    });
  });

  beforeEach(done=>{
    this.createGalleryCtrl.$onInit();
    //standard for angular applications, wraps our createGalleryCtrl, makes whats in $onInit avaliable to the controller
    this.$window.localStorage.setItem('token', 'test token');
    done();
  });

  afterEach(done => {
    this.$window.localStorage.removeItem('token');
    // this.$httpBackend.flush(1)
    this.$rootScope.$apply()
    done();
  });

  describe('#createGalleryCtrl.createGallery()', ()=>{
    it('should make a valid post request for all galleries', done =>{
      let expectUrl = 'http:localhost:3000/api/gallery';
      let expectHeaders = {
        Accept:'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`,
      };
      let expectGallery ={
        name: 'gallery one',
        desc: 'description one',
      };

      this.$httpBackend.whenPOST(expectUrl, expectGallery, expectHeaders).respond(200, expectGallery);
      this.createGalleryCtrl.gallery = expectGallery;
      expect(this.createGalleryCtrl.createGallery).to.not.throw();
      done();
    });
  });
});
