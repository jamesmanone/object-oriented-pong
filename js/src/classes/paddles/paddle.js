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
