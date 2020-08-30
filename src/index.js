
//DOM Selectors?
let addToy = false;
let divCollection = document.querySelector('#toy-collection')
let form = document.querySelector('.add-toy-form')
let likeButton = document.querySelector('#new-toy-button')

// console.log(form)


//event listeners
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

form.addEventListener('submit', (e) => fetchPostToy(e))


//Method calls
fetchGetToys()

//Fetches
function fetchGetToys() {
      
    fetch ('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => toys.forEach(toy => appendToy(toy)))
} 


function fetchPostToy(e) {

    e.preventDefault()

    let newName = e.target.name.value
    let newImage = e.target.image.value

  // ******OPTIMISTIC RENDERING DOM(frontend)*******
    // let div = document.createElement('div')
    // let h2 = document.createElement('h2')
    // let img = document.createElement('img')
    // let p = document.createElement('p')
    // let btn = document.createElement('button')
  
    // div.className = 'card'
    // h2.textContent = newName
    
    // img.src = newImage
    // img.className = 'toy-avatar'
    
    // p.textContent = `0 likes`
  
    // btn.className = 'like-btn'
    // btn.textContent = 'like'
  
    // divCollection.append(div)  
    // div.append(h2, img, p, btn)


    let toyInfo = {
      name: newName,
      image: newImage,
      likes: 0
    }
    
    // this is where we speak to the database(backebend)
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyInfo)
    })
    // ********** PESAMISTIC RENDERING ***********
    // DOM(frontend)
    .then(resp => resp.json())
    .then(toy => {
      appendToy(toy)
    })
}

function likes(e) {
  e.preventDefault()
  let increase = parseInt(e.target.previousElementSibling.innerText) + 1
// debugger


  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": increase
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${increase} likes`;
    }))
}


//Dom Maniuplation
const appendToy = (toy) => {

  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let btn = document.createElement('button')

  div.className = 'card'
  h2.textContent = toy.name
  
  img.src = toy.image
  img.className = 'toy-avatar'
  
  p.textContent = `${toy.likes} likes`

  btn.className = 'like-btn'
  btn.id = toy.id
  btn.textContent = 'like'
  btn.addEventListener('click', (e) => {likes(e)})

  divCollection.append(div)  
  div.append(h2, img, p, btn)
}


