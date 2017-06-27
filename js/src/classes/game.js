class Game{
  constructor(canvas){
    this.c = canvas;
    this.ctx = this.c.getContext('2d');
    this.ctx.textAlign = 'center';
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
    this.drawScores();
    this.drawTitle();
    this.ball.draw();
    this.playerPaddle.draw();
    this.computerPaddle.draw();
  }

  drawScores() {
    this.ctx.font = '16px monospace';
    this.ctx.fillStyle = this.forgroundColor;
    this.ctx.fillText('PLAYER SCORE', c.width*0.1, c.height*0.1);
    this.ctx.fillText(this.playerPaddle.score, c.width*0.1, (c.height*0.1)+20);
    this.ctx.fillText('COMPUTER SCORE', c.width*0.9, c.height*0.1);
    this.ctx.fillText(this.computerPaddle.score, c.width*0.9, (c.height*0.1)+20);
  }

  drawTitle() {
    this.ctx.font = '100px monospace';
    this.ctx.strokeStyle = this.forgroundColor;
    this.ctx.strokeText('P O N G', c.width/2, 100);
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
