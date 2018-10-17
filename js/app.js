var Enemy = function() {
    /**
     * @description Represents the enemy
     * @constructor
     * @param {number} x - The x position in the canvas
     * @param {number} y - the y position in the canvas
     * @param {number} speed - The speed of the enemy
     * @param {string} sprite - The sprite of the enemy
     */

    var positionY = [60,  140, 220];  //position of the lines
    //to random the position Y
    var randY = positionY[Math.floor(Math.random() * positionY.length)];
    this.x = 0;
    this.y = randY;
    this.speed = Math.random() * 150 + 50;
    this.sprite = 'images/enemy-bug.png';
}

Enemy.prototype.update = function(dt) {
    /**
    * @description Update the enemies positions
    * @param {number} dt - (now - lastTime) / 1000.0 
    */
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = -100;
    }

    collisionEnemy(this);
}

Enemy.prototype.render = function() {
    /**
    * @description To render the sprite/img of the enemy
    */
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    /**
     * @description Represents the player
     * @constructor
     * @param {number} x - The x position in the canvas
     * @param {number} y - the y position in the canvas
     * @param {number} speed - The speed of the player
     * @param {string} sprite - The sprite of the player
     */
    this.x = 202.5;
    this.y = 383;
    this.speed = 100;
    this.sprite = 'images/frog1.png';
}


Player.prototype.update = function() {
    /**
    * @description Update the player positions, doesn't let the character move off the screen
    */

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
    /**
    * @description To render the sprite/img of the player,
    *              show the next level, score text with canvas and
    *              for verify if score is 9 to show the winner message
    */
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
        //img winner
        ctx.drawImage(Resources.get('images/win.png'), 35, 227); 
        document.getElementById("win").style.display = "block";
    }
}

Player.prototype.handleInput = function(keyPress) {
    /**
    * @description Move the character according to the key pressed
    * @param {number} keyPress - The key that was pressed
    */
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
    /**
    * @description to check the enemy collision with the player,
    *               if has collision, the player go to the beginning,
    *               if there isnt go to the next level
    * @param {object} theEnemy - The Enemy
    */
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
}

var nextLevel = function() {
    /**
    * @description to verify that the player didn't collide with the enemy,
    *              then the player goes to the next level, back to the beginning
    *              position and earn highest score
    */
    if (player.y <= 0) {        
        player.x = 202.5;
        player.y = 383;

        score += 1;
        level += 1;

        //the enemies increase according to the score
        difficulty(level);
    }
}

var difficulty = function(qty) {
    /**
    * @description to verify that the player didn't collide with the enemy,
    *              then the player goes to the next level, back to the beginning
    *              position and earn highest score
    */
    allEnemies.length = 0;

    for (var i = 0; i <= qty; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
}

// All enemy objects in an array
const allEnemies = [];
const enemy = new Enemy();
allEnemies.push(enemy);

const player = new Player();

//start on score 0 and level 1
let score = 0;
let level = 1;

document.addEventListener('keyup', function(e) {
    /**
    * @description This listens for key presses and sends the keys to
    *               Player.handleInput() method.
    * @param {number} e - Keyboard event
    */
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left-letter',
        87: 'up-letter',
        68: 'right-letter',
        83: 'down-letter'
    }

    player.handleInput(allowedKeys[e.keyCode]);
})
