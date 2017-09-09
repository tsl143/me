/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* https://medium.com/humans-create-software/semicolons-cannot-save-you-bf991756174e */
fetch('me.json').then(function (response) {
    return response.json();
}).then(function (data) {
    return drawMe(data);
});

var treatMe = function treatMe(data, parent, key) {
    key = key || '';

    if (typeof data === 'string') {
        createLi('string', parent, key, data);
    }

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && !data.length) {
        var ul = document.createElement('ul');
        createLi('objectOpen', parent, key);
        parent.appendChild(ul);
        for (var x in data) {
            treatMe(data[x], ul, x);
        }
        createLi('objectClose', parent);
    }

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data.length) {
        var _ul = document.createElement('ul');
        createLi('arrayOpen', parent, key);
        parent.appendChild(_ul);
        data.forEach(function (y) {
            return treatMe(y, _ul);
        });
        createLi('arrayClose', parent);
    }
};

var createLi = function createLi(type, parent, key, data) {
    var li = document.createElement('li');
    switch (type) {
        case 'string':
            if (key !== '') {
                var span1 = document.createElement('span');
                span1.className = 'objectKey';
                span1.textContent = '"' + key + '": ';
                li.appendChild(span1);
            }
            var span2 = document.createElement('span');
            span2.textContent = '"' + data + '",';
            li.appendChild(span2);
            break;
        case 'objectOpen':
            li.className = 'objectKey';
            li.textContent = (key !== '' ? '"' + key + '": ' : '') + ' {';
            break;
        case 'objectClose':
            li.textContent = '},';
            li.className = 'objectKey';
            break;
        case 'arrayOpen':
            li.className = 'arrayKey';
            li.textContent = (key !== '' ? '"' + key + '": ' : '') + ' [';
            break;
        case 'arrayClose':
            li.textContent = '],';
            li.className = 'arrayKey';
            break;

        default:
            break;
    }
    parent.appendChild(li);
};

var body = document.body;
var parentUL = document.createElement('ul');

var drawMe = function drawMe(me) {
    createLi('objectOpen', body, '');
    document.body.appendChild(parentUL);
    for (var key in me) {
        treatMe(me[key], parentUL, key);
    }
    createLi('objectClose', body, '');
    handleLastComma();
};

var handleLastComma = function handleLastComma() {
    var allLis = document.querySelectorAll('li');
    for (var i = allLis.length - 1; i > allLis.length - 3; i--) {
        allLis[i].textContent = allLis[i].textContent.slice(0, -1);
    }
};

/***/ })
/******/ ]);