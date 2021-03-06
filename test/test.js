'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var mockPrompts = {
  moduleName: 'testModule',
  machineName: 'testmodule',
  moduleDesc: 'Test creation of module',
  install: true,
  hooks: ['theme'],
  dependency: '',
  extras: []
};


describe('drupal_module', function () {
  describe('general', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(mockPrompts)
        .on('end', done);
    });

    it('the generator can be required without throwing', function () {
      // not testing the actual run of generators yet
      require('../generators/app');
    });

    // Test to see if all files are created.
    it('creates files and folders', function () {
      assert.file([
        mockPrompts.machineName + '/' + mockPrompts.machineName + '.info',
        mockPrompts.machineName + '/' + mockPrompts.machineName + '.module',
        mockPrompts.machineName + '/' + mockPrompts.machineName + '.install',
        mockPrompts.machineName + '/templates'
      ]);
    });

  });

  describe('Test with different input', function () {
    before(function (done) {
      mockPrompts.moduleName = 'My Awesome Module';
      mockPrompts.hooks = [];
      mockPrompts.install = false;

      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(mockPrompts)
        .on('end', done);
    });

    it('Different name', function () {
      assert.file([
        'my_awesome_module/my_awesome_module.info',
        'my_awesome_module/my_awesome_module.module'
      ]);
    });

  });

});
