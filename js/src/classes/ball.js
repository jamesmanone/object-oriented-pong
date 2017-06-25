class Ball {
  constructor(posX, posY){
    this.posX = posX;
    this.posY = posY;
    this.diam = 10;
    this.speedX = 5;
    this.speedY = 2;
  }
  draw(){
    game.ctx.fillStyle(game.forgroundColor);
    game.ctx.beginPath();
    game.ctx.arc(this.posX, this.posY, this.diam, 0, 2*Math.PI);
    game.ctx.fill();
  }
}
