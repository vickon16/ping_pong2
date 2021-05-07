



class Vec {

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // to get the hypothensis of vel.x and vel.y
  get len() {
    return Math.sqrt((this.x * this.x ) + (this.y * this.y));
  }

  set len (value) {
    const fact = value / this.len;
    this.x *= fact;
    this.y *= fact;

  }

}

class Rect {
  constructor(w, h) {
    this.pos = new Vec; /* this.pos return Vec{x:0, y:0} */
    this.size = new Vec(w, h) /* this.size return Vec{x:0, y:0}, unless the w,h value is changed */
  }

  get left() {
    return this.pos.x;
  }

  get right() {
    return this.pos.x + (this.size.x )
  }

  get top() {
    return this.pos.y;
  }

  get bottom() {
    return this.pos.y + (this.size.y)
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
    this.speed = 5;
    this.dy = 0;
  }

  


}

class Seperator extends Rect {
  constructor() {
    super(2, 10)
  }
  
}

class Text extends Player {
  constructor() {
    super()
  }
}





// pong program

class Pong {
  
  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d");

    this.ball = new Ball;
    this.rect = new Rect;
    console.log(this.rect.size.x)


    this.players = [ new Player, new Player];

    this.players[0].pos.x = 10;
    this.players[1].pos.x = this._canvas.width - 30;

    this.players.forEach(player => {
      player.pos.y = (this._canvas.height-100) / 2;
    })


    this.seperator = new Seperator;
    this.seperator.pos.x = (this._canvas.width-2)/2;

    this.text = [new Text, new Text]
    console.log(this.text[0])

    this.text[0].pos.x = this._canvas.width / 4;
    this.text[1].pos.x = this._canvas.width - (this._canvas.width  / 4) - 50;
    this.text.forEach(player => {
      player.pos.y = this._canvas.height / 5;
    })


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
    this.reset();
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

  drawText(text, point, color) {
    this._context.fillStyle = color;
    this._context.font = "50px Arial";
    this._context.fillText(text, point.x, point.y)
  }

  

  collide(player, ball) {
    if (player.left < ball.right && player.right > ball.left &&  player.top < ball.bottom && player.bottom > ball.top) {

      const len = ball.vel.len;
      ball.vel.x = -ball.vel.x;
      ball.vel.y += 300 * (Math.random() - .5);
      // ball.vel.len = len * 1.05; /* increase the ball speed as it collide */
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

    this.drawText(this.players[0].score, this.text[0].pos, "white")
    this.drawText(this.players[1].score, this.text[1].pos, "white")
    
    

  }

  reset() {

    this.ball.pos.x = this._canvas.width/2;
    this.ball.pos.y = this._canvas.height /2;

    this.ball.vel.x = 0;
    this.ball.vel.y = 0;
  }

  resetAll() {
    this.reset()

    this.players[0].score = "0";
    this.players[1].score = "0";

    message.style.display = "none"
    retry.style.display = "none";
    message.innerHTML = "";
    retry.innerHTML = "";

  }


  gameover() {
    let count = 5
    if (this.players[0].score + this.players[1].score >= count && this.players[0].score < this.players[1].score) {
      message.style.display = "block";
      retry.style.display = "block";
      message.innerHTML = "GAME OVER"
      retry.innerHTML = "Try Again?"
      this.reset()
    } else if (this.players[0].score + this.players[1].score >= count && this.players[0].score > this.players[1].score) {
      message.style.display = "block";
      retry.style.display = "block";
      message.innerHTML = "You Won"
      message.style.color = "Green"
      retry.innerHTML = "Try Again?"
      this.reset()
    }
  }

  start() {
    let count = 0
    if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {

      // this happens when the user clicks the screen to start the game and the ball's velocity starts in random direction
      this.ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1);
      this.ball.vel.y = 300 * (Math.random() * 2 -1);

      this.ball.vel.len = 400; /*this is the overall ball speed*/

    }
  }

  detectUserWall() {
    if(this.players[0].pos.y < 0) {
      this.players[0].pos.y = 0
    } else if(this.players[0].pos.y + this.players[0].size.y > this._canvas.height) {
      this.players[0].pos.y = this._canvas.height - this.players[0].size.y;
    }
  }


  newUserPos() {
    this.players[0].pos.y += this.players[0].dy;
    this.detectUserWall()
  }


  moveUserUp() {
    this.players[0].dy = -this.players[0].speed;
    
  }
  
  moveUserDown() {
    this.players[0].dy = this.players[0].speed;
  }






  update(dt) {
    this.ball.pos.x += this.ball.vel.x * dt;
    this.ball.pos.y += this.ball.vel.y * dt;

    // detect if ball touched corner

    if (this.ball.left < 0 )  {
      this.players[1].score++;
      this.reset();
    }

    else if (this.ball.right > this._canvas.width) {
      this.players[0].score++;
      this.reset()
    }
      

    if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
      this.ball.vel.y = -this.ball.vel.y;
    }


    // to make the Cpu move
    // this.players[1].pos.y = this.ball.pos.y;
    if (this.players[1].pos.y < this.ball.pos.y) {
      this.players[1].pos.y += 6
    } else {
      this.players[1].pos.y -= 6

    }

    this.players.forEach(player => {
      this.collide(player, this.ball)
    })

    this.newUserPos()

    this.gameover()

    this.draw()

}

}

// canvas.on

const canvas = document.getElementById("Pong")
const pong = new Pong(canvas);

const message = document.getElementById("message");
const retry = document.getElementById("retry");




// use the mouse movement

// canvas.addEventListener("mousemove", event => {
//   let boundary = canvas.getBoundingClientRect();
//   pong.players[0].pos.y = event.clientY - boundary.top - pong.players[0].size.y/2;
// })

canvas.addEventListener("click", () => {
  pong.start();
})


retry.addEventListener("click", () => {
  pong.resetAll();

})


const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")




btn1.addEventListener("click", function() {
  pong.moveUserUp();

});

btn2.addEventListener("click", function() {
  pong.moveUserDown();
})
  


// to use the keyboard movement


// function keyDown(e) {
//   if (e.key == "ArrowUp" || e.key == "Up") {
//     pong.moveUserUp();
//   }
//   else if (e.key == "ArrowDown" || e.key == "Down") {
//     pong.moveUserDown();
//   }
// }



// function keyUp(e) {
//   if (
//     e.key == "Up" ||
//     e.key == "ArrowUp" ||
//     e.key == "Down" ||
//     e.key == "ArrowDown"
//     )
//   {
//     pong.players[0].dy = 0;
//   }
// }







