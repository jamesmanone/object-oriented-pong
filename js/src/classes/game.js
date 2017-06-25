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
