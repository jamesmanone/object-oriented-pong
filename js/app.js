let c, ctx, gameplay, engineLoop, ball, playerPaddle, computerPaddle, credits;

class Ball {
  constructor(posX, posY){
    this.posX = posX;
    this.posY = posY;
    this.diam = 10;
    this.speedX = 10;
    this.speedY = 4;
  }

move(){

  // Check for score
  if(this.posX > (c.width - this.diam) || this.posX < this.diam) {
    gameplay.score(this.posX);
    this.reset();
  }

  // Check computer paddle collision
  if(this.posX + (this.diam/2) >= computerPaddle.posX &&
     this.posY >= computerPaddle.posY && this.posY <
     (computerPaddle.posY + computerPaddle.height)) {
       this.speedX = -Math.abs(this.speedX);
       this.speedY = ((this.posY - (computerPaddle.posY + computerPaddle.height/2))*0.35);
  }

  // Check player paddle collision
  if((this.posX - (this.diam/2)) <= (playerPaddle.posX + playerPaddle.width) &&

     this.posY >= playerPaddle.posY && this.posY <
     (playerPaddle.posY + playerPaddle.height)) {
       this.speedX = Math.abs(this.speedX);
       this.speedY = ((this.posY - (playerPaddle.posY + playerPaddle.height/2))*0.35);
  }


  // Check for wall collision
  if(this.posY > c.height - this.diam) {
    this.speedY = Math.abs(this.speedY)*-1;
  } else if (this.posY < this.diam) {
    this.speedY = Math.abs(this.speedY);
  }

  // Move ball
  this.posX += this.speedX;
  this.posY += this.speedY;
}

  draw(){
    ctx.fillStyle = gameplay.forgroundColor;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.diam, 0, 2*Math.PI);
    ctx.fill();
  }

  reset() {
    this.posX = c.width/2;
    this.posY = c.height/3;
    this.speedY = 4;
    if((Math.floor(Math.random()*2)) >= 1) {
      this.speedX = -10;
    } else {
      this.speedX = 10;
    }
  }
}

class Board{
  // Draw the game board
  static draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = gameplay.forgroundColor;
    for(let i=5; i<c.height-5; i+=35) {
      ctx.fillRect((c.width/2)-3, i, 6, 30);
    }
  }
}

class Paddle{
  constructor(posY, player=false){
    this.height = 70;
    this.width = 10;
    this.score = 0;
    this.offset = 10;
    this.posY = posY - (this.height/2);
    this.posX = player ? this.offset : c.width - this.width - this.offset;
  }

  move(val) {
    this.posY += val;
  }

  draw() {
    ctx.fillStyle = gameplay.forgroundColor;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}

class ComputerPaddle extends Paddle {
  constructor() {
    super(c.height*0.33);
  }

  ai() {
    if(ball.posY > this.posY + this.height*0.6) {
      this.move(5);
    } else if(ball.posY < this.posY + this.height*0.4) {
      this.move(-5);
    }
  }
}

class PlayerPaddle extends Paddle {
  constructor(){
    super(c.height*0.66-10, true);
    this.up = false;
    this.down = false;
    document.addEventListener('keydown', e => {
      if(e.keyCode == 38) {
        this.up = true;
      } else if(e.keyCode == 40) {
        this.down = true;
      }
    });
    document.addEventListener('keyup', e => {
      this.up = false;
      this.down = false;
    });
  }

  go() {
    ((this.up && this.move(-7)) || (this.down && this.move(7)));
    // if(this.up) {
    //   this.move(-7);
    // } else if(this.down) {
    //   this.move(7);
    // }
  }
}

class Game{
  constructor(){
    this.forgroundColor = '#0fbf49';
    ball = new Ball(c.width/2, c.height/2);
    playerPaddle = new PlayerPaddle();
    computerPaddle = new ComputerPaddle();
    this.frameRate = 30;
  }

  run(){
    engineLoop = setInterval(() => {this.motion();this.draw();}, 1000/this.frameRate);
  }

  motion(){
    ball.move();
    computerPaddle.ai();
    playerPaddle.go();
  }

  draw(){
    Board.draw();
    this.drawScores();
    this.drawTitle();
    ball.draw();
    playerPaddle.draw();
    computerPaddle.draw();
  }

  drawScores() {
    ctx.font = '16px monospace';
    ctx.fillStyle = this.forgroundColor;
    ctx.fillText('PLAYER SCORE', c.width*0.1, c.height*0.1);
    ctx.fillText(playerPaddle.score, c.width*0.1, (c.height*0.1)+20);
    ctx.fillText('COMPUTER SCORE', c.width*0.9, c.height*0.1);
    ctx.fillText(computerPaddle.score, c.width*0.9, (c.height*0.1)+20);
  }

  drawTitle() {
    ctx.font = '100px monospace';
    ctx.strokeStyle = this.forgroundColor;
    ctx.strokeText('P O N G', c.width/2, 100);
  }

  score(loc) {
    if(loc > c.width/2) {
      playerPaddle.score++;
    } else if(loc < c.width/2) {
      computerPaddle.score++;
    }
    if(playerPaddle.score >= 10) {
      this.gameover(true);
    } else if(computerPaddle.score >= 10) {
      this.gameover(false);
    }
  }

  gameover(playerWins) {
    clearInterval(engineLoop);
    setTimeout(() => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = '100px monospace';
      ctx.fillStyle = this.forgroundColor;
      if(playerWins) {
        console.log('player');
        ctx.fillText(' You Win!', c.width/2, c.height/2);
      } else {
        console.log('computer');
        ctx.fillText(' You Lose!', c.width/2, c.height/2);
      }
      ctx.font = '16px monospace';
      ctx.fillText('Click to continue...', c.width/2, c.height*0.75);
    }, 10);
    c.addEventListener('click', resetGame);
  }
}


window.onload = () => {
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#0fbf49';
  ctx.strokeStyle = '#0fbf49';
  ctx.font = '100px monospace';
  ctx.strokeText('P O N G', c.width/2, 100);
  ctx.font = '20px monospace';
  ctx.fillText('Click to continue', c.width/2, c.height*0.75);
  credits = setInterval(() => {
    ctx.fillText('Credits 0/2', c.width/2, c.height*0.75 + 40);
    setTimeout(() => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, c.height*0.75 + 20, c.width, c.height/4);
      ctx.fillStyle = '#0fbf49';
    }, 600);
  }, 1200);
  c.addEventListener('click', start);
};

function start() {
  c.removeEventListener('click', start);
  clearInterval(credits);
  gameplay = new Game();
  gameplay.run();
}

function resetGame() {
  gameplay = new Game();
  gameplay.run();
  c.removeEventListener('click', resetGame);
}
