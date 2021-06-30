var bigCube = document.querySelector('#bigcube');
var thinking = document.querySelector('#thinking');
var root = document.querySelector(':root');
var score = document.querySelector('#score');
var countDownBox = document.querySelector('#countdown-box');
var pauseResume = document.querySelector('#pause-resume');
var lightColorCube  //宣告帶有透明度變化的方塊的名字
var cubeCount = 2;  //方塊數量及方塊尺寸的變數
var round = 1;      //關卡次數的變數
var scoreValue = 0; //分數數值的變數
var control = 0;    //控制時間暫停恢復按鈕的變數
var time = 60;      //時間(秒)

//控制時間暫停恢復按鈕開關的機制
countDownBox.innerHTML = time;
document.querySelector('#checkbox').addEventListener('click', function () {
    countDown();
    pauseResume.addEventListener('click', function () {
        if (control == 0) {
            control = 1;
            pauseResume.innerHTML = 'RESUME';
            bigCube.style.display = 'none';
            thinking.style.display = 'block';
        }
        else {
            control = 0;
            clearTimeout(cleanCountDown);
            countDown();
            pauseResume.innerHTML = 'PAUSE';
            thinking.style.display = 'none';
            bigCube.style.display = 'flex';
        };
    });
});

//

clickEventSop(cubeCount);

// 產生1-199之間隨機的一個數字
function colorChange() {
    return Math.floor(Math.random() * 200)
};

//在bigCube中產生指定數量的方塊並渲染隨機顏色
function cubeCreat(cubeCount) {
    bigCube.innerHTML = '';
    var colorArray = [colorChange(), colorChange(), colorChange()];
    for (i = 1; i <= cubeCount ** 2; i++) {
        bigCube.innerHTML += `<div class="cube" style="background-color:rgb( ${colorArray[0]} , ${colorArray[1]} , ${colorArray[2]} );width:calc(100% / ${cubeCount});height:calc(100% / ${cubeCount});"></div>`;
    }
};


//連結到css中的:root來使指定的css變成變數並改變其屬性
function CSSChange(scoreValue) {
    root.style.setProperty('--scoreValue', scoreValue);
};

//產生與方塊同樣數目的隨機數字，並將那塊方塊新增class名lightcolor，來達到改變方塊透明度
function opacityRandom(cubeCount) {
    var random = Math.floor(Math.random() * cubeCount ** 2) + 1;
    document.querySelector(`.cube:nth-child(${random})`).classList.add('lightcolor');
};

//輸出得分 => 執行產生方塊的函式 => 執行改變方塊透明度的函式 => 指定隨機方塊新增class名(改變透明度) => 判斷關卡次數 => 點擊正確方塊再次執行此函式
function clickEventSop(cubeCount) {
    score.innerHTML = `得分：${scoreValue++}`;
    cubeCreat(cubeCount);
    CSSChange(scoreValue);
    opacityRandom(cubeCount);
    if (cubeCount <= 8 && round >= cubeCount) {
        cubeCount++;
        round = 1;
    } else {
        round++;
    };
    lightColorCube = document.querySelector('.lightcolor');
    lightColorCube.addEventListener('click', function () {
        clickEventSop(cubeCount);
    });
};

//倒數計時器機制
function countDown() {
    if (control == 0 && time > 0) {
        time = time - 1;
        countDownBox.innerHTML = time;
        cleanCountDown = setTimeout(function () {
            countDown();
        }, 1000);
    } else if (time == 0) {
        alert(`時間到，恭喜您獲得${scoreValue = scoreValue - 1}分`)
        window.location.reload();
    }
};
