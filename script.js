import data from "./data.json" assert {type:"json"}


const commentSection = document.querySelector(".interactive-comments-section");
const currentUser = data.currentUser;

const createDomElement = (tag, className, src, text, id, type) => {
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
  if (type) {
    element.setAttribute('type', type);
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


  commentSection.append(commentBox)
  commentBox.append(userDate, commentText, scoreReply);
  scoreReply.append(scoreElement, replyDiv);
  replyDiv.append(replyIcon, replyComment);
  userBox.append(userImage, userName);
  userDate.append(userBox, commentDate);

  // Reply to comment section

  const replyToComment = createDomElement("div", "reply-to-comment");
  const IAmReplier =  createDomElement('div', "i-am-replier")
  const myPhoto = createDomElement("img", "my-photo", currentUser.image.png)
  const myName = createDomElement ("p", "my-name", null, currentUser.username)

  commentSection.append(replyToComment)
  replyToComment.append(IAmReplier)
  IAmReplier.append(myPhoto,myName)

  let myForm = document.createElement("form");
  myForm.action = "myScript.php";
  myForm.method = "post";
  myForm.enctype = "multipart/form-data";

  let myTextArea = document.createElement("textarea");
  myTextArea.name = "myText";
  myTextArea.id = "myText";
  myTextArea.rows = 4;
  myTextArea.cols = 50;
  myForm.append(myTextArea);

  let mySubmit = document.createElement("input");
  mySubmit.type = "submit";
  mySubmit.id = "mySubmit";
  mySubmit.value = "Reply";
  myForm.append(mySubmit);

  replyToComment.append(myForm)

  replyDiv.addEventListener("click",function(){
    replyToComment.style.display = "block"
  })


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

    } else {
        scoreReplyForReply.append(replyScoreElement,replyDivReply ) 
    }

    replyUserDate.append(replyUserImage,replyUserName,replyDate)
    replyBox.append( replyUserDate,replyText,scoreReplyForReply);
    repliesSection.append(replyBox);
    replyDivReply.append(replyIconReply,replyCommentReply)
    
       
    commentSection.append(repliesSection);


    // Reply to comment section (reply to comments section)

  const replyToCommentSecond = createDomElement("div", "reply-to-comment");
  const IAmReplierSecond =  createDomElement('div', "i-am-replier")
  const myPhotoSecond = createDomElement("img", "my-photo", currentUser.image.png)
  const myNameSecond = createDomElement ("p", "my-name", null, currentUser.username)

  repliesSection.append(replyToCommentSecond)
  replyToCommentSecond.append(IAmReplierSecond)
  IAmReplierSecond.append(myPhotoSecond,myNameSecond)

  let myFormSecond = document.createElement("form");
  myFormSecond.action = "myScript.php";
  myFormSecond.method = "post";
  myFormSecond.enctype = "multipart/form-data";

  let myTextAreaSecond = document.createElement("textarea");
  myTextAreaSecond.name = "myText";
  myTextAreaSecond.id = "myTextSecond";
  myTextAreaSecond.rows = 4;
  myTextAreaSecond.cols = 50;
  myFormSecond.append(myTextAreaSecond);

  let mySubmitSecond = document.createElement("input");
  mySubmitSecond.type = "submit";
  mySubmitSecond.id = "mySubmitSecond";
  mySubmitSecond.value = "Reply";
  myFormSecond.append(mySubmitSecond);

  replyToCommentSecond.append(myFormSecond)

    replyDivReply.addEventListener("click",function(){
      replyToCommentSecond.style.display = "block"
    })

    // if (user.username !== currentUser.username) {
    //   repliesSection.append(replyToCommentSecond)
    // }else {
      
    // }

    // Delete section

    const body=document.querySelector("body")
    body.prepend(commentSection)

    const deleteSection = createDomElement("div", "delete-section")
    const deleteBox = createDomElement("div", "delete-box")
    const deleteBoxHeading = createDomElement("p", "delete-box-heading", null,"Delete comment",)
    const warningText = createDomElement("p","warning-text", null, "Are you sure you want to delete this comment? This will remove the comment and can’t be undone.")
        
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'submit';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'submit';
    cancelButton.textContent = 'NO, CANCEL';
    cancelButton.classList.add("cancel-button");

    const deleteButton = document.createElement('button');
    deleteButton.type = 'submit';
    deleteButton.textContent = 'YES, DELETE';
    deleteButton.classList.add("delete-button");
        

    // const cancelButton = createDomElement("div", "cancel-button", null, "NO, CANCEL",null, submitButton)
    // const DeleteButton = createDomElement("div", "delete-button", null, "YES, DELETE",null, submitButton)

    if (user.username === currentUser.username) {
      body.append(deleteSection)
    }

    deleteSection.append(deleteBox);
    deleteBox.append(deleteBoxHeading,warningText,form)
    form.append(cancelButton,deleteButton);


    deleteDiv.addEventListener("click",function(){
      deleteSection.style.display = "block"
    })
  }
}


