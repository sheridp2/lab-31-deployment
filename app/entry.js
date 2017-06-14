'use strict';

require('./scss/reset.scss');
require('./scss/main.scss');
//add more scss

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('@uirouter/angularjs');
require('ng-file-upload');
//content from the page being funneled through uirouter

const cfgram = angular.module('cfgram', ['ui.router', 'ngFileUpload']);
//angular module, primanry component of the app, [ui.router] is a dependecy to be use throughout application. Array of injected dependecies

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( path => cfgram.config(context(path)));
//loading up all the parts of .config and mounting them to our module. Goes into config file and makes key value pairs for each js file

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => cfgram.controller(pascalcase(path.basename(key, '.js')),  context(key)));

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => cfgram.service(camelcase(path.basename(key, '.js')), context(key)));

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => cfgram.component(camelcase(path.basename(key, '.js')), context(key)));

context = require.context('./filter/', true, /\/js$/);
context.keys().forEach(key=> cfgram.filter(camelcase(path.basename(key, '.js')), context(key)));
