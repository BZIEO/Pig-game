"use strict";

// Selecting elements

// total score

const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");

// current score during game
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const playerActive = document.querySelector(".player--active");
const playerUnActive = document.querySelector(".player--unactive");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const player = document.querySelector(".player");

let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

// starting conditions
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score1EL.textContent = 0;
  score0EL.textContent = 0;
  diceEL.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  activePlayer === 0 ? activePlayer++ : activePlayer--;
};

// rolling dice functionality
btnRoll.addEventListener("click", function () {
  //1. Generate a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    //3. Check for a roll 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// holding functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to the score of the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if players score >=100
    //Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEL.classList.add("hidden");
    } else {
      switchPlayer();
    }
    //Switch to the next player
  }
});

btnNew.addEventListener("click", init);
