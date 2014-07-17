/* jshint strict:false */
/* global PIXI, $ */

var assets = []; //['img/player.png'];
var loader = new PIXI.AssetLoader(assets);
loader.onComplete = function () {
  loadGame();
};
loader.load();

function loadGame() {
  var renderer = new PIXI.autoDetectRenderer(1400, 600);
  $('#game').after(renderer.view);
}
