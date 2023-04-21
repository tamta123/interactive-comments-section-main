import data from "./data.json" assert {type:"json"}


const commentSection = document.querySelector(".interactive-comments-section");
const currentUser = data.currentUser;

const createDomElement = (tag, className, src, text, id,) => {
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
  return element;
};

for (let index = 0; index < data.comments.length; index++) {
  const { id, content, createdAt, score, user, username, replies } = data.comments[index];

  const userBox = createDomElement('div', 'user-box');
  const userImage = createDomElement('img', 'user-image', user.image.png);
  const userName = createDomElement('p', 'user-name', null, user.username);
  const commentBox = createDomElement('div', 'comment-box');
  const commentText = createDomElement('p', 'comment-text', null, content, id);
  const scoreReply = createDomElement('div', 'score-reply');
  const replyDiv = createDomElement('div', "reply-div");
  const scoreElement = createDomElement('div', 'score-value', null, score, id);
  const userDate = createDomElement('div', 'user-date');
  const commentDate = createDomElement('p', 'date', null, createdAt);

  const plusIcon = document.createElement('img');
  plusIcon.src = './images/icon-plus.svg';
  plusIcon.classList.add('icon');
  const minusIcon = document.createElement('img');
  minusIcon.src = './images/icon-minus.svg';
  minusIcon.classList.add('icon');
  scoreElement.prepend(plusIcon);
  scoreElement.appendChild(minusIcon);
  const replyIcon = document.createElement('img');
  replyIcon.src = './images/icon-reply.svg';
  const replyComment = document.createElement('p');
  replyComment.textContent = 'reply';

  commentBox.append(userDate, commentText, scoreReply);
  scoreReply.append(scoreElement, replyDiv);
  replyDiv.append(replyIcon, replyComment);
  commentSection.append(commentBox);
  userBox.append(userImage, userName);
  userDate.append(userBox, commentDate);


  const repliesSection = createDomElement('div', 'replies-section');
  for (let j = 0; j < replies.length; j++) {
    const { id, content, createdAt, score, user, username } = replies[j];
    const replyBox = createDomElement('div', 'reply-box');
    const replyText = createDomElement('div', 'comment-text', null, `${"@"+ replies[j].replyingTo} ${replies[j].content}`);
    const replyUserDate = createDomElement('div', 'user-date');
    const replyUserImage = createDomElement('img', 'user-image', user.image.png);
    const replyUserName = createDomElement('p', 'user-name', null, user.username);
    const replyDate = createDomElement('p', 'date', null, createdAt )
    const scoreReplyForReply = createDomElement('div', 'score-reply')
    const replyScoreReply = createDomElement('div', 'score-reply')
    const replyDivReply = createDomElement('div', "reply-div")
    const replyScoreElement = createDomElement('div', 'score-value', null, score, id )
    const deleteDiv =  createDomElement ('div', 'delete-div')
    const editDiv =  createDomElement ('div', 'delete-div')

    
    
    const plusIconNew = document.createElement('img');
    plusIconNew.src = './images/icon-plus.svg';
    plusIconNew.classList.add('icon');
    const minusIconNew = document.createElement('img');
    minusIconNew.src = './images/icon-minus.svg';
    minusIconNew.classList.add('icon');
    replyScoreElement.prepend(plusIconNew);
    replyScoreElement.appendChild(minusIconNew);
    const replyIconReply = document.createElement('img');
    replyIconReply.src = './images/icon-reply.svg'
    const replyCommentReply = document.createElement('p')
    replyCommentReply.textContent='reply'
    

    const deleteIcon = document.createElement('img');
    deleteIcon.src = './images/icon-delete.svg'
    const deleteText = createDomElement("p", "delete-text", null, "Delete")
    deleteDiv.append(deleteIcon,deleteText)

    const editIcon = document.createElement('img');
    editIcon.src = './images/icon-edit.svg'
    const editText = createDomElement("p",null, null, "Edit")
    editDiv.append(editIcon,editText)
    

    if (user.username === currentUser.username) {
        scoreReplyForReply.append(replyScoreElement, deleteDiv, editDiv) 

    }else{
        scoreReplyForReply.append(replyScoreElement,replyDivReply ) 

    }

        replyUserDate.append(replyUserImage,replyUserName,replyDate)
        replyBox.append( replyUserDate,replyText,scoreReplyForReply);
        repliesSection.append(replyBox);
        replyDivReply.append(replyIconReply,replyCommentReply)
        }
        commentSection.append(repliesSection);
    

        replyDiv.addEventListener("click", function() {
            console.log("The replyDiv was clicked!");
          });
    }


