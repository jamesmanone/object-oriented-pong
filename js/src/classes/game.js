class Game{
  constructor(canvas){
    this.c = canvas;
    this.ctx = c.getContext('2d');
    this.forgroundColor('#0fbf49')
    this.ball = new Ball();
    this.playerPaddle = new PlayerPaddle();
    this.computerPaddle = new ComputerPaddle();
    this.frameRate = 30;
  }

  run(){
    setInterval(() => {this.physics();this.draw();}, 1000/this.frameRate);
  }

  physics(){

  }

  draw(){
    this.board.draw();
    this.ball.draw();
    this.playerPaddle.draw();
    this.computerPaddle.draw();
  }
}
