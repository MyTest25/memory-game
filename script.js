const symbols = [
  'https://i.postimg.cc/RCdRjvjQ/Almond-With-Dried-Cranberry-140g.png',
  'https://i.postimg.cc/NG9cDKtm/Honey-Roasted-Cashew-Nuts-Mixed-Macadamias-140g.png',
  'https://i.postimg.cc/XNR0znNh/Honey-Sunflower-Seeds-110g.png',
  'https://i.postimg.cc/xTLSrBcd/Salted-Sunflower-Seeds-110g.png'
];

let cards = [...symbols, ...symbols];
cards = shuffle(cards);

const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('statusText');
let flippedCards = [];
let matched = false;
let attempts = 0;
const maxAttempts = 3;
let lockBoard = false;

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

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function flipCard(e) {
  const card = e.currentTarget;
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched') || matched) return;

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
    matched = true;
    card1.classList.add('matched');
    card2.classList.add('matched');

    highlightMatch(card1.dataset.symbol);
    alert('🎉 You found a matching pair!');
    return;
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.querySelector('img').style.display = 'none';
    card2.querySelector('img').style.display = 'none';
  }

  flippedCards = [];
  lockBoard = false;
  attempts++;
  updateStatus();

  if (attempts >= maxAttempts && !matched) {
    alert('❌ Game Over! You used all 3 attempts.');
    lockBoard = true;
  }
}

function updateStatus() {
  statusText.textContent = `Attempts used: ${attempts} / ${maxAttempts}`;
}

function highlightMatch(symbol) {
  const resultArea = document.createElement('div');
  resultArea.innerHTML = '<h2 style="color:green;">🎯 Matching Product:</h2>';

  const img = document.createElement('img');
  img.src = symbol;
  img.style.width = '150px';
  img.style.border = '4px solid gold';
  img.style.padding = '10px';
  img.style.borderRadius = '12px';
  resultArea.appendChild(img);

  document.body.appendChild(resultArea);
  lockBoard = true;
}
