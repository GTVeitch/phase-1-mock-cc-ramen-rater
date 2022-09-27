const ramenMenu = document.querySelector('#ramen-menu')
const mainName= document.querySelector('.name')
const mainRestaurant = document.querySelector('.restaurant')
const mainRating = document.querySelector('#rating-display')
const mainComment = document.querySelector('#comment-display')
const mainImage = document.querySelector('.detail-image')
const form = document.querySelector('#new-ramen')
let ramenList = []
let currentRamen

fetch('http://localhost:3000/ramens', {
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
.then(response => response.json())
.then(data => {
    navBar(data)
    showSelected(data[0])
    ramenList.push(data)
    }
)


function navBar(ramenData) {
    ramenData.forEach(ramens => {
        let navItem = document.createElement('img');
        navItem.src = ramens.image
        ramenMenu.append(navItem)
        navItem.addEventListener('click', (e) => {
            e.preventDefault()
            showSelected(ramens, e)
            })
        }
    )
}


function showSelected(input) {
    currentRamen = input;
    mainName.textContent = currentRamen.name;
    mainRestaurant.textContent = currentRamen.restaurant;
    mainImage.src = currentRamen.image
    mainRating.textContent = currentRamen.rating;
    mainComment.textContent = currentRamen.comment;

}

function addNewRamen() {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        currentRamen.name = e.target["new-name"].value
        currentRamen.restaurant = e.target["new-restaurant"].value
        currentRamen.image = e.target["new-image"].value
        currentRamen.rating = e.target["new-rating"].value
        currentRamen.comment = e.target["new-comment"].value
        ramenList.push(currentRamen)
        showSelected(currentRamen)
        navBar(ramenList)
        }
    )
}

addNewRamen()