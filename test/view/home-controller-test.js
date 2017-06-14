'use strict';

const expect = require('chai').expect

describe('Home Controller', function(){
  beforeEach(done =>{
    angular.mock.module('cfgram')
    angular.mock.inject(($rootScope, $window, $httpBackend, $controller, galleryService) =>{
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.$controller = $controller;
      this.galleryService = galleryService;

      this.scope = this.$rootScope.$new();
      this.$window.localStorage.token = 'test token'
      this.homeCtrl = this.$controller(
        'HomeController',
        {
          scope: this.scope,
          galleryService : this.galleryService
        }
      )
      // this.homeCtrl.$onInit()
      done()
    })
  })
  afterEach(done =>{
    delete this.homeCtrl
    delete this.$window.localStorage.token
    done()
  })

  describe('Default properties', () =>{
    it('should have a galleries array', done =>{
      this.homeCtrl.$onInit();
      expect(this.homeCtrl.galleries).to.be.instanceOf(Array)
      done();
    })
    it('should have a fetch galleries method', done =>{
      this.homeCtrl.$onInit();
      expect(this.homeCtrl.fetchGalleries).to.be.instanceOf(Function)
      done()
    })
    it('should have a logout method', done =>{
      this.homeCtrl.$onInit();
      expect(this.homeCtrl.logout).to.be.instanceOf(Function)
      done()
    })
  })
  describe('Functional methods', ()=>{
    describe('#HomeController.fetchGalleries', () =>{
      beforeEach(done=>{
        this.expectUrl = 'http://localHost:3000/api/gallery'
        this.expectHeaders ={
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.$window.localStorage.token}`
        }
        this.expectGalleries = [
          {name: 'testOne', desc: 'testOne desc', _id: '1234'},
          {name: 'testTwo', desc: 'testTwo desc', _id: '5678'},
        ]
        done();
      })
      afterEach(done =>{
        // this.$httpBackend.flush()
        this.$rootScope.$apply()
        done()
      })

      it('should make a valid Get request', done =>{
        this.$httpBackend.expectGET(this.expectUrl, this.expectHeaders).respond(200)
        this.homeCtrl.$onInit();
        done()
      })
      it('should return array of galleries', done =>{
        this.$httpBackend.expectGET(this.expectUrl, this.expectHeaders).respond(200, this.expectGalleries)
        this.homeCtrl.$onInit();
        expect(this.expectGalleries).to.be.instanceOf(Array)
        done()
      })
    })
  })
})
