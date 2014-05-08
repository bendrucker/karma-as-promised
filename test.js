'use strict';

/* globals describe:false, it:false, beforeEach:false, afterEach:false */

var chai     = require('chai').use(require('chai-as-promised')).use(require('sinon-chai'));
var expect   = chai.expect;
var sinon    = require('sinon');
var original = require('karma');
var karma    = require('./');

describe('karma-as-promised', function () {


  [
    {
      receiver: 'server',
      method: 'start'
    },
    {
      receiver: 'runner',
      method: 'run'
    }
  ]
  .forEach(function (promisified) {

    var receiver = promisified.receiver;
    var method = promisified.method;

    describe(receiver + '.' + method, function () {

      var stub;
      beforeEach(function () {
        stub = sinon.stub(original[receiver], method).yieldsAsync(0);
      });

      afterEach(function () {
        stub.restore();
      });

      it('resolves with exitCode === 0', function () {
        return karma[receiver][method]();
      });

      it('rejects with exitCode > 0', function () {
        stub.yieldsAsync(1);
        return expect(karma[receiver][method]())
          .to.be.rejectedWith('Karma exited with code 1');
      });

      it('passes through the config', function () {
        var config = {};
        return karma[receiver][method](config)
          .finally(function () {
            expect(stub).to.have.been.calledWith(config);
          });
      });

      it('uses the right context', function () {
        return karma[receiver][method]()
          .finally(function () {
            expect(stub).to.have.been.calledOn(original[receiver]);
          });
      });

    });

  });

});