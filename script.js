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

const userBox = createDomElement('div', 'user-box');
const userImage = createDomElement('img', 'user-image', user.image.png);
const userName = createDomElement('p', 'user-name', null, user.username);
const commentBox = createDomElement('div', 'comment-box')
const commentText = createDomElement('p', 'comment-text', null, content, id)
const scoreReply = createDomElement('div', 'score-reply')
const replyDiv = createDomElement('div', "reply-div")
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
const replyIcon = document.createElement('img');
replyIcon.src = './images/icon-reply.svg'
const replyComment = document.createElement('p')
replyComment.textContent='reply'
 


commentBox.append(userDate,commentText,scoreReply);
scoreReply.append(scoreElement,replyDiv)
replyDiv.append(replyIcon,replyComment)
commentSection.append(commentBox )
userBox.append(userImage, userName);
userDate.append(userBox, commentDate)


const repliesSection = createDomElement('div', 'replies-section');
    for (let j = 0; j < replies.length; j++) {
        const { id, content, createdAt, score, user, username } = replies[j];
    const replyBox = createDomElement('div', 'reply-box');
    const replyText = createDomElement('div', 'comment-text', null, content)
    const replyUserDate = createDomElement('div', 'user-date')
    const replyUserImage = createDomElement('img', 'user-image', user.image.png);
    const replyUserName = createDomElement('p', 'user-name', null, user.username);
    const replyDate = createDomElement('p', 'date', null, createdAt )




    replyUserDate.append(replyUserImage,replyUserName,replyDate)
    replyBox.append( replyUserDate,replyText);
    repliesSection.append(replyBox);
    }
    commentSection.append(repliesSection);
}
