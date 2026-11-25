// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Start the game after validating player name
function startGame() {
  let nameInput = document.getElementById("playerName").value.trim();

  if (nameInput === "") {
    alert("Please enter your name.");
    return;
  }

  gameStarted = true;
  document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
  document.getElementById("startTime").innerHTML = "Started on: " + new Date();
}

// Randomly pick rock, paper, or scissors
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Play a single round and update DOM, score, and history table
function playRound(playerChoice) {
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  let computerChoice = getComputerChoice();
  roundCount++;

  // Update images for both player and computer
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  let outcome = "";
  let resultElement = document.getElementById("result");

  // Determine round winner using if...else
  if (playerChoice === computerChoice) {
    outcome = "Draw";
    draws++;
    document.getElementById("draws").innerHTML = draws;
    resultElement.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
    resultElement.style.color = "grey";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    outcome = "Win";
    wins++;
    document.getElementById("wins").innerHTML = wins;
    resultElement.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
    resultElement.style.color = "green";
  } else {
    outcome = "Lose";
    losses++;
    document.getElementById("losses").innerHTML = losses;
    resultElement.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
    resultElement.style.color = "red";
  }

  // Record result and append a row to the history table
  results.push(outcome);
  document.getElementById("historyBody").innerHTML +=
    "<tr>" +
      "<td>" + roundCount + "</td>" +
      "<td>" + playerChoice + "</td>" +
      "<td>" + computerChoice + "</td>" +
      "<td>" + outcome + "</td>" +
    "</tr>";
}

// Calculate total rounds and rounded win percentage using a for loop
function showSummary() {
  let totalRounds = results.length;
  if (totalRounds === 0) {
    document.getElementById("summary").innerHTML = "No rounds played yet.";
    return;
  }

  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }

  let winPercentage = Math.round((winCount / totalRounds) * 100);
  document.getElementById("summary").innerHTML =
    "You played " + totalRounds + " rounds and won " + winPercentage + "%.";
}

// Reset scores, arrays, table rows, and messages
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  roundCount = 0;
  results = [];

  document.getElementById("wins").innerHTML = "0";
  document.getElementById("losses").innerHTML = "0";
  document.getElementById("draws").innerHTML = "0";
  document.getElementById("historyBody").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
}