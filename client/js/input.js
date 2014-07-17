(function (global) {
  'use strict';
  var inputs = {};
  var handlers = {};

  window.addEventListener('keydown', function (e) {
    inputs[e.keyCode] = true;
    if (handlers[e.keyCode]) {
      handlers[e.keyCode].forEach(function (fn) {
        fn('down');
      });
    }
  });

  window.addEventListener('keyup', function (e) {
    inputs[e.keyCode] = false;
    if (handlers[e.keyCode]) {
      handlers[e.keyCode].forEach(function (fn) {
        fn('up');
      });
    }
  });

  function isPressed(keyCode) {
    return !!inputs[keyCode];
  }

  function resetKey(keyCode) {
    inputs[keyCode] = false;
  }

  function attachHandler(keyCode, fn) {
    if (!handlers[keyCode]) handlers[keyCode] = [];
    handlers[keyCode].push(fn);
  }

  global.input = {
    check: isPressed,
    reset: resetKey,
    attach: attachHandler
  };
}(window));
