
document.getElementById('start-button').addEventListener('click', startTraining);

let targetsHit = 0;
const gameDuration = 30; 
let timer;
let countdown;

function startTraining() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    targetsHit = 0;
    document.getElementById('time-left').innerText = gameDuration;
    document.getElementById('targets-hit').innerText = targetsHit;

    spawnTarget();
    timer = setTimeout(endTraining, gameDuration * 1000);
    countdown = setInterval(updateTimer, 1000);

    startTime = Date.now();
}

function spawnTarget() {
    const gameArea = document.getElementById('game-area');
    const target = document.createElement('div');
    target.className = 'target';
    target.style.top = `${Math.random() * 90}%`;
    target.style.left = `${Math.random() * 90}%`;
    gameArea.appendChild(target);

    target.addEventListener('click', () => {
        targetsHit++;
        document.getElementById('targets-hit').innerText = targetsHit;
        gameArea.removeChild(target);
        spawnTarget();
    });
}

function updateTimer() {
    const timeLeftElement = document.getElementById('time-left');
    let timeLeft = parseInt(timeLeftElement.innerText, 10);
    if (timeLeft > 0) {
        timeLeft -= 1;
        timeLeftElement.innerText = timeLeft;
    } else {
        clearInterval(countdown);
    }
}

function endTraining() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    clearTimeout(timer);
    clearInterval(countdown);
    document.getElementById('stats').innerText = `Game Over! Targets hit: ${targetsHit}`;
}
