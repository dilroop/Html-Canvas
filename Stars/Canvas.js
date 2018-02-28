function log(x){ console.log(x); }
var canvas = document.getElementById('can');
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var grd=c.createRadialGradient(window.innerWidth/2,window.innerHeight/2,5,window.innerWidth,window.innerHeight,window.innerWidth);
grd.addColorStop(1,"#00057c");
grd.addColorStop(0,"#0a0142");

c.fillStyle = grd;
c.fillRect(0,0,canvas.width,canvas.height);
// Variables
var mouseX;
var mouseY;
var back= "#0000ffff";

var colors = [
  "#46B29D",
  "#F0CA4D",
  "#E37B40",
  "#F53855",
  "#4D4CFF"
]

// Events
window.addEventListener('mousemove', function (event){
  mouseX = event.x;
  mouseY = event.y;
});

window.addEventListener('resize', function (event){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Init()
});

// Functions
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Star(x,y,radius,color)
{
  this.x = x;
  this.y = y;
  this.radius=radius;
  this.color =color;

  this.draw = function()
  {
    //this.Update();

    c.beginPath();
    c.fillStyle=this.color+"10";
    c.arc(this.x,this.y,this.radius+10,0,Math.PI*2);
    c.fill();
    c.fillStyle=this.color;
    c.arc(this.x,this.y,this.radius,0,Math.PI*2);
    c.fill();
  }
  this.Update = function ()
  {
    this.radians +=this.velocity;
    this._x=this.x;
    this._y=this.y;
    this.x = Math.cos(this.radians) * this.factorRound + mouseX ;
    this.y = Math.sin(this.radians) * this.factorRound + mouseY ;

  }

  this.distance = function(){
    return Math.sqrt( Math.pow(this.x-mouseX,2) + Math.pow(this.y-mouseY,2) );
  }
}

var objects = []
var noOfObjects = 80;
var minRadius = 1;
var maxRadius = 2;
var senseMouse=100;

function Init()
{
  objects = []
  for(var i=0;i<noOfObjects;i++)
  {
    var radius = random(minRadius,maxRadius);
    var x = random(radius,canvas.width-radius);
    var y = random(radius,canvas.height-radius);
    var color = "#fff";

    var tmp = new Star(x,y,radius,color);
    objects.push(tmp);
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle =grd;
  c.fillRect(0,0,canvas.width,canvas.height);

  for(var i=0;i<objects.length;i++)
  {
      var obj = objects[i];
      obj.draw();
  }
}
Init();
animate();
