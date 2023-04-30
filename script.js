import data from "./data.json" assert { type: "json" };

const commentSection = document.querySelector(".interactive-comments-section");
const currentUser = data.currentUser;

const deleteSection = document.querySelector(".delete-section");
const deleteBox = document.querySelector(".delete-box");
const deleteBoxHeading = document.querySelector(".delete-box-heading");
const cancelButton = document.querySelector(".cancel-button");
const deleteButton = document.querySelector(".delete-button");

const addCommentTextarea = document.querySelector(".add-comment-textarea");
const sendCommentButton = document.querySelector(".send-comment");

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
    const replyDivForDesktop = createDomElement("div", "reply-div-desktop");
    const replyIconForDesktop = createDomElement(
      "img",
      "reply-icon-desktop",
      "./images/icon-reply.svg"
    );
    const replyCommentForDesktop = createDomElement(
      "p",
      "reply-comment-desktop",
      null,
      "Reply"
    );
    replyDivForDesktop.append(replyIconForDesktop, replyCommentForDesktop);

    const userDate = createDomElement("div", "user-date");
    const commentDate = createDomElement("p", "date", null, createdAt);
    const you = createDomElement("div", "you", null, "you");

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

    const scoreElementForDesktop = createDomElement(
      "div",
      "score-element-desktop"
    );
    const scoreValueForDesktop = createDomElement(
      "p",
      "score-value-desktop",
      null,
      score
    );
    const plusIconDesktop = createDomElement(
      "img",
      "plus-desktop",
      "./images/icon-plus.svg"
    );
    const minusIconDesktop = createDomElement(
      "img",
      "minus-desktop",
      "./images/icon-minus.svg"
    );
    scoreElementForDesktop.append(
      plusIconDesktop,
      scoreValueForDesktop,
      minusIconDesktop
    );
    const commentBoxDesktop = createDomElement("div", "comment-box-desktop");

    plusIconDesktop.addEventListener("click", () => {
      data.comments[index].score = data.comments[index].score + 1;
      information();
    });

    minusIconDesktop.addEventListener("click", () => {
      if (data.comments[index].score > 0) {
        data.comments[index].score = data.comments[index].score - 1;
      } else {
        data.comments[index].score = 0;
      }
      information();
    });

    const updateDiv = createDomElement("div", "update-div");
    const updateButton = createDomElement(
      "div",
      "update-button",
      null,
      "UPDATE"
    );
    updateDiv.append(updateButton);

    commentSection.append(commentBox);
    commentBoxDesktop.append(userDate, commentText, scoreReply, updateDiv);
    commentBox.append(scoreElementForDesktop, commentBoxDesktop);
    scoreReply.append(scoreElement);
    replyDiv.append(replyIcon, replyComment);
    userBox.append(userImage, userName);
    // userDate.append(userBox, commentDate);
    // commentDate.append(replyDivForDesktop);

    plusIcon.addEventListener("click", () => {
      data.comments[index].score = data.comments[index].score + 1;
      information();
    });

    minusIcon.addEventListener("click", () => {
      if (data.comments[index].score > 0) {
        data.comments[index].score = data.comments[index].score - 1;
      } else {
        data.comments[index].score = 0;
      }
      information();
    });

    const deleteDiv = createDomElement("div", "delete-div");
    const editDiv = createDomElement("div", "delete-div");

    deleteDiv.addEventListener("click", function () {
      deleteSection.style.display = "block";
      deleteButton.onclick = (event) => {
        const newCommentIndex = data.comments.findIndex(
          (comment) => data.comments[index].id === comment.id
        );
        data.comments.splice(newCommentIndex, 1);
        deleteSection.style.display = "none";
        information();
      };
    });

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./images/icon-delete.svg";
    const deleteText = createDomElement("p", "delete-text", null, "Delete");
    deleteDiv.append(deleteIcon, deleteText);

    const editIcon = document.createElement("img");
    editIcon.src = "./images/icon-edit.svg";
    const editText = createDomElement("p", null, null, "Edit");
    editDiv.append(editIcon, editText);

    const deleteEditDesktop = createDomElement("div", "delete-edit-desktop");
    const deleteDivDesktop = createDomElement("div", "delete-div-desktop");
    const editDivDesktop = createDomElement("div", "delete-div-desktop");

    deleteDivDesktop.addEventListener("click", function () {
      deleteSection.style.display = "block";
      deleteButton.onclick = (event) => {
        const newCommentIndex = data.comments.findIndex(
          (comment) => data.comments[index].id === comment.id
        );
        data.comments.splice(newCommentIndex, 1);
        deleteSection.style.display = "none";
        information();
      };
    });

    const deleteIconDesktop = createDomElement(
      "img",
      "icon-desktop",
      "./images/icon-delete.svg"
    );
    const deleteTextDesktop = createDomElement(
      "p",
      "delete-text",
      null,
      "Delete"
    );
    deleteDivDesktop.append(deleteIconDesktop, deleteTextDesktop);

    const editIconDesktop = createDomElement(
      "img",
      "icon-desktop",
      "./images/icon-edit.svg"
    );
    const editTextDesktop = createDomElement("p", "edit-text", null, "Edit");
    editDivDesktop.append(editIconDesktop, editTextDesktop);
    deleteEditDesktop.append(deleteDivDesktop, editDivDesktop);
    if (user.username === currentUser.username) {
      userDate.append(userBox, you, commentDate, deleteEditDesktop);
      scoreReply.append(scoreElement, deleteDiv, editDiv);
    } else {
      userDate.append(userBox, commentDate, replyDivForDesktop);
      scoreReply.append(scoreElement, replyDiv);
    }

    editDiv.addEventListener("click", () => {
      commentText.contentEditable = true;
      commentText.classList.add("editing");
      commentText.focus();
      scoreReply.style.display = "none";
      updateDiv.style.display = "flex";
    });

    updateButton.addEventListener("click", () => {
      commentText.contentEditable = false;
      commentText.classList.remove("editing");
      const updateCommentText = replyText.innerHTML.trim();
      data.comments = updateCommentText;
      information();
    });

    updateDiv.onclick = () => {
      updateDiv.style.display = "none";
      scoreReply.style.display = "flex";
    };

    editDivDesktop.addEventListener("click", () => {
      console.log("click");
      // commentText.contentEditable = true;
      // commentText.classList.add("editing");
      // commentText.focus();
      // updateDiv.style.display = "flex";
    });

    // updateButton.addEventListener("click", () => {
    //   commentText.contentEditable = false;
    //   commentText.classList.remove("editing");
    //   const updateCommentText = replyText.innerHTML.trim();
    //   data.comments = updateCommentText;
    //   information();
    // });

    // updateDiv.onclick = () => {
    //   updateDiv.style.display = "none";
    // };

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
    myTextArea.rows = 3;
    myTextArea.cols = 50;

    let mySubmit = createDomElement("div", "my-submit", null, "Reply");

    replyToComment.append(myTextArea, mySubmit);

    mySubmit.addEventListener("click", () => {
      const replyTextNew = myTextArea.value.trim();
      if (replyTextNew !== "") {
        const newReply = {
          id: Math.floor(Math.random() * 1000000),
          content: replyTextNew,
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
      }
    });

    myTextArea.addEventListener("input", function () {
      if (myTextArea.value.trim().length > 0) {
        mySubmit.textContent = "Send";
      } else {
        mySubmit.textContent = "Reply";
      }
    });

    replyDiv.addEventListener("click", function () {
      if (replyToComment.style.display === "block") {
        replyToComment.style.display = "none";
      } else {
        replyToComment.style.display = "block";
      }
    });

    replyDivForDesktop.addEventListener("click", function () {
      if (replyToComment.style.display === "flex") {
        replyToComment.style.display = "none";
      } else {
        replyToComment.style.display = "flex";
      }
    });

    const repliesSection = createDomElement("div", "replies-section");
    for (let j = 0; j < replies.length; j++) {
      const { id, content, createdAt, score, user, username } = replies[j];
      const replyBox = createDomElement("div", "reply-box");
      const replyText = createDomElement(
        "div",
        "reply-text",
        null,
        replies[j].content
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

      const newReplyDivForDesktop = createDomElement(
        "div",
        "new-reply-div-desktop"
      );
      const newReplyIconForDesktop = createDomElement(
        "img",
        "reply-icon-desktop",
        "./images/icon-reply.svg"
      );
      const newReplyCommentForDesktop = createDomElement(
        "p",
        "reply-comment-desktop",
        null,
        "Reply"
      );
      newReplyDivForDesktop.append(
        newReplyIconForDesktop,
        newReplyCommentForDesktop
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

      const replyToWhom = createDomElement(
        "span",
        "reply-to-whom",
        null,
        `@${replies[j].replyingTo} `
      );

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

      const replyScoreElementForDesktop = createDomElement(
        "div",
        "score-element-desktop"
      );
      const replyScoreValueForDesktop = createDomElement(
        "p",
        "score-value-desktop",
        null,
        score
      );
      const replyPlusIconDesktop = createDomElement(
        "img",
        "plus-desktop",
        "./images/icon-plus.svg"
      );
      const replyMinusIconDesktop = createDomElement(
        "img",
        "minus-desktop",
        "./images/icon-minus.svg"
      );
      replyScoreElementForDesktop.append(
        replyPlusIconDesktop,
        replyScoreValueForDesktop,
        replyMinusIconDesktop
      );
      const replyBoxDesktop = createDomElement("div", "comment-box-desktop");

      replyPlusIconDesktop.addEventListener("click", () => {
        data.comments[index].replies[j].score =
          data.comments[index].replies[j].score + 1;
        information();
      });
      replyMinusIconDesktop.addEventListener("click", () => {
        if (data.comments[index].replies[j].score > 0) {
          data.comments[index].replies[j].score =
            data.comments[index].replies[j].score - 1;
        } else {
          data.comments[index].replies[j].score = 0;
        }
        information();
      });

      plusIconNew.addEventListener("click", () => {
        data.comments[index].replies[j].score =
          data.comments[index].replies[j].score + 1;
        information();
      });
      minusIconNew.addEventListener("click", () => {
        if (data.comments[index].replies[j].score > 0) {
          data.comments[index].replies[j].score =
            data.comments[index].replies[j].score - 1;
        } else {
          data.comments[index].replies[j].score = 0;
        }
        information();
      });

      const updateDivReply = createDomElement("div", "update-div");
      const updateButtonReply = createDomElement(
        "div",
        "update-button",
        null,
        "UPDATE"
      );
      updateDivReply.append(updateButtonReply);

      replyText.prepend(replyToWhom);
      replyBoxDesktop.append(
        replyUserDate,
        replyText,
        scoreReplyForReply,
        updateDivReply
      );
      replyBox.append(replyScoreElementForDesktop, replyBoxDesktop);
      repliesSection.append(replyBox);
      replyDivReply.append(replyIconReply, replyCommentReply);

      const deleteDivReply = createDomElement("div", "delete-div");
      const editDivReply = createDomElement("div", "delete-div");

      const deleteIconReply = document.createElement("img");
      deleteIconReply.src = "./images/icon-delete.svg";
      const deleteTextReply = createDomElement(
        "p",
        "delete-text",
        null,
        "Delete"
      );
      deleteDivReply.append(deleteIconReply, deleteTextReply);

      deleteDivReply.addEventListener("click", function () {
        deleteSection.style.display = "block";
        deleteButton.onclick = (event) => {
          console.log(replies[j]);
          const replyIndex = replies.findIndex(
            (reply) => replies[j].id === reply.id
          );
          replies.splice(replyIndex, 1);
          deleteSection.style.display = "none";
          information();
        };
      });

      const editIconReply = document.createElement("img");
      editIconReply.src = "./images/icon-edit.svg";
      const editTextReply = createDomElement("p", null, null, "Edit");
      editDivReply.append(editIconReply, editTextReply);

      const newDeleteEditDesktop = createDomElement(
        "div",
        "delete-edit-desktop"
      );
      const newDeleteDivDesktop = createDomElement("div", "delete-div-desktop");
      const newEditDivDesktop = createDomElement("div", "delete-div-desktop");

      newDeleteDivDesktop.addEventListener("click", function () {
        deleteSection.style.display = "block";
        deleteButton.onclick = (event) => {
          console.log(replies[j]);
          const replyIndex = replies.findIndex(
            (reply) => replies[j].id === reply.id
          );
          replies.splice(replyIndex, 1);
          deleteSection.style.display = "none";
          information();
        };
      });

      const newDeleteIconDesktop = createDomElement(
        "img",
        "icon-desktop",
        "./images/icon-delete.svg"
      );
      const newDeleteTextDesktop = createDomElement(
        "p",
        "delete-text",
        null,
        "Delete"
      );
      newDeleteDivDesktop.append(newDeleteIconDesktop, newDeleteTextDesktop);

      const newEditIconDesktop = createDomElement(
        "img",
        "icon-desktop",
        "./images/icon-edit.svg"
      );
      const newEditTextDesktop = createDomElement(
        "p",
        "edit-text",
        null,
        "Edit"
      );
      newEditDivDesktop.append(newEditIconDesktop, newEditTextDesktop);
      newDeleteEditDesktop.append(newDeleteDivDesktop, newEditDivDesktop);
      const newYou = createDomElement("div", "you", null, "you");

      if (replies[j].user.username === currentUser.username) {
        replyUserDate.append(
          replyUserImage,
          replyUserName,
          newYou,
          replyDate,
          newDeleteEditDesktop
        );
        scoreReplyForReply.append(
          replyScoreElement,
          deleteDivReply,
          editDivReply
        );
      } else {
        scoreReplyForReply.append(replyScoreElement, replyDivReply);
        replyUserDate.append(
          replyUserImage,
          replyUserName,
          replyDate,
          newReplyDivForDesktop
        );
      }

      editDivReply.addEventListener("click", () => {
        replyText.contentEditable = true;
        replyText.classList.add("editing");
        replyText.focus();
        scoreReplyForReply.style.display = "none";
        updateDivReply.style.display = "flex";
      });

      updateButtonReply.addEventListener("click", () => {
        replyText.contentEditable = false;
        replyText.classList.remove("editing");
        const updateComment = replyText.innerHTML.trim();
        data.comment[index].replies[j] = updateComment;
        information();
      });

      updateDivReply.onclick = () => {
        updateDivReply.style.display = "none";
        scoreReplyForReply.style.display = "flex";
      };

      newEditDivDesktop.addEventListener("click", () => {
        replyText.contentEditable = true;
        replyText.classList.add("editing");
        replyText.focus();
        updateDivReply.style.display = "flex";
      });

      updateButtonReply.addEventListener("click", () => {
        replyText.contentEditable = false;
        replyText.classList.remove("editing");
        const updateComment = replyText.innerHTML.trim();
        data.comment[index].replies[j] = updateComment;
        information();
      });

      updateDivReply.onclick = () => {
        updateDivReply.style.display = "none";
      };

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

      const mySubmitSecond = createDomElement(
        "div",
        "my-submit",
        null,
        "Reply"
      );

      replyToCommentSecond.append(myTextAreaSecond, mySubmitSecond);

      mySubmitSecond.addEventListener("click", () => {
        const replyTextSecond = myTextAreaSecond.value.trim();
        if (replyTextSecond !== "") {
          const newReplySecond = {
            id: Math.floor(Math.random() * 1000000),
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

      deleteDiv.onclick = () => {
        deleteSection.style.display = "block";
        deleteButton.onclick = () => {
          const newCommentIndex = comments[index].findIndex(
            (comment) => comments[index].id === comment.id
          );
          data.comments[index].splice(newCommentIndex, 1);
          deleteSection.style.display = "none";
          information();
        };
      };

      myTextAreaSecond.addEventListener("input", function () {
        if (myTextAreaSecond.value.trim().length > 0) {
          mySubmitSecond.value = "Send";
        } else {
          mySubmitSecond.value = "Reply";
        }
      });

      newReplyDivForDesktop.addEventListener("click", function () {
        if (replyToCommentSecond.style.display === "flex") {
          replyToCommentSecond.style.display = "none";
        } else {
          replyToCommentSecond.style.display = "flex";
        }
      });

      replyDivReply.addEventListener("click", function () {
        if (replyToCommentSecond.style.display === "block") {
          replyToCommentSecond.style.display = "none";
        } else {
          replyToCommentSecond.style.display = "block";
        }
      });
    }
  }
};

information();

cancelButton.addEventListener("click", function () {
  deleteSection.style.display = "none";
});

sendCommentButton.addEventListener("click", () => {
  const AddComment = addCommentTextarea.value.trim();
  if (AddComment !== "") {
    const newComment = {
      id: Math.floor(Math.random() * 1000000),
      content: AddComment,
      createdAt: "1 days ago",
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };

    data.comments.push(newComment);
    addCommentTextarea.value = "";
    information();
  }
});
