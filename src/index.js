const toysApi = "http://localhost:3000/toys";
let addToy = false;

fetchToys();
ListebToLikeButton();

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      listenToFormSubmit();
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch(toysApi)
    .then((response) => response.json())
    .then((toys) => toys.forEach((toy) => addTotyToToyCollection(toy)));
}

function addTotyToToyCollection(toy) {
  const toyContainer = document.getElementById("toy-collection");
  toyContainer.innerHTML += renderToy(toy);
}
function renderToy(toy) {
  return `
 <div class="card" id=${toy.id} >
    <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} likes</p>
  <button class="like-btn" data-id='${toy.id}'>Like <3</button>
</div`;
}

// Add event listener to the Form
function listenToFormSubmit() {
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.addEventListener("submit", handleFormSubmit);
}

// -Add a hendler with preventDeafult.
function handleFormSubmit(e) {
  e.preventDefault();
  const newToy = createNewToyFromForm(e);
  persistNewToy(newToy);
}

function createNewToyFromForm(e) {
  const name = e.target.name.value;
  const image = e.target.image.value;

  const newToy = {
    name: name,
    image: image,
    likes: 0,
  };
  return newToy;
}

// fetch post request to update Database:
function persistNewToy(newToy) {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newToy),
  };
  fetch("http://localhost:3000/toys", configObj)
    .then((response) => response.json())
    .then((toy) => {
      addNewToy(toy);
    });
}

// update the page with new card
function addNewToy(toy) {
  const toyContainer = document.getElementById("toy-collection");
  toyContainer.innerHTML += renderToy(toy);
}

// - addEventListener to click on like
function ListebToLikeButton() {
  const toyCollection = document.getElementById("toy-collection");
  toyCollection.addEventListener("click", increseLikes);
}

// Increase Toy's Likes
function increseLikes(e) {
  e.preventDefault();
  if (e.target.className === "like-btn") {
    const id = e.target.dataset.id;
    const toyToUpdate = document.getElementById(id);

    const likesToToy = toyToUpdate.querySelector("p");

    // -Frontend: increase the likes Numbe
    const updateLikeNumber = likesToToy.textContent.split(" ");
    updateLikeNumber[0] = +updateLikeNumber[0] + 1;
    likesToToy.innerHTML = `${updateLikeNumber[0]} likes`;

    // -Backend: patch the server
    const newLikesNumber = updateLikeNumber[0];

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: newLikesNumber,
      }),
    })
      .then((res) => res.json())
      .then((toy) => {
        console.log(toy);
      });
  }
}
