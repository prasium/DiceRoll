'use strict';

// Selecting elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const rulesEl = document.querySelector('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
const title = document.getElementById('title');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScoreP0 = document.getElementById('current--0');
const currentScoreP1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playState;

const initializeGame = function () {
  scores = [0, 0]; // 0 for player 0, 1 for player 1
  currentScore = 0;
  activePlayer = 0; // 0 for P1, 1 for P2
  playState = true;

  // Setting initial scores
  score0El.textContent = score1El.textContent = 0;
  currentScoreP0.textContent = currentScoreP1.textContent = 0;
  title.textContent = 'Dice Roll';
  hideDice();

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Function to Hide Dice
const hideDice = () => dice.classList.add('hidden');

//run initialize
initializeGame();

// Switch Player function
const switchPlayer = function () {
  // Setting current score 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Styling active effect
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Function to handle modal for displaying rules
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Rules display
rulesEl.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 1. Generating a random dice roll
btnRoll.addEventListener('click', function () {
  if (playState) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    // 3. Check for rolled 1, if true, switch player
    if (diceNumber === 1) {
      // Switch to next player
      switchPlayer();
    } else {
      // Add dice score to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// Holding the dice
btnHold.addEventListener('click', function () {
  if (playState) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if Player's Score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      hideDice();
      playState = false;
      title.textContent = `Player ${activePlayer === 0 ? '1' : '2'} Wins 🎉🏆`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener('click', initializeGame);
