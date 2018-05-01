// Enemies our player must avoid
let Enemy = function(x,y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x +(this.speed * dt);
    if (this.x > 505){
        this.x = -20;
};
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor() {
    this.x = 205;
    this.y = 415;
    this.sprite = 'images/char-boy.png';
  }

  update() { ///cos zamiast playet (this i s undefined)
allEnemies.forEach(function(enemy){
  if (enemy.x >= (player.x-50) && enemy.x <= (player.x+50) && enemy.y >= (player.y-42) && enemy.y <= (player.y+42)) {
    console.log('collision');
  }
})
  }
  render() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key){
    switch(key) {
      case 'up':
      this.y = this.y - 83;
      if (this.y <= 0) {
        this.y = 0;
      }
      break;
      case 'down':
      this.y = this.y + 83;
      if (this.y >= 415) {
        this.y = 415;
      }
      break;
      case 'left':
      this.x = this.x - 101;
        if (this.x <= 0) {
          this.x = 0;
        }
        update();
        break;
      case 'right':
      this.x = this.x + 101;
      if (this.x >= 404) {
        this.x = 404;
      }
    }

      }

}//end Player

// Now instantiate your objects.
const enemy1 = new Enemy(-100,60,80);
const enemy2 = new Enemy(-30,145,100);
const enemy3 = new Enemy(-50,230,90);
const allEnemies = [enemy1, enemy2, enemy3];
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
