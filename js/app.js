
// Enemies our player must avoid
let Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random() * 250) - 300;
    this.factor = 0; //increases speed
    this.speed = Math.floor(Math.random() * 30) + this.factor; //250
    this.y = this.chooseRow();

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x +(this.speed * dt);
    if (this.x > 505){ //go to start when out of canvas but change the row
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
  this.factor += 50;
  this.speed = Math.floor(Math.random() * 250) + this.factor;
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
      audioSounds.play('sounds/NFF-throw-03.mp3');
      pl.startPos();
      pl.collisionCount++;
      panel.lives--;
      panel.update();
      if (panel.lives === 0) {
        audioSounds.play('sounds/NFF-death-bell.mp3');
        show('lose');
      }
    }
  });
} //end checkCollisions

startPos(){
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

function show(result) {
  const element = document.getElementById('end');

   if (result === 'win') {

    element.getElementsByTagName('h1')[0].innerText = 'Congratulations! You have reached end of the game';
   }
   else if (result === 'lose') {
     element.getElementsByTagName('h1')[0].innerText = 'Out of lives!';
     element.classList.add('lose');
   }

console.log("document.getElementById('end').getElementsByTagName('h1')[0].innerText:" + document.getElementById('end').getElementsByTagName('h1')[0].innerText);
   text = 'Congratulations! You have reached end of the game';
   console.log('result: ' + result);
   element.classList.remove('hidden');
}

class Overlay {
  constructor() {
    this.element = document.getElementById('end');
    this.text = this.element.getElementsByTagName('h1').innerText;

  }

  show(result) {
     if (result === 'win') {
       this.text = 'Congratulations! You have reached end of the game';
     }
     else if (result === 'lose') {
       this.text = 'Out of hives!';
     }
     console.log('this.text:' + this.text);
     console.log('this.text:' + this.text);
     this.text = 'Congratulations! You have reached end of the game';
     console.log('result: ' + result);
     this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}

class Game {

pause() {

}

}

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
  for (let i=0; i <= howMany; i++) {
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
  overlay.hide();
  audioSounds.pause();
  player.startPos();
  panel.lives = panel.fullLives;
  panel.level = 1;
  panel.update();
  allEnemies.forEach(function(enemy){
    enemy.factor = 0;
    enemy.changeSpeed();
  })

})
//sounds on-off
document.getElementById('music').addEventListener('click', function() {
  let element = this;
  if (audioBcg.muted === false) {
  element.src='images/music-note-mute.png';
  audioBcg.mute();
  audioBcg.muted = true;
  }
  else {
    element.src='images/music-note.png';
    audioBcg.unmute();
    audioBcg.muted = false;
  }
});
document.getElementById('sounds').addEventListener('click', function() {
  let element = this;
  if (audioSounds.muted === false) {
  element.src='images/speaker-mute.png';
  audioSounds.mute();
  audioSounds.muted = true;
  }
  else {
    element.src='images/speaker.png';
    audioSounds.unmute();
    audioSounds.muted = false;
  }
})

/*
audio = document.getElementById("audio");
audio.src = "audio/wrong.mp3";
audio.play();
audio.pause();
document.querySelector(".sound").addEventListener("click", function() {
  let soundClassList = document.querySelector(".sound").classList;
  soundClassList.toggle("muted");
  soundClassList.contains("muted") ? audio.muted = true : audio.muted = false;
});*/
