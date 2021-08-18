var canvas = document.querySelector('canvas');

const max_rad = 30;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  // console.log(mouse);
});



const randomColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    const random = Math.random();
    const bit = (random * 16) | 0;
    color += (bit).toString(16);
  };
  return color;
};

function Circle(x, y, dx, dy, rad, color) {

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rad = rad;
  this.color = color;
  this.min_rad = rad;


  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.strokeStyle = this.color;
    c.fill();
    c.stroke();
  }

  this.update = () => {
    if (this.x + this.rad > canvas.width || this.x - this.rad < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.rad > canvas.height || this.y - this.rad < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (mouse.x - this.x < 70 && 
      mouse.x - this.x > -70 &&
      mouse.y - this.y < 70 && 
      mouse.y - this.y > -70){
        if (this.rad < max_rad)
        {
          this.rad += 3; 
        }
    }
    else if (this.rad > this.min_rad){
      this.rad -= 1;
    }
    

    this.draw();
  }
}


// console.log(circleArr);

var circleArr = [];

function init() {

  circleArr = [];

  for (let i = 0; i < 750; i++) {
    var rad = (Math.random() * 5) + 1;
    var x = Math.random() * (canvas.width - rad * 2) + rad;
    var y = Math.random() * (canvas.height - rad * 2) + rad;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;
    var color = randomColor();
    circleArr.push(new Circle(x, y, dx, dy, rad, color));
  }
}


let animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  } 
}
animate();
init();