const audioStart = new Audio("./audio/start.mp3");
const audioEat1 = new Audio("./audio/eat1.mp3");
const audioEat2 = new Audio("./audio/eat2.mp3");
const audioEat = new Audio("./audio/eat.mp3");
audioEat.volume = 0.7;
const audioDead = new Audio("./audio/death.mp3");
const audioEatFruit = new Audio("./audio/eatfruit.mp3");

audioEat1.playbackRate = 1;
audioEat2.playbackRate = 1;

var pacmanI = 0; //index i of array; row location of pacman; up down
var pacmanJ = 0; //index j of array; column location of pacman; left right
var direction = "right";
var showCircle = false;
var score = 0;
var noOfLives = 3;
var pattern1 = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //2 for bricks
    [2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 2],
    [2, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 2], //1 for coins
    [2, 0, 1, 2, 2, 2, 1, 0, 1, 2, 2, 2, 1, 1, 0, 1, 2, 2, 2, 1, 1, 0, 1, 2, 2, 2, 1, 0, 2],
    [2, 0, 1, 1, 2, 1, 1, 0, 1, 2, 0, 0, 2, 1, 0, 1, 2, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 0, 2],
    [2, 0, 1, 1, 2, 1, 1, 0, 1, 2, 2, 2, 1, 1, 0, 1, 2, 2, 2, 1, 1, 0, 1, 1, 2, 1, 1, 0, 2],
    [2, 0, 1, 1, 2, 1, 1, 0, 1, 2, 0, 0, 2, 1, 0, 1, 2, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 0, 2],
    [2, 0, 1, 2, 2, 2, 1, 0, 1, 2, 2, 2, 1, 1, 0, 1, 2, 2, 2, 1, 1, 0, 1, 1, 2, 1, 1, 0, 2],
    [2, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
var pattern2 = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //2 for bricks
    [2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2], //1 for coins
    [2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2],
    [2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2],
    [2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2],
    [2, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
var pattern3 = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //2 for bricks
    [2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2], //1 for coins
    [2, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 5, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 5, 1, 1, 1, 1, 1, 1, 1, 5, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
var pattern4 = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //2 for bricks
    [2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 5, 2],
    [2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2], //1 for coins
    [2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 0, 0, 2, 1, 1, 2, 0, 0, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 2, 0, 0, 2, 1, 1, 2, 0, 0, 2, 1, 1, 1, 1, 2, 2],
    [2, 1, 1, 1, 1, 2, 2, 5, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 0, 0, 2, 1, 1, 2, 0, 0, 2, 1, 1, 1, 1, 2, 2],
    [2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 0, 0, 2, 1, 1, 2, 0, 0, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2],
    [2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
var pattern5 = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //2 for bricks
    [2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2], //1 for coins
    [2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 5, 2, 1, 1, 1, 1, 2, 5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 5, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 5, 1, 1, 2],
    [2, 1, 1, 2, 5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 5, 2, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
};
var patterns = [pattern1, pattern2, pattern3, pattern4, pattern5];
pattern = patterns.sample();
var world = pattern;
function displayScoreAndLife() {
    var scoreContainer = document.getElementById("score-container");
    if (!(scoreContainer === null || scoreContainer === undefined)) {
        document.body.removeChild(scoreContainer);
    }
    var scoreContainer = document.createElement("div");
    scoreContainer.id = "score-container";
    scoreContainer.className = "score-container";
    document.body.appendChild(scoreContainer);
    var scoreText = "Score ";
    var lives = document.createElement("div");
    lives.className = "lives";
    lives.id = "lives";
    lives.style.display = "flex";
    lives.style.marginRight = "30px";
    var pacmanLives = document.getElementById("pacman-lives");
    if (!(pacmanLives === null || pacmanLives === undefined)) {
        document.body.removeChild(pacmanLives);
    }
    for (let i = 1; i <= noOfLives; i++) {
        var pacmanLives = document.createElement("div");
        pacmanLives.className = "pacman-lives";
        pacmanLives.id = "pacman-lives";
        pacmanLives.style.backgroundImage = "url('./images/pacman-right.png')";
        pacmanLives.style.backgroundRepeat = "no-repeat";
        pacmanLives.style.backgroundPosition = "center";
        pacmanLives.style.backgroundSize = "contain";
        pacmanLives.style.width = "30px";
        pacmanLives.style.height = "30px";
        lives.appendChild(pacmanLives);
    }
    scoreContainer.append(lives, scoreText, score);
}

function displayTitle() {
    var titleContainer = document.getElementById("title-container");
    if (!(titleContainer === null || titleContainer === undefined)) {
        document.body.removeChild(titleContainer);
    }

    var titleContainer = document.createElement("div");
    var titleText = "Pacman";
    titleContainer.className = "title-container";
    titleContainer.id = "title-container";
    titleContainer.style.display = "flex";
    titleContainer.style.marginRight = "30px";
    titleContainer.style.marginTop = "30px";
    titleContainer.innerHTML = titleText;
    console.log(titleContainer);
    document.body.appendChild(titleContainer);
}

function playEatingSound() {
    audioEat1.play();
    setTimeout(() => {
        audioEat2.play();
    }, audioEat1.duration * 1000);
}

function displayWorld() {
    displayTitle();
    var container = document.getElementById("world");
    if (!(container === null || container === undefined)) {
        document.body.removeChild(container);
    }
    var container = document.createElement("div");
    container.className = "container";
    container.id = "world";
    document.body.appendChild(container);
    for (var i = 0; i < world.length; i++) {
        var row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] === 2) {
                var bricks = document.createElement("div");
                bricks.className = "bricks";
                row.appendChild(bricks);
            } else if (world[i][j] === 1) {
                var coins = document.createElement("div");
                coins.className = "coins";
                row.appendChild(coins);
            } else if (world[i][j] === 0) {
                var empty = document.createElement("div");
                empty.className = "empty";
                row.appendChild(empty);
            } else if (world[i][j] === 4) {
                var pacman = document.createElement("div");
                pacman.className = "pacman";
                pacman.id = "pacman";
                row.appendChild(pacman);
                pacmanI = i;
                pacmanJ = j;
            } else if (world[i][j] === 5) {
                var cherry = document.createElement("div");
                cherry.className = "cherry";
                cherry.id = "cherry";
                row.appendChild(cherry);
            } else {
                row.appendChild(empty);
            }
        }
    }

    if (showCircle) {
        pacman.style.backgroundImage = "url('./images/pacman-circle.png')";
    } else {
        pacman.style.backgroundImage = "url('./images/pacman-" + direction + ".png')";
    }
    pacman.style.backgroundRepeat = "no-repeat";
    pacman.style.backgroundPosition = "center";
    pacman.style.backgroundSize = "contain";
    pacman.style.width = "30px";
    pacman.style.height = "30px";
    displayScoreAndLife();
}

function displayStart() {
    var startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.className = "start-button";
    startButton.innerHTML = "Start PACMAN";
    startButton.style.fontFamily = 'font-family: "joystick", Arial, sans-serif';
    var buttonContainer = document.createElement("div");
    buttonContainer.appendChild(startButton);
    document.body.appendChild(buttonContainer);

    startButton.addEventListener("click", () => {
        startButton.style.visibility = "hidden";
        startButton.innerHTML = "";
        startButton.style.margin = "0px";
        direction = "right";
        displayWorld();

        var startDuration = audioStart.duration;
        console.log("audioStart: ", audioStart);

        audioStart.play();

        setTimeout(() => {
            console.log("audio ended");
            document.onkeydown = function (e) {
                showCircle = true;
                displayWorld();

                setTimeout(() => {
                    showCircle = false;
                    displayWorld();
                }, 60);

                if (e.key === "ArrowDown") {
                    direction = "down";
                    if (pacmanI < world.length - 2 && world[pacmanI + 1][pacmanJ] !== 2) {
                        if (world[pacmanI + 1][pacmanJ] === 1) {
                            //coin
                            score += 1;
                            audioEat.src = "./audio/eat.mp3";
                            audioEat.play();
                        }
                        if (world[pacmanI + 1][pacmanJ] === 5) {
                            //cherry
                            score += 20;
                            audioEatFruit.play();
                        }
                        world[pacmanI][pacmanJ] = 0; //empty
                        pacmanI += 1;
                        world[pacmanI][pacmanJ] = 4; //pacman
                    }
                } else if (e.key === "ArrowUp") {
                    direction = "up";
                    if (pacmanI > 1 && world[pacmanI - 1][pacmanJ] !== 2) {
                        if (world[pacmanI - 1][pacmanJ] === 1) {
                            //coin
                            score += 1;
                            audioEat.src = "./audio/eat.mp3";
                            audioEat.play();
                        }
                        if (world[pacmanI - 1][pacmanJ] === 5) {
                            //cherry
                            score += 20;
                            audioEatFruit.play();

                        }
                        world[pacmanI][pacmanJ] = 0; //empty
                        pacmanI -= 1;
                        world[pacmanI][pacmanJ] = 4; //pacman
                    }
                } else if (e.key === "ArrowRight") {
                    direction = "right";
                    if (pacmanJ < world[0].length - 2 && world[pacmanI][pacmanJ + 1] !== 2) {
                        if (world[pacmanI][pacmanJ + 1] === 1) {
                            //coin
                            score += 1;
                            audioEat.src = "./audio/eat.mp3";
                            audioEat.play();
                        }
                        if (world[pacmanI][pacmanJ + 1] === 5) {
                            //cherry
                            score += 20;
                            audioEatFruit.play();

                        }
                        world[pacmanI][pacmanJ] = 0; //empty
                        pacmanJ += 1;
                        world[pacmanI][pacmanJ] = 4; //pacman
                    }
                } else if (e.key === "ArrowLeft") {
                    direction = "left";
                    if (pacmanJ > 1 && world[pacmanI][pacmanJ - 1] !== 2) {
                        if (world[pacmanI][pacmanJ - 1] === 1) {
                            //coin
                            score += 1;
                            audioEat.src = "./audio/eat.mp3";
                            audioEat.play();
                        }
                        if (world[pacmanI][pacmanJ - 1] === 5) {
                            //cherry
                            score += 20;
                            audioEatFruit.play();

                        }
                        world[pacmanI][pacmanJ] = 0; //empty
                        pacmanJ -= 1;
                        world[pacmanI][pacmanJ] = 4; //pacman
                    }
                }
                displayWorld();
            };
        }, audioStart.duration * 1000);
    });
}
displayStart();