// Enemies our player must avoid
let Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random() * 250) - 300;
    this.speed = Math.floor(Math.random() * 190) + 20; //Math.floor(Math.random() * 290) + 90
    this.y = this.chooseRow();
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x +(this.speed * dt);
    if (this.x > 505){
        this.x = -50;
        this.y = this.chooseRow();
};

}; //end Enemy update

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.chooseRow = function(){
  const rows = [60,143,230];
  const random = Math.floor(Math.random() * 3);
  return rows[random];
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.collisionCount = 0;
    this.winCount = 0;
    this.movesCount = 0;
  }

checkCollisions(pl) {
  allEnemies.forEach(function(enemy){
    if (enemy.x >= (pl.x-50) && enemy.x <= (pl.x+50) && enemy.y >= (pl.y-42) && enemy.y <= (pl.y+42)) {
      pl.startPos();
      pl.collisionCount++;
    }
  });
} //end checkCollisions

startPos(){
this.x = 205;
this.y = 415;
}


  update() {
this.checkCollisions(player);
this.checkWin();


} //end update

checkWin() {
  if (this.y === 0) {
  console.log('win!');
    this.startPos();
  this.winCount++;
  document.getElementById('win').classList.remove('hidden');
  }
}

  render() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} //end render

  handleInput(key){
    switch(key) {
      case 'up':
      console.log('this.y before: ' + this.y);
      this.y = this.y - 83;
      (this.y <= -1) ? this.y = 0 : this.movesCount++;
      console.log('movesCount: ' + this.movesCount);
      console.log('this.y: ' + this.y);
      break;

      case 'down':
      console.log('this.y before: ' + this.y);
      this.y = this.y + 83;
      (this.y >= 416) ? this.y = 415 : this.movesCount++;
      console.log('movesCount: ' + this.movesCount);
      console.log('this.y: ' + this.y);
      break;

      case 'left':
      console.log('this.x before: ' + this.x);
      this.x = this.x - 101;
      (this.x <= 0) ? this.x = 0 : this.movesCount++;
        console.log('movesCount: ' + this.movesCount);
          console.log('this.x: ' + this.x);
      break;

      case 'right':
      console.log('this.x before: ' + this.x);
      this.x = this.x + 101;
      (this.x >= 408) ? this.x = 404 : this.movesCount++;
        console.log('movesCount: ' + this.movesCount);
          console.log('this.x: ' + this.x);

    }

  } //end handleInput

}//end Player


const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player();

player.startPos();
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

document.getElementById('ok').addEventListener('click', function() {
  document.getElementById('win').classList.add('hidden');
})
