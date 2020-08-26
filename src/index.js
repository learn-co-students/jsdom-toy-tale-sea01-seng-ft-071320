function fetchAndRenderToys() {
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((json) => renderToyCards(json));
}

function renderToyCards(toys) {
  const toyCollectionNode = document.getElementById("toy-collection");

  for (const toy of toys) {
    toyCollectionNode.appendChild(renderToyCard(toy));
  }
}

function renderToyCard(toy) {
  const toyCard = document.createElement("div");
  toyCard.id = `toy-${toy.id}`;
  toyCard.classList.add("card");

  const renderToyCardList = [
    renderToyCardName,
    renderToyCardAvatar,
    renderToyCardLikes,
    renderToyCardButton,
  ];

  for (const renderToyCardFunction of renderToyCardList) {
    toyCard.appendChild(renderToyCardFunction(toy));
  }

  return toyCard;
}

function renderToyCardName(toy) {
  const toyCardName = document.createElement("h2");
  toyCardName.textContent = toy.name;

  return toyCardName;
}

function renderToyCardAvatar(toy) {
  const toyCardAvatar = document.createElement("img");
  toyCardAvatar.classList.add("toy-avatar");
  toyCardAvatar.src = toy.image;

  return toyCardAvatar;
}

function renderToyCardLikes(toy) {
  const toyCardLikes = document.createElement("p");
  toyCardLikes.classList.add("toy-card-likes");
  toyCardLikes.textContent = toy.likes;

  return toyCardLikes;
}

function renderToyCardButton() {
  const toyCardButton = document.createElement("button");
  toyCardButton.classList.add("like-btn");
  toyCardButton.textContent = "Like";
  toyCardButton.addEventListener("click", likeButton);

  return toyCardButton;
}

function createToyFormSubmit(event) {
  const formNode = event.target;
  const toyCollectionNode = document.getElementById("toy-collection");
  const toyURL = "http://localhost:3000/toys";

  const bodyObj = {
    name: formNode.name.value,
    image: formNode.image.value,
    likes: 0,
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bodyObj),
  };

  event.preventDefault();

  fetch(toyURL, configObj)
    .then((resp) => resp.json())
    .then((json) => console.log(json))
    .catch(console.log);

  toyCollectionNode.appendChild(renderToyCard(bodyObj));
  clearCreateToyForm(formNode);
  toyFormHideAndSeek();
}

function clearCreateToyForm(formNode) {
  formNode.name.value = "";
  formNode.image.value = "";
}

function initToyFormHideAndSeek() {
  const addToyButtonNode = document.getElementById("new-toy-btn");

  addToyButtonNode.addEventListener("click", toyFormHideAndSeek);
}

function initCreateToyFormSubmit() {
  const createToyFormNode = document.getElementById("create-toy-form");

  createToyFormNode.addEventListener("submit", createToyFormSubmit, false);
}

function likeButton(e) {
  const toyCardNode = e.target.parentNode;
  const toyCardLikes = toyCardNode.getElementsByClassName("toy-card-likes")[0];
  const toyId = toyCardNode.id.replace("toy-", "");

  const newLikes = parseInt(toyCardLikes.textContent) + 1;

  patchLikeToToy(toyId, newLikes);
  toyCardLikes.textContent = newLikes;
}

function patchLikeToToy(toyId, likes) {
  const bodyObj = {
    likes: likes,
  };

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bodyObj),
  };

  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
    .then((resp) => resp.json())
    .then((json) => console.log(json))
    .catch(console.log);
}

function initLikeButtons() {
  const likeButtonNodes = document.getElementsByClassName("like-btn");

  for (let i = 0; i < likeButtonNodes.length; i++) {
    likeButtonNodes[i].addEventListener("click", likeButton);
  }
}

function toyFormHideAndSeek() {
  const containerNode = document.getElementById("toy-form-container");

  containerNode.classList.contains("reveal")
    ? containerNode.classList.remove("reveal")
    : containerNode.classList.add("reveal");
}

initCreateToyFormSubmit();
initToyFormHideAndSeek();
fetchAndRenderToys();

// Pre-populated Flatiron code below here
// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });
