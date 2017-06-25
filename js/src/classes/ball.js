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
    this.speedX = 10;
    this.speedY = 4;
  }
}
