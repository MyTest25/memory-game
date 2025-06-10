const symbols = [
  'https://i.postimg.cc/JtVKc6L6/Almond-With-Dried-Cranberry-140g-1.png',
  'https://i.postimg.cc/NG9cDKtm/Honey-Roasted-Cashew-Nuts-Mixed-Macadamias-140g.png',
  'https://i.postimg.cc/XNR0znNh/Honey-Sunflower-Seeds-110g.png',
  'https://i.postimg.cc/xTLSrBcd/Salted-Sunflower-Seeds-110g.png'
];

let cards = [...symbols, ...symbols];
cards = shuffle(cards);

const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
let flippedCards = [];
let matchedSymbols = [];
let lockBoard = false;
let attempts = 0;
const maxAttempts = 3;
let gameEnded = false;

statusDisplay.textContent = `Chances Left: ${maxAttempts - attempts}`;

// Create card elements
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

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function flipCard(e) {
  if (gameEnded) return;

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
    showMatchedPopup(card1.dataset.symbol);
    endGame();
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.querySelector('img').style.display = 'none';
    card2.querySelector('img').style.display = 'none';

    attempts++;
    statusDisplay.textContent = `Chances Left: ${maxAttempts - attempts}`;

    if (attempts >= maxAttempts) {
      alert('❌ Game Over! No matches found.');
      endGame();
    }
  }

  flippedCards = [];
  lockBoard = false;
}

function showMatchedPopup(symbol) {
  const overlay = document.createElement('div');
  overlay.className = 'popup';

  const title = document.createElement('h2');
  title.textContent = '🎉 You matched this product!';
  overlay.appendChild(title);

  const img = document.createElement('img');
  img.src = symbol;
  img.style.width = '150px';
  img.style.margin = '10px';
  overlay.appendChild(img);

  document.body.appendChild(overlay);
}

function endGame() {
  gameEnded = true;
}
