/* jshint node:true */
'use strict';

var      fs = require('fs');
var  stylus = require('stylus');
var express = require('express');

var app = express();

app.use(express.static('client'));
app.use(stylus.middleware({
  debug: true,
  src: 'client',
  dest: 'client'
}));

fs.readdirSync(__dirname + '/routes').forEach(function(file) {
  require('./routes/' + file)(app);
});

app.listen(3000);
