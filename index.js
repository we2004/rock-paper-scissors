const computerChose = ['rock', 'paper', 'scissors'];

const scoreObject = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };
// if the browser does not have data stored it will use the default data that i provided
displayScore();



document.querySelector('#reset').addEventListener('click', resetScore);

for (let i = 0; i <= 2; i++) {
    document.querySelectorAll('button')[i].addEventListener("click", function () {
        const userMove = this.getAttribute('id');
        const computerMove = computerChose[Math.floor(Math.random() * 3)];

        determineOutcome(userMove, computerMove);
    });
}

function determineOutcome(userMove, computerMove) {
    let result;
    if (userMove === computerMove) {
        scoreObject.ties++;
        result = 'it is a tie';

    } else if ((userMove === 'rock' && computerMove === 'scissors') ||
        (userMove === 'scissors' && computerMove === 'paper') ||
        (userMove === 'paper' && computerMove === 'rock')) {
        scoreObject.wins++;
        result = 'you won';

    } else {
        scoreObject.losses++;
        result = 'you lost';
    }
    localStorage.setItem('score', JSON.stringify(scoreObject));
    displayScore();
    displayMoves(userMove, computerMove, result);

    //we converted the object to json 
    //because localStorage only takes strings
}

function displayScore() {
    document.querySelector('.ties').innerHTML = `ties: ${scoreObject.ties}`;
    document.querySelector('.wins').innerHTML = `wins: ${scoreObject.wins}`;
    document.querySelector('.losses').innerHTML = `losses: ${scoreObject.losses}`;
}


function displayMoves(userMove, computerMove, wonOrLost) {
    document.querySelector('.won-lost').innerHTML = wonOrLost;
    userMove = transformToEmoji(userMove);
    computerMove = transformToEmoji(computerMove);
    document.querySelector('.the-players').classList.add('active');
    document.querySelector('.moves').innerHTML = ` ${userMove} ${computerMove} `;


}

function transformToEmoji(move) {
    const emojis = {
        'rock': '✊🏼',
        'paper': '🖐🏼',
        'scissors': '✌🏼'
    };
    return emojis[move];
}

function resetScore() {
    scoreObject.losses = 0;
    scoreObject.wins = 0;
    scoreObject.ties = 0;

    localStorage.removeItem('score');
    //to update the storage after the reset

    displayScore();

}

