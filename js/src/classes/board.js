class Board{
  // Draw the game board
  static draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = gameplay.forgroundColor;
    for(let i=5; i<c.height-5; i+=35) {
      ctx.fillRect((c.width/2)-3, i, 6, 30);
    }
  }
}
