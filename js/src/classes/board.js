class Board{
  constructor(canvas){
    this.height = canvas.height;
    this.width = canvas.width;
  }
  // Draw the game board
  draw() {
    gameplay.ctx.fillStyle = 'black';
    gameplay.ctx.fillRect(0, 0, this.width, this.height);
    gameplay.ctx.fillStyle = gameplay.forgroundColor;
    for(let i=5; i<c.height-5; i+=35) {
      gameplay.ctx.fillRect((c.width/2)-3, i, 6, 30);
    }
  }
}
