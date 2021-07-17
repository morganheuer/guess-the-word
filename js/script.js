const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

// create a global variable with an empty array which will contain all the letters the player guesses
const guessedLetters = [];

// Display dot placeholders for the chosen word's letters - for every letter push ● to the placeholderLetters array
const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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

// Check if the player won
const checkIfWin = function() {
    // verify if the word in progress matches the word they are guessing
    if (word.toUpperCase() === wordInProgress.innerText) {
        // if so, add the win class to empty paragraph and a message to crogratulate them
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};