const gameBoard = document.querySelector(".game-board");
const timerDisplay  = document.querySelector("#timer");
const scoreDislay  = document.querySelector("#score");
const button = document.querySelector('button');

let cards=[];
let flippedcards=[];
let score=0;


let cardData = [
    {id:1 , img:'msd.jpg'},
    {id:2 , img:'virat.jpg'},
    {id:3 , img:'ro.jpg'},
    {id:4 , img:'sachin.jpg'},
    {id:5 , img:'hp.jpg'},
    {id:6 , img:'jb.jpg'},
    {id:7 , img:'G.jpg'},
    {id:8 , img:'Sv.jpg'},
]


function startGame(){
button.disabled=true;
shuffleCards();
createCards();
timer();
}


function shuffleCards(){
    cards = [...cardData,...cardData].sort(()=>Math.random()-0.5);
}

function createCards(){
    gameBoard.innerHTML='';
    cards.forEach(card=>{
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id=card.id;

        const imgElement = document.createElement('img');
        imgElement.src = 'card-back.png'; // Path to the common image
        // Add a class for common image
        cardElement.appendChild(imgElement); // Append the common image element to the card
        imgElement.classList.add('common-img'); 

        // Create a hidden image element for each card
        const hiddenImgElement = document.createElement('img');
        hiddenImgElement.src = card.img; // Path to the respective image
        hiddenImgElement.classList.add('hidden-img'); // Add a class for hidden image
        cardElement.appendChild(hiddenImgElement); // Append the hidden image element to the card

        cardElement.addEventListener("click",flipCard);
        gameBoard.appendChild(cardElement);
    })
}

function flipCard(){
    if(flippedcards.length < 2 && !flippedcards.includes(this)){
        this.classList.add('flipped');
        const img = this.querySelector('.hidden-img'); 
        img.classList.add('flipped'); // Add class to display the hidden image
        flippedcards.push(this);
        if(flippedcards.length == 2){
            checkMatch();
        }
    }
}


function checkMatch() {
    const card1 = flippedcards[0];
    const card2 = flippedcards[1];
    console.log(card1.dataset.id + " "+ card2.dataset.id);
    if (card1.dataset.id === card2.dataset.id) {
        score += 10;
        scoreDislay.textContent = score;
        flippedcards = [];
        if (score === cards.length * 5) {
            alert("Congratulations!! You won the game!!");
        }
    }  else {
        setTimeout(() => {
            flippedcards.forEach(card => {
                card.classList.remove('flipped')
                const img = card.querySelector('img'); 
                img.classList.remove('flipped');
        });  
            flippedcards = [];
        }, 1000); 
    }
}
