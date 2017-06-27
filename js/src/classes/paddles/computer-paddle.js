class ComputerPaddle extends Paddle {
  constructor() {
    super(c.height*0.33);
  }

  ai() {
    if(gameplay.ball.posY > this.posY + this.height*0.65) {
      this.move(5);
    } else if(gameplay.ball.posY < this.posY - this.height*0.35) {
      this.move(-5);
    }
  }
}
