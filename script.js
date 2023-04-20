import data from "./data.json" assert {type:"json"}

const commentSection = document.querySelector(".interactive-comments-section");

const createDomElement = (tag, className, src, text, id, event, eventFc) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    if (src) {
        element.src = src;
    }
    if (text) {
        element.textContent = text;
    }

    if (id) {
        element.setAttribute('id',id);
    }
    if (event) {
        element[event] = () => {
        eventFc();
        };
    }
    return element
};

for (let index = 0; index < data.comments.length; index++){
const{ id, content, createdAt, score, user,username,replies } = data.comments[index];

const userContainer = createDomElement('div', 'user-container' )
const userBox = createDomElement('div', 'user-box');
const userImage = createDomElement('img', 'user-image', user.image.png);
const userName = createDomElement('p', 'user-name', null, user.username);
const commentBox = createDomElement('div', 'comment-box')
const commentText = createDomElement('p', 'comment-text', null, content, id)
const scoreElement = createDomElement('div', 'score-value', null, score, id )
const userDate = createDomElement('div', 'user-date')
const commentDate = createDomElement('p', 'date', null, createdAt )


const plusIcon = document.createElement('img');
plusIcon.src = './images/icon-plus.svg';
plusIcon.classList.add('icon');
const minusIcon = document.createElement('img');
minusIcon.src = './images/icon-minus.svg';
minusIcon.classList.add('icon');
scoreElement.prepend(plusIcon);
scoreElement.appendChild(minusIcon);

commentBox.append(userDate,commentText,scoreElement);
commentSection.append(commentBox )
userBox.append(userImage, userName);
userDate.append(userBox, commentDate)
}

// if (replies !== undefined) {
//     for (let j = 0; j < replies.length; j++) {
//         const { id, content, createdAt, score, user, username } = replies[j];
