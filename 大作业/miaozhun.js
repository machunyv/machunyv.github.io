// 给id为'start-button'的元素添加一个点击事件监听器，当点击该按钮时会调用startTraining函数。
 document.getElementById('start-button').addEventListener('click', startTraining);
// 记录击中目标的次数
let targetsHit = 0;
// 游戏的持续时间为30秒
const gameDuration = 30; 
// 记录游戏的总时间
let timer;
// 记录倒计时的时间
let countdown;
// startTraining的函数作用是开始训练游戏
function startTraining() {
    // 取id为'game-area'的元素，并清空其内容
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
     // 将targetsHit重置为0
    targetsHit = 0;
    // 将id为'time-left'的元素的文本内容设置为游戏持续时间
    document.getElementById('time-left').innerText = gameDuration;
    // 将id为'targets-hit'的元素的文本内容设置为击中目标的次数。
    document.getElementById('targets-hit').innerText = targetsHit;
    // 调用spawnTarget函数生成游戏目标
    spawnTarget();
    // 使用setTimeout函数设置一个定时器timer，在游戏持续时间结束后调用endTraining函数。
    同时使用setInterval函数设置一个定时器countdown，每隔1秒调用updateTimer函数更新倒计时。
    timer = setTimeout(endTraining, gameDuration * 1000);
    countdown = setInterval(updateTimer, 1000);
    // 记录游戏开始的时间
    startTime = Date.now();
}


// spawnTarget函数。作用是生成游戏目标。
function spawnTarget() {
    // 获取id为'game-area'的元素，然后创建一个新的div元素作为游戏目标。
    设置该目标元素的类名为'target'，并随机设置其在游戏区域内的位置
    const gameArea = document.getElementById('game-area');
    const target = document.createElement('div');
    target.className = 'target';
    target.style.top = `${Math.random() * 90}%`;
    target.style.left = `${Math.random() * 90}%`;
    gameArea.appendChild(target);
// 将目标元素添加到游戏区域中。为目标元素添加一个点击事件监听器，当点击目标时，击中目标次数targetsHit加1，
    更新显示击中目标次数的元素的文本内容，移除被点击的目标元素，然后再次调用spawnTarget函数生成新的目标
    target.addEventListener('click', () => {
        targetsHit++;
        document.getElementById('targets-hit').innerText = targetsHit;
        gameArea.removeChild(target);
        spawnTarget();
    });
}
// 更新游戏的倒计时时间
function updateTimer() {
    // 取id为'time-left'的元素，然后将该元素的文本内容解析为整数类型的时间left
    const timeLeftElement = document.getElementById('time-left');
    let timeLeft = parseInt(timeLeftElement.innerText, 10);
    // 如果时间left大于0，则将时间left减1，并更新显示倒计时的元素的文本内容为新的时间left。如果时间left小于等于0，则清除倒计时计时器countdown
    if (timeLeft > 0) {
        timeLeft -= 1;
        timeLeftElement.innerText = timeLeft;
    } else {
        clearInterval(countdown);
    }
}
// 结束训练游戏
function endTraining() {
    // 获取id为'game-area'的元素
    const gameArea = document.getElementById('game-area');
    // 清空其内容
    gameArea.innerHTML = '';
    // 使用clearTimeout函数清除之前设置的游戏持续时间定时器timer
    clearTimeout(timer);
    // 使用clearInterval函数清除倒计时计时器countdown
    clearInterval(countdown);
    // 最后将id为'stats'的元素的文本内容设置为游戏结束的提示，显示击中目标的次数
    document.getElementById('stats').innerText = `Game Over! Targets hit: ${targetsHit}`;
}
