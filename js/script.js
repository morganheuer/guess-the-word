const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";

// create a global variable with an empty array which will contain all the letters the player guesses
let guessedLetters = [];

let remainingGuesses = 8;

// Async function to fetch random word
const getWord = async function() {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex =  Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    remainingGuesses = word.length + 3;
    placeholder(word);
    console.log(remainingGuesses);
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
};

// Fire off the game
getWord();


// Display dot placeholders for the chosen word's letters - for every letter push ● to the placeholderLetters array
const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// Guess Button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    // empty the text of the message element
    message.innerText = "";
    const guess = letterInput.value;
    // check the guess to validate that it is an acceptable one
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
}
);

// Check player's input
const validateInput = function(input){
    // create variable for accepted letter sequence
    const acceptedLetter = /[a-zA-Z]/;
    // check for different guess scenarios, only allowing for a player to guess a single letter
    if (input.length === 0) {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Enter one letter at a time";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    // if all other conditions aren't met, the input is a letter and an acceptable guess
    } else {
        return input;
    }
};

// Capture player's input/guess
const makeGuess = function(guess) {
    // convert all letters guessed to uppercase
    guess = guess.toUpperCase();
    // if the player already guessed the same letter, inform them they've already guessed that letter
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter";
    // if they haven't guessed that letter before, add the letter to the guessedLetters array
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

// Show guessed letters
const showGuessedLetters = function() {
    // empty innerHTML of guessedLettersElement ul
    guessedLettersElement.innerHTML = "";
    // create a new li for each letter inside guessedLetters array and add it to the guessedLettersElement ul
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Update word in progress
const updateWordInProgress = function(guessedLetters) {
    // change word variable to uppercase
    const wordUpper = word.toUpperCase();
    // split word variable from a string to an array so that the letter can appear in the guessedLetters array
    const wordArray = wordUpper.split("");
    // create a new array with the updated characters
    const revealWord = [];
    // loop through all the letters in the wordArray to check if any of them match any of the letters in the guessedLetters array
    for (const letter of wordArray) {
        // if the word contains a letter that has been guessed, update the circle symbol with the correct letter
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    // update the empty paragraph where the word in progress will appear
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

// Count guesses remaining
const updateGuessesRemaining = function(guess) {
    // grab the word to make it uppercase to compare the guessed letters
    const upperWord = word.toUpperCase();
    // if the word does not include the letter from guess, let the player know and subtract 1 from remaining guesses
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    // update the message to tell the player how many guesses they have left and if they lose
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// Check if the player won
const checkIfWin = function() {
    // verify if the word in progress matches the word they are guessing
    if (word.toUpperCase() === wordInProgress.innerText) {
        // if so, add the win class to empty paragraph and a message to crogratulate them
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

// Hide and show elements when the game is over
const startOver = function() {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};


playAgainButton.addEventListener("click", function() {
    getWord();

    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = word.length += 3;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";


    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});