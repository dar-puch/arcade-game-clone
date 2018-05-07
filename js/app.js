
// Enemies our player must avoid
let Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random() * 250) - 300;
    this.factor = 0; //increases speed
    this.speed = Math.floor(Math.random() * 250) + this.factor;
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
Enemy.prototype.chooseRow = function(){ //put enemy on random row
  const rows = [60,143,230];
  const random = Math.floor(Math.random() * 3);
  return rows[random];
}
Enemy.prototype.changeSpeed = function(){
  this.factor = this.factor + 50;

  this.speed = Math.floor(Math.random() * 250) + this.factor;
  console.log('thisSpeed: ' + this.speed);
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
      panel.lives--;
      panel.update();
      if (panel.lives === 0) {
        document.getElementById('lose').classList.remove('hidden');
      }
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
  //this.winCount++;
  if (this.y === 0) {
    this.startPos();
  panel.level++;
  panel.update();
  allEnemies.forEach(function(enemy){
    enemy.changeSpeed();
  })

  }
} //end checkWin

  render() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} //end render

  handleInput(key){
    switch(key) {
      case 'up':
      this.y = this.y - 83;
      (this.y <= -1) ? this.y = 0 : this.movesCount++;
      break;

      case 'down':
      this.y = this.y + 83;
      (this.y >= 416) ? this.y = 415 : this.movesCount++;
      break;

      case 'left':
      this.x = this.x - 101;
      (this.x <= 0) ? this.x = 0 : this.movesCount++;
      break;

      case 'right':
      this.x = this.x + 101;
      (this.x >= 408) ? this.x = 404 : this.movesCount++;
    }

  } //end handleInput

}//end Player

class Panel {
  constructor(lives) {
    this.fullLives = lives;
    this.lives = lives;
    this.level = 1;
  }

  update() {
    let heartsList = document.getElementById('hearts');
    while (heartsList.firstChild) {
    heartsList.firstChild.remove();
}
    for (let i=0; i < this.lives; i++) {
      heartsList.insertAdjacentHTML('afterbegin', '<li><img src="images/Heart-min.png" /></li>');
    }
    let levelNum = document.getElementById('level-num');
    levelNum.innerText = this.level;
  }//end update
} //end Panel



const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

const player = new Player();
const panel = new Panel(3);
panel.update();
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

document.getElementById('btn-again').addEventListener('click', function() {
  document.getElementById('lose').classList.add('hidden');
  player.startPos();
  panel.lives = panel.fullLives;
  panel.level = 1;
  panel.update();
  allEnemies.forEach(function(enemy){
    enemy.factor = 0;
    enemy.changeSpeed();
  })

})
