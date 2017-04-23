/**
 * date: 2017-04-14 16:52:31
 * author: AllocatorXy
 * description: js plugin: scroll to anywhere
 *
 * usage:
 *   scrTo({
 *     to: 0,                    // Num: where u wanna scroll to | Default: 0
 *     during: 1000,             // Num: animation time(ms)      | Default: 1000
 *     easing: 'easeInOutCubic', // String: easing func name     | Default: 'easeInOutCubic'
 *     before() {...},           // func: before scroll
 *     fin() {...}               // func: scroll finished
 *   });
 *
 */

/* eslint-disable */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  !window.requestAnimationFrame && (window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  });

  !window.cancelAnimationFrame && (window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  });

  Object.prototype.addEv = function (ev, fn, capture) {
    this.addEventListener ? this.addEventListener(ev, fn, capture) : this.attachEvent('on' + ev, fn);
  };
  Object.prototype.removeEv = function (ev, fn, capture) {
    this.removeEventListener ? this.removeEventListener(ev, fn, capture) : this.detachEvent('on' + ev, fn);
  };

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }
      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function fNOP() {},
          fBound = function fBound() {
        return fToBind.apply(this instanceof fNOP ? this : oThis || this, aArgs.concat(Array.prototype.slice.call(arguments)));
      };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    };
  }

})();

var easing = {
  /**
   * easing funcs
   * @param {num} t current-time
   * @param {num} b start-val
   * @param {num} c delta-val
   * @param {num} d during
   */
  Linear: function Linear(t, b, c, d) {
    return c * t / d + b;
  },
  easeInQuad: function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function easeInOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function easeInExpo(t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function easeOutExpo(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function easeInOutExpo(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function easeInCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function easeInElastic(t, b, c, d, a, p) {
    var s;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (typeof p == 'undefined') p = d * .3;
    if (!a || a < Math.abs(c)) {
      s = p / 4;
      a = c;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function easeOutElastic(t, b, c, d, a, p) {
    var s;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (typeof p == 'undefined') p = d * .3;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function easeInOutElastic(t, b, c, d, a, p) {
    var s;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (typeof p == 'undefined') p = d * (.3 * 1.5);
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  },
  easeInBack: function easeInBack(t, b, c, d, s) {
    if (typeof s == 'undefined') s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function easeOutBack(t, b, c, d, s) {
    if (typeof s == 'undefined') s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function easeInOutBack(t, b, c, d, s) {
    if (typeof s == 'undefined') s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function easeInBounce(t, b, c, d) {
    return c - easing.easeOutBounce(d - t, 0, c, d) + b;
  },
  easeOutBounce: function easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
    }
  },
  easeInOutBounce: function easeInOutBounce(t, b, c, d) {
    if (t < d / 2) {
      return easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
    } else {
      return easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
  }
};

var MyScr = function MyScr() {
  _classCallCheck(this, MyScr);

  this.options = {
    easing: 'easeInOutCubic',
    during: 60,
    to: 0
  };
};

_extends(MyScr.prototype, {
  easing: easing,
  preDef: function preDef(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
  },
  preDefKey: function preDefKey(e) {
    var keycodes = { '37': 1, '38': 1, '39': 1, '40': 1 };
    keycodes[e.keyCode] && this.preDef(e);
  },
  disableScr: function disableScr() {
    window.addEv('DOMMouseScroll', this.preDef); // ff
    window.addEv('wheel', this.preDef);
    document.addEv('wheel', this.preDef);
    window.addEv('mousewheel', this.preDef);
    document.addEv('mousewheel', this.preDef);
    window.addEv('touchmove', this.preDef);
    document.addEv('keydown', this.preDefKey);
  },
  enableScr: function enableScr() {
    window.removeEv('DOMMouseScroll', this.preDef); // ff
    window.removeEv('wheel', this.preDef);
    document.removeEv('wheel', this.preDef);
    window.removeEv('mousewheel', this.preDef);
    document.removeEv('mousewheel', this.preDef);
    window.removeEv('touchmove', this.preDef);
    document.removeEv('keydown', this.preDefKey);
  }
});

// init
var myScroll = new MyScr(),
    scrTo = function (options) {
  var _this = this;

  cancelAnimationFrame(this.timer);
  options && options.during && (options.during *= 0.06); // 毫秒 => 帧数
  var _ref = [_extends({}, this.options, options), document.documentElement.scrollTop || document.body.scrollTop],
      op = _ref[0],
      start = _ref[1];

  op.before && op.before(null); // 钩子函数，滚动前
  var _ref2 = [0, function (_) {
    // 也不知道为什么，用ceil和floor, 实际动画时间比round要准
    var scrY = document.documentElement.scrollTop || document.body.scrollTop;
    if (now != op.during) {
      now++;
      scrY > op.to ? document.documentElement.scrollTop = document.body.scrollTop = Math.ceil(_this.easing[op.easing](now, start, op.to - start, op.during)) : document.documentElement.scrollTop = document.body.scrollTop = Math.floor(_this.easing[op.easing](now, start, op.to - start, op.during));
      _this.timer = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(_this.timer);
      _this.enableScr();
      op.fin && op.fin(null); // 钩子函数，结束后
      step = null;
    }
  }],
      now = _ref2[0],
      step = _ref2[1];
  // 开始滚动

  this.disableScr();
  this.timer = requestAnimationFrame(step);
}.bind(myScroll);