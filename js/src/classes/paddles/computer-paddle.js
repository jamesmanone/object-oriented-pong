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
