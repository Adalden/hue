/* jshint node:true */
'use strict';

module.exports = function (app) {
  app.get('/test', function (req, res) {
    res.send('woot');
  });
};
