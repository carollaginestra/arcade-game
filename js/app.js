// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //to make the enemies walk correctly on the 3 lines
    var positionY = [60,  140, 220];  //position of the lines
    //to random the position Y
    var randY = positionY[Math.floor(Math.random() * positionY.length)];

    var positionX = [0, 18, 110];
    //random of the position X
    // var randX = positionX[Math.floor(Math.random() * positionX.length)];
    this.x = 0;
    this.y = randY;
    this.speed = Math.random() * 150 + 50;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = 0;
    }

    collisionEnemy(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.x = 202.5;
    this.y = 383;
    this.speed = 100;
    this.sprite = 'images/frog1.png';
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    if (this.y > 383 ) {
        this.y = 383;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font = "12pt Impact, sans-serif";
    ctx.textAlign = "right";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    //show level and score

    ctx.strokeText(`LEVEL ${level}   SCORE ${score}`, 480, 570);
    ctx.fillText(`LEVEL ${level}   SCORE ${score}`, 480, 570);

    // if score = 9 you win
    if(score == 9) {
        this.speed = 0; 
        //black overlay
        ctx.beginPath();        
        ctx.fillStyle = "rgba(0, 0, 0, 0.62)";
        ctx.fillRect(0, 50, 505, 535);
        ctx.closePath();        
        //img win
        ctx.drawImage(Resources.get('images/win.png'), 35, 227); 
        document.getElementById("win").style.display = "block";
    }
}

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' || keyPress == 'left-letter') {
        player.x -= player.speed;
    }
    if (keyPress == 'up' || keyPress == 'up-letter') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right' || keyPress == 'right-letter') {
        player.x += player.speed;
    }
    if (keyPress == 'down' || keyPress == 'down-letter') {
        player.y += player.speed - 20;
    }
}

var collisionEnemy = function(theEnemy) {
    //Handles collision with the Player
    if (
        player.y + 131 >= theEnemy.y + 90 &&
        player.x + 76 >= theEnemy.x + 11 &&
        player.y + 73 <= theEnemy.y + 135 &&
        player.x + 25 <= theEnemy.x + 88
    ) {
        //back to initial position
        player.x = 202.5;
        player.y = 383;
    } else {
        nextLevel();
    }    
};

var nextLevel = function() {
    //if arrive at water, go to the next level
    if (player.y <= 0) {        
        player.x = 202.5;
        player.y = 383;

        score += 1;
        level += 1;

        //the enemies increase according to the score
        difficulty(level);
    }
}

//the enemies quanty
var difficulty = function(qty) {
    allEnemies.length = 0;

    for (var i = 0; i <= qty; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemy = new Enemy();
allEnemies.push(enemy);

// Place the player object in a variable called player
const player = new Player();

//start on score 0 and level 1
let score = 0;
let level = 1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left-letter',
        87: 'up-letter',
        68: 'right-letter',
        83: 'down-letter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
