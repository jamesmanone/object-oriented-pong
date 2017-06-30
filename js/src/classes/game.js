class Game{
  constructor(){
    this.forgroundColor = '#0fbf49';
    ball = new Ball(c.width/2, c.height/2);
    playerPaddle = new PlayerPaddle();
    computerPaddle = new ComputerPaddle();
    this.frameRate = 30;
  }

  run(){
    engineLoop = setInterval(() => {this.motion();this.draw();}, 1000/this.frameRate);
  }

  motion(){
    ball.move();
    computerPaddle.ai();
    playerPaddle.go();
  }

  draw(){
    Board.draw();
    this.drawScores();
    this.drawTitle();
    ball.draw();
    playerPaddle.draw();
    computerPaddle.draw();
  }

  drawScores() {
    ctx.font = '16px monospace';
    ctx.fillStyle = this.forgroundColor;
    ctx.fillText('PLAYER SCORE', c.width*0.1, c.height*0.1);
    ctx.fillText(playerPaddle.score, c.width*0.1, (c.height*0.1)+20);
    ctx.fillText('COMPUTER SCORE', c.width*0.9, c.height*0.1);
    ctx.fillText(computerPaddle.score, c.width*0.9, (c.height*0.1)+20);
  }

  drawTitle() {
    ctx.font = '100px monospace';
    ctx.strokeStyle = this.forgroundColor;
    ctx.strokeText('P O N G', c.width/2, 100);
  }

  score(loc) {
    if(loc > c.width/2) {
      playerPaddle.score++;
    } else if(loc < c.width/2) {
      computerPaddle.score++;
    }
    if(playerPaddle.score >= 10) {
      this.gameover(true);
    } else if(computerPaddle.score >= 10) {
      this.gameover(false);
    }
  }

  gameover(playerWins) {
    clearInterval(engineLoop);
    setTimeout(() => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = '100px monospace';
      ctx.fillStyle = this.forgroundColor;
      if(playerWins) {
        console.log('player');
        ctx.fillText(' You Win!', c.width/2, c.height/2);
      } else {
        console.log('computer');
        ctx.fillText(' You Lose!', c.width/2, c.height/2);
      }
      ctx.font = '16px monospace';
      ctx.fillText('Click to continue...', c.width/2, c.height*0.75);
    }, 10);
    c.addEventListener('click', resetGame);
  }
}
