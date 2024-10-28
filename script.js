const cardsArray = [
    { id: 1, emoji: '🐶' }, { id: 1, emoji: '🐶' },
    { id: 2, emoji: '🐱' }, { id: 2, emoji: '🐱' },
    { id: 3, emoji: '🐭' }, { id: 3, emoji: '🐭' },
    { id: 4, emoji: '🐹' }, { id: 4, emoji: '🐹' },
    { id: 5, emoji: '🦊' }, { id: 5, emoji: '🦊' },
    { id: 6, emoji: '🐻' }, { id: 6, emoji: '🐻' },
    { id: 7, emoji: '🐼' }, { id: 7, emoji: '🐼' },
    { id: 8, emoji: '🐨' }, { id: 8, emoji: '🐨' }
  ];
  
  let firstCard = null, secondCard = null, moves = 0, matches = 0;
  let isFlippingAllowed = true;
  let timer, seconds = 0, minutes = 0;
  let timerStarted = false;
  
  const gameBoard = document.getElementById('game-board');
  const movesDisplay = document.getElementById('moves');
  const timerDisplay = document.getElementById('timer');
  const congratsMessage = document.getElementById('congrats-message');
  const newGameBtn = document.getElementById('new-game');
  
  // Shuffle cards
  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }
  
  // Generate cards
  function generateBoard() {
    const shuffledCards = shuffle(cardsArray);
    gameBoard.innerHTML = '';
    shuffledCards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.id = card.id;
      cardElement.innerHTML = `
        <div class="card-inner">
          <div class="card-front">${card.emoji}</div>
          <div class="card-back"></div>
        </div>`;
      cardElement.addEventListener('click', flipCard);
      gameBoard.appendChild(cardElement);
    });
  }
  
  // Flip the card
  function flipCard() {
    if (!isFlippingAllowed || this === firstCard) return;
  
    if (!timerStarted) {
      startTimer();
      timerStarted = true;
    }
  
    this.classList.add('flipped');
    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      isFlippingAllowed = false;
      moves++;
      movesDisplay.textContent = `Moves: ${moves}`;
      checkMatch();
    }
  }
  
  // Check if two cards match
  function checkMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
      matches++;
      resetCards();
      if (matches === cardsArray.length / 2) {
        congratsMessage.classList.remove('hidden');
        clearInterval(timer);  // Stop the timer when all pairs are matched
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
      }, 1000);
    }
  }
  
  // Reset selected cards
  function resetCards() {
    firstCard = null;
    secondCard = null;
    isFlippingAllowed = true;
  }
  
  // Start timer
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      timerDisplay.textContent = `Time: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
  }
  
  // Start a new game
  function newGame() {
    firstCard = null;
    secondCard = null;
    moves = 0;
    matches = 0;
    seconds = 0;
    minutes = 0;
    timerStarted = false;  // Reset the timer flag
    clearInterval(timer);
    congratsMessage.classList.add('hidden');
    movesDisplay.textContent = 'Moves: 0';
    timerDisplay.textContent = 'Time: 00:00';
    generateBoard();
  }
  
  newGameBtn.addEventListener('click', newGame);
  
  window.onload = newGame;
  