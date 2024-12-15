const board = document.getElementById('game-board'); //uzima ih po idu
let cards = [];
let flippedCards = [];
let matchedCards = [];
let time = 0;
let timer;

// fja generise karte
function generateBoard() {
    const images = [
        'images/plane1.jpg', 'images/plane.webp', 'images/plane3.jpg', 'images/plane4.jpg', 'images/plane5.jpg', 'images/plane6.jpg',
        'images/plane1.jpg', 'images/plane.webp', 'images/plane3.jpg', 'images/plane4.jpg', 'images/plane5.jpg', 'images/plane6.jpg'
    ]; //ponavljaju se jer to je poenta igre
    
    cards = images.map((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-4');  // bootstrap klasa za 3 kolone u svakom redu
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);

        card.addEventListener('click', () => flipCard(card));
        return card;
    });

    shuffle(cards);
    cards.forEach(card => board.appendChild(card));
}

//fja za okretanje karte
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// fja da provjeri jesu li jednake
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];

    if (matchedCards.length === cards.length) {
        clearInterval(timer);
        alert('Pobijedio si!');
    }
}


function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}


function startNewGame() {
    clearInterval(timer);
    time = 0;
    document.getElementById('time').textContent = `Vrijeme: 0s`;
    board.innerHTML = '';
    generateBoard();
    startTimer();
}


function startTimer() {
    timer = setInterval(() => {
        time++;
        document.getElementById('time').textContent = `Vrijeme: ${time}s`;
    }, 1000);
}


startNewGame();
