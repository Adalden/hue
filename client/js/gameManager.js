/* global pixi */
'use strict';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) { window.setTimeout(cb, 1000 / 60); };

var assets = ['img/temp.jpg'];
var loader = new PIXI.AssetLoader(assets);
loader.onComplete = function () {
  loadGame();
};
