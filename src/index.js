let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyContainer = document.querySelector("#toy-collection");
const CreateToyformbtn = document.querySelector(".add-toy-form");

//FUNCTION CALLING
listenToToggleBtn();
ListentoformSubmit();
fetchGetAlltoys();

//LISTENERS
function listenToToggleBtn() {
  addBtn.addEventListener("click", handleToToggleBtn);
}

function ListentoformSubmit() {
  CreateToyformbtn.addEventListener("submit", handletoformsubmit);
}

//HANDLERS
function handleToToggleBtn() {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
}

function handletoformsubmit(event) {
  event.preventDefault();

  const nameInput = event.target.name;
  const imageInput = event.target.image;

  const name = nameInput.value;
  const image = imageInput.value;
  const newToy = {
    name: name,
    image: image,
    likes: 0,
  };
  fetchPOSTtoy(newToy);

  nameInput.value = "";
  imageInput.value = "";
}
//FETCHES
//127.0.0.1:3001/toys

function fetchGetAlltoys() {
  fetch("http://127.0.0.1:3001/toys")
    .then((response) => response.json())
    .then((toys) => renderToyCards(toys));
}

function fetchPOSTtoy(newToy) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToy),
  };
  fetch("http://127.0.0.1:3001/toys", options)
    .then((response) => response.json())
    .then((newToy) => {
      appendtoy(newToy);
    });
}

//DOM MANIPULATION
function renderToyCards(toys) {
  toys.forEach((toy) => appendtoy(toy));
}

function appendtoy(toy) {
  toyContainer.innerHTML += renderToyCard(toy);
}
function renderToyCard(toy) {
  return `<div class="card">
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn">Like <3</button>
</div>`;
}

// POST http://localhost:3000/toys
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })
