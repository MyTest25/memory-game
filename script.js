const symbols = [
  'https://i.postimg.cc/JtVKc6L6/Almond-With-Dried-Cranberry-140g-1.png',
  'https://i.postimg.cc/NG9cDKtm/Honey-Roasted-Cashew-Nuts-Mixed-Macadamias-140g.png',
  'https://i.postimg.cc/XNR0znNh/Honey-Sunflower-Seeds-110g.png',
  'https://i.postimg.cc/xTLSrBcd/Salted-Sunflower-Seeds-110g.png'
];

let cards = [...symbols, ...symbols];
cards = shuffle(cards);

const gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let lockBoard = false;
let hasPlayed = false;

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
  if (lockBoard || card.classList.contains('flipped') || hasPlayed) return;

  card.classList.add('flipped');
  card.querySelector('img').style.display = 'block';
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    hasPlayed = true;
    setTimeout(checkForMatch, 800);
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    showPopup(card1.dataset.symbol);
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.querySelector('img').style.display = 'none';
    card2.querySelector('img').style.display = 'none';
    alert('❌ Not a match! Try again next time.');
  }

  flippedCards = [];
  lockBoard = false;
}

function showPopup(matchedSymbol) {
  const popup = document.createElement('div');
  popup.classList.add('popup');

  const heading = document.createElement('h2');
  heading.textContent = '🎉 You found a match!';
  popup.appendChild(heading);

  const img = document.createElement('img');
  img.src = matchedSymbol;
  img.style.width = '120px';
  img.style.border = '4px solid green';
  img.style.borderRadius = '8px';
  popup.appendChild(img);

  const button = document.createElement('button');
  button.textContent = 'Play Again';
  button.className = 'play-again';
  button.addEventListener('click', () => window.location.reload());
  popup.appendChild(button);

  document.body.appendChild(popup);
}
