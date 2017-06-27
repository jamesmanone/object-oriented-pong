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
       this.speedY = ((this.posY - (gameplay.computerPaddle.posY + gameplay.computerPaddle.height/2))*0.35);
  }

  // Check player paddle collision
  if((this.posX - (this.diam/2)) <= (gameplay.playerPaddle.posX + gameplay.playerPaddle.width) &&

     this.posY >= gameplay.playerPaddle.posY && this.posY <
     (gameplay.playerPaddle.posY + gameplay.playerPaddle.height)) {
       this.speedX = Math.abs(this.speedX);
       this.speedY = ((this.posY - (gameplay.playerPaddle.posY + gameplay.playerPaddle.height/2))*0.35);
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
