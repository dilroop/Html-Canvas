function log(x){ console.log(x); }
var canvas = document.getElementById('can');
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var cx=canvas.width/2;
var cy=canvas.height/2;
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

var back = "#ffffff"
var planets = [];
var _G = -9.80;
var magnitude =100 ;

function Planet(x,y,size,mass,color)
{
    this.x=x;
    this.y=y;
    this.color=color;
    this.mass=mass;
    this.size = size;
    this.sx = 0;
    this.sy = 0;
    this.distance = function(xx,yy)
    {
        return Math.sqrt( Math.pow(this.x-xx,2) + Math.pow(this.y-yy,2) );
    }

    this.draw = function()
    {
      c.fillStyle=this.color;
      c.beginPath();
      c.arc(this.x,this.y,this.size,0,Math.PI*2);
      c.fill();
      console.log(this.x,this.y);
    }

    this.update = function(planet)
    {
      var distance = this.distance(planet.x, planet.y);
      var force =  this.mass * planet.mass * magnitude ;
      force = force / Math.pow(distance,2);

      var dx = planet.x-this.x;
      var dy = planet.y-this.y;
      var angle = Math.atan2(dx,dy);

      this.sx = Math.sin(angle) * force ;
      this.sy = Math.cos(angle) * force ;
      this.x += this.sx;
      this.y += this.sy;

    }
}

function Init(){
  planets=[];
  var p1 = new Planet(cx-200,cy,60,1,"#000000");
  var p2 = new Planet(400,200,30,1,"#ff0000");
  planets.push(p1);
  planets.push(p2);
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle =back;
  c.fillRect(0,0,canvas.width,canvas.height);

  planets[0].draw();
  planets[1].draw();

  
  planets[1].update(planets[0]);

  c.beginPath();
  c.fillStyle="#fff000";
  c.arc(mouseX,mouseY,5,0,Math.PI*2);
  c.fill();
}
Init();
animate();
