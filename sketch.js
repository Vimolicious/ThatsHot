let game;

let started;
let paused;
let lost;
let rewinding;

var birdImg;
var backImg;
var birdImgTwo;
let backgroundImg;

let backgroundX = -10;
let backgroundY = -10;

let back

var THATSHOT, REWIND, LOOKGOOD;
var SOUNDS;

var BOPS, SELECTED_BOP;

let font;

let startButton, restartButton, pauseButton;
let startCount;

const WIDTH = Math.floor(Math.max(375, window.innerWidth)),
    HEIGHT = Math.floor(window.innerHeight);

function preload() {
    birdImg = loadImage('assets/img/face.png');
    backImg = loadImage('assets/img/back.png');
    backgroundImg = loadImage('assets/img/background.png');

    windowWidth = WIDTH;

    THATSHOT = loadSound('assets/audio/ThatsHot.mp3');
    REWIND = loadSound('assets/audio/RewindTime.mp3');
    LOOKGOOD = loadSound('assets/audio/good.mp3');
    SOUNDS = [loadSound('assets/audio/Fortnite.mp3'), loadSound('assets/audio/AAAH.mp3'),
    loadSound('assets/audio/MarkA.mp3'), loadSound('assets/audio/Ya.mp3'), loadSound('assets/audio/XP.mp3')]

    BOPS = [loadSound('assets/audio/PC.mp3'), loadSound('assets/audio/Meg.mp3')]

    font = loadFont('assets/fonts/PressStart2P-Regular.ttf');
}

function setup() {
    var c = createCanvas(windowWidth, windowHeight);
    c.parent('game-container');

    game = new Game();

    textAlign(CENTER, CENTER);
    textSize(40);
    textFont(font);

    paused = false;
    lost = false;
    started = false;
    rewinding = false;

    startCount = 180;

    startButton = new Button(WIDTH / 2, HEIGHT / 2, 150, 50, 'START', 20, color(175, 203, 146), color(200, 223, 166))
    restartButton = new Button(WIDTH / 2, HEIGHT * 7 / 8, 150, 50, '\u25C0\u25C0', 20, color(233, 51, 35), color(255, 73, 57));
    pauseButton = new Button(30, 30, 25, 25, '||', 10, color(233, 51, 35), color(255, 73, 57))

    selectBop();
}

function draw() {


    if (!started) {
        background(0);
        startButton.show();
        startButton.update();

        if (startButton.actuated) {
            started = true;
            LOOKGOOD.play();
        }
    } else {
        if (!lost)
            image(backgroundImg, backgroundX, backgroundY, WIDTH + 20, HEIGHT + 20);
        else
            image(backImg, 0, 0, WIDTH, HEIGHT);




        if (rewinding) {
            game.show();
            rewinding = game.rewind();
        } else if (startCount > 0) {
            startCount--;
            game.show();
            textSize(100);
            fill(255);
            text(floor(startCount / 60) + 1, WIDTH / 2, HEIGHT / 2);

        } else {
            if (!lost) {

                if (pauseButton.actuated) {
                    pause();
                }

                if (!paused) {
                    game.update();
                    game.show();

                    if (startCount === 0 && !SELECTED_BOP.isPlaying()) {
                        SELECTED_BOP.play();
                    }

                    if (random() > 0.5) {
                        backgroundX += random(-3, 3);
                        backgroundY += random(-3, 3);
    
                        backgroundX = constrain(backgroundX, -19, -10);
                        backgroundY = constrain(backgroundY, -19, -10);
                    }
                    
                } else {
                    game.show();
                    SELECTED_BOP.pause();

                    /*** PAUSE SCREEN ***/
                    fill(255);
                    textSize(100);
                    stroke(0)
                    strokeWeight(5);
                    text('PAUSE', WIDTH / 2, HEIGHT / 2)
                    strokeWeight(0);
                    /********************/
                }

                /***   OVERLAY   ****/
                fill(175, 203, 146);
                textSize(40);
                stroke(0)
                strokeWeight(5);
                text(game.score, WIDTH / 2, 50)
                strokeWeight(0);

                pauseButton.update();
                pauseButton.show();
                /********************/
            } else {
                SELECTED_BOP.stop();
                /*** LOSE SCREEN ****/
                fill(255, 0, 0);
                textSize(90 / (1000 / WIDTH));
                stroke(0)
                strokeWeight(5);
                text("THATS HOT", WIDTH / 2, HEIGHT / 2)
                fill(255);
                textSize(40);
                text("SCORE", WIDTH / 2, HEIGHT * 3 / 5)
                text(game.score, WIDTH / 2, HEIGHT * 17 / 25)
                restartButton.update();
                restartButton.show();
                strokeWeight(0);
                /********************/

                if (restartButton.actuated) {
                    restart();
                }
            }
        }

        lost = game.lost;
    }
}

function keyPressed() {
    if (!lost && startCount === 0) {
        if (keyCode === UP_ARROW) {
            game.flap();
        }

        if (keyCode === ESCAPE) {
            pause();
        }
    }


    if (keyCode === 'R'.charCodeAt(0) && !rewinding && lost) {
        restart();
        lost = false;
    }
}

function mousePressed() {
    if (!paused && !lost && startCount === 0) {
        game.flap();
    }
}


function restart() {
    THATSHOT.stop();
    REWIND.play();

    rewinding = true;
    paused = false;

    startCount = 180;

    selectBop();
}

function playSound() {
    if (random() > 0.25) {
        let sound = SOUNDS[floor(random(SOUNDS.length))];
        sound.rate(random(0.75, 1.25));
        sound.play();
    }
}

function selectBop() {
    SELECTED_BOP = BOPS[floor(random(0, BOPS.length))];
    SELECTED_BOP.amp(0.5);
}

function pause() {
    paused = !paused;
    pauseButton.label = paused ? '\u25B6' : '||';

    if (!paused) {
        startCount = 180;
    }
}