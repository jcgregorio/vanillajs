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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements_subreddit_van_webpack_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_post_van_webpack_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_css__);





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__subreddit_van_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__subreddit_van_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__subreddit_van_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subreddit_van_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subreddit_van_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__subreddit_van_js__);




/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

window.customElements.define('subreddit-van', class extends HTMLElement {
  // Only get callbacks when our 'name' attribute changes.
  static get observedAttributes() { return ['name']; }

  // Called when our 'name' attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (newValue === '') {
      return
    }
    fetch(`https://www.reddit.com/r/${ newValue }/top.json?limit=5`).then(resp => {
      resp.json().then(json => {
        this.innerHTML=`<h2>${ newValue.toUpperCase() }</h2>`;
        json.data.children.forEach(item => {
          let ele = document.createElement('post-van');
          ele.item = item;
          this.appendChild(ele);
        });
      });
    });
  }

  // Provide default content before the reddit content is loaded.
  connectedCallback() {
    this.textContent = 'Loading...';
  }
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_van_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__post_van_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__post_van_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_van_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_van_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__post_van_js__);




/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

window.customElements.define('post-van', class extends HTMLElement {
  // Called when our 'item' property is set.
  set item(it) {
    this.innerHTML = `
      <a  href="${it.data.url}" style="${this._getImageBackgroundCSS(it.data.thumbnail)}"
    target="_blank" class="thumbnail"></a>

      <div class="details">
        <a href="${it.data.url}" title="${it.data.title}" target="_blank" class="title">
        ${ it.data.title.substring(0, 60) }
        </a>

        <div class="action-buttons">
          <a href="http://reddit.com${ it.data.permalink }" title="Vote">
            <i class="material-icons">thumbs_up_down</i>
            ${it.data.score}
          </a>

          <a href="http://reddit.com${ it.data.permalink }" title="Go to discussion">
            <i class="material-icons">forum</i>
            ${it.data.num_comments}
          </a>
        </div>
      </div>
    `;
  }

  // Used in the template literal for item().
  _getImageBackgroundCSS(img) {
    if (!img || img==='self' || img==='nsfw') {
      img = 'images/placeholder.png';
    }
    return `background-image: url(${ img })`;
  }

});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);