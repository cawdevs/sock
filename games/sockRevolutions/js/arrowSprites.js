class ArrowSprite {
  constructor(direction) {
    this.direction = direction;
    this.width = 75;
    this.height = 75;
    this.y = 700;
    this.dy = 0;
    this.points = true;
    this.combo = true;
    this.drawArrow = this.drawArrow.bind(this);
    this.arrowParams(direction);
  }

  arrowParams(direction) {
    this.directionImage = new Image();
    switch (direction) {
      case "left":
        this.directionImage.src = "games/sockRevolutions/assets/leftArrowDynamic.png";
        this.shift = 0;
        this.x = 84.375;
        break;
      case "down":
        this.directionImage.src = "games/sockRevolutions/assets/downArrowDynamic.png";
        this.shift = 300;
        this.x = 154.6875;
        break;
      case "up":
        this.directionImage.src = "games/sockRevolutions/assets/upArrowDynamic.png";
        this.shift = 600;
        this.x = 225;
        break;
      case "right":
        this.directionImage.src = "games/sockRevolutions/assets/rightArrowDynamic.png";
        this.shift = 900;
        this.x = 295.3125;
        break;
    }
  }

  drawArrow() {
    let numFrames = 0;
    const animate = () => {
      numFrames++;
      ctx.drawImage(
        this.directionImage,
        this.shift,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.y += this.dy;
      if (numFrames === 15) {
        this.shift += this.width;
        numFrames = 0;
        this.shift = this.shift === 1200 ? 0 : this.shift;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }
}
