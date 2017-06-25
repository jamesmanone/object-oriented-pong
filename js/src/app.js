let c;
let gameplay;
window.onload = () => {
  c = document.getElementById('canvas');
  gameplay = new Game(c);
  gameplay.run();
};
