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
/* harmony export */   "addComments": () => (/* binding */ addComments),
/* harmony export */   "getComments": () => (/* binding */ getComments)
/* harmony export */ });
const getComments = async itemId => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfcv5DOSxch5uyyxzNLo/comments?item_id=${itemId}`);
  const data = await response.json();
  return data;
};
const addComments = async (username, comment, itemID) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfcv5DOSxch5uyyxzNLo/comments', {
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


/***/ }),

/***/ "./src/modules/GetRequest.js":
/*!***********************************!*\
  !*** ./src/modules/GetRequest.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPictures)
/* harmony export */ });
const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
const key = 'tygJQhOZyexQcPqa69DGCJJLkrrmCAqoVIgUheiO';
const startDate = '2022-02-20';
const endDate = '2022-04-01';
const url = `${baseUrl}${key}&start_date=${startDate}&end_date=${endDate}`;
const getPictures = async () => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};


/***/ }),

/***/ "./src/modules/cards.js":
/*!******************************!*\
  !*** ./src/modules/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createCards)
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
    } else {
      const media = document.createElement('iframe');
      media.classList.add('video');
      media.src = item.url;
      card.appendChild(media);
    }
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
      const modal = document.querySelector('.comment-model');
      modal.classList.add('active');
      // modal.innerHTML = '';
      // modal.style.display= 'block';
      modal.style.display = 'block';
      // console.log(item.title);
      await (0,_showCommentsCard__WEBPACK_IMPORTED_MODULE_2__["default"])(item.title);
      //const appblur = document.querySelector('.app-container');
      // appblur.style.position = 'absolute';
      //appblur.style.backdropFilter = 'blur(15px)';
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
  // console.log(counter)
};



/***/ }),

/***/ "./src/modules/comments.js":
/*!*********************************!*\
  !*** ./src/modules/comments.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ displayComments)
/* harmony export */ });
/* harmony import */ var _APIcomments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIcomments */ "./src/modules/APIcomments.js");

const displayComments = async userID => {
  const comments = await (0,_APIcomments__WEBPACK_IMPORTED_MODULE_0__.getComments)(userID);
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
/* harmony export */   "default": () => (/* binding */ showCommentCard)
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
        // commentModel.innerHTML = '';
        commentModel.style.display = 'none';
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
          <input type="text" placeholder="Your name" class="name-input input" required autocomplete="off" />
          <textarea name="comment-input" class="comment-input input" placeholder="Your insights..." required></textarea>
          <button type="submit">Submit Comment</button>
          `;
      mainDescription.append(h1, explanation, extraExplanation, h2, commentContainer, commentTitle, form); // eslint-disable-line max-len
      commentCard.append(closeIcon, mainDescription);
      commentModel.appendChild(commentCard);
      //    commentModel.style.display = 'block';
      form.addEventListener('submit', async event => {
        event.preventDefault();
        commentContainer.innerHTML = '';
        const username = document.querySelector('.name-input').value;
        const commentMessage = document.querySelector('.comment-input').value;
        const userID = commentCard.getAttribute('index');
        await (0,_APIcomments__WEBPACK_IMPORTED_MODULE_2__.addComments)(username, commentMessage, userID);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n\r\n.app-container {\r\n  width:100%;\r\n  height: auto;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(89, 81, 92, 0.726);\r\n  margin-top: 0;\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 1rem;\r\n  height: 3rem;\r\n  padding: 0.3rem;\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 3rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}\r\n.navbar ul li a:hover {\r\n  background-color: rgb(133, 129, 126);\r\n  border-radius: 0.2rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n/* main section style of the website */\r\n.app-container .content {\r\n  display: flex;\r\n  width: 100%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: #20262e;\r\n  /* position: absolute; */\r\n}\r\n\r\n.content section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.title-link {\r\n  text-align: center;\r\n  font-size: 2rem;\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n.content .item-grid {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n  height: auto;\r\n  background-color: #20262e;\r\n}\r\n\r\n.card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 23rem;\r\n  height: 26rem;\r\n  background-color: #8a929c;\r\n  margin-top: 1rem;\r\n  margin-bottom: 1rem;\r\n  margin-left: 3.5rem;\r\n  padding: 0.4rem;\r\n  border-radius: 0.5rem;\r\n  transition: ease-in-out 0.5s;\r\n  /* backdrop-filter: blur(10px); */\r\n}\r\n\r\n.card:hover {\r\n  transform: scale(1.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.picture {\r\n  width: 22rem;\r\n  height: 17rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.comment-model {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width:90vw;\r\n  height: 80rem;\r\n  margin-left: 4rem;\r\n  /* background-color: chocolate; */\r\n  position: absolute;\r\n  z-index: 20;\r\n  top: 25%;\r\n  bottom: 20%;\r\n  display: none;\r\n}\r\n\r\n.comment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 2rem 6rem;\r\n  width: 100%;\r\n  background-color: rgb(226, 236, 233);\r\n  margin-left: 2rem;\r\n  border-radius: 0.4rem;\r\n}\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.input {\r\n  width: 20rem;\r\n  height: 3rem;\r\n}\r\n\r\nform button {\r\n  width: 10rem;\r\n  height: 3rem;\r\n}\r\n\r\nfooter {\r\n  text-align: center;\r\n  font-size: 14px;\r\n  height: 4rem;\r\n  padding: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;;AAGA;EACE,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yCAAyC;EACzC,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,mBAAmB;EACnB,cAAc;EACd,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,+BAA+B;AACjC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;EAChB,oBAAoB;AACtB;AACA;EACE,oCAAoC;EACpC,qBAAqB;EACrB,iBAAiB;AACnB;;AAEA,sCAAsC;AACtC;EACE,aAAa;EACb,WAAW;EACX,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;EACf,qBAAqB;EACrB,4BAA4B;EAC5B,iCAAiC;AACnC;;AAEA;EACE,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,UAAU;EACV,aAAa;EACb,iBAAiB;EACjB,iCAAiC;EACjC,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,WAAW;EACX,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,kBAAkB;EAClB,WAAW;EACX,oCAAoC;EACpC,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n\r\n.app-container {\r\n  width:100%;\r\n  height: auto;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(89, 81, 92, 0.726);\r\n  margin-top: 0;\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 1rem;\r\n  height: 3rem;\r\n  padding: 0.3rem;\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 3rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}\r\n.navbar ul li a:hover {\r\n  background-color: rgb(133, 129, 126);\r\n  border-radius: 0.2rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n/* main section style of the website */\r\n.app-container .content {\r\n  display: flex;\r\n  width: 100%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: #20262e;\r\n  /* position: absolute; */\r\n}\r\n\r\n.content section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.title-link {\r\n  text-align: center;\r\n  font-size: 2rem;\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n.content .item-grid {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n  height: auto;\r\n  background-color: #20262e;\r\n}\r\n\r\n.card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 23rem;\r\n  height: 26rem;\r\n  background-color: #8a929c;\r\n  margin-top: 1rem;\r\n  margin-bottom: 1rem;\r\n  margin-left: 3.5rem;\r\n  padding: 0.4rem;\r\n  border-radius: 0.5rem;\r\n  transition: ease-in-out 0.5s;\r\n  /* backdrop-filter: blur(10px); */\r\n}\r\n\r\n.card:hover {\r\n  transform: scale(1.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.picture {\r\n  width: 22rem;\r\n  height: 17rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.comment-model {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width:90vw;\r\n  height: 80rem;\r\n  margin-left: 4rem;\r\n  /* background-color: chocolate; */\r\n  position: absolute;\r\n  z-index: 20;\r\n  top: 25%;\r\n  bottom: 20%;\r\n  display: none;\r\n}\r\n\r\n.comment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 2rem 6rem;\r\n  width: 100%;\r\n  background-color: rgb(226, 236, 233);\r\n  margin-left: 2rem;\r\n  border-radius: 0.4rem;\r\n}\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.input {\r\n  width: 20rem;\r\n  height: 3rem;\r\n}\r\n\r\nform button {\r\n  width: 10rem;\r\n  height: 3rem;\r\n}\r\n\r\nfooter {\r\n  text-align: center;\r\n  font-size: 14px;\r\n  height: 4rem;\r\n  padding: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL21vZHVsZXMvQVBJY29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL0dldFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL2NhcmRzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9jb21tZW50cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL21vZHVsZXMvY291bnRDb21tZW50cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL21vZHVsZXMvY291bnRzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9pbnZvbHZlbWVudEFwcC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL21vZHVsZXMvc2hvd0NvbW1lbnRzQ2FyZC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgY3JlYXRlQ2FyZHMgZnJvbSAnLi9tb2R1bGVzL2NhcmRzJztcclxuLy9pbXBvcnQgJy4vc3R5bGVzRm9yQ29tbWVudC5jc3MnO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGNyZWF0ZUNhcmRzKCk7IiwiY29uc3QgZ2V0Q29tbWVudHMgPSBhc3luYyAoaXRlbUlkKSA9PiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvbWZjdjVET1N4Y2g1dXl5eHpOTG8vY29tbWVudHM/aXRlbV9pZD0ke2l0ZW1JZH1gKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuY29uc3QgYWRkQ29tbWVudHMgPSBhc3luYyAodXNlcm5hbWUsIGNvbW1lbnQsIGl0ZW1JRCkgPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL21mY3Y1RE9TeGNoNXV5eXh6TkxvL2NvbW1lbnRzJywge1xyXG4gICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGl0ZW1faWQ6IGl0ZW1JRCxcclxuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICBjb21tZW50OiBjb21tZW50LFxyXG4gICAgfSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIHJldHVybiByZXNwb25zZS50ZXh0KCk7XHJcbn07XHJcblxyXG5leHBvcnQgeyBnZXRDb21tZW50cywgYWRkQ29tbWVudHMgfTsiLCJjb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vYXBpLm5hc2EuZ292L3BsYW5ldGFyeS9hcG9kP2FwaV9rZXk9JztcclxuY29uc3Qga2V5ID0gJ3R5Z0pRaE9aeWV4UWNQcWE2OURHQ0pKTGtycm1DQXFvVklnVWhlaU8nO1xyXG5jb25zdCBzdGFydERhdGUgPSAnMjAyMi0wMi0yMCc7XHJcbmNvbnN0IGVuZERhdGUgPSAnMjAyMi0wNC0wMSc7XHJcbmNvbnN0IHVybCA9IGAke2Jhc2VVcmx9JHtrZXl9JnN0YXJ0X2RhdGU9JHtzdGFydERhdGV9JmVuZF9kYXRlPSR7ZW5kRGF0ZX1gO1xyXG5cclxuY29uc3QgZ2V0UGljdHVyZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gIGNvbnN0IGFuc3dlciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICByZXR1cm4gYW5zd2VyO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCB7IGdldFBpY3R1cmVzIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgZ2V0UGljdHVyZXMgZnJvbSAnLi9HZXRSZXF1ZXN0JztcclxuaW1wb3J0IHsgcG9zdExpa2UsIGdldExpa2VzIH0gZnJvbSAnLi9pbnZvbHZlbWVudEFwcCc7XHJcbmltcG9ydCBzaG93Q29tbWVudENhcmQgZnJvbSAnLi9zaG93Q29tbWVudHNDYXJkJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tY3ljbGVcclxuaW1wb3J0IGNvdW50Q2FyZHMgZnJvbSAnLi9jb3VudHMnO1xyXG5cclxuY29uc3QgaXRlbUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaXRlbS1ncmlkJyk7XHJcblxyXG5jb25zdCBjcmVhdGVDYXJkcyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBteVBpY3R1cmVzID0gYXdhaXQgZ2V0UGljdHVyZXMoKTtcclxuXHJcbiAgbXlQaWN0dXJlcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcclxuXHJcbiAgICBpZiAoaXRlbS5tZWRpYV90eXBlID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIG1lZGlhLmNsYXNzTGlzdC5hZGQoJ3BpY3R1cmUnKTtcclxuICAgICAgbWVkaWEuc3JjID0gaXRlbS51cmw7XHJcbiAgICAgIGNhcmQuYXBwZW5kQ2hpbGQobWVkaWEpO1xyXG4gICAgICBtZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBzaG93Q29tbWVudENhcmQoaXRlbS50aXRsZSk7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1tb2RlbCcpO1xyXG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIFxyXG4gICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbWVkaWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgICAgbWVkaWEuY2xhc3NMaXN0LmFkZCgndmlkZW8nKTtcclxuICAgICAgbWVkaWEuc3JjID0gaXRlbS51cmw7XHJcbiAgICAgIGNhcmQuYXBwZW5kQ2hpbGQobWVkaWEpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aXRsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0aXRsZS1jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBjYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG4gICAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gaXRlbS50aXRsZTtcclxuICAgIGNhcmRUaXRsZS5jbGFzc0xpc3QuYWRkKCdjYXJkLXRpdGxlJyk7XHJcblxyXG4gICAgY29uc3QgY29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250ZW50LWNvbnRhaW5lcicpO1xyXG5cclxuICAgIGNvbnN0IGxpa2VzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsaWtlc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsaWtlcy1jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBsb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgbG92ZS5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtaGVhcnQnKTtcclxuICAgIGxvdmUuc2V0QXR0cmlidXRlKCdpbmRleCcsIGAke2l9YCk7XHJcbiAgICBsaWtlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsb3ZlKTtcclxuXHJcbiAgICBjb25zdCBsaWtlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGxpa2VzLnRleHRDb250ZW50ID0gJzAgbGlrZXMnO1xyXG5cclxuICAgIGNvbnN0IGxpa2VOdW1iZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGl0ZW1MaWtlcyA9IGF3YWl0IGdldExpa2VzKCk7XHJcbiAgICAgIGl0ZW1MaWtlcy5mb3JFYWNoKChsaWtlKSA9PiB7XHJcbiAgICAgICAgaWYgKGxpa2UuaXRlbV9pZCA9PT0gYHBpY3R1cmUtJHtpfWApIHtcclxuICAgICAgICAgIGxpa2VzLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgICBsaWtlcy5jbGFzc0xpc3QuYWRkKCdsaWtlLW51bWJlcicpO1xyXG4gICAgICAgICAgbGlrZXMudGV4dENvbnRlbnQgPSBgJHtsaWtlLmxpa2VzfSBsaWtlc2A7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgbG92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgcG9zdExpa2UoYHBpY3R1cmUtJHtpfWApO1xyXG4gICAgICBsaWtlTnVtYmVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsaWtlTnVtYmVyKCk7XHJcbiAgICBsaWtlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaWtlcyk7XHJcblxyXG4gICAgY29uc3QgY29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29tbWVudC5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWJ0bicpO1xyXG4gICAgY29tbWVudC50eXBlID0gJ2J1dHRvbic7XHJcbiAgICBjb21tZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgJHtpdGVtLnRpdGxlfWApO1xyXG4gICAgY29tbWVudC5pbm5lclRleHQgPSAnQ29tbWVudHMnO1xyXG5cclxuICAgIGNvbW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgXHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtbW9kZWwnKTtcclxuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgIC8vIG1vZGFsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAvLyBtb2RhbC5zdHlsZS5kaXNwbGF5PSAnYmxvY2snO1xyXG4gICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbS50aXRsZSk7XHJcbiAgICAgIGF3YWl0IHNob3dDb21tZW50Q2FyZChpdGVtLnRpdGxlKTtcclxuICAgICAgLy9jb25zdCBhcHBibHVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFwcC1jb250YWluZXInKTtcclxuICAgICAgLy8gYXBwYmx1ci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAvL2FwcGJsdXIuc3R5bGUuYmFja2Ryb3BGaWx0ZXIgPSAnYmx1cigxNXB4KSc7XHJcbiAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZFRpdGxlKTtcclxuICAgIHRpdGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnRDb250YWluZXIpO1xyXG4gICAgY29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChsaWtlc0NvbnRhaW5lcik7XHJcbiAgICBjb250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvbW1lbnQpO1xyXG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0aXRsZUNvbnRhaW5lcik7XHJcbiAgICBjYXJkLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBgJHtpfWApO1xyXG4gICAgaXRlbUdyaWQuYXBwZW5kQ2hpbGQoY2FyZCk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGljdHVyZS1jb3VudGVyJyk7XHJcbiAgaWYgKG15UGljdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBjb3VudGVyLnRleHRDb250ZW50ID0gMDtcclxuICB9IGVsc2Uge1xyXG4gICAgY291bnRlci50ZXh0Q29udGVudCA9IGNvdW50Q2FyZHMoKTtcclxuICB9XHJcbiAgLy8gY29uc29sZS5sb2coY291bnRlcilcclxufTtcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUNhcmRzIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgeyBnZXRDb21tZW50cyB9IGZyb20gJy4vQVBJY29tbWVudHMnO1xyXG5cclxuY29uc3QgZGlzcGxheUNvbW1lbnRzID0gYXN5bmMgKHVzZXJJRCkgPT4ge1xyXG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHModXNlcklEKTtcclxuXHJcbiAgaWYgKGNvbW1lbnRzLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvdW50ZXInKTtcclxuICAgIGNvbW1lbnRDb3VudGVyLmlubmVySFRNTCA9ICcoMCknO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1jb250YWluZXInKTtcclxuXHJcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnc2luZ2xlLWNvbW1lbnQnKTtcclxuICAgICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgdGltZS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LXRpbWUnKTtcclxuICAgICAgdGltZS5pbm5lclRleHQgPSBgJHtjb21tZW50LmNyZWF0aW9uX2RhdGV9LCBgO1xyXG5cclxuICAgICAgY29uc3QgYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBhdXRob3IuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1hdXRob3InKTtcclxuICAgICAgYXV0aG9yLmlubmVyVGV4dCA9IGAke2NvbW1lbnQudXNlcm5hbWV9OiBgO1xyXG5cclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb21tZW50TXNnJyk7XHJcbiAgICAgIG1lc3NhZ2UuaW5uZXJUZXh0ID0gY29tbWVudC5jb21tZW50O1xyXG5cclxuICAgICAgbGkuYXBwZW5kKHRpbWUsIGF1dGhvciwgbWVzc2FnZSk7XHJcbiAgICAgIGNvbW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHsgZGlzcGxheUNvbW1lbnRzIGFzIGRlZmF1bHR9OyIsImNvbnN0IGNvdW50Q29tbWVudHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgYWxsQ29tbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLWNvbW1lbnQnKS5sZW5ndGg7XHJcbiAgcmV0dXJuIGFsbENvbW1lbnRzO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY291bnRDb21tZW50czsiLCJjb25zdCBjb3VudENhcmRzID0gKCkgPT4ge1xyXG4gIGNvbnN0IG15QXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xyXG4gIGNvbnN0IGNvdW50ID0gbXlBcnJheS5sZW5ndGg7XHJcbiAgcmV0dXJuIGNvdW50O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY291bnRDYXJkczsiLCJjb25zdCBwb3N0TGlrZSA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9QWHZWbjc1TnNJbURud0hncUxhNC9saWtlcy8nLCB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgaXRlbV9pZDogaXRlbUlkLFxyXG4gICAgfSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIHJldHVybiByZXNwb25zZS50ZXh0KCk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy90eWdKUWhPWnlleFFjUHFhNjlER0NKSkxrcnJtQ0Fxb1ZJZ1VoZWlPL2xpa2VzLycpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgcmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgeyBwb3N0TGlrZSwgZ2V0TGlrZXMgfTsiLCJpbXBvcnQgZ2V0UGljdHVyZXMgZnJvbSAnLi9HZXRSZXF1ZXN0JztcclxuaW1wb3J0IGRpc3BsYXlDb21tZW50cyBmcm9tICcuL2NvbW1lbnRzJztcclxuaW1wb3J0IHsgYWRkQ29tbWVudHMgfSBmcm9tICcuL0FQSWNvbW1lbnRzJztcclxuaW1wb3J0IGNvdW50Q29tbWVudHMgZnJvbSAnLi9jb3VudENvbW1lbnRzJztcclxuXHJcbmNvbnN0IHNob3dDb21tZW50Q2FyZCA9IGFzeW5jICh0aXRsZSkgPT4ge1xyXG4gIGNvbnN0IG15UGljdHVyZXNKc29uID0gYXdhaXQgZ2V0UGljdHVyZXMoKTtcclxuICBjb25zdCBzdHJpbmdpZmllZEpzb24gPSBKU09OLnN0cmluZ2lmeShteVBpY3R1cmVzSnNvbik7XHJcbiAgY29uc3QgbXlQaWN0dXJlcyA9IEpTT04ucGFyc2Uoc3RyaW5naWZpZWRKc29uKTtcclxuXHJcbiAgbXlQaWN0dXJlcy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKGVsZW1lbnQudGl0bGUgPT09IHRpdGxlKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRNb2RlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LW1vZGVsJyk7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNvbW1lbnRDYXJkLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtY2FyZCcpO1xyXG4gICAgICBjb21tZW50Q2FyZC5zZXRBdHRyaWJ1dGUoJ2luZGV4JywgaW5kZXgpO1xyXG5cclxuICAgICAgY29uc3QgY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdjbG9zZS1pY29uJyk7XHJcbiAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLXRpbWVzJyk7XHJcbiAgICAgIGNsb3NlSWNvbi5hcHBlbmRDaGlsZChpY29uKTtcclxuXHJcbiAgICAgIGNvbnN0IGNsb3NlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgY29tbWVudE1vZGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIC8vIGNvbW1lbnRNb2RlbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBjb21tZW50TW9kZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBjb21tZW50TW9kZWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUNsaWNrKTtcclxuXHJcbiAgICAgIGNvbnN0IG1haW5EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBtYWluRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnbWFpbi1kZXNjcmlwdGlvbicpO1xyXG5cclxuICAgICAgaWYgKGVsZW1lbnQubWVkaWFfdHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgbWVkaWEuY2xhc3NMaXN0LmFkZCgnbWVkaWFJbWFnZScpO1xyXG4gICAgICAgIG1lZGlhLnNyYyA9IGVsZW1lbnQudXJsO1xyXG4gICAgICAgIG1haW5EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChtZWRpYSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbWVkaWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgICAgICBtZWRpYS5jbGFzc0xpc3QuYWRkKCdtZWRpYVZpZGVvJyk7XHJcbiAgICAgICAgbWVkaWEuc3JjID0gZWxlbWVudC51cmw7XHJcbiAgICAgICAgbWFpbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKG1lZGlhKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcbiAgICAgIGgxLmNsYXNzTGlzdC5hZGQoJ2ltYWdlLXRpdGxlJyk7XHJcbiAgICAgIGgxLmlubmVyVGV4dCA9IGVsZW1lbnQudGl0bGU7XHJcblxyXG4gICAgICBjb25zdCBleHBsYW5hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgZXhwbGFuYXRpb24uY2xhc3NMaXN0LmFkZCgnaW1hZ2UtZXhwbGFuYXRpb24nKTtcclxuICAgICAgZXhwbGFuYXRpb24uaW5uZXJUZXh0ID0gZWxlbWVudC5leHBsYW5hdGlvbjtcclxuXHJcbiAgICAgIGNvbnN0IGV4dHJhRXhwbGFuYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgY29weXJpZ2h0LmNsYXNzTGlzdC5hZGQoJ2NvcHlyaWdodCcpO1xyXG4gICAgICBjb3B5cmlnaHQuaW5uZXJUZXh0ID0gYEJ5ICR7ZWxlbWVudC5jb3B5cmlnaHQgPz8gJ0Fub255bW91cyd9YDtcclxuXHJcbiAgICAgIGNvbnN0IGltYWdlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgaW1hZ2VEYXRlLmNsYXNzTGlzdC5hZGQoJ2ltYWdlLWRhdGUnKTtcclxuICAgICAgaW1hZ2VEYXRlLmlubmVyVGV4dCA9IGAke2VsZW1lbnQuZGF0ZX1gO1xyXG4gICAgICBleHRyYUV4cGxhbmF0aW9uLmFwcGVuZChjb3B5cmlnaHQsIGltYWdlRGF0ZSk7XHJcblxyXG4gICAgICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgIGgyLmlubmVyVGV4dCA9ICdDb21tZW50cyAnO1xyXG4gICAgICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgY29tbWVudENvdW50ZXIuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1jb3VudGVyJyk7XHJcblxyXG4gICAgICBoMi5hcHBlbmRDaGlsZChjb21tZW50Q291bnRlcik7XHJcblxyXG4gICAgICBjb25zdCBjb21tZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgY29tbWVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgY29uc3QgY29tbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgICAgY29tbWVudFRpdGxlLmlubmVyVGV4dCA9ICdBZGQgYSBjb21tZW50JztcclxuXHJcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgIGZvcm0uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJZb3VyIG5hbWVcIiBjbGFzcz1cIm5hbWUtaW5wdXQgaW5wdXRcIiByZXF1aXJlZCBhdXRvY29tcGxldGU9XCJvZmZcIiAvPlxyXG4gICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJjb21tZW50LWlucHV0XCIgY2xhc3M9XCJjb21tZW50LWlucHV0IGlucHV0XCIgcGxhY2Vob2xkZXI9XCJZb3VyIGluc2lnaHRzLi4uXCIgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdCBDb21tZW50PC9idXR0b24+XHJcbiAgICAgICAgICBgO1xyXG5cclxuICAgICAgbWFpbkRlc2NyaXB0aW9uLmFwcGVuZChoMSwgZXhwbGFuYXRpb24sIGV4dHJhRXhwbGFuYXRpb24sIGgyLCBjb21tZW50Q29udGFpbmVyLCBjb21tZW50VGl0bGUsIGZvcm0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cclxuICAgICAgY29tbWVudENhcmQuYXBwZW5kKGNsb3NlSWNvbiwgbWFpbkRlc2NyaXB0aW9uKTtcclxuICAgICAgY29tbWVudE1vZGVsLmFwcGVuZENoaWxkKGNvbW1lbnRDYXJkKTtcclxuICAgIC8vICAgIGNvbW1lbnRNb2RlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbW1lbnRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBjb21tZW50TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWlucHV0JykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdXNlcklEID0gY29tbWVudENhcmQuZ2V0QXR0cmlidXRlKCdpbmRleCcpO1xyXG5cclxuICAgICAgICBhd2FpdCBhZGRDb21tZW50cyh1c2VybmFtZSwgY29tbWVudE1lc3NhZ2UsIHVzZXJJRCk7XHJcbiAgICAgICAgYXdhaXQgZGlzcGxheUNvbW1lbnRzKHVzZXJJRCk7XHJcblxyXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvdW50ZXInKTtcclxuICAgICAgICBjb3VudGVyLmlubmVyVGV4dCA9IGAoJHtjb3VudENvbW1lbnRzKCl9KWA7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjb21tZW50Q2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNhcmQnKTtcclxuICBjb25zdCB1c2VySUQgPSBjb21tZW50Q2FyZC5nZXRBdHRyaWJ1dGUoJ2luZGV4Jyk7XHJcbiAgYXdhaXQgZGlzcGxheUNvbW1lbnRzKHVzZXJJRCk7XHJcblxyXG4gIGNvbnN0IGNvbW1lbnRDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtY291bnRlcicpO1xyXG4gIGNvbW1lbnRDb3VudGVyLmlubmVyVGV4dCA9IGAoJHtjb3VudENvbW1lbnRzKCl9KWA7XHJcbiBcclxufTtcclxuXHJcbmV4cG9ydCB7IHNob3dDb21tZW50Q2FyZCBhcyBkZWZhdWx0IH07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLmFwcC1jb250YWluZXIge1xcclxcbiAgd2lkdGg6MTAwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4OSwgODEsIDkyLCAwLjcyNik7XFxyXFxuICBtYXJnaW4tdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBtYXJnaW46IDAgMXJlbTtcXHJcXG4gIGhlaWdodDogM3JlbTtcXHJcXG4gIHBhZGRpbmc6IDAuM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcgLndlYi10aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDNyZW07XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICBmb250LXdlaWdodDogOTAwO1xcclxcbiAgZm9udC1mYW1pbHk6ICdNb25vdG9uJywgY3Vyc2l2ZTtcXHJcXG59XFxyXFxuXFxyXFxuYSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIC5uYXZiYXIgdWwge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxyXFxufVxcclxcbi5uYXZiYXIgdWwgbGkge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMS41cmVtO1xcclxcbn1cXHJcXG4ubmF2YmFyIHVsIGxpIGE6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEzMywgMTI5LCAxMjYpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcclxcbiAgY29sb3I6IHdoaXRlc21va2U7XFxyXFxufVxcclxcblxcclxcbi8qIG1haW4gc2VjdGlvbiBzdHlsZSBvZiB0aGUgd2Vic2l0ZSAqL1xcclxcbi5hcHAtY29udGFpbmVyIC5jb250ZW50IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIwMjYyZTtcXHJcXG4gIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQgc2VjdGlvbiB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlLWxpbmsge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAycmVtO1xcclxcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQgLml0ZW0tZ3JpZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIwMjYyZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB3aWR0aDogMjNyZW07XFxyXFxuICBoZWlnaHQ6IDI2cmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhhOTI5YztcXHJcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDMuNXJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNHJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXHJcXG4gIHRyYW5zaXRpb246IGVhc2UtaW4tb3V0IDAuNXM7XFxyXFxuICAvKiBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7ICovXFxyXFxufVxcclxcblxcclxcbi5jYXJkOmhvdmVyIHtcXHJcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5waWN0dXJlIHtcXHJcXG4gIHdpZHRoOiAyMnJlbTtcXHJcXG4gIGhlaWdodDogMTdyZW07XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGVsIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgd2lkdGg6OTB2dztcXHJcXG4gIGhlaWdodDogODByZW07XFxyXFxuICBtYXJnaW4tbGVmdDogNHJlbTtcXHJcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IGNob2NvbGF0ZTsgKi9cXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHotaW5kZXg6IDIwO1xcclxcbiAgdG9wOiAyNSU7XFxyXFxuICBib3R0b206IDIwJTtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWNhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBwYWRkaW5nOiAycmVtIDZyZW07XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDIzNiwgMjMzKTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAycmVtO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQge1xcclxcbiAgd2lkdGg6IDIwcmVtO1xcclxcbiAgaGVpZ2h0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIGJ1dHRvbiB7XFxyXFxuICB3aWR0aDogMTByZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxuICBoZWlnaHQ6IDRyZW07XFxyXFxuICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsa0NBQWtDO0FBQ3BDOzs7QUFHQTtFQUNFLFVBQVU7RUFDVixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix5Q0FBeUM7RUFDekMsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGNBQWM7RUFDZCxZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxvQ0FBb0M7RUFDcEMscUJBQXFCO0VBQ3JCLGlCQUFpQjtBQUNuQjs7QUFFQSxzQ0FBc0M7QUFDdEM7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osYUFBYTtFQUNiLHlCQUF5QjtFQUN6QixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YscUJBQXFCO0VBQ3JCLDRCQUE0QjtFQUM1QixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixVQUFVO0VBQ1YsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixpQ0FBaUM7RUFDakMsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxRQUFRO0VBQ1IsV0FBVztFQUNYLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxvQ0FBb0M7RUFDcEMsaUJBQWlCO0VBQ2pCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsWUFBWTtFQUNaLGFBQWE7RUFDYixrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5hcHAtY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOjEwMCU7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODksIDgxLCA5MiwgMC43MjYpO1xcclxcbiAgbWFyZ2luLXRvcDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWFyZ2luOiAwIDFyZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxuICBwYWRkaW5nOiAwLjNyZW07XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIC53ZWItdGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAzcmVtO1xcclxcbiAgcGFkZGluZzogMC41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnTW9ub3RvbicsIGN1cnNpdmU7XFxyXFxufVxcclxcblxcclxcbmEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyAubmF2YmFyIHVsIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcclxcbn1cXHJcXG4ubmF2YmFyIHVsIGxpIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDEuNXJlbTtcXHJcXG59XFxyXFxuLm5hdmJhciB1bCBsaSBhOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMzMsIDEyOSwgMTI2KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXHJcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBtYWluIHNlY3Rpb24gc3R5bGUgb2YgdGhlIHdlYnNpdGUgKi9cXHJcXG4uYXBwLWNvbnRhaW5lciAuY29udGVudCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDI2MmU7XFxyXFxuICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7ICovXFxyXFxufVxcclxcblxcclxcbi5jb250ZW50IHNlY3Rpb24ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi50aXRsZS1saW5rIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgY29sb3I6IHdoaXRlc21va2U7XFxyXFxufVxcclxcblxcclxcbi5jb250ZW50IC5pdGVtLWdyaWQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDI2MmU7XFxyXFxufVxcclxcblxcclxcbi5jYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgd2lkdGg6IDIzcmVtO1xcclxcbiAgaGVpZ2h0OiAyNnJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YTkyOWM7XFxyXFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAzLjVyZW07XFxyXFxuICBwYWRkaW5nOiAwLjRyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxyXFxuICB0cmFuc2l0aW9uOiBlYXNlLWluLW91dCAwLjVzO1xcclxcbiAgLyogYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpOyAqL1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZDpob3ZlciB7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ucGljdHVyZSB7XFxyXFxuICB3aWR0aDogMjJyZW07XFxyXFxuICBoZWlnaHQ6IDE3cmVtO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAycmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1tb2RlbCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHdpZHRoOjkwdnc7XFxyXFxuICBoZWlnaHQ6IDgwcmVtO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDRyZW07XFxyXFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBjaG9jb2xhdGU7ICovXFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB6LWluZGV4OiAyMDtcXHJcXG4gIHRvcDogMjUlO1xcclxcbiAgYm90dG9tOiAyMCU7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY29tbWVudC1jYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcGFkZGluZzogMnJlbSA2cmVtO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI2LCAyMzYsIDIzMyk7XFxyXFxuICBtYXJnaW4tbGVmdDogMnJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcXHJcXG59XFxyXFxuXFxyXFxuZm9ybSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0IHtcXHJcXG4gIHdpZHRoOiAyMHJlbTtcXHJcXG4gIGhlaWdodDogM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuZm9ybSBidXR0b24ge1xcclxcbiAgd2lkdGg6IDEwcmVtO1xcclxcbiAgaGVpZ2h0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbiAgaGVpZ2h0OiA0cmVtO1xcclxcbiAgcGFkZGluZzogMXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJjcmVhdGVDYXJkcyIsIndpbmRvdyIsIm9ubG9hZCIsImdldENvbW1lbnRzIiwiaXRlbUlkIiwicmVzcG9uc2UiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwiYWRkQ29tbWVudHMiLCJ1c2VybmFtZSIsImNvbW1lbnQiLCJpdGVtSUQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIml0ZW1faWQiLCJoZWFkZXJzIiwidGV4dCIsImJhc2VVcmwiLCJrZXkiLCJzdGFydERhdGUiLCJlbmREYXRlIiwidXJsIiwiZ2V0UGljdHVyZXMiLCJhbnN3ZXIiLCJkZWZhdWx0IiwicG9zdExpa2UiLCJnZXRMaWtlcyIsInNob3dDb21tZW50Q2FyZCIsImNvdW50Q2FyZHMiLCJpdGVtR3JpZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm15UGljdHVyZXMiLCJmb3JFYWNoIiwiaXRlbSIsImkiLCJjYXJkIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsIm1lZGlhX3R5cGUiLCJtZWRpYSIsInNyYyIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRpdGxlIiwibW9kYWwiLCJ0aXRsZUNvbnRhaW5lciIsImNhcmRUaXRsZSIsInRleHRDb250ZW50IiwiY29udGVudENvbnRhaW5lciIsImxpa2VzQ29udGFpbmVyIiwibG92ZSIsInNldEF0dHJpYnV0ZSIsImxpa2VzIiwibGlrZU51bWJlciIsIml0ZW1MaWtlcyIsImxpa2UiLCJ0eXBlIiwiaW5uZXJUZXh0Iiwic3R5bGUiLCJkaXNwbGF5IiwiY291bnRlciIsImdldEVsZW1lbnRCeUlkIiwibGVuZ3RoIiwiZGlzcGxheUNvbW1lbnRzIiwidXNlcklEIiwiY29tbWVudHMiLCJ1bmRlZmluZWQiLCJjb21tZW50Q291bnRlciIsImlubmVySFRNTCIsImNvbW1lbnRDb250YWluZXIiLCJsaSIsInRpbWUiLCJjcmVhdGlvbl9kYXRlIiwiYXV0aG9yIiwibWVzc2FnZSIsImFwcGVuZCIsImNvdW50Q29tbWVudHMiLCJhbGxDb21tZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJteUFycmF5IiwiY291bnQiLCJteVBpY3R1cmVzSnNvbiIsInN0cmluZ2lmaWVkSnNvbiIsInBhcnNlIiwiZWxlbWVudCIsImluZGV4IiwiY29tbWVudE1vZGVsIiwiY29tbWVudENhcmQiLCJjbG9zZUljb24iLCJpY29uIiwiY2xvc2VDbGljayIsInJlbW92ZSIsIm1haW5EZXNjcmlwdGlvbiIsImgxIiwiZXhwbGFuYXRpb24iLCJleHRyYUV4cGxhbmF0aW9uIiwiY29weXJpZ2h0IiwiaW1hZ2VEYXRlIiwiZGF0ZSIsImgyIiwiY29tbWVudFRpdGxlIiwiZm9ybSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImNvbW1lbnRNZXNzYWdlIiwiZ2V0QXR0cmlidXRlIiwicmVzZXQiXSwic291cmNlUm9vdCI6IiJ9