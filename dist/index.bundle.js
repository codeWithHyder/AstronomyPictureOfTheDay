"use strict";
(self["webpackChunkto_do_list_final"] = self["webpackChunkto_do_list_final"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/modules/cards.js");


//import './stylesForComment.css';

window.onload = (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();

/***/ }),

/***/ "./src/modules/APIcomments.js":
/*!************************************!*\
  !*** ./src/modules/APIcomments.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getComments = async itemId => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO/comments?item_id=${itemId}`);
  const data = await response.json();
  return data;
};
const addComments = async (username, comment, itemID) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemID,
      username: username,
      comment: comment
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  return response.text();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getComments,
  addComments
});

/***/ }),

/***/ "./src/modules/GetRequest.js":
/*!***********************************!*\
  !*** ./src/modules/GetRequest.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
const key = 'tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO';
const startDate = '2023-03-20';
const endDate = '2023-04-06';
const url = `${baseUrl}${key}&start_date=${startDate}&end_date=${endDate}`;
const getPictures = async () => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPictures);

/***/ }),

/***/ "./src/modules/cards.js":
/*!******************************!*\
  !*** ./src/modules/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GetRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetRequest */ "./src/modules/GetRequest.js");
/* harmony import */ var _involvementApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./involvementApp */ "./src/modules/involvementApp.js");
/* harmony import */ var _showCommentsCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./showCommentsCard */ "./src/modules/showCommentsCard.js");
/* harmony import */ var _counts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./counts */ "./src/modules/counts.js");


 // eslint-disable-line import/no-cycle

const itemGrid = document.querySelector('.item-grid');
const createCards = async () => {
  const myPictures = await (0,_GetRequest__WEBPACK_IMPORTED_MODULE_0__["default"])();
  myPictures.forEach((item, i) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if (item.media_type === 'image') {
      const media = document.createElement('img');
      media.classList.add('picture');
      media.src = item.url;
      card.appendChild(media);
      media.addEventListener('click', async () => {
        await (0,_showCommentsCard__WEBPACK_IMPORTED_MODULE_2__["default"])(item.title);
        const modal = document.querySelector('.comment-model');
        modal.classList.add('active');
      });
    } /*else {
      const media = document.createElement('iframe');
      media.classList.add('video');
      media.src = item.url;
      card.appendChild(myPictures);
      }*/

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = item.title;
    cardTitle.classList.add('card-title');
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container');
    const love = document.createElement('i');
    love.classList.add('fas', 'fa-heart');
    love.setAttribute('index', `${i}`);
    likesContainer.appendChild(love);
    const likes = document.createElement('p');
    likes.textContent = '0 likes';
    const likeNumber = async () => {
      const itemLikes = await (0,_involvementApp__WEBPACK_IMPORTED_MODULE_1__.getLikes)();
      itemLikes.forEach(like => {
        if (like.item_id === `picture-${i}`) {
          likes.textContent = '';
          likes.classList.add('like-number');
          likes.textContent = `${like.likes} likes`;
        }
      });
    };
    love.addEventListener('click', async () => {
      await (0,_involvementApp__WEBPACK_IMPORTED_MODULE_1__.postLike)(`picture-${i}`);
      likeNumber();
    });
    likeNumber();
    likesContainer.appendChild(likes);
    const comment = document.createElement('button');
    comment.classList.add('comment-btn');
    comment.type = 'button';
    comment.setAttribute('title', `${item.title}`);
    comment.innerText = 'Comments';
    comment.addEventListener('click', async () => {
      await (0,_showCommentsCard__WEBPACK_IMPORTED_MODULE_2__["default"])(item.title);
      const modal = document.querySelector('.comment-model');
      modal.classList.add('active');
    });
    titleContainer.appendChild(cardTitle);
    titleContainer.appendChild(contentContainer);
    contentContainer.appendChild(likesContainer);
    contentContainer.appendChild(comment);
    card.appendChild(titleContainer);
    card.setAttribute('index', `${i}`);
    itemGrid.appendChild(card);
  });
  const counter = document.getElementById('picture-counter');
  if (myPictures.length === 0) {
    counter.textContent = 0;
  } else {
    counter.textContent = (0,_counts__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
  console.log(card);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCards);

/***/ }),

/***/ "./src/modules/comments.js":
/*!*********************************!*\
  !*** ./src/modules/comments.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _APIcomments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIcomments */ "./src/modules/APIcomments.js");

const displayComments = async userID => {
  const comments = await (0,_APIcomments__WEBPACK_IMPORTED_MODULE_0__["default"])(userID);
  if (comments.length === undefined) {
    const commentCounter = document.querySelector('.comment-counter');
    commentCounter.innerHTML = '(0)';
  } else {
    comments.forEach(comment => {
      const commentContainer = document.querySelector('.comment-container');
      const li = document.createElement('li');
      li.classList.add('single-comment');
      const time = document.createElement('span');
      time.classList.add('comment-time');
      time.innerText = `${comment.creation_date}, `;
      const author = document.createElement('span');
      author.classList.add('comment-author');
      author.innerText = `${comment.username}: `;
      const message = document.createElement('span');
      message.classList.add('commentMsg');
      message.innerText = comment.comment;
      li.append(time, author, message);
      commentContainer.appendChild(li);
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayComments);

/***/ }),

/***/ "./src/modules/countComments.js":
/*!**************************************!*\
  !*** ./src/modules/countComments.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const countComments = () => {
  const allComments = document.querySelectorAll('.single-comment').length;
  return allComments;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countComments);

/***/ }),

/***/ "./src/modules/counts.js":
/*!*******************************!*\
  !*** ./src/modules/counts.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const countCards = () => {
  const myArray = document.querySelectorAll('.card');
  const count = myArray.length;
  return count;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countCards);

/***/ }),

/***/ "./src/modules/involvementApp.js":
/*!***************************************!*\
  !*** ./src/modules/involvementApp.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLikes": () => (/* binding */ getLikes),
/* harmony export */   "postLike": () => (/* binding */ postLike)
/* harmony export */ });
const postLike = async itemId => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/PXvVn75NsImDnwHgqLa4/likes/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  return response.text();
};
const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO/likes/');
  const data = await response.json();
  return data;
};


/***/ }),

/***/ "./src/modules/showCommentsCard.js":
/*!*****************************************!*\
  !*** ./src/modules/showCommentsCard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GetRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetRequest */ "./src/modules/GetRequest.js");
/* harmony import */ var _comments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comments */ "./src/modules/comments.js");
/* harmony import */ var _APIcomments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./APIcomments */ "./src/modules/APIcomments.js");
/* harmony import */ var _countComments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./countComments */ "./src/modules/countComments.js");




const showCommentCard = async title => {
  const myPicturesJson = await (0,_GetRequest__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const stringifiedJson = JSON.stringify(myPicturesJson);
  const myPictures = JSON.parse(stringifiedJson);
  myPictures.forEach((element, index) => {
    if (element.title === title) {
      const commentModel = document.querySelector('.comment-model');
      const commentCard = document.createElement('div');
      commentCard.classList.add('comment-card');
      commentCard.setAttribute('index', index);
      const closeIcon = document.createElement('div');
      closeIcon.classList.add('close-icon');
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-times');
      closeIcon.appendChild(icon);
      const closeClick = () => {
        commentModel.classList.remove('active');
        commentModel.innerHTML = '';
      };
      closeIcon.addEventListener('click', closeClick);
      const mainDescription = document.createElement('div');
      mainDescription.classList.add('main-description');
      if (element.media_type === 'image') {
        const media = document.createElement('img');
        media.classList.add('mediaImage');
        media.src = element.url;
        mainDescription.appendChild(media);
      } else {
        const media = document.createElement('iframe');
        media.classList.add('mediaVideo');
        media.src = element.url;
        mainDescription.appendChild(media);
      }
      const h1 = document.createElement('h1');
      h1.classList.add('image-title');
      h1.innerText = element.title;
      const explanation = document.createElement('p');
      explanation.classList.add('image-explanation');
      explanation.innerText = element.explanation;
      const extraExplanation = document.createElement('p');
      const copyright = document.createElement('span');
      copyright.classList.add('copyright');
      copyright.innerText = `By ${element.copyright ?? 'Anonymous'}`;
      const imageDate = document.createElement('span');
      imageDate.classList.add('image-date');
      imageDate.innerText = `${element.date}`;
      extraExplanation.append(copyright, imageDate);
      const h2 = document.createElement('h2');
      h2.innerText = 'Comments ';
      const commentCounter = document.createElement('span');
      commentCounter.classList.add('comment-counter');
      h2.appendChild(commentCounter);
      const commentContainer = document.createElement('ul');
      commentContainer.classList.add('comment-container');
      const commentTitle = document.createElement('h2');
      commentTitle.innerText = 'Add a comment';
      const form = document.createElement('form');
      form.innerHTML = `
          <input type="text" placeholder="Your name" class="name-input" required autocomplete="off" />
          <textarea name="comment-input" class="comment-input" placeholder="Your insights..." required></textarea>
          <button type="submit">Comment</button>
          `;
      mainDescription.append(h1, explanation, extraExplanation, h2, commentContainer, commentTitle, form); // eslint-disable-line max-len
      commentCard.append(closeIcon, mainDescription);
      commentModel.appendChild(commentCard);
      form.addEventListener('submit', async event => {
        event.preventDefault();
        commentContainer.innerHTML = '';
        const username = document.querySelector('.name-input').value;
        const commentMessage = document.querySelector('.comment-input').value;
        const userID = commentCard.getAttribute('index');
        await (0,_APIcomments__WEBPACK_IMPORTED_MODULE_2__["default"])(username, commentMessage, userID);
        await (0,_comments__WEBPACK_IMPORTED_MODULE_1__["default"])(userID);
        form.reset();
        const counter = document.querySelector('.comment-counter');
        counter.innerText = `(${(0,_countComments__WEBPACK_IMPORTED_MODULE_3__["default"])()})`;
      });
    }
  });
  const commentCard = document.querySelector('.comment-card');
  const userID = commentCard.getAttribute('index');
  await (0,_comments__WEBPACK_IMPORTED_MODULE_1__["default"])(userID);
  const commentCounter = document.querySelector('.comment-counter');
  commentCounter.innerText = `(${(0,_countComments__WEBPACK_IMPORTED_MODULE_3__["default"])()})`;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showCommentCard);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n\r\n.app-container {\r\n  width:80%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(143, 91, 156, 0.87);\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 2rem 1rem;\r\n  background-color: rgba(238, 106, 11, 0.651);\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 2rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;;AAGA;EACE,SAAS;EACT,iBAAiB;EACjB,kBAAkB;EAClB,0CAA0C;AAC5C;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,mBAAmB;EACnB,iBAAiB;EACjB,2CAA2C;AAC7C;;AAEA;EACE,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,+BAA+B;AACjC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;EAChB,oBAAoB;AACtB","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n\r\n.app-container {\r\n  width:80%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(143, 91, 156, 0.87);\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 2rem 1rem;\r\n  background-color: rgba(238, 106, 11, 0.651);\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 2rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL0FQSWNvbW1lbnRzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9HZXRSZXF1ZXN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9jYXJkcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL21vZHVsZXMvY29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL2NvdW50Q29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL2NvdW50cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL21vZHVsZXMvaW52b2x2ZW1lbnRBcHAuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL3Nob3dDb21tZW50c0NhcmQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGUuY3NzJztcclxuaW1wb3J0IGNyZWF0ZUNhcmRzIGZyb20gJy4vbW9kdWxlcy9jYXJkcyc7XHJcbi8vaW1wb3J0ICcuL3N0eWxlc0ZvckNvbW1lbnQuY3NzJztcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBjcmVhdGVDYXJkcygpOyIsImNvbnN0IGdldENvbW1lbnRzID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL3R5Z0pRaE9aeWV4UWNQcWE2OURHQ0pKTGtycm1DQXFvVklnVWhlaU8vY29tbWVudHM/aXRlbV9pZD0ke2l0ZW1JZH1gKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuY29uc3QgYWRkQ29tbWVudHMgPSBhc3luYyAodXNlcm5hbWUsIGNvbW1lbnQsIGl0ZW1JRCkgPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL3R5Z0pRaE9aeWV4UWNQcWE2OURHQ0pKTGtycm1DQXFvVklnVWhlaU8vY29tbWVudHMnLCB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgaXRlbV9pZDogaXRlbUlELFxyXG4gICAgICB1c2VybmFtZTogdXNlcm5hbWUsXHJcbiAgICAgIGNvbW1lbnQ6IGNvbW1lbnQsXHJcbiAgICB9KSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgZ2V0Q29tbWVudHMsIGFkZENvbW1lbnRzIH07IiwiY29uc3QgYmFzZVVybCA9ICdodHRwczovL2FwaS5uYXNhLmdvdi9wbGFuZXRhcnkvYXBvZD9hcGlfa2V5PSc7XHJcbmNvbnN0IGtleSA9ICd0eWdKUWhPWnlleFFjUHFhNjlER0NKSkxrcnJtQ0Fxb1ZJZ1VoZWlPJztcclxuY29uc3Qgc3RhcnREYXRlID0gJzIwMjMtMDMtMjAnO1xyXG5jb25zdCBlbmREYXRlID0gJzIwMjMtMDQtMDYnO1xyXG5jb25zdCB1cmwgPSBgJHtiYXNlVXJsfSR7a2V5fSZzdGFydF9kYXRlPSR7c3RhcnREYXRlfSZlbmRfZGF0ZT0ke2VuZERhdGV9YDtcclxuXHJcbmNvbnN0IGdldFBpY3R1cmVzID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcclxuICBjb25zdCBhbnN3ZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgcmV0dXJuIGFuc3dlcjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldFBpY3R1cmVzOyIsImltcG9ydCBnZXRQaWN0dXJlcyBmcm9tICcuL0dldFJlcXVlc3QnO1xyXG5pbXBvcnQge3Bvc3RMaWtlLCBnZXRMaWtlc30gZnJvbSAnLi9pbnZvbHZlbWVudEFwcCc7XHJcbmltcG9ydCBzaG93Q29tbWVudENhcmQgZnJvbSAnLi9zaG93Q29tbWVudHNDYXJkJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tY3ljbGVcclxuaW1wb3J0IGNvdW50Q2FyZHMgZnJvbSAnLi9jb3VudHMnO1xyXG5cclxuY29uc3QgaXRlbUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaXRlbS1ncmlkJyk7XHJcblxyXG5jb25zdCBjcmVhdGVDYXJkcyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBteVBpY3R1cmVzID0gYXdhaXQgZ2V0UGljdHVyZXMoKTtcclxuXHJcbiAgbXlQaWN0dXJlcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcclxuXHJcbiAgICBpZiAoaXRlbS5tZWRpYV90eXBlID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIG1lZGlhLmNsYXNzTGlzdC5hZGQoJ3BpY3R1cmUnKTtcclxuICAgICAgbWVkaWEuc3JjID0gaXRlbS51cmw7XHJcbiAgICAgIGNhcmQuYXBwZW5kQ2hpbGQobWVkaWEpO1xyXG4gICAgICBtZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBzaG93Q29tbWVudENhcmQoaXRlbS50aXRsZSk7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1tb2RlbCcpO1xyXG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIFxyXG4gICAgICB9KTtcclxuICAgIH0gLyplbHNlIHtcclxuICAgICAgY29uc3QgbWVkaWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgICAgbWVkaWEuY2xhc3NMaXN0LmFkZCgndmlkZW8nKTtcclxuICAgICAgbWVkaWEuc3JjID0gaXRlbS51cmw7XHJcbiAgICAgIGNhcmQuYXBwZW5kQ2hpbGQobXlQaWN0dXJlcyk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBjb25zdCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGl0bGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGl0bGUtY29udGFpbmVyJyk7XHJcblxyXG4gICAgY29uc3QgY2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgIGNhcmRUaXRsZS50ZXh0Q29udGVudCA9IGl0ZW0udGl0bGU7XHJcbiAgICBjYXJkVGl0bGUuY2xhc3NMaXN0LmFkZCgnY2FyZC10aXRsZScpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnRlbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGVudC1jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBsaWtlc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGlrZXNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbGlrZXMtY29udGFpbmVyJyk7XHJcblxyXG4gICAgY29uc3QgbG92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIGxvdmUuY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWhlYXJ0Jyk7XHJcbiAgICBsb3ZlLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBgJHtpfWApO1xyXG4gICAgbGlrZXNDb250YWluZXIuYXBwZW5kQ2hpbGQobG92ZSk7XHJcblxyXG4gICAgY29uc3QgbGlrZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBsaWtlcy50ZXh0Q29udGVudCA9ICcwIGxpa2VzJztcclxuXHJcbiAgICBjb25zdCBsaWtlTnVtYmVyID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtTGlrZXMgPSBhd2FpdCBnZXRMaWtlcygpO1xyXG4gICAgICBpdGVtTGlrZXMuZm9yRWFjaCgobGlrZSkgPT4ge1xyXG4gICAgICAgIGlmIChsaWtlLml0ZW1faWQgPT09IGBwaWN0dXJlLSR7aX1gKSB7XHJcbiAgICAgICAgICBsaWtlcy50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICAgICAgbGlrZXMuY2xhc3NMaXN0LmFkZCgnbGlrZS1udW1iZXInKTtcclxuICAgICAgICAgIGxpa2VzLnRleHRDb250ZW50ID0gYCR7bGlrZS5saWtlc30gbGlrZXNgO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IHBvc3RMaWtlKGBwaWN0dXJlLSR7aX1gKTtcclxuICAgICAgbGlrZU51bWJlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGlrZU51bWJlcigpO1xyXG4gICAgbGlrZXNDb250YWluZXIuYXBwZW5kQ2hpbGQobGlrZXMpO1xyXG5cclxuICAgIGNvbnN0IGNvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbW1lbnQuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1idG4nKTtcclxuICAgIGNvbW1lbnQudHlwZSA9ICdidXR0b24nO1xyXG4gICAgY29tbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgYCR7aXRlbS50aXRsZX1gKTtcclxuICAgIGNvbW1lbnQuaW5uZXJUZXh0ID0gJ0NvbW1lbnRzJztcclxuXHJcbiAgICBjb21tZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBzaG93Q29tbWVudENhcmQoaXRlbS50aXRsZSk7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtbW9kZWwnKTtcclxuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aXRsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkVGl0bGUpO1xyXG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudENvbnRhaW5lcik7XHJcbiAgICBjb250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGxpa2VzQ29udGFpbmVyKTtcclxuICAgIGNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tbWVudCk7XHJcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRpdGxlQ29udGFpbmVyKTtcclxuICAgIGNhcmQuc2V0QXR0cmlidXRlKCdpbmRleCcsIGAke2l9YCk7XHJcbiAgICBpdGVtR3JpZC5hcHBlbmRDaGlsZChjYXJkKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgY291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaWN0dXJlLWNvdW50ZXInKTtcclxuICBpZiAobXlQaWN0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgIGNvdW50ZXIudGV4dENvbnRlbnQgPSAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb3VudGVyLnRleHRDb250ZW50ID0gY291bnRDYXJkcygpO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyhjYXJkKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNhcmRzIDsiLCJpbXBvcnQgZ2V0Q29tbWVudHMgIGZyb20gJy4vQVBJY29tbWVudHMnO1xyXG5cclxuY29uc3QgZGlzcGxheUNvbW1lbnRzID0gYXN5bmMgKHVzZXJJRCkgPT4ge1xyXG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHModXNlcklEKTtcclxuXHJcbiAgaWYgKGNvbW1lbnRzLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvdW50ZXInKTtcclxuICAgIGNvbW1lbnRDb3VudGVyLmlubmVySFRNTCA9ICcoMCknO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1jb250YWluZXInKTtcclxuXHJcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnc2luZ2xlLWNvbW1lbnQnKTtcclxuICAgICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgdGltZS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LXRpbWUnKTtcclxuICAgICAgdGltZS5pbm5lclRleHQgPSBgJHtjb21tZW50LmNyZWF0aW9uX2RhdGV9LCBgO1xyXG5cclxuICAgICAgY29uc3QgYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBhdXRob3IuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1hdXRob3InKTtcclxuICAgICAgYXV0aG9yLmlubmVyVGV4dCA9IGAke2NvbW1lbnQudXNlcm5hbWV9OiBgO1xyXG5cclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb21tZW50TXNnJyk7XHJcbiAgICAgIG1lc3NhZ2UuaW5uZXJUZXh0ID0gY29tbWVudC5jb21tZW50O1xyXG5cclxuICAgICAgbGkuYXBwZW5kKHRpbWUsIGF1dGhvciwgbWVzc2FnZSk7XHJcbiAgICAgIGNvbW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheUNvbW1lbnRzOyIsImNvbnN0IGNvdW50Q29tbWVudHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgYWxsQ29tbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLWNvbW1lbnQnKS5sZW5ndGg7XHJcbiAgcmV0dXJuIGFsbENvbW1lbnRzO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY291bnRDb21tZW50czsiLCJjb25zdCBjb3VudENhcmRzID0gKCkgPT4ge1xyXG4gIGNvbnN0IG15QXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xyXG4gIGNvbnN0IGNvdW50ID0gbXlBcnJheS5sZW5ndGg7XHJcbiAgcmV0dXJuIGNvdW50O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY291bnRDYXJkczsiLCJjb25zdCBwb3N0TGlrZSA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9QWHZWbjc1TnNJbURud0hncUxhNC9saWtlcy8nLCB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgaXRlbV9pZDogaXRlbUlkLFxyXG4gICAgfSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIHJldHVybiByZXNwb25zZS50ZXh0KCk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy90eWdKUWhPWnlleFFjUHFhNjlER0NKSkxrcnJtQ0Fxb1ZJZ1VoZWlPL2xpa2VzLycpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgcmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgIHsgcG9zdExpa2UsIGdldExpa2VzIH07IiwiaW1wb3J0IGdldFBpY3R1cmVzIGZyb20gJy4vR2V0UmVxdWVzdCc7XHJcbmltcG9ydCBkaXNwbGF5Q29tbWVudHMgZnJvbSAnLi9jb21tZW50cyc7XHJcbmltcG9ydCAgYWRkQ29tbWVudHMgIGZyb20gJy4vQVBJY29tbWVudHMnO1xyXG5pbXBvcnQgY291bnRDb21tZW50cyBmcm9tICcuL2NvdW50Q29tbWVudHMnO1xyXG5cclxuY29uc3Qgc2hvd0NvbW1lbnRDYXJkID0gYXN5bmMgKHRpdGxlKSA9PiB7XHJcbiAgY29uc3QgbXlQaWN0dXJlc0pzb24gPSBhd2FpdCBnZXRQaWN0dXJlcygpO1xyXG4gIGNvbnN0IHN0cmluZ2lmaWVkSnNvbiA9IEpTT04uc3RyaW5naWZ5KG15UGljdHVyZXNKc29uKTtcclxuICBjb25zdCBteVBpY3R1cmVzID0gSlNPTi5wYXJzZShzdHJpbmdpZmllZEpzb24pO1xyXG5cclxuICBteVBpY3R1cmVzLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICBpZiAoZWxlbWVudC50aXRsZSA9PT0gdGl0bGUpIHtcclxuICAgICAgY29uc3QgY29tbWVudE1vZGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtbW9kZWwnKTtcclxuICAgICAgY29uc3QgY29tbWVudENhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY29tbWVudENhcmQuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1jYXJkJyk7XHJcbiAgICAgIGNvbW1lbnRDYXJkLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBpbmRleCk7XHJcblxyXG4gICAgICBjb25zdCBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlLWljb24nKTtcclxuICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtdGltZXMnKTtcclxuICAgICAgY2xvc2VJY29uLmFwcGVuZENoaWxkKGljb24pO1xyXG5cclxuICAgICAgY29uc3QgY2xvc2VDbGljayA9ICgpID0+IHtcclxuICAgICAgICBjb21tZW50TW9kZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgY29tbWVudE1vZGVsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY2xvc2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VDbGljayk7XHJcblxyXG4gICAgICBjb25zdCBtYWluRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbWFpbkRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ21haW4tZGVzY3JpcHRpb24nKTtcclxuXHJcbiAgICAgIGlmIChlbGVtZW50Lm1lZGlhX3R5cGUgPT09ICdpbWFnZScpIHtcclxuICAgICAgICBjb25zdCBtZWRpYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIG1lZGlhLmNsYXNzTGlzdC5hZGQoJ21lZGlhSW1hZ2UnKTtcclxuICAgICAgICBtZWRpYS5zcmMgPSBlbGVtZW50LnVybDtcclxuICAgICAgICBtYWluRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQobWVkaWEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICAgICAgbWVkaWEuY2xhc3NMaXN0LmFkZCgnbWVkaWFWaWRlbycpO1xyXG4gICAgICAgIG1lZGlhLnNyYyA9IGVsZW1lbnQudXJsO1xyXG4gICAgICAgIG1haW5EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChtZWRpYSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG4gICAgICBoMS5jbGFzc0xpc3QuYWRkKCdpbWFnZS10aXRsZScpO1xyXG4gICAgICBoMS5pbm5lclRleHQgPSBlbGVtZW50LnRpdGxlO1xyXG5cclxuICAgICAgY29uc3QgZXhwbGFuYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIGV4cGxhbmF0aW9uLmNsYXNzTGlzdC5hZGQoJ2ltYWdlLWV4cGxhbmF0aW9uJyk7XHJcbiAgICAgIGV4cGxhbmF0aW9uLmlubmVyVGV4dCA9IGVsZW1lbnQuZXhwbGFuYXRpb247XHJcblxyXG4gICAgICBjb25zdCBleHRyYUV4cGxhbmF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIGNvcHlyaWdodC5jbGFzc0xpc3QuYWRkKCdjb3B5cmlnaHQnKTtcclxuICAgICAgY29weXJpZ2h0LmlubmVyVGV4dCA9IGBCeSAke2VsZW1lbnQuY29weXJpZ2h0ID8/ICdBbm9ueW1vdXMnfWA7XHJcblxyXG4gICAgICBjb25zdCBpbWFnZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIGltYWdlRGF0ZS5jbGFzc0xpc3QuYWRkKCdpbWFnZS1kYXRlJyk7XHJcbiAgICAgIGltYWdlRGF0ZS5pbm5lclRleHQgPSBgJHtlbGVtZW50LmRhdGV9YDtcclxuICAgICAgZXh0cmFFeHBsYW5hdGlvbi5hcHBlbmQoY29weXJpZ2h0LCBpbWFnZURhdGUpO1xyXG5cclxuICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgICBoMi5pbm5lclRleHQgPSAnQ29tbWVudHMgJztcclxuICAgICAgY29uc3QgY29tbWVudENvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIGNvbW1lbnRDb3VudGVyLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtY291bnRlcicpO1xyXG5cclxuICAgICAgaDIuYXBwZW5kQ2hpbGQoY29tbWVudENvdW50ZXIpO1xyXG5cclxuICAgICAgY29uc3QgY29tbWVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgIGNvbW1lbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1jb250YWluZXInKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgIGNvbW1lbnRUaXRsZS5pbm5lclRleHQgPSAnQWRkIGEgY29tbWVudCc7XHJcblxyXG4gICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgICBmb3JtLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCIgY2xhc3M9XCJuYW1lLWlucHV0XCIgcmVxdWlyZWQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgLz5cclxuICAgICAgICAgIDx0ZXh0YXJlYSBuYW1lPVwiY29tbWVudC1pbnB1dFwiIGNsYXNzPVwiY29tbWVudC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBpbnNpZ2h0cy4uLlwiIHJlcXVpcmVkPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5Db21tZW50PC9idXR0b24+XHJcbiAgICAgICAgICBgO1xyXG5cclxuICAgICAgbWFpbkRlc2NyaXB0aW9uLmFwcGVuZChoMSwgZXhwbGFuYXRpb24sIGV4dHJhRXhwbGFuYXRpb24sIGgyLCBjb21tZW50Q29udGFpbmVyLCBjb21tZW50VGl0bGUsIGZvcm0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cclxuICAgICAgY29tbWVudENhcmQuYXBwZW5kKGNsb3NlSWNvbiwgbWFpbkRlc2NyaXB0aW9uKTtcclxuICAgICAgY29tbWVudE1vZGVsLmFwcGVuZENoaWxkKGNvbW1lbnRDYXJkKTtcclxuXHJcbiAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb21tZW50Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0JykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgY29tbWVudE1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1pbnB1dCcpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHVzZXJJRCA9IGNvbW1lbnRDYXJkLmdldEF0dHJpYnV0ZSgnaW5kZXgnKTtcclxuXHJcbiAgICAgICAgYXdhaXQgYWRkQ29tbWVudHModXNlcm5hbWUsIGNvbW1lbnRNZXNzYWdlLCB1c2VySUQpO1xyXG4gICAgICAgIGF3YWl0IGRpc3BsYXlDb21tZW50cyh1c2VySUQpO1xyXG5cclxuICAgICAgICBmb3JtLnJlc2V0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1jb3VudGVyJyk7XHJcbiAgICAgICAgY291bnRlci5pbm5lclRleHQgPSBgKCR7Y291bnRDb21tZW50cygpfSlgO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgY29uc3QgY29tbWVudENhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1jYXJkJyk7XHJcbiAgY29uc3QgdXNlcklEID0gY29tbWVudENhcmQuZ2V0QXR0cmlidXRlKCdpbmRleCcpO1xyXG4gIGF3YWl0IGRpc3BsYXlDb21tZW50cyh1c2VySUQpO1xyXG5cclxuICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvdW50ZXInKTtcclxuICBjb21tZW50Q291bnRlci5pbm5lclRleHQgPSBgKCR7Y291bnRDb21tZW50cygpfSlgO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hvd0NvbW1lbnRDYXJkIDsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uYXBwLWNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDo4MCU7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTQzLCA5MSwgMTU2LCAwLjg3KTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWFyZ2luOiAycmVtIDFyZW07XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOCwgMTA2LCAxMSwgMC42NTEpO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyAud2ViLXRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxyXFxuICBmb250LWZhbWlseTogJ01vbm90b24nLCBjdXJzaXZlO1xcclxcbn1cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcgLm5hdmJhciB1bCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIG1hcmdpbi1yaWdodDogMXJlbTtcXHJcXG59XFxyXFxuLm5hdmJhciB1bCBsaSB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAxLjVyZW07XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLHNCQUFzQjtFQUN0QixrQ0FBa0M7QUFDcEM7OztBQUdBO0VBQ0UsU0FBUztFQUNULGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQiwyQ0FBMkM7QUFDN0M7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQiwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtBQUN0QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLmFwcC1jb250YWluZXIge1xcclxcbiAgd2lkdGg6ODAlO1xcclxcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE0MywgOTEsIDE1NiwgMC44Nyk7XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIG1hcmdpbjogMnJlbSAxcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzgsIDEwNiwgMTEsIDAuNjUxKTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcgLndlYi10aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICBmb250LXdlaWdodDogOTAwO1xcclxcbiAgZm9udC1mYW1pbHk6ICdNb25vdG9uJywgY3Vyc2l2ZTtcXHJcXG59XFxyXFxuXFxyXFxuYSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIC5uYXZiYXIgdWwge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxyXFxufVxcclxcbi5uYXZiYXIgdWwgbGkge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMS41cmVtO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImNyZWF0ZUNhcmRzIiwid2luZG93Iiwib25sb2FkIiwiZ2V0Q29tbWVudHMiLCJpdGVtSWQiLCJyZXNwb25zZSIsImZldGNoIiwiZGF0YSIsImpzb24iLCJhZGRDb21tZW50cyIsInVzZXJuYW1lIiwiY29tbWVudCIsIml0ZW1JRCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJ0ZXh0IiwiYmFzZVVybCIsImtleSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJ1cmwiLCJnZXRQaWN0dXJlcyIsImFuc3dlciIsInBvc3RMaWtlIiwiZ2V0TGlrZXMiLCJzaG93Q29tbWVudENhcmQiLCJjb3VudENhcmRzIiwiaXRlbUdyaWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJteVBpY3R1cmVzIiwiZm9yRWFjaCIsIml0ZW0iLCJpIiwiY2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJtZWRpYV90eXBlIiwibWVkaWEiLCJzcmMiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0aXRsZSIsIm1vZGFsIiwidGl0bGVDb250YWluZXIiLCJjYXJkVGl0bGUiLCJ0ZXh0Q29udGVudCIsImNvbnRlbnRDb250YWluZXIiLCJsaWtlc0NvbnRhaW5lciIsImxvdmUiLCJzZXRBdHRyaWJ1dGUiLCJsaWtlcyIsImxpa2VOdW1iZXIiLCJpdGVtTGlrZXMiLCJsaWtlIiwidHlwZSIsImlubmVyVGV4dCIsImNvdW50ZXIiLCJnZXRFbGVtZW50QnlJZCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJkaXNwbGF5Q29tbWVudHMiLCJ1c2VySUQiLCJjb21tZW50cyIsInVuZGVmaW5lZCIsImNvbW1lbnRDb3VudGVyIiwiaW5uZXJIVE1MIiwiY29tbWVudENvbnRhaW5lciIsImxpIiwidGltZSIsImNyZWF0aW9uX2RhdGUiLCJhdXRob3IiLCJtZXNzYWdlIiwiYXBwZW5kIiwiY291bnRDb21tZW50cyIsImFsbENvbW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsIm15QXJyYXkiLCJjb3VudCIsIm15UGljdHVyZXNKc29uIiwic3RyaW5naWZpZWRKc29uIiwicGFyc2UiLCJlbGVtZW50IiwiaW5kZXgiLCJjb21tZW50TW9kZWwiLCJjb21tZW50Q2FyZCIsImNsb3NlSWNvbiIsImljb24iLCJjbG9zZUNsaWNrIiwicmVtb3ZlIiwibWFpbkRlc2NyaXB0aW9uIiwiaDEiLCJleHBsYW5hdGlvbiIsImV4dHJhRXhwbGFuYXRpb24iLCJjb3B5cmlnaHQiLCJpbWFnZURhdGUiLCJkYXRlIiwiaDIiLCJjb21tZW50VGl0bGUiLCJmb3JtIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiY29tbWVudE1lc3NhZ2UiLCJnZXRBdHRyaWJ1dGUiLCJyZXNldCJdLCJzb3VyY2VSb290IjoiIn0=