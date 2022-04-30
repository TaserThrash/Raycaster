class wall {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  
    display() {
      rectMode(CENTER);
      rect(this.x, this.y, this.w, this.h);
      ellipse(this.x, this.y, 5, 5);
    }
  }
  let walls = [
    new wall(250, 0, 500, 10),
    new wall(0, 250, 10, 500),
    new wall(250, 500, 490, 10),
    new wall(490, 250, 10, 500),
    new wall(150, 270, 50, 50),
    new wall(475, 475, 50, 50),
  ];
  
  function TW(x, y) {
    for (let i = 0; i < walls.length; i++) {
      if (
        abs(x - walls[i].x) <= walls[i].w &&
        abs(y - walls[i].y) <= walls[i].h
      ) {
        return true;
      }
    }
    return false;
  }
  
  function cast(x, y, r) {
    let xx = x;
    let yy = y;
    let d = 0;
    while (!TW(x, y)) {
      x += sin(radians(r)) * 2;
      y += cos(radians(r)) * 2;
      d++;
    }
    while (TW(x, y)) {
      x -= sin(radians(r)) * 2;
      y -= cos(radians(r)) * 2;
    }
    //line(x,y,xx,yy);
    return d;
  }
  
  function rayCast(x, y, r) {
    let d, t, c,a;
    a=width/2/tan(30);
    for (let i = -30; i < 30; i+=0.25) {
      t = r + i / (125 / 30) - r;
      d = cast(x, y, (r + i / (125 / 30)));
      d *= cos(radians(t));
      c = 255 / (d / 16);
      push();
      stroke(c, c, 186);
      strokeWeight((width/240));
      line((30 + i) * (width/60), height/2 - height*40 / d, (30 + i) * (width/60), height/2 + height*40 / d);
      pop();
    }
  }
  
  let x = 250;
  let y = 250;
  let r = 0;
  
  function setup() {
    createCanvas(windowWidth-1, windowHeight-1);
  }
  
  function draw() {
    background("#00ffff");
    if (keyIsDown(UP_ARROW) || (touches.length>0 && touches[0].y<height/2)) {
      x += sin(radians(r))*(60/getFrameRate());
      y += cos(radians(r))*(60/getFrameRate());
      if (TW(x, y)) {
        x -= sin(radians(r))*(60/getFrameRate());
        y -= cos(radians(r))*(60/getFrameRate());
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      x -= sin(radians(r))*(60/getFrameRate());
      y -= cos(radians(r))*(60/getFrameRate());
      if (TW(x, y)) {
        x += sin(radians(r))*(60/getFrameRate());
        y += cos(radians(r))*(60/getFrameRate());
      }
    }
    if (keyIsDown(RIGHT_ARROW) || (touches.length>0 && touches[0].y>height/2 && touches[0].x>width/2)) {
      r+=(30/getFrameRate());
    }
    if (keyIsDown(LEFT_ARROW) || (touches.length>0 && touches[0].y>height/2 && touches[0].x<width/2)) {
      r-=(30/getFrameRate());
    }
    rayCast(x, y, r);
    text(getFrameRate(),20,20);
  }
  