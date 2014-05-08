'use strict';

var Promise = require('bluebird');
var karma = require('karma');

var internals = {};

internals.promisifyKarma = function (receiver, method) {
  return function (config) {
    return new Promise(function (resolve, reject) {
      receiver[method](config, function (exitCode) {
        if (!exitCode) return resolve();
        return reject(new Error('Karma exited with code ' + exitCode));
      });
    });
  };  
};

exports.server = {
  start: internals.promisifyKarma(karma.server, 'start')
};

exports.runner = {
  run: internals.promisifyKarma(karma.runner, 'run')
};