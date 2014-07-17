/* global require */

require.config({
  paths: {
    'jquery': 'lib/jquery',
    'lodash': 'lib/lodash',
    'pixi': 'lib/pixi',
    'howler': 'lib/howler'
  }
});

require(['jquery', 'pixi', 'howler', 'lodash', 'utils/input'], function ($, PIXI, Howler, _, input) {
  'use strict';

  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) { window.setTimeout(cb, 1000 / 60); };

  var assets = ['img/mario.jpg'];
  var loader = new PIXI.AssetLoader(assets);
  loader.onComplete = function () {
    loadGame();
  };
  loader.load();

  function loadGame() {
    var renderer = new PIXI.autoDetectRenderer(1400, 600);
    $('#game').after(renderer.view);
    gameLoop();
  }

  function gameLoop() {
    requestAnimationFrame(gameLoop);
  }
});
