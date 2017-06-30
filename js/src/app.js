
window.onload = () => {
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#0fbf49';
  ctx.strokeStyle = '#0fbf49';
  ctx.font = '100px monospace';
  ctx.strokeText('P O N G', c.width/2, 100);
  ctx.font = '20px monospace';
  ctx.fillText('Click to continue', c.width/2, c.height*0.75);
  credits = setInterval(() => {
    ctx.fillText('Credits 0/2', c.width/2, c.height*0.75 + 40);
    setTimeout(() => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, c.height*0.75 + 20, c.width, c.height/4);
      ctx.fillStyle = '#0fbf49';
    }, 600);
  }, 1200);
  c.addEventListener('click', start);
};

function start() {
  c.removeEventListener('click', start);
  clearInterval(credits);
  gameplay = new Game();
  gameplay.run();
}

function resetGame() {
  gameplay = new Game();
  gameplay.run();
  c.removeEventListener('click', resetGame);
}
