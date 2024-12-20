/**
 * @fileoverview Levels
 * @author Random | http://weibo.com/random
 * @date 2015-03-06
 */

define(function (require, exports, module) {
  "use strict";

  var addEvent = require("lib/addEvent");

  var Levels = {};
  var k;

  function typeAB(v, d) {
    return function () {
      var angle = 0;
      return function () {
        angle += (v * d) % 360;
        return angle;
      };
    };
  }

  function typeC(v, td) {
    return function () {
      var angle = 0;
      var d = 1;
      var t = +new Date();
      return function () {
        var t2 = +new Date();
        if (t2 - t > td) {
          d = -d;
          t = t2;
        }
        angle += (d * v) % 360;
        return angle;
      };
    };
  }

  function typeD(v, sum, td, d) {
    return function () {
      var angle = 0;
      var t = +new Date();

      return function () {
        var t2 = +new Date();
        if (t2 - t > td) {
          v = sum - v;
          t = t2;
        }
        angle += (v * d) % 360;
        return angle;
      };
    };
  }

  function typeE(v1, v2) {
    var d = 1;
    var map = {
      "-1": v2,
      1: v1,
    };
    var v = v2 ? map[d] : v1;

    addEvent(document.body, "mousedown", function () {
      d = -d;
      v = v2 ? map[d] : v1;
    });
    return function () {
      var angle = 0;

      return function () {
        angle += (v * d) % 360;
        return angle;
      };
    };
  }

  function typeDE(v, sum, td, d) {
    addEvent(document.body, "mousedown", function () {
      d = -d;
    });
    return function () {
      var angle = 0;
      var t = +new Date();

      return function () {
        var t2 = +new Date();
        if (t2 - t > td) {
          v = sum - v;
          t = t2;
        }
        angle += (v * d) % 360;
        return angle;
      };
    };
  }

  function typeF(v1, v2, td1, td2) {
    return function () {
      var angle = 0;
      var t = +new Date();
      var i = 0;
      var arr = [
        [v1, td1],
        [v2, td2],
      ];
      var d = 1;

      return function () {
        var t2 = +new Date();
        var v = arr[i][0];
        if (t2 - t > arr[i][1]) {
          v = arr[i][0];
          i = (i + 1) % 2;
          t = +new Date();
          d = -d;
        }

        angle += d * v;
        return angle;
      };
    };
  }

  var roundTypes = {
    A1: typeAB(1.5, 1),
    A2: typeAB(1.5, -1),

    B1: typeAB(2.5, 1),
    B2: typeAB(2.5, -1),

    C1: typeC(2.2, 3000),
    C2: typeC(3.5, 2000),

    D1: typeD(2, 2.3, 1200, 1),
    D2: typeD(2, 2.3, 1200, -1),
    D3: typeD(4, 4.5, 700, 1),
    D4: typeD(4, 4.5, 700, -1),
    D5: typeD(4, 4.5, 1700, 1),
    D6: typeD(4, 4.5, 1700, -1),

    E1: typeE(2),
    E2: typeDE(2, 2.3, 1000, 1),
    E3: typeDE(2, 2.5, 1000, 1),
    E4: typeE(3, 2),
    E5: typeE(1.5, 3.2),

    F1: typeF(2, 0.3, 200, 300),
    F2: typeF(3.5, 1, 250, 1500),
    F3: typeF(0.5, 1.8, 350, 1500),
    F4: typeF(1.8, 0.5, 1000, 150),
    F5: typeF(0.5, 2.2, 350, 1500),
  };

  var childsTypes = {
    0: [],
    2: [0, 180],
    3: [0, 120, 240],
    4: [0, 90, 180, 270],
    5: [0, 72, 144, 216, 288],
    6: [0, 60, 120, 180, 240, 300],
    7: [0, 52, 103, 155, 206, 258, 309],
    8: [0, 45, 90, 135, 180, 225, 270, 315],
    9: [0, 40, 80, 120, 160, 200, 240, 280, 320],
    10: [0, 36, 72, 108, 144, 180, 216, 252, 288, 324],
    11: [0, 33, 66, 99, 131, 164, 197, 230, 262, 295, 328],
    12: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
    13: [0, 28, 56, 84, 111, 139, 167, 194, 222, 250, 277, 305, 333],
    14: [0, 26, 52, 78, 103, 129, 155, 180, 206, 232, 258, 283, 309, 335],
    15: [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336],
    16: [
      0, 23, 45, 68, 90, 113, 135, 158, 180, 203, 225, 248, 270, 293, 315, 338,
    ],
  };

  var data = {
    1: ["4", 8, "A1"],
    2: ["6", 10, "A1"],
    3: ["2", 20, "A1"],
    4: ["8", 12, "A2"],
    5: ["12", 8, "A1"],
    6: ["10", 10, "A2"],
    7: ["11", 12, "A1"],
    8: ["14", 6, "A2"],
    9: ["0", 26, "A2"],
    10: ["14", 10, "A1"],

    11: ["10", 8, "B1"],
    12: ["6", 12, "B2"],
    13: ["12", 4, "B1"],
    14: ["8", 14, "B2"],
    15: ["8", 6, "B1"],
    16: ["5", 10, "B2"],
    17: ["6", 12, "B1"],
    18: ["8", 14, "B2"],
    19: ["0", 23, "B1"],
    20: ["10", 13, "B2"],

    21: ["4", 12, "C1"],
    22: ["6", 10, "C1"],
    23: ["8", 12, "C1"],
    24: ["7", 14, "C1"],
    25: ["2", 18, "C1"],
    26: ["4", 18, "C1"],
    27: ["0", 24, "C1"],
    28: ["4", 10, "C2"],
    29: ["6", 13, "C2"],
    30: ["4", 20, "C1"],

    31: ["6", 8, "D1"],
    32: ["2", 12, "D2"],
    33: ["3", 14, "D2"],
    34: ["3", 18, "D1"],
    35: ["8", 12, "D1"],
    36: ["7", 15, "D2"],
    37: ["16", 8, "D2"],
    38: ["0", 23, "D1"],
    39: ["12", 12, "D1"],
    40: ["12", 15, "D2"],

    41: ["5", 10, "E1"],
    42: ["6", 12, "E1"],
    43: ["3", 15, "E1"],
    44: ["3", 19, "E1"],
    45: ["0", 24, "E1"],
    46: ["2", 15, "E2"],
    47: ["4", 16, "E2"],
    48: ["12", 8, "E2"],
    49: ["3", 20, "E2"],
    50: ["16", 14, "E3"],

    51: ["6", 10, "D3"],
    52: ["2", 18, "D4"],
    53: ["8", 14, "D3"],
    54: ["0", 24, "D4"],
    55: ["4", 21, "D3"],
    56: ["16", 16, "A1"],
    57: ["4", 22, "C1"],
    58: ["4", 26, "D1"],
    59: ["4", 25, "E2"],
    60: ["12", 14, "E2"],

    61: ["10", 11, "F1"],
    62: ["4", 21, "F1"],
    63: ["8", 16, "F1"],
    64: ["2", 24, "F1"],
    65: ["16", 8, "F1"],
    66: ["12", 14, "F2"],
    67: ["8", 19, "F2"],
    68: ["3", 21, "F2"],
    69: ["0", 32, "F2"],
    70: ["8", 20, "F1"],

    71: ["12", 12, "F5"],
    72: ["8", 18, "F3"],
    73: ["15", 15, "F5"],
    74: ["3", 18, "F3"],
    75: ["3", 22, "F5"],
    76: ["5", 22, "F4"],
    77: ["6", 21, "F4"],
    78: ["9", 18, "F4"],
    79: ["8", 21, "F4"],
    80: ["6", 24, "F4"],

    81: ["5", 12, "E4"],
    82: ["7", 14, "E4"],
    83: ["2", 21, "E4"],
    84: ["0", 24, "E4"],
    85: ["7", 16, "E4"],
    86: ["12", 13, "E5"],
    87: ["4", 15, "E5"],
    88: ["5", 19, "E5"],
    89: ["8", 18, "E4"],
    90: ["16", 16, "E4"],
  };

  function bindLevles(lv, ct, count, rt) {
    Levels[lv] = {
      childs: childsTypes[ct],
      queueCount: count,
      round: roundTypes[rt],
    };
  }

  for (k in data) {
    bindLevles(k, data[k][0], data[k][1], data[k][2]);
  }

  module.exports = Levels;
});
