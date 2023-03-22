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
const startDate = '2022-02-20';
const endDate = '2022-04-01';
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
      modal.style.display = 'block';
      await (0,_showCommentsCard__WEBPACK_IMPORTED_MODULE_2__["default"])(item.title);
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
        // commentModel.innerHTML = '';
        commentModel.style.display = 'none';
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n\r\n.app-container {\r\n  width:100%;\r\n  height: auto;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(89, 81, 92, 0.726);\r\n  margin-top: 0;\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 2rem 1rem;\r\n  height: 3rem;\r\n  padding: 0.3rem;\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 3rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}\r\n.navbar ul li a:hover {\r\n  background-color: rgb(133, 129, 126);\r\n  border-radius: 0.2rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n/* main section style of the website */\r\n.app-container .content {\r\n  display: flex;\r\n  width: 100%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: #20262e;\r\n  /* position: absolute; */\r\n}\r\n\r\n.content section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.title-link {\r\n  text-align: center;\r\n  font-size: 2rem;\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n.content .item-grid {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n  height: auto;\r\n  background-color: #20262e;\r\n\r\n  \r\n\r\n}\r\n\r\n.card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 23rem;\r\n  height: 26rem;\r\n  background-color: #8a929c;\r\n  margin-top: 1rem;\r\n  margin-bottom: 1rem;\r\n  margin-left: 3.5rem;\r\n  padding: 0.4rem;\r\n  border-radius: 0.5rem;\r\n  transition: ease-in-out 0.5s;\r\n}\r\n\r\n.card:hover {\r\n  transform: scale(1.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.picture {\r\n  width: 22rem;\r\n  height: 17rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.comment-model {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width:90vw;\r\n  height: 80rem;\r\n  margin-left: 4rem;\r\n  background-color: chocolate;\r\n  position: absolute;\r\n  z-index: 20;\r\n  top: 25%;\r\n  bottom: 20%;\r\n  display: none;\r\n}\r\n\r\n.comment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 2rem 6rem;\r\n  width: 100%;\r\n  background-color: aquamarine;\r\n  margin-left: 2rem;\r\n}\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.input {\r\n  width: 20rem;\r\n  height: 3rem;\r\n}\r\n\r\nform button {\r\n  width: 10rem;\r\n  height: 3rem;\r\n}\r\n\r\nfooter {\r\n  text-align: center;\r\n  font-size: 14px;\r\n  height: 4rem;\r\n  padding: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;;AAGA;EACE,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yCAAyC;EACzC,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,+BAA+B;AACjC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,gBAAgB;EAChB,oBAAoB;AACtB;AACA;EACE,oCAAoC;EACpC,qBAAqB;EACrB,iBAAiB;AACnB;;AAEA,sCAAsC;AACtC;EACE,aAAa;EACb,WAAW;EACX,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,yBAAyB;;;;AAI3B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;EACf,qBAAqB;EACrB,4BAA4B;AAC9B;;AAEA;EACE,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,UAAU;EACV,aAAa;EACb,iBAAiB;EACjB,2BAA2B;EAC3B,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,WAAW;EACX,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,kBAAkB;EAClB,WAAW;EACX,4BAA4B;EAC5B,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n\r\n.app-container {\r\n  width:100%;\r\n  height: auto;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: rgba(89, 81, 92, 0.726);\r\n  margin-top: 0;\r\n}\r\n\r\n.heading {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 2rem 1rem;\r\n  height: 3rem;\r\n  padding: 0.3rem;\r\n}\r\n\r\n.heading .web-title {\r\n  font-size: 3rem;\r\n  padding: 0.5rem;\r\n  font-weight: 900;\r\n  font-family: 'Monoton', cursive;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.heading .navbar ul {\r\n  display: flex;\r\n  flex-direction: row;\r\n  margin-right: 1rem;\r\n}\r\n.navbar ul li {\r\n  list-style: none;\r\n  margin-right: 1.5rem;\r\n}\r\n.navbar ul li a:hover {\r\n  background-color: rgb(133, 129, 126);\r\n  border-radius: 0.2rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n/* main section style of the website */\r\n.app-container .content {\r\n  display: flex;\r\n  width: 100%;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  background-color: #20262e;\r\n  /* position: absolute; */\r\n}\r\n\r\n.content section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.title-link {\r\n  text-align: center;\r\n  font-size: 2rem;\r\n  font-style: normal;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: whitesmoke;\r\n}\r\n\r\n.content .item-grid {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n  height: auto;\r\n  background-color: #20262e;\r\n\r\n  \r\n\r\n}\r\n\r\n.card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 23rem;\r\n  height: 26rem;\r\n  background-color: #8a929c;\r\n  margin-top: 1rem;\r\n  margin-bottom: 1rem;\r\n  margin-left: 3.5rem;\r\n  padding: 0.4rem;\r\n  border-radius: 0.5rem;\r\n  transition: ease-in-out 0.5s;\r\n}\r\n\r\n.card:hover {\r\n  transform: scale(1.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.picture {\r\n  width: 22rem;\r\n  height: 17rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.comment-model {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width:90vw;\r\n  height: 80rem;\r\n  margin-left: 4rem;\r\n  background-color: chocolate;\r\n  position: absolute;\r\n  z-index: 20;\r\n  top: 25%;\r\n  bottom: 20%;\r\n  display: none;\r\n}\r\n\r\n.comment-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 2rem 6rem;\r\n  width: 100%;\r\n  background-color: aquamarine;\r\n  margin-left: 2rem;\r\n}\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.input {\r\n  width: 20rem;\r\n  height: 3rem;\r\n}\r\n\r\nform button {\r\n  width: 10rem;\r\n  height: 3rem;\r\n}\r\n\r\nfooter {\r\n  text-align: center;\r\n  font-size: 14px;\r\n  height: 4rem;\r\n  padding: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9BUEljb21tZW50cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL21vZHVsZXMvR2V0UmVxdWVzdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL21vZHVsZXMvY2FyZHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL2NvbW1lbnRzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9jb3VudENvbW1lbnRzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9jb3VudHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL3NyYy9tb2R1bGVzL2ludm9sdmVtZW50QXBwLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvbW9kdWxlcy9zaG93Q29tbWVudHNDYXJkLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBjcmVhdGVDYXJkcyBmcm9tICcuL21vZHVsZXMvY2FyZHMnO1xyXG4vL2ltcG9ydCAnLi9zdHlsZXNGb3JDb21tZW50LmNzcyc7XHJcblxyXG53aW5kb3cub25sb2FkID0gY3JlYXRlQ2FyZHMoKTsiLCJjb25zdCBnZXRDb21tZW50cyA9IGFzeW5jIChpdGVtSWQpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy90eWdKUWhPWnlleFFjUHFhNjlER0NKSkxrcnJtQ0Fxb1ZJZ1VoZWlPL2NvbW1lbnRzP2l0ZW1faWQ9JHtpdGVtSWR9YCk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICByZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmNvbnN0IGFkZENvbW1lbnRzID0gYXN5bmMgKHVzZXJuYW1lLCBjb21tZW50LCBpdGVtSUQpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy90eWdKUWhPWnlleFFjUHFhNjlER0NKSkxrcnJtQ0Fxb1ZJZ1VoZWlPL2NvbW1lbnRzJywge1xyXG4gICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGl0ZW1faWQ6IGl0ZW1JRCxcclxuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICBjb21tZW50OiBjb21tZW50LFxyXG4gICAgfSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIHJldHVybiByZXNwb25zZS50ZXh0KCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGdldENvbW1lbnRzLCBhZGRDb21tZW50cyB9OyIsImNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9hcGkubmFzYS5nb3YvcGxhbmV0YXJ5L2Fwb2Q/YXBpX2tleT0nO1xyXG5jb25zdCBrZXkgPSAndHlnSlFoT1p5ZXhRY1BxYTY5REdDSkpMa3JybUNBcW9WSWdVaGVpTyc7XHJcbmNvbnN0IHN0YXJ0RGF0ZSA9ICcyMDIyLTAyLTIwJztcclxuY29uc3QgZW5kRGF0ZSA9ICcyMDIyLTA0LTAxJztcclxuY29uc3QgdXJsID0gYCR7YmFzZVVybH0ke2tleX0mc3RhcnRfZGF0ZT0ke3N0YXJ0RGF0ZX0mZW5kX2RhdGU9JHtlbmREYXRlfWA7XHJcblxyXG5jb25zdCBnZXRQaWN0dXJlcyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgY29uc3QgYW5zd2VyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIHJldHVybiBhbnN3ZXI7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0UGljdHVyZXM7IiwiaW1wb3J0IGdldFBpY3R1cmVzIGZyb20gJy4vR2V0UmVxdWVzdCc7XHJcbmltcG9ydCB7cG9zdExpa2UsIGdldExpa2VzfSBmcm9tICcuL2ludm9sdmVtZW50QXBwJztcclxuaW1wb3J0IHNob3dDb21tZW50Q2FyZCBmcm9tICcuL3Nob3dDb21tZW50c0NhcmQnOyBcclxuaW1wb3J0IGNvdW50Q2FyZHMgZnJvbSAnLi9jb3VudHMnO1xyXG5cclxuY29uc3QgaXRlbUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaXRlbS1ncmlkJyk7XHJcblxyXG5jb25zdCBjcmVhdGVDYXJkcyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBteVBpY3R1cmVzID0gYXdhaXQgZ2V0UGljdHVyZXMoKTtcclxuXHJcbiAgbXlQaWN0dXJlcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcclxuXHJcbiAgICBpZiAoaXRlbS5tZWRpYV90eXBlID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIG1lZGlhLmNsYXNzTGlzdC5hZGQoJ3BpY3R1cmUnKTtcclxuICAgICAgbWVkaWEuc3JjID0gaXRlbS51cmw7XHJcbiAgICAgIGNhcmQuYXBwZW5kQ2hpbGQobWVkaWEpO1xyXG4gICAgICBtZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBzaG93Q29tbWVudENhcmQoaXRlbS50aXRsZSk7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1tb2RlbCcpO1xyXG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIFxyXG4gICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbWVkaWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgICAgbWVkaWEuY2xhc3NMaXN0LmFkZCgndmlkZW8nKTtcclxuICAgICAgbWVkaWEuc3JjID0gaXRlbS51cmw7XHJcbiAgICAgIGNhcmQuYXBwZW5kQ2hpbGQobWVkaWEpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aXRsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0aXRsZS1jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBjYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG4gICAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gaXRlbS50aXRsZTtcclxuICAgIGNhcmRUaXRsZS5jbGFzc0xpc3QuYWRkKCdjYXJkLXRpdGxlJyk7XHJcblxyXG4gICAgY29uc3QgY29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250ZW50LWNvbnRhaW5lcicpO1xyXG5cclxuICAgIGNvbnN0IGxpa2VzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsaWtlc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsaWtlcy1jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBsb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgbG92ZS5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtaGVhcnQnKTtcclxuICAgIGxvdmUuc2V0QXR0cmlidXRlKCdpbmRleCcsIGAke2l9YCk7XHJcbiAgICBsaWtlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsb3ZlKTtcclxuXHJcbiAgICBjb25zdCBsaWtlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGxpa2VzLnRleHRDb250ZW50ID0gJzAgbGlrZXMnO1xyXG5cclxuICAgIGNvbnN0IGxpa2VOdW1iZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGl0ZW1MaWtlcyA9IGF3YWl0IGdldExpa2VzKCk7XHJcbiAgICAgIGl0ZW1MaWtlcy5mb3JFYWNoKChsaWtlKSA9PiB7XHJcbiAgICAgICAgaWYgKGxpa2UuaXRlbV9pZCA9PT0gYHBpY3R1cmUtJHtpfWApIHtcclxuICAgICAgICAgIGxpa2VzLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgICBsaWtlcy5jbGFzc0xpc3QuYWRkKCdsaWtlLW51bWJlcicpO1xyXG4gICAgICAgICAgbGlrZXMudGV4dENvbnRlbnQgPSBgJHtsaWtlLmxpa2VzfSBsaWtlc2A7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgbG92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgcG9zdExpa2UoYHBpY3R1cmUtJHtpfWApO1xyXG4gICAgICBsaWtlTnVtYmVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsaWtlTnVtYmVyKCk7XHJcbiAgICBsaWtlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaWtlcyk7XHJcblxyXG4gICAgY29uc3QgY29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29tbWVudC5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWJ0bicpO1xyXG4gICAgY29tbWVudC50eXBlID0gJ2J1dHRvbic7XHJcbiAgICBjb21tZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgJHtpdGVtLnRpdGxlfWApO1xyXG4gICAgY29tbWVudC5pbm5lclRleHQgPSAnQ29tbWVudHMnO1xyXG5cclxuICAgIGNvbW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtbW9kZWwnKTtcclxuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXk9ICdibG9jayc7XHJcbiAgICAgIGF3YWl0IHNob3dDb21tZW50Q2FyZChpdGVtLnRpdGxlKTtcclxuICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aXRsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkVGl0bGUpO1xyXG4gICAgdGl0bGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudENvbnRhaW5lcik7XHJcbiAgICBjb250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGxpa2VzQ29udGFpbmVyKTtcclxuICAgIGNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tbWVudCk7XHJcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRpdGxlQ29udGFpbmVyKTtcclxuICAgIGNhcmQuc2V0QXR0cmlidXRlKCdpbmRleCcsIGAke2l9YCk7XHJcbiAgICBpdGVtR3JpZC5hcHBlbmRDaGlsZChjYXJkKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgY291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaWN0dXJlLWNvdW50ZXInKTtcclxuICBpZiAobXlQaWN0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgIGNvdW50ZXIudGV4dENvbnRlbnQgPSAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb3VudGVyLnRleHRDb250ZW50ID0gY291bnRDYXJkcygpO1xyXG4gIH1cclxuICAvLyBjb25zb2xlLmxvZyhjb3VudGVyKVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ2FyZHMgOyIsImltcG9ydCBnZXRDb21tZW50cyAgZnJvbSAnLi9BUEljb21tZW50cyc7XHJcblxyXG5jb25zdCBkaXNwbGF5Q29tbWVudHMgPSBhc3luYyAodXNlcklEKSA9PiB7XHJcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50cyh1c2VySUQpO1xyXG5cclxuICBpZiAoY29tbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IGNvbW1lbnRDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtY291bnRlcicpO1xyXG4gICAgY29tbWVudENvdW50ZXIuaW5uZXJIVE1MID0gJygwKSc7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbW1lbnRzLmZvckVhY2goKGNvbW1lbnQpID0+IHtcclxuICAgICAgY29uc3QgY29tbWVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICBsaS5jbGFzc0xpc3QuYWRkKCdzaW5nbGUtY29tbWVudCcpO1xyXG4gICAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICB0aW1lLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtdGltZScpO1xyXG4gICAgICB0aW1lLmlubmVyVGV4dCA9IGAke2NvbW1lbnQuY3JlYXRpb25fZGF0ZX0sIGA7XHJcblxyXG4gICAgICBjb25zdCBhdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIGF1dGhvci5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWF1dGhvcicpO1xyXG4gICAgICBhdXRob3IuaW5uZXJUZXh0ID0gYCR7Y29tbWVudC51c2VybmFtZX06IGA7XHJcblxyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRNc2cnKTtcclxuICAgICAgbWVzc2FnZS5pbm5lclRleHQgPSBjb21tZW50LmNvbW1lbnQ7XHJcblxyXG4gICAgICBsaS5hcHBlbmQodGltZSwgYXV0aG9yLCBtZXNzYWdlKTtcclxuICAgICAgY29tbWVudENvbnRhaW5lci5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5Q29tbWVudHM7IiwiY29uc3QgY291bnRDb21tZW50cyA9ICgpID0+IHtcclxuICBjb25zdCBhbGxDb21tZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW5nbGUtY29tbWVudCcpLmxlbmd0aDtcclxuICByZXR1cm4gYWxsQ29tbWVudHM7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb3VudENvbW1lbnRzOyIsImNvbnN0IGNvdW50Q2FyZHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgbXlBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XHJcbiAgY29uc3QgY291bnQgPSBteUFycmF5Lmxlbmd0aDtcclxuICByZXR1cm4gY291bnQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb3VudENhcmRzOyIsImNvbnN0IHBvc3RMaWtlID0gYXN5bmMgKGl0ZW1JZCkgPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL1BYdlZuNzVOc0ltRG53SGdxTGE0L2xpa2VzLycsIHtcclxuICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICBpdGVtX2lkOiBpdGVtSWQsXHJcbiAgICB9KSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcclxufTtcclxuXHJcbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL3R5Z0pRaE9aeWV4UWNQcWE2OURHQ0pKTGtycm1DQXFvVklnVWhlaU8vbGlrZXMvJyk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICByZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCAgeyBwb3N0TGlrZSwgZ2V0TGlrZXMgfTsiLCJpbXBvcnQgZ2V0UGljdHVyZXMgZnJvbSAnLi9HZXRSZXF1ZXN0JztcclxuaW1wb3J0IGRpc3BsYXlDb21tZW50cyBmcm9tICcuL2NvbW1lbnRzJztcclxuaW1wb3J0ICBhZGRDb21tZW50cyAgZnJvbSAnLi9BUEljb21tZW50cyc7XHJcbmltcG9ydCBjb3VudENvbW1lbnRzIGZyb20gJy4vY291bnRDb21tZW50cyc7XHJcblxyXG5jb25zdCBzaG93Q29tbWVudENhcmQgPSBhc3luYyAodGl0bGUpID0+IHtcclxuICBjb25zdCBteVBpY3R1cmVzSnNvbiA9IGF3YWl0IGdldFBpY3R1cmVzKCk7XHJcbiAgY29uc3Qgc3RyaW5naWZpZWRKc29uID0gSlNPTi5zdHJpbmdpZnkobXlQaWN0dXJlc0pzb24pO1xyXG4gIGNvbnN0IG15UGljdHVyZXMgPSBKU09OLnBhcnNlKHN0cmluZ2lmaWVkSnNvbik7XHJcblxyXG4gIG15UGljdHVyZXMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgIGlmIChlbGVtZW50LnRpdGxlID09PSB0aXRsZSkge1xyXG4gICAgICBjb25zdCBjb21tZW50TW9kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1tb2RlbCcpO1xyXG4gICAgICBjb25zdCBjb21tZW50Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjb21tZW50Q2FyZC5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWNhcmQnKTtcclxuICAgICAgY29tbWVudENhcmQuc2V0QXR0cmlidXRlKCdpbmRleCcsIGluZGV4KTtcclxuXHJcbiAgICAgIGNvbnN0IGNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnY2xvc2UtaWNvbicpO1xyXG4gICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcycsICdmYS10aW1lcycpO1xyXG4gICAgICBjbG9zZUljb24uYXBwZW5kQ2hpbGQoaWNvbik7XHJcblxyXG4gICAgICBjb25zdCBjbG9zZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbW1lbnRNb2RlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAvLyBjb21tZW50TW9kZWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29tbWVudE1vZGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUNsaWNrKTtcclxuXHJcbiAgICAgIGNvbnN0IG1haW5EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBtYWluRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnbWFpbi1kZXNjcmlwdGlvbicpO1xyXG5cclxuICAgICAgaWYgKGVsZW1lbnQubWVkaWFfdHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgIGNvbnN0IG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgbWVkaWEuY2xhc3NMaXN0LmFkZCgnbWVkaWFJbWFnZScpO1xyXG4gICAgICAgIG1lZGlhLnNyYyA9IGVsZW1lbnQudXJsO1xyXG4gICAgICAgIG1haW5EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChtZWRpYSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbWVkaWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgICAgICBtZWRpYS5jbGFzc0xpc3QuYWRkKCdtZWRpYVZpZGVvJyk7XHJcbiAgICAgICAgbWVkaWEuc3JjID0gZWxlbWVudC51cmw7XHJcbiAgICAgICAgbWFpbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKG1lZGlhKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcbiAgICAgIGgxLmNsYXNzTGlzdC5hZGQoJ2ltYWdlLXRpdGxlJyk7XHJcbiAgICAgIGgxLmlubmVyVGV4dCA9IGVsZW1lbnQudGl0bGU7XHJcblxyXG4gICAgICBjb25zdCBleHBsYW5hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgZXhwbGFuYXRpb24uY2xhc3NMaXN0LmFkZCgnaW1hZ2UtZXhwbGFuYXRpb24nKTtcclxuICAgICAgZXhwbGFuYXRpb24uaW5uZXJUZXh0ID0gZWxlbWVudC5leHBsYW5hdGlvbjtcclxuXHJcbiAgICAgIGNvbnN0IGV4dHJhRXhwbGFuYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgY29weXJpZ2h0LmNsYXNzTGlzdC5hZGQoJ2NvcHlyaWdodCcpO1xyXG4gICAgICBjb3B5cmlnaHQuaW5uZXJUZXh0ID0gYEJ5ICR7ZWxlbWVudC5jb3B5cmlnaHQgPz8gJ0Fub255bW91cyd9YDtcclxuXHJcbiAgICAgIGNvbnN0IGltYWdlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgaW1hZ2VEYXRlLmNsYXNzTGlzdC5hZGQoJ2ltYWdlLWRhdGUnKTtcclxuICAgICAgaW1hZ2VEYXRlLmlubmVyVGV4dCA9IGAke2VsZW1lbnQuZGF0ZX1gO1xyXG4gICAgICBleHRyYUV4cGxhbmF0aW9uLmFwcGVuZChjb3B5cmlnaHQsIGltYWdlRGF0ZSk7XHJcblxyXG4gICAgICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgIGgyLmlubmVyVGV4dCA9ICdDb21tZW50cyAnO1xyXG4gICAgICBjb25zdCBjb21tZW50Q291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgY29tbWVudENvdW50ZXIuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1jb3VudGVyJyk7XHJcblxyXG4gICAgICBoMi5hcHBlbmRDaGlsZChjb21tZW50Q291bnRlcik7XHJcblxyXG4gICAgICBjb25zdCBjb21tZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgY29tbWVudENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgY29uc3QgY29tbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgICAgY29tbWVudFRpdGxlLmlubmVyVGV4dCA9ICdBZGQgYSBjb21tZW50JztcclxuXHJcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgIGZvcm0uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJZb3VyIG5hbWVcIiBjbGFzcz1cIm5hbWUtaW5wdXQgaW5wdXRcIiByZXF1aXJlZCBhdXRvY29tcGxldGU9XCJvZmZcIiAvPlxyXG4gICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJjb21tZW50LWlucHV0XCIgY2xhc3M9XCJjb21tZW50LWlucHV0IGlucHV0XCIgcGxhY2Vob2xkZXI9XCJZb3VyIGluc2lnaHRzLi4uXCIgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkNvbW1lbnQ8L2J1dHRvbj5cclxuICAgICAgICAgIGA7XHJcblxyXG4gICAgICBtYWluRGVzY3JpcHRpb24uYXBwZW5kKGgxLCBleHBsYW5hdGlvbiwgZXh0cmFFeHBsYW5hdGlvbiwgaDIsIGNvbW1lbnRDb250YWluZXIsIGNvbW1lbnRUaXRsZSwgZm9ybSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LWxlblxyXG4gICAgICBjb21tZW50Q2FyZC5hcHBlbmQoY2xvc2VJY29uLCBtYWluRGVzY3JpcHRpb24pO1xyXG4gICAgICBjb21tZW50TW9kZWwuYXBwZW5kQ2hpbGQoY29tbWVudENhcmQpO1xyXG5cclxuICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbW1lbnRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBjb21tZW50TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWlucHV0JykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdXNlcklEID0gY29tbWVudENhcmQuZ2V0QXR0cmlidXRlKCdpbmRleCcpO1xyXG5cclxuICAgICAgICBhd2FpdCBhZGRDb21tZW50cyh1c2VybmFtZSwgY29tbWVudE1lc3NhZ2UsIHVzZXJJRCk7XHJcbiAgICAgICAgYXdhaXQgZGlzcGxheUNvbW1lbnRzKHVzZXJJRCk7XHJcblxyXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNvdW50ZXInKTtcclxuICAgICAgICBjb3VudGVyLmlubmVyVGV4dCA9IGAoJHtjb3VudENvbW1lbnRzKCl9KWA7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjb21tZW50Q2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWNhcmQnKTtcclxuICBjb25zdCB1c2VySUQgPSBjb21tZW50Q2FyZC5nZXRBdHRyaWJ1dGUoJ2luZGV4Jyk7XHJcbiAgYXdhaXQgZGlzcGxheUNvbW1lbnRzKHVzZXJJRCk7XHJcblxyXG4gIGNvbnN0IGNvbW1lbnRDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtY291bnRlcicpO1xyXG4gIGNvbW1lbnRDb3VudGVyLmlubmVyVGV4dCA9IGAoJHtjb3VudENvbW1lbnRzKCl9KWA7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaG93Q29tbWVudENhcmQgOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5hcHAtY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOjEwMCU7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODksIDgxLCA5MiwgMC43MjYpO1xcclxcbiAgbWFyZ2luLXRvcDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWFyZ2luOiAycmVtIDFyZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxuICBwYWRkaW5nOiAwLjNyZW07XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIC53ZWItdGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAzcmVtO1xcclxcbiAgcGFkZGluZzogMC41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnTW9ub3RvbicsIGN1cnNpdmU7XFxyXFxufVxcclxcblxcclxcbmEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyAubmF2YmFyIHVsIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcclxcbn1cXHJcXG4ubmF2YmFyIHVsIGxpIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDEuNXJlbTtcXHJcXG59XFxyXFxuLm5hdmJhciB1bCBsaSBhOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMzMsIDEyOSwgMTI2KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXHJcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBtYWluIHNlY3Rpb24gc3R5bGUgb2YgdGhlIHdlYnNpdGUgKi9cXHJcXG4uYXBwLWNvbnRhaW5lciAuY29udGVudCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDI2MmU7XFxyXFxuICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7ICovXFxyXFxufVxcclxcblxcclxcbi5jb250ZW50IHNlY3Rpb24ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi50aXRsZS1saW5rIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgY29sb3I6IHdoaXRlc21va2U7XFxyXFxufVxcclxcblxcclxcbi5jb250ZW50IC5pdGVtLWdyaWQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDI2MmU7XFxyXFxuXFxyXFxuICBcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB3aWR0aDogMjNyZW07XFxyXFxuICBoZWlnaHQ6IDI2cmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhhOTI5YztcXHJcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDMuNXJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNHJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXHJcXG4gIHRyYW5zaXRpb246IGVhc2UtaW4tb3V0IDAuNXM7XFxyXFxufVxcclxcblxcclxcbi5jYXJkOmhvdmVyIHtcXHJcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5waWN0dXJlIHtcXHJcXG4gIHdpZHRoOiAyMnJlbTtcXHJcXG4gIGhlaWdodDogMTdyZW07XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LW1vZGVsIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgd2lkdGg6OTB2dztcXHJcXG4gIGhlaWdodDogODByZW07XFxyXFxuICBtYXJnaW4tbGVmdDogNHJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGNob2NvbGF0ZTtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHotaW5kZXg6IDIwO1xcclxcbiAgdG9wOiAyNSU7XFxyXFxuICBib3R0b206IDIwJTtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50LWNhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBwYWRkaW5nOiAycmVtIDZyZW07XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XFxyXFxuICBtYXJnaW4tbGVmdDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuZm9ybSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0IHtcXHJcXG4gIHdpZHRoOiAyMHJlbTtcXHJcXG4gIGhlaWdodDogM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuZm9ybSBidXR0b24ge1xcclxcbiAgd2lkdGg6IDEwcmVtO1xcclxcbiAgaGVpZ2h0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbiAgaGVpZ2h0OiA0cmVtO1xcclxcbiAgcGFkZGluZzogMXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLGtDQUFrQztBQUNwQzs7O0FBR0E7RUFDRSxVQUFVO0VBQ1YsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIseUNBQXlDO0VBQ3pDLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQiwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0Usb0NBQW9DO0VBQ3BDLHFCQUFxQjtFQUNyQixpQkFBaUI7QUFDbkI7O0FBRUEsc0NBQXNDO0FBQ3RDO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6Qix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5Qjs7OztBQUkzQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGFBQWE7RUFDYix5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixVQUFVO0VBQ1YsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQiwyQkFBMkI7RUFDM0Isa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxRQUFRO0VBQ1IsV0FBVztFQUNYLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCw0QkFBNEI7RUFDNUIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLmFwcC1jb250YWluZXIge1xcclxcbiAgd2lkdGg6MTAwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4OSwgODEsIDkyLCAwLjcyNik7XFxyXFxuICBtYXJnaW4tdG9wOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGluZyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBtYXJnaW46IDJyZW0gMXJlbTtcXHJcXG4gIGhlaWdodDogM3JlbTtcXHJcXG4gIHBhZGRpbmc6IDAuM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRpbmcgLndlYi10aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDNyZW07XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICBmb250LXdlaWdodDogOTAwO1xcclxcbiAgZm9udC1mYW1pbHk6ICdNb25vdG9uJywgY3Vyc2l2ZTtcXHJcXG59XFxyXFxuXFxyXFxuYSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkaW5nIC5uYXZiYXIgdWwge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxyXFxufVxcclxcbi5uYXZiYXIgdWwgbGkge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMS41cmVtO1xcclxcbn1cXHJcXG4ubmF2YmFyIHVsIGxpIGE6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEzMywgMTI5LCAxMjYpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcclxcbiAgY29sb3I6IHdoaXRlc21va2U7XFxyXFxufVxcclxcblxcclxcbi8qIG1haW4gc2VjdGlvbiBzdHlsZSBvZiB0aGUgd2Vic2l0ZSAqL1xcclxcbi5hcHAtY29udGFpbmVyIC5jb250ZW50IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIwMjYyZTtcXHJcXG4gIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQgc2VjdGlvbiB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlLWxpbmsge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAycmVtO1xcclxcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRlbnQgLml0ZW0tZ3JpZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIwMjYyZTtcXHJcXG5cXHJcXG4gIFxcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uY2FyZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHdpZHRoOiAyM3JlbTtcXHJcXG4gIGhlaWdodDogMjZyZW07XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGE5MjljO1xcclxcbiAgbWFyZ2luLXRvcDogMXJlbTtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICBtYXJnaW4tbGVmdDogMy41cmVtO1xcclxcbiAgcGFkZGluZzogMC40cmVtO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcclxcbiAgdHJhbnNpdGlvbjogZWFzZS1pbi1vdXQgMC41cztcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmQ6aG92ZXIge1xcclxcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjA4KTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnBpY3R1cmUge1xcclxcbiAgd2lkdGg6IDIycmVtO1xcclxcbiAgaGVpZ2h0OiAxN3JlbTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtbW9kZWwge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB3aWR0aDo5MHZ3O1xcclxcbiAgaGVpZ2h0OiA4MHJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiA0cmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogY2hvY29sYXRlO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgei1pbmRleDogMjA7XFxyXFxuICB0b3A6IDI1JTtcXHJcXG4gIGJvdHRvbTogMjAlO1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnQtY2FyZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHBhZGRpbmc6IDJyZW0gNnJlbTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YW1hcmluZTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAycmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQge1xcclxcbiAgd2lkdGg6IDIwcmVtO1xcclxcbiAgaGVpZ2h0OiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIGJ1dHRvbiB7XFxyXFxuICB3aWR0aDogMTByZW07XFxyXFxuICBoZWlnaHQ6IDNyZW07XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxuICBoZWlnaHQ6IDRyZW07XFxyXFxuICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImNyZWF0ZUNhcmRzIiwid2luZG93Iiwib25sb2FkIiwiZ2V0Q29tbWVudHMiLCJpdGVtSWQiLCJyZXNwb25zZSIsImZldGNoIiwiZGF0YSIsImpzb24iLCJhZGRDb21tZW50cyIsInVzZXJuYW1lIiwiY29tbWVudCIsIml0ZW1JRCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbV9pZCIsImhlYWRlcnMiLCJ0ZXh0IiwiYmFzZVVybCIsImtleSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJ1cmwiLCJnZXRQaWN0dXJlcyIsImFuc3dlciIsInBvc3RMaWtlIiwiZ2V0TGlrZXMiLCJzaG93Q29tbWVudENhcmQiLCJjb3VudENhcmRzIiwiaXRlbUdyaWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJteVBpY3R1cmVzIiwiZm9yRWFjaCIsIml0ZW0iLCJpIiwiY2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJtZWRpYV90eXBlIiwibWVkaWEiLCJzcmMiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0aXRsZSIsIm1vZGFsIiwidGl0bGVDb250YWluZXIiLCJjYXJkVGl0bGUiLCJ0ZXh0Q29udGVudCIsImNvbnRlbnRDb250YWluZXIiLCJsaWtlc0NvbnRhaW5lciIsImxvdmUiLCJzZXRBdHRyaWJ1dGUiLCJsaWtlcyIsImxpa2VOdW1iZXIiLCJpdGVtTGlrZXMiLCJsaWtlIiwidHlwZSIsImlubmVyVGV4dCIsInN0eWxlIiwiZGlzcGxheSIsImNvdW50ZXIiLCJnZXRFbGVtZW50QnlJZCIsImxlbmd0aCIsImRpc3BsYXlDb21tZW50cyIsInVzZXJJRCIsImNvbW1lbnRzIiwidW5kZWZpbmVkIiwiY29tbWVudENvdW50ZXIiLCJpbm5lckhUTUwiLCJjb21tZW50Q29udGFpbmVyIiwibGkiLCJ0aW1lIiwiY3JlYXRpb25fZGF0ZSIsImF1dGhvciIsIm1lc3NhZ2UiLCJhcHBlbmQiLCJjb3VudENvbW1lbnRzIiwiYWxsQ29tbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibXlBcnJheSIsImNvdW50IiwibXlQaWN0dXJlc0pzb24iLCJzdHJpbmdpZmllZEpzb24iLCJwYXJzZSIsImVsZW1lbnQiLCJpbmRleCIsImNvbW1lbnRNb2RlbCIsImNvbW1lbnRDYXJkIiwiY2xvc2VJY29uIiwiaWNvbiIsImNsb3NlQ2xpY2siLCJyZW1vdmUiLCJtYWluRGVzY3JpcHRpb24iLCJoMSIsImV4cGxhbmF0aW9uIiwiZXh0cmFFeHBsYW5hdGlvbiIsImNvcHlyaWdodCIsImltYWdlRGF0ZSIsImRhdGUiLCJoMiIsImNvbW1lbnRUaXRsZSIsImZvcm0iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJjb21tZW50TWVzc2FnZSIsImdldEF0dHJpYnV0ZSIsInJlc2V0Il0sInNvdXJjZVJvb3QiOiIifQ==