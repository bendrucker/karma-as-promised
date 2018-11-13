karma-as-promised [![Build Status](https://travis-ci.org/bendrucker/karma-as-promised.svg)](https://travis-ci.org/bendrucker/karma-as-promised) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/karma-as-promised.svg)](https://greenkeeper.io/)
=================

A lightweight promise wrapper for [Karma's public API](http://karma-runner.github.io/0.12/dev/public-api.html). This wrapper will not replace or alter any of Karma's methods directly. Anywhere you would `require('karma')`, just `require('karma-as-promised')` instead. The configuration will be passed through directly.

When Karma reports an exit code of 0, the promise resolves. For any other code, it is rejected. 

### Example

```js
require('karma-as-promised').server.start(config)
  .then(function () {
    // tests exited with code 0
  })
  .catch(function (err) {
    // err.message => Karma exited with code {code}
  });
```