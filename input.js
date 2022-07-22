export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.touchY = "";
    this.touchTreshold = 30;
    this.touchX = "";
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "Enter") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      } else if (e.key === "d") this.game.debug = !this.game.debug;
    });

    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Enter"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });

    window.addEventListener("touchstart", (e) => {
      this.touchY = e.changedTouches[0].pageY;
      this.touchX = e.changedTouches[0].pageX;
    });
    window.addEventListener("touchmove", (e) => {
      const swipeDistance = e.changedTouches[0].pageY - this.touchY;
      const swipeDistance2 = e.changedTouches[0].pageX - this.touchX;
      if (
        swipeDistance < -this.touchTreshold &&
        this.keys.indexOf("swipe up") === -1
      )
        this.keys.push("swipe up");
      else if (
        swipeDistance > this.touchTreshold &&
        this.keys.indexOf("swipe down") === -1
      ) {
        this.keys.push("swipe down");
        if (gameOver) restartGame();
      }
      else if (
        swipeDistance2 < -this.touchTreshold &&
        this.keys.indexOf("swipe left") === -1
      )
      this.keys.push("swipe left");
      else if (
        swipeDistance2 >this.touchTreshold &&
        this.keys.indexOf("swipe right") === -1
      )
      this.keys.push("swipe right");
    });
    window.addEventListener("touchend", (e) => {
      this.keys.splice(this.keys.indexOf("swipe up"), 1);
      this.keys.splice(this.keys.indexOf("swipe down"), 1);
      this.keys.splice(this.keys.indexOf("swipe left"), 1);
      this.keys.splice(this.keys.indexOf("swipe right"), 1);
    });
  }
}
