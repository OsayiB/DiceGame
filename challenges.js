/*
1. A player looses his ENTIRE score when he rolls two 6 in  a row. After that, its the next players turn.
(Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score so that they can change the predefined score of 100
(You can read that value with the .value property in JS. This is a good opportunity to use google to figure it out)
3. Add another dice to the game so that there are two dices now. The player looses his current score when one of them is a 1.
(You will need CSS to position the second dice so take a look at the CSS code for the first one)

*/
var scores, currScore, activePlayer, gamePlaying, lastDice;

init();
document.querySelector('.btn-roll').addEventListener('click',function() {
    
    if(gamePlaying) {
        //Part 3 as described above
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
    //Display the result
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice2').src = 'dice-' + dice2 + '.png';

    if(dice1 !== 1 && dice2 !== 1 ) {
        //add score
        currScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = currScore;

    }
    else {
        nextPlayer();
    }

    //Update the round score only IF the rolled number was NOT a 1
    /*
    //Part 2 as described above 
    if(dice === 6 && lastDice === 6){
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();
    }
    else if(dice !== 1) {
        //add score
        currScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = currScore;

    }
    else {
        nextPlayer();
    }
    */

    //lastDice = dice;
}

    
})
document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
    //Add Current Score to global score
    scores[activePlayer] += currScore;
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winScore;
    if(input){
        winScore = input;
    }
    else{
        winScore = 100;
    }
    //Check if player won the game
    if(scores[activePlayer] >= winScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.getElementById('dice1').style.display = 'none';
        document.getElementById('dice2').style.display = 'none';

        

        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }
    else {
        nextPlayer();
    } 
 }
    
})

function nextPlayer(){
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
    

}

function init() {
    scores = [0,0];
    activePlayer = 0;
    currScore = 0;
    gamePlaying = true;
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

document.querySelector('.btn-new').addEventListener('click', init);