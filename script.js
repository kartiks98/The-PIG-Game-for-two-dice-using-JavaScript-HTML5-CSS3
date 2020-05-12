var scores, localStore, turn, isPlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(isPlaying) {
        var ran1 = Math.floor(Math.random()*6)+1;
        var ran2 = Math.floor(Math.random()*6)+1;

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + ran1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + ran2 + '.png';

        if (ran1 !== 1 && ran2 !== 1) {
            localStore += ran1 + ran2;
            document.querySelector('#current-' + turn).textContent = localStore;
        } else {
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isPlaying) {
        scores[turn] += localStore;

        document.querySelector('#score-' + turn).textContent = scores[turn];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        if (scores[turn] >= winningScore) {
            document.querySelector('#name-' + turn).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + turn + '-panel').classList.add('winner');
            document.querySelector('.player-' + turn + '-panel').classList.remove('active');
            isPlaying = false;
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
    turn === 0 ? turn = 1 : turn = 0;
    localStore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0]
    turn = 0;
    localStore = 0;
    isPlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}