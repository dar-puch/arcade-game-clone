// Enemies our player must avoid
let Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = Math.floor(Math.random() * 250) - 300;
  this.factor = 0; //increases speed
  this.speed = Math.floor(Math.random() * 150) + this.factor;
  this.y = this.chooseRow();

};

Enemy.prototype.update = function(dt) {
  this.x = this.x + (this.speed * dt);
  if (this.x > 505) { //go to start when out of canvas and change the row
    this.x = -50;
    this.y = this.chooseRow();
  };

}; //end Enemy update

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.chooseRow = function() { //put enemy on random row
  const rows = [60, 143, 230];
  const random = Math.floor(Math.random() * 3);
  return rows[random];
}
Enemy.prototype.changeSpeed = function(high) {
  high === 0 ? this.factor = 0 : this.factor += 50;
  this.speed = Math.floor(Math.random() * 150) + this.factor;
}


class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.collisionCount = 0;
    this.winCount = 0;
    this.movesCount = 0;
    this.freeze = false;
  }

  checkCollisions(pl) {
    allEnemies.forEach(function(enemy) {
      if (enemy.x >= (pl.x - 50) && enemy.x <= (pl.x + 50) && enemy.y >= (pl.y - 42) && enemy.y <= (pl.y + 42)) {
        audioSounds.play('sounds/NFF-throw-03.mp3');
        pl.startPos();
        pl.collisionCount++;
        panel.lives--;
        panel.update();
        if (panel.lives === 0) {
          audioSounds.play('sounds/NFF-death-bell.mp3');
          overlay.show('lose');
        }
      }
    });
  } //end checkCollisions

  startPos() {
    this.x = 202;
    this.y = 415;
  }


  update() {
    this.checkCollisions(player);
    this.checkWin();
  } //end update

  checkWin() {
    if (this.y === 0) {
      audioSounds.play('sounds/NFF-coin-04.mp3');
      this.startPos();
      panel.level++;
      panel.update();
      if (panel.level === 10) {
        audioSounds.play('sounds/NFF-mad-laughter.mp3')
        overlay.show('win');
      } else {
        allEnemies.forEach(function(enemy) {
          enemy.changeSpeed(1);

        })
      }
    }
  } //end checkWin

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  } //end render

  handleInput(key) {
    switch (key) {
      case 'up':
        this.y = this.y - 83;
        (this.y <= -1) ? this.y = 0: this.movesCount++;
        break;

      case 'down':
        this.y = this.y + 83;
        (this.y >= 416) ? this.y = 415: this.movesCount++;
        break;

      case 'left':
        this.x = this.x - 101;
        (this.x <= 0) ? this.x = 0: this.movesCount++;
        break;

      case 'right':
        this.x = this.x + 101;
        (this.x >= 408) ? this.x = 404: this.movesCount++;

    }
  } //end handleInput


} //end Player

class Panel {
  constructor(lives) {
    this.fullLives = lives;
    this.lives = lives;
    this.level = 1;
  }

  update() { //updates information on level and lives
    let heartsList = document.getElementById('hearts');
    while (heartsList.firstChild) {
      heartsList.firstChild.remove();
    }
    for (let i = 0; i < this.lives; i++) {
      heartsList.insertAdjacentHTML('afterbegin', '<li><img src="images/Heart-min.png" /></li>');
    }
    let levelNum = document.getElementById('level-num');
    levelNum.innerText = this.level + ' of 10 ';
  } //end update

} //end Panel

class Overlay { // overlay which appears when player wins or loses
  constructor() {
    this.element = document.getElementById('end');
    this.h1 = '';
  }
  show(result) {
    if (result === 'win') {
      this.h1 = 'Congratulations!';
      this.element.classList.remove('lose');
      this.element.classList.add('win');
    } else if (result === 'lose') {
      this.h1 = 'Out of lives!';
      this.element.classList.remove('win');
      this.element.classList.add('lose');
    }
    this.element.getElementsByTagName('h1')[0].innerText = this.h1;
    this.element.classList.remove('hidden');
    player.freeze = true;
    audioBcg.pause();
  }
  hide() {
    this.element.classList.add('hidden');
    player.freeze = false;
  }
} //end Overlay

class Audio {
  constructor(id) {
    this.audioElement = document.getElementById(id);
    this.muted = false;
  }
  play(tune) {
    this.audioElement.src = tune;
    this.audioElement.play();
  }
  pause() {
    this.audioElement.pause()
  };
  mute() {
    this.audioElement.muted = true;
  }

  unmute() {
    this.audioElement.muted = false;
  }
} // end Audio


const allEnemies = [];

function instEnemies(howMany) { //function to instantiate enemies and write to array
  for (let i = 0; i <= howMany; i++) {
    allEnemies[i] = new Enemy();
  }
}


instEnemies(3);

const player = new Player();
const panel = new Panel(3);
const audioSounds = new Audio('audio-sounds');
const audioBcg = new Audio('audio-bcg');
const overlay = new Overlay();

audioBcg.play('sounds/POL-snowy-hill-short.mp3');
panel.update();
player.startPos();

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  if (!player.freeze) { //freezed player can't move
    player.handleInput(allowedKeys[e.keyCode]);
  }
});

document.getElementById('btn-again').addEventListener('click', function() {
  overlay.hide();
  audioSounds.pause();
  audioBcg.play('sounds/POL-snowy-hill-short.mp3');
  player.startPos();
  panel.lives = panel.fullLives;
  panel.level = 1;
  panel.update();
  allEnemies.forEach(function(enemy) { //resets position and speed of bugs
    enemy.x = Math.floor(Math.random() * 250) - 300;
    enemy.changeSpeed(0);
  })

})
//sounds on-off
document.getElementById('music').addEventListener('click', function() { //for background music
  let element = this;
  if (audioBcg.muted === false) {
    element.src = 'images/music-note-mute.png';
    audioBcg.mute();
    audioBcg.muted = true;
  } else {
    element.src = 'images/music-note.png';
    audioBcg.unmute();
    audioBcg.muted = false;
  }
});

document.getElementById('sounds').addEventListener('click', function() { //for game sounds
  let element = this;
  if (audioSounds.muted === false) {
    element.src = 'images/speaker-mute.png';
    audioSounds.mute();
    audioSounds.muted = true;
  } else {
    element.src = 'images/speaker.png';
    audioSounds.unmute();
    audioSounds.muted = false;
  }
})
