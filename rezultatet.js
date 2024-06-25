// Function to print high scores
function printHighscores() {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Sort highscores by score in descending order
    highscores.sort((a, b) => b.score - a.score);

    // Display each high score in an ordered list
    let olEl = document.getElementById("highscores");
    highscores.forEach((score) => {
        let liTag = document.createElement("li");
        liTag.textContent = `${score.name} - ${score.score}`;
        olEl.appendChild(liTag);
    });
}

// Function to clear high scores
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

// Assign the clear function to the clear button
document.getElementById("clear").onclick = clearHighscores;

// Call the function to print high scores on page load
printHighscores();
