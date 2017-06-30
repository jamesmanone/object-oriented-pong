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
