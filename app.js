// Generate a random number between 1 and 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Function to check the player's guess
function checkGuess() {
    // Get the player's guess from the input field
    let playerGuess = parseInt(document.getElementById("guessInput").value);
    let feedbackElement = document.getElementById("feedback");
    let attemptsElement = document.getElementById("attempts");
    
    attempts++;  // Increment attempts

    // Check if the guess is valid
    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100) {
        feedbackElement.textContent = "Please enter a number between 1 and 100.";
        feedbackElement.style.color = "red";
    } else {
        // Check if the guess is correct
        if (playerGuess === secretNumber) {
            feedbackElement.textContent = "Congratulations! You guessed the number!";
            feedbackElement.style.color = "green";
        } else if (playerGuess < secretNumber) {
            feedbackElement.textContent = "Too low! Try again.";
            feedbackElement.style.color = "orange";
        } else {
            feedbackElement.textContent = "Too high! Try again.";
            feedbackElement.style.color = "orange";
        }
    }

    // Update attempts count
    attemptsElement.textContent = attempts;

    // Clear the input field after each guess
    document.getElementById("guessInput").value = "";
}
