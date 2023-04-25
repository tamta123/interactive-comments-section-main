import data from "./data.json" assert { type: "json" };

const deleteSection = document.querySelector(".delete-section");
const deleteBox = document.querySelector(".delete-box");
const deleteBoxHeading = document.querySelector(".delete-box-heading");
const cancelButton = document.querySelector(".cancel-button");
const deleteButton = document.querySelector(".delete-button");

const commentSection = document.querySelector(".interactive-comments-section");
const currentUser = data.currentUser;

const createDomElement = (tag, className, src, text, id, type) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  if (src) {
    element.src = src;
  }
  if (text || text == 0) {
    element.textContent = text;
  }
  if (id) {
    element.setAttribute("id", id);
  }
  if (type) {
    element.setAttribute("type", type);
  }
  return element;
};

const information = () => {
  commentSection.innerHTML = "";
  for (let index = 0; index < data.comments.length; index++) {
    const { id, content, createdAt, score, user, username, replies } =
      data.comments[index];

    const userBox = createDomElement("div", "user-box");
    const userImage = createDomElement("img", "user-image", user.image.png);
    const userName = createDomElement("p", "user-name", null, user.username);
    const commentBox = createDomElement("div", "comment-box");
    const commentText = createDomElement(
      "p",
      "comment-text",
      null,
      content,
      id
    );
    const scoreReply = createDomElement("div", "score-reply");
    const replyDiv = createDomElement("div", "reply-div");
    const userDate = createDomElement("div", "user-date");
    const commentDate = createDomElement("p", "date", null, createdAt);

    const scoreElement = createDomElement("div", "score-value", null, null, id);
    const scoreValue = createDomElement("p", "score-number", null, score);
    const plusIcon = document.createElement("img");
    plusIcon.src = "./images/icon-plus.svg";
    plusIcon.classList.add("icon-plus");
    const minusIcon = document.createElement("img");
    minusIcon.src = "./images/icon-minus.svg";
    minusIcon.classList.add("icon-minus");
    scoreElement.append(plusIcon, scoreValue, minusIcon);
    const replyIcon = document.createElement("img");
    replyIcon.src = "./images/icon-reply.svg";
    const replyComment = document.createElement("p");
    replyComment.textContent = "reply";

    commentSection.append(commentBox);
    commentBox.append(userDate, commentText, scoreReply);
    scoreReply.append(scoreElement, replyDiv);
    replyDiv.append(replyIcon, replyComment);
    userBox.append(userImage, userName);
    userDate.append(userBox, commentDate);

    plusIcon.addEventListener("click", () => {
      data.comments[index].score = data.comments[index].score + 1;
      information();
      console.log(data.comments[index].score);
    });

    minusIcon.addEventListener("click", () => {
      if (data.comments[index].score > 0) {
        data.comments[index].score = data.comments[index].score - 1;
      } else {
        data.comments[index].score = 0;
      }
      information();
    });

    // Reply to comment section

    const replyToComment = createDomElement("div", "reply-to-comment");
    const IAmReplier = createDomElement("div", "i-am-replier");
    const myPhoto = createDomElement("img", "my-photo", currentUser.image.png);
    const myName = createDomElement("p", "my-name", null, currentUser.username);

    commentSection.append(replyToComment);
    replyToComment.append(IAmReplier);
    IAmReplier.append(myPhoto, myName);

    let myTextArea = document.createElement("textarea");
    myTextArea.classList.add("my-text-area");
    myTextArea.name = "myText";
    myTextArea.id = "myText";
    myTextArea.rows = 4;
    myTextArea.cols = 50;

    let mySubmit = document.createElement("input");
    mySubmit.type = "submit";
    mySubmit.id = "mySubmit";
    mySubmit.value = "Reply";

    replyToComment.append(myTextArea, mySubmit);

    mySubmit.addEventListener("click", () => {
      const replyText = myTextArea.value.trim();
      if (replyText !== "") {
        const newReply = {
          id: 3,
          content: replyText,
          createdAt: "1 week ago",
          score: 0,
          replyingTo: data.comments[index].user.username,
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        };
        data.comments[index].replies.push(newReply);
        myTextArea.value = "";
        information();
        // console.log(data.comments[index].replies);
      }
    });

    myTextArea.addEventListener("input", function () {
      if (myTextArea.value.trim().length > 0) {
        mySubmit.value = "Send";
      } else {
        mySubmit.value = "Reply";
      }
    });

    replyDiv.addEventListener("click", function () {
      if (replyToComment.style.display === "block") {
        replyToComment.style.display = "none";
      } else {
        replyToComment.style.display = "block";
      }
    });

    const repliesSection = createDomElement("div", "replies-section");
    for (let j = 0; j < replies.length; j++) {
      const { id, content, createdAt, score, user, username } = replies[j];
      const replyBox = createDomElement("div", "reply-box");
      const replyText = createDomElement(
        "div",
        "comment-text",
        null,
        `${"@" + replies[j].replyingTo} ${replies[j].content}`
      );
      const replyUserDate = createDomElement("div", "user-date");
      const replyUserImage = createDomElement(
        "img",
        "user-image",
        user.image.png
      );
      const replyUserName = createDomElement(
        "p",
        "user-name",
        null,
        user.username
      );
      const replyDate = createDomElement("p", "date", null, createdAt);
      const scoreReplyForReply = createDomElement("div", "score-reply");
      const replyDivReply = createDomElement("div", "reply-div");
      const replyScoreElement = createDomElement(
        "div",
        "score-value",
        null,
        null,
        id
      );
      const replyScoreValue = createDomElement(
        "p",
        "score-number",
        null,
        score
      );
      const deleteDiv = createDomElement("div", "delete-div");
      const editDiv = createDomElement("div", "delete-div");

      const plusIconNew = document.createElement("img");
      plusIconNew.src = "./images/icon-plus.svg";
      plusIconNew.classList.add("icon-plus");
      const minusIconNew = document.createElement("img");
      minusIconNew.src = "./images/icon-minus.svg";
      minusIconNew.classList.add("icon-minus");
      replyScoreElement.prepend(plusIconNew, replyScoreValue, minusIconNew);
      const replyIconReply = document.createElement("img");
      replyIconReply.src = "./images/icon-reply.svg";
      const replyCommentReply = document.createElement("p");
      replyCommentReply.textContent = "reply";

      plusIconNew.addEventListener("click", () => {
        data.comments[index].replies[j].score =
          data.comments[index].replies[j].score + 1;
        console.log(data.comments[index].replies[j].score);
        information();
      });
      minusIconNew.addEventListener("click", () => {
        if (data.comments[index].replies[j].score > 0) {
          data.comments[index].replies[j].score =
            data.comments[index].replies[j].score - 1;
        } else {
          data.comments[index].replies[j].score = 0;
        }
        console.log(data.comments[index].replies[j].score);
        information();
      });

      const deleteIcon = document.createElement("img");
      deleteIcon.src = "./images/icon-delete.svg";
      const deleteText = createDomElement("p", "delete-text", null, "Delete");
      deleteDiv.append(deleteIcon, deleteText);

      const editIcon = document.createElement("img");
      editIcon.src = "./images/icon-edit.svg";
      const editText = createDomElement("p", null, null, "Edit");
      editDiv.append(editIcon, editText);

      if (user.username === currentUser.username) {
        scoreReplyForReply.append(replyScoreElement, deleteDiv, editDiv);
      } else {
        scoreReplyForReply.append(replyScoreElement, replyDivReply);
      }

      replyUserDate.append(replyUserImage, replyUserName, replyDate);
      replyBox.append(replyUserDate, replyText, scoreReplyForReply);
      repliesSection.append(replyBox);
      replyDivReply.append(replyIconReply, replyCommentReply);

      commentSection.append(repliesSection);

      // Reply to comment section (reply to comments section)

      const replyToCommentSecond = createDomElement("div", "reply-to-comment");
      const IAmReplierSecond = createDomElement("div", "i-am-replier");
      const myPhotoSecond = createDomElement(
        "img",
        "my-photo",
        currentUser.image.png
      );
      const myNameSecond = createDomElement(
        "p",
        "my-name",
        null,
        currentUser.username
      );

      repliesSection.append(replyToCommentSecond);
      replyToCommentSecond.append(IAmReplierSecond);
      IAmReplierSecond.append(myPhotoSecond, myNameSecond);

      let myTextAreaSecond = document.createElement("textarea");
      myTextAreaSecond.classList.add("my-text-area-second");
      myTextAreaSecond.name = "myText";
      myTextAreaSecond.id = "myTextSecond";
      myTextAreaSecond.rows = 4;
      myTextAreaSecond.cols = 50;

      let mySubmitSecond = document.createElement("input");
      mySubmitSecond.type = "submit";
      mySubmitSecond.id = "mySubmitSecond";
      mySubmitSecond.value = "Reply";

      replyToCommentSecond.append(myTextAreaSecond, mySubmitSecond);

      mySubmitSecond.addEventListener("click", () => {
        const replyTextSecond = myTextAreaSecond.value.trim();
        if (replyTextSecond !== "") {
          const newReplySecond = {
            id: 3,
            content: replyTextSecond,
            createdAt: "1 week ago",
            score: 0,
            replyingTo: data.comments[index].replies[j].user.username,
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
          };
          data.comments[index].replies.push(newReplySecond);
          myTextArea.value = "";
          information();
        }
      });

      myTextAreaSecond.addEventListener("input", function () {
        if (myTextAreaSecond.value.trim().length > 0) {
          mySubmitSecond.value = "Send";
        } else {
          mySubmitSecond.value = "Reply";
        }
      });

      replyDivReply.addEventListener("click", function () {
        if (replyToCommentSecond.style.display === "block") {
          replyToCommentSecond.style.display = "none";
        } else {
          replyToCommentSecond.style.display = "block";
        }
      });
      deleteDiv.addEventListener("click", function () {
        deleteSection.style.display = "block";
      });
    }
  }
};

information();

cancelButton.addEventListener("click", function () {
  deleteSection.style.display = "none";
});

deleteButton.addEventListener("click", function () {
  // replyBox.style.display = "none";
});
