let addToy = false;
const toyCollectionContainer = document.getElementById("toy-collection") //container all toys are displayed in


document.addEventListener("DOMContentLoaded", () => {
  fetchToys()  //load all toys from db
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;

    if (addToy) {
      toyFormContainer.style.display = "block";
      newToySubmitListen() //add new toy to db and load to screen

    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

/////////////////////////////////
//fetch all toys from the json after event
/////////////////////////////////
// listener click on button 
function fetchToys(){
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((results) => { //store store toys data in results array
      addToysToToyContainer(results)

    })
}

function addToysToToyContainer(toys){
  //addToys loops through all toys, calls a formatting method and renders via innerHTML to the screen
  toys.forEach((toy) => {
    displaySingleToy(toy)
  })
}

function displaySingleToy(toy){
  //dislay each toy. is used in a loop to add all toys and is called in process when adding 1 new toy by a user 

  toyCollectionContainer.innerHTML += formatSingleToyForDisplay(toy)
  
  // toyCollectionContainer.append( formatSingleToyForDisplay(toy) )
  
}


function formatSingleToyForDisplay(toy){
  //call on an above loop adding format to each attribute and returning it
 
    //id, name, image, likes
    return `
      <div class="card" id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar"/>
        <p>${toy.likes} Likes </p>
        <button class="like-btn" id="${toy.id}">Like <3</button>
      </div>`
  }

//////////////////////
//////////////////////
//code below adds new toy
/////////////////////

// grab user input via a addEventListener
// make a POST call via fetch to json DB
// wait for pessemssitc load and then display to screen 

function newToySubmitListen(){
  //identify where submit is coming from
  //place a listern on the element and pass off to the call listening callback function 

  // const newToyForm = document.getElementsByClassName("add-toy-form")
  // const newToyForm = document.QuerySelector(".add-toy-form")
 
  const newToyForm = document.querySelector(".container")
  newToyForm.addEventListener('submit', addNewToyProcess) 
   
  console.log("hela")
}

function addNewToyProcess(event){
  //x prevent defualt of form action
  event.preventDefault()
    
  //pull data from form into json format 
  const newToyJson = getNewToyDataFromForm(event)
  
  //make the fetch POST request
  addNewToytoDB(newToyJson)

  //format the data and then update screen
  
}


function getNewToyDataFromForm(event){
 //takes data input from form (i.e. event) and formats it into json and return it to another func
 
  //pull out each event input 
  const nameInput = event.target.name
  const imageInput = event.target.image

  //from event input, assign the actual user value
  const name = nameInput.value
  const image = imageInput.value

  //assign the data into a josn format and assign to a var
  const newToyJson =  {
    "name": name,
    "image": image,
    "id": id
  }

  return newToyJson
}


function addNewToytoDB(newToyJson){
//add json data via fetch POST into db 
  
const options = {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newToyJson),
}


  fetch('http://localhost:3000/toys', options)
  .then(response => response.json())
  .then(newToyJson => {
    console.log('Success:', newToyJson);
    displaySingleToy(newToyJson)
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}


/////////////////////////
////Handling the Likes below
/////////////////////////

//listen for it and target the btn in particular,




function listenForLikeClick(){
// const likeButton = document.getElementsByClassName("like-btn")[0]
const likeButton = document.getElementById("toy-collection")
likeButton.addEventListener("click",handleLikeClicks )


}

function handleLikeClicks(event){
  // assign to callback function to run 
//prevent defualt behavior of screen reload
//limit click to button and call func to add 1 like

  event.preventDefault()
  if (event.target.innerText === "Like <3"){
    addOneToLike(event)
    
  }
  


}


function addOneToLike(event){
//increase like in DB and 
//then refresh the screen
// console.log(event)

const likesTag = event.target.parentElement.querySelector("p")

const likesInt = parseInt(likesTag.innerText)
const newLikes = likesInt + 1
// const likesHTMLFormat = newLikes + " Likes"

// event.target.parentElement.querySelector("p").innerText = `${newLikes} likes`
event.target.previousElementSibling.innerText = `${newLikes} likes`

likesPatchFetch(newLikes)
debugger

}



listenForLikeClick()





function likesPatchFetch(newLikes) {
  
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    };

    fetch(`http://localhost:3000/toys/1`, options)
      .then((response) => response.json())
      .then((toy) => {
        console.log("success")
      });
}


















