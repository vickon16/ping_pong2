
class Vec {

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

}

class Rect {
  constructor(w, h) {
    this.pos = new Vec; /* this.pos return Vec{x:0, y:0} */
    this.size = new Vec(w, h) /* this.size return Vec{x:0, y:0}, unless the w,h value is changed */
  }
}

class Circle {
  constructor(r = 10, init=0, final =Math.PI*2) {
    this.radius = r;
    this.init = init;
    this.final = final;
  }

}


class Ball extends Circle {
  // new Ball returns {r: 10, init: 0, final: 6.283185307179586, pos: Vec, vel: Vec}
  constructor () {
    super();
    this.pos = new Vec;
    this.vel = new Vec;
    this.size = new Circle;
  }

  get left() {
    return this.pos.x;
  }

  get right() {
    return this.pos.x + (this.size.radius )
  }

  get top() {
    return this.pos.y;
  }

  get bottom() {
    return this.pos.y + (this.size.radius)
  }

}


// create players 

class Player extends Rect {
  constructor() {
    super(15, 100) 
    this.score = 0;
  }


}

class Seperator extends Rect {
  constructor() {
    super(2, 10)
  }
  
}




// pong program

class Pong {
  
  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d");

    this.ball = new Ball;
    this.rect = new Rect;
    // console.log(this.ball.left)
    console.log(this.rect.size.x)

    this.ball.pos.x = 100;
    this.ball.pos.y = 50;

    this.ball.vel.x = 150;
    this.ball.vel.y = 150;

    this.players = [ new Player, new Player];

    this.players[0].pos.x = 10;
    this.players[1].pos.x = this._canvas.width - 30;

    this.players.forEach(player => {
      player.pos.y = (this._canvas.height-100) / 2;
    })


    this.seperator = new Seperator;
    this.seperator.pos.x = (this._canvas.width-2)/2;


    // ball animation
  let lastTime;

  const callBack = (millis) => {

      requestAnimationFrame(callBack);

      if(lastTime) {
        this.update((millis - lastTime) / 1000);
      }
      lastTime = millis;
    };

    callBack();
  }



  drawRect(rect, color) {
    this._context.fillStyle = color;
    this._context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
  }

  drawCircle(circle, color) {
    this._context.fillStyle = color;
    this._context.beginPath();
    this._context.arc(circle.pos.x, circle.pos.y, circle.radius, circle.init, circle.final);
    this._context.closePath();
    this._context.fill();
  }

  drawSeperator(sep, color) {

    for(let i = 0; i < this._canvas.height; i+=20) {
      this._context.fillStyle = color;
      this._context.fillRect(sep.pos.x, sep.pos.y + i, sep.size.x, sep.size.y);
    }
  }


  draw() {

    this._context.fillStyle = "#000";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this.drawRect(this.rect, "blue")
    this.drawCircle(this.ball, "red")
    this.drawRect(this.players[0], "cyan")
    this.drawRect(this.players[1], "yellow")

    this.drawSeperator(this.seperator, "yellow")
    

  }




  update(dt) {
    this.ball.pos.x += this.ball.vel.x * dt;
    this.ball.pos.y += this.ball.vel.y * dt;

    // detect if ball touched corner

    if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
      this.ball.vel.x = -this.ball.vel.x;
    }

    if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
      this.ball.vel.y = -this.ball.vel.y;
    }

    // to make the Cpu move
    this.players[1].pos.y = this.ball.pos.y;

    this.draw()

}

}


const canvas = document.getElementById("Pong")
const pong = new Pong(canvas);


canvas.addEventListener("mousemove", event => {
  let boundary = canvas.getBoundingClientRect();
  pong.players[0].pos.y = event.clientY - boundary.top - pong.players[0].size.y/2;
})






  









