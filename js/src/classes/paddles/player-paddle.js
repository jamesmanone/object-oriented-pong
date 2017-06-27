class PlayerPaddle extends Paddle {
  constructor(){
    super(c.height*0.66, true);
    this.up = false;
    this.down = false;
    document.addEventListener('keydown', e => {
      if(e.keyCode == 38) {
        this.up = true;
      } else if(e.keyCode == 40) {
        this.down = true;
      }
    });
    document.addEventListener('keyup', e => {
      this.up = false;
      this.down = false;
    });
  }

  go() {
    if(this.up) {
      this.move(-7);
    } else if(this.down) {
      this.move(7);
    }
  }
}
