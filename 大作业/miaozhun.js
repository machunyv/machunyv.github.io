// 'start-button'的元素添加了一个点击事件监听器，当按钮被点击时会调用一个名为startTraining的函数。


document.getElementById('start-button').addEventListener('click', startTraining);
// 记录击中目标的次数
let targetsHit = 0;
// 游戏持续的时间
const gameDuration = 30; 
// 来计时的变量
let timer;
let countdown;

function startTraining() {
// 为'game-area'的元素，并将其内容清空
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    // targetsHit（目标击中次数）重置为0
    targetsHit = 0;
    // 设置为游戏持续时间gameDuration
    document.getElementById('time-left').innerText = gameDuration;
    // 将页面中id为'targets-hit'的元素的文本内容设置为目标击中次数targetsHit
    document.getElementById('targets-hit').innerText = targetsHit;
    // 调用spawnTarget函数，生成游戏目标
    spawnTarget();
    // 使用setTimeout函数设置一个定时器timer，在游戏持续时间结束后调用endTraining函数
    timer = setTimeout(endTraining, gameDuration * 1000);
    // 使用setInterval函数设置一个定时器countdown，每隔1秒调用updateTimer函数更新计时器。
    countdown = setInterval(updateTimer, 1000);
// 记录游戏开始时间startTime为当前时间
    startTime = Date.now();
}

function spawnTarget() {
    // 获取页面中id为'game-area'的元素
    const gameArea = document.getElementById('game-area');
// 创建一个新的div元素作为游戏目标。
    const target = document.createElement('div');
// 给目标元素添加一个名为'target'的类名
    target.className = 'target';
    // 设置目标元素的位置，使其随机出现在游戏区域内的任意位置
    target.style.top = `${Math.random() * 90}%`;
    target.style.left = `${Math.random() * 90}%`;
    // 将目标元素添加到游戏区域中
    gameArea.appendChild(target);
    // 当目标元素被点击时，目标击中次数targetsHit加1
    target.addEventListener('click', () => {
        targetsHit++;
        // 新页面中id为'targets-hit'的元素的文本内容为新的目标击中次数
        document.getElementById('targets-hit').innerText = targetsHit;
        // 从游戏区域中移除被点击的目标元素
        gameArea.removeChild(target);
        // 调用spawnTarget函数生成新的目标元素
        spawnTarget();
    });
}

function updateTimer() {
    // 取页面中id为'time-left'的元素
    const timeLeftElement = document.getElementById('time-left');
    // 将该元素中的文本内容解析为整数类型的时间剩余值
    let timeLeft = parseInt(timeLeftElement.innerText, 10);
    // 如果剩余时间大于0，则将剩余时间减1，并更新页面中id为'time-left'的元素的文本内容为新的剩余时间。
    if (timeLeft > 0) {
        timeLeft -= 1;
        timeLeftElement.innerText = timeLeft;
        // 果剩余时间小于等于0，则清除计时器countdown。
    } else {
        clearInterval(countdown);
    }
}

function endTraining() {
    // 页面中id为'game-area'的元素，并将其内容清空
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    // 页面中id为'game-area'的元素，并将其内容清空
    clearTimeout(timer);
    // 清除之前设置的计时器countdown。
    clearInterval(countdown);
    // 将页面中id为'stats'的元素的文本内容设置为游戏结束的提示，包括击中目标的次数
    document.getElementById('stats').innerText = `Game Over! Targets hit: ${targetsHit}`;
}
