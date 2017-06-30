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
