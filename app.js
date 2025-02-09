document.addEventListener("DOMContentLoaded", () => {
    let min = 1, max = 100, attempts = 0, bestScore = localStorage.getItem("bestScore") || "-";
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let timerInterval, timeElapsed = 0;
    let timerStarted = false;

    document.getElementById("bestScore").innerText = bestScore;

    document.getElementById("difficulty").addEventListener("change", function() {
        const difficulty = this.value;
        if (difficulty === "easy") { min = 1; max = 50; }
        else if (difficulty === "hard") { min = 1; max = 200; }
        else { min = 1; max = 100; }
        document.getElementById("range").innerText = `${min}-${max}`;
        resetGame();
    });

    document.getElementById("checkGuess").addEventListener("click", () => {
        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }

        const userGuess = parseInt(document.getElementById("guessInput").value);
        const message = document.getElementById("message");
        if (isNaN(userGuess) || userGuess < min || userGuess > max) {
            message.innerText = `Enter a valid number between ${min} and ${max}`;
            message.style.color = "red";
            return;
        }
        attempts++;
        document.getElementById("score").innerText = `Attempts: ${attempts} | Best Score: ${bestScore} | Time: ${timeElapsed}s`;
        
        if (userGuess === randomNumber) {
            message.innerText = "Correct! You win!";
            message.style.color = "green";
            clearInterval(timerInterval);
            if (bestScore === "-" || attempts < bestScore) {
                bestScore = attempts;
                localStorage.setItem("bestScore", bestScore);
                document.getElementById("bestScore").innerText = bestScore;
            }
        } else {
            message.innerText = userGuess > randomNumber ? "Too high!" : "Too low!";
            message.style.color = userGuess > randomNumber ? "orange" : "blue";
        }
    });

    document.getElementById("resetGame").addEventListener("click", resetGame);

    function resetGame() {
        attempts = 0;
        timeElapsed = 0;
        clearInterval(timerInterval);
        timerStarted = false;
        document.getElementById("score").innerText = `Attempts: 0 | Best Score: ${bestScore} | Time: 0s`;
        document.getElementById("message").innerText = "";
        document.getElementById("guessInput").value = "";
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeElapsed++;
            document.getElementById("score").innerText = `Attempts: ${attempts} | Best Score: ${bestScore} | Time: ${timeElapsed}s`;
        }, 1000);
    }

    document.getElementById("toggleTheme").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
