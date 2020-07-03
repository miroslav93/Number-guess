// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener("click", function(){
    let guess = parseInt(guessInput.value);
    
    // Validation
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === winningNum){
        // Game won scenario
        gameOver(true, `${winningNum} is correct. You won!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game lost scenario
            gameOver(false, `Game over! You lost. The winning number was ${winningNum}`);
            // Disable input
            guessInput.disabled = true;
            // Change border color
            guessInput.style.borderColor = 'red';
            // Set message
            setMessage(`Game over! You lost. The winning number was ${winningNum}`, 'red');
        } else {
            // Game continues - answer wrong
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red');
            guessInput.style.borderColor = 'red';
        }
    }
});

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set message
    setMessage(msg); 

    // Play again button
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}