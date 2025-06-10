const symbols = [
  'https://i.postimg.cc/JtVKc6L6/Almond-With-Dried-Cranberry-140g-1.png',
  'https://i.postimg.cc/NG9cDKtm/Honey-Roasted-Cashew-Nuts-Mixed-Macadamias-140g.png',
  'https://i.postimg.cc/XNR0znNh/Honey-Sunflower-Seeds-110g.png',
  'https://i.postimg.cc/xTLSrBcd/Salted-Sunflower-Seeds-110g.png'
];

let cards = [...symbols, ...symbols];
cards = shuffle(cards);

const gameBoard = document.getElementById('gameBoard');
const attemptCountElem = document.getElementById('attemptCount');
const resultContainer = document.getElementById('resultContainer');

let flippedCards = [];
let matchedSymbols = [];
let lockBoard = false;
let attempts = 0;
let matches = 0;
const maxAttempts = 3;

// Load previous result if any
window.onload = function () {
  const savedMatches = JSON.parse(localStorage.getItem('matchedProducts'));
  if (savedMatches && savedMatches.length > 0) {
    showMatchedItems(savedMatches, true);
  }
};

// Create cards
cards.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;

  const img = document.createElement('img');
  img.src = symbol;
  img.classList.add('card-img');
  img.style.display = 'none';

  card.appendChild(img);
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

// Shuffle array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function flipCard(e) {
  const card = e.currentTarget;
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.querySelector('img').style.display = 'block';
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkForMatch, 800);
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedSymbols.push(card1.dataset.symbol);
    matches++;
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.querySelector('img').style.display = 'none';
    card2.querySelector('img').style.display = 'none';
  }

  attempts++;
  attemptCountElem.textContent = attempts;
  flippedCards = [];
  lockBoard = false;

  if (attempts === maxAttempts) {
    if (matches === maxAttempts) {
      localStorage.setItem('matchedProducts', JSON.stringify(matchedSymbols));
      showMatchedItems(matchedSymbols);
    } else {
      alert('❌ Game Over! Try again.');
    }
  }
}

function showMatchedItems(matchedArray, fromStorage = false) {
  resultContainer.innerHTML = '';

  const box = document.createElement('div');
  box.className = 'popup';
  box.innerHTML = `<h2>${fromStorage ? '🧠 Previously Matched Items' : '🎉 You matched 3 pairs!'}</h2>`;

  matchedArray.forEach(symbol => {
    const img = document.createElement('img');
    img.src = symbol;
    img.style.width = '100px';
    img.style.margin = '10px';
    box.appendChild(img);
  });

  resultContainer.appendChild(box);
}

function resetGame() {
  localStorage.removeItem('matchedProducts');
  window.location.reload();
}
