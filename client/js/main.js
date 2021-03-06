/* global require */

require.config({
  paths: {
    'jquery': 'lib/jquery',
    'lodash': 'lib/lodash',
    'pixi': 'lib/pixi',
    'howler': 'lib/howler',
    'map': '../resources/test-map'
  }
});

require(['jquery', 'pixi', 'howler', 'lodash', 'utils/input', 'map'], function ($, PIXI, Howler, _, input, TESTMAP) {
  'use strict';

  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) { window.setTimeout(cb, 1000 / 60); };

  var SPEED = 5;

  var assets = ['img/mario.jpg'];
  var loader = new PIXI.AssetLoader(assets);
  var renderer;
  var stage;
  var player;

  loader.onComplete = function () {
    loadGame();
  };
  loader.load();

  function loadGame() {
    renderer = new PIXI.autoDetectRenderer(1400, 600);
    $('#game').after(renderer.view);
    stage = new PIXI.Stage();

    loadMapTextures();
    var map = createMap();
    stage.addChild(map);
    player = createPlayer('img/mario.jpg', 100, 100);
    map.addChild(player);

    requestAnimationFrame(animate);
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
    if (input.check(37)) movePlayer(-SPEED, 0);
    if (input.check(38)) movePlayer(0, -SPEED);
    if (input.check(39)) movePlayer(SPEED, 0);
    if (input.check(40)) movePlayer(0, SPEED);
  }

  function movePlayer(x, y) {
    player.position.x += x;
    player.position.y += y;
  }

  function createPlayer(location, x, y) {
    var texture = new PIXI.Texture.fromImage(location);
    var player = new PIXI.Sprite(texture);
    player.position.x = x;
    player.position.y = y;
    player.scale.x = '.1';
    player.scale.y = '.1';
    return player;
  }

  function loadMapTextures() {
    var i, j, tempTexture;
    var size = 40;
    var botTexture = new PIXI.Texture.fromImage('img/bottom.png');
    var midTexture = new PIXI.Texture.fromImage('img/middle.png');

    for (i = 0; i < 8; ++i) {
      // load bot
      for (j = 0; j < 6; ++j) {
        tempTexture = new PIXI.Texture(botTexture, { x: i * size, y: j * size, width: size, height: size });
        PIXI.TextureCache['bot-' + ((j * 8) + i)] = tempTexture;
      }

      // load mid
      for (j = 0; j < 7; ++j) {
        tempTexture = new PIXI.Texture(midTexture, { x: i * size, y: j * size, width: size, height: size });
        PIXI.TextureCache['mid-' + ((j * 8) + i)] = tempTexture;
      }
    }
  }

  function createMap() {
    var i, j, id, tempSprite;

    var map = new PIXI.DisplayObjectContainer();
    for (i = 0; i < TESTMAP.bottom.length; ++i) {
      for (j = 0; j < TESTMAP.bottom[i].length; ++j) {
        id = TESTMAP.bottom[i][j];
        tempSprite = PIXI.Sprite.fromFrame('bot-' + id);
        tempSprite.position.x = i * 40;
        tempSprite.position.y = j * 40;
        map.addChild(tempSprite);
      }
    }

    for (i = 0; i < TESTMAP.middle.length; ++i) {
      for (j = 0; j < TESTMAP.middle[i].length; ++j) {
        id = TESTMAP.middle[i][j];
        if (id === null) continue;
        tempSprite = PIXI.Sprite.fromFrame('mid-' + id);
        tempSprite.position.x = i * 40;
        tempSprite.position.y = j * 40;
        tempSprite._width = 40;
        tempSprite._height = 40;
        // obstacles.push(tempSprite);
        map.addChild(tempSprite);
      }
    }

    map.visible = true;

    return map;
  }
});
