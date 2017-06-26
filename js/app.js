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
  if(this.posX + (this.diam/2) >= gameplay.computerPaddle.posX &&
     this.posY >= gameplay.computerPaddle.posY && this.posY <
     (gameplay.computerPaddle.posY + gameplay.computerPaddle.height)) {
       this.speedX = -Math.abs(this.speedX);
  }

  // Check player paddle collision
  if((this.posX - (this.diam/2)) <= (gameplay.playerPaddle.posX + gameplay.playerPaddle.width) &&

     this.posY >= gameplay.playerPaddle.posY && this.posY <
     (gameplay.playerPaddle.posY + gameplay.playerPaddle.height)) {
       this.speedX = Math.abs(this.speedX);
  }


  // Check for wall collision
  if(this.posY > (c.height - this.diam) || this.posY < this.diam) {
    this.speedY = -this.speedY;
  }

  // Move ball
  this.posX += this.speedX;
  this.posY += this.speedY;
}

  draw(){
    gameplay.ctx.fillStyle = gameplay.forgroundColor;
    gameplay.ctx.beginPath();
    gameplay.ctx.arc(this.posX, this.posY, this.diam, 0, 2*Math.PI);
    gameplay.ctx.fill();
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
  constructor(canvas){
    this.height = canvas.height;
    this.width = canvas.width;
  }
  // Draw the game board
  draw() {
    gameplay.ctx.fillStyle = 'black';
    gameplay.ctx.fillRect(0, 0, this.width, this.height);
    gameplay.ctx.fillStyle = gameplay.forgroundColor;
    for(let i=5; i<c.height-5; i+=35) {
      gameplay.ctx.fillRect((c.width/2)-3, i, 6, 30);
    }
  }
}

class Paddle{
  constructor(posY, player=false){
    this.height = 50;
    this.width = 10;
    this.score = 0;
    this.offset = 10;
    this.posY = posY - (this.height/2);
    if(player) {
      this.posX = this.offset;
    } else {
      this.posX = c.width - this.width - this.offset;
    }
  }

  move(val) {
    this.posY += val;
  }

  draw() {
    gameplay.ctx.fillStyle = gameplay.forgroundColor;
    gameplay.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}

class ComputerPaddle extends Paddle {
  constructor() {
    super(c.height*0.33);
  }

  ai() {
    if(gameplay.ball.posY > this.posY + (this.height/2)) {
      this.move(3);
    } else if(gameplay.ball.posY < this.posY + (this.height/2)) {
      this.move(-3);
    }
  }
}

class PlayerPaddle extends Paddle {
  constructor(){
    super(c.height*0.66, true);
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
    if(this.up) {
      this.move(-5);
    } else if(this.down) {
      this.move(5);
    }
  }
}

class Game{
  constructor(canvas){
    this.c = canvas;
    this.ctx = this.c.getContext('2d');
    this.forgroundColor = '#0fbf49';
    this.board = new Board(canvas);
    this.ball = new Ball(this.c.width/2, this.c.height/2);
    this.playerPaddle = new PlayerPaddle();
    this.computerPaddle = new ComputerPaddle();
    this.frameRate = 30;
  }

  run(){
    setInterval(() => {this.physics();this.draw();}, 1000/this.frameRate);
  }

  physics(){
    this.ball.move();
    this.computerPaddle.ai();
    this.playerPaddle.go();
  }

  draw(){
    this.board.draw();
    this.ball.draw();
    this.playerPaddle.draw();
    this.computerPaddle.draw();
  }

  score(loc) {
    if(loc > (this.c.width/2)) {
      this.playerPaddle.score++;
    } else if(loc < (this.c.width/2)) {
      this.computerPaddle.score++;
    }
    if(this.playerPaddle.score >= 7) {

    } else if(this.computerPaddle.score >= 7) {

    }
  }
}

let c;
let gameplay;
window.onload = () => {
  c = document.getElementById('canvas');
  gameplay = new Game(c);
  gameplay.run();
};
