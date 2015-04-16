var m;
var wind;
var gravity;
var friction;
var movers = [];
var coefficient = 0.5;
var width = 800;
var height = 300;
 
function setup() {
  createCanvas(800, 600);
  background(36, 83, 197);
  noStroke();
  wind = new p5.Vector(2.5, 0);
  gravity = new p5.Vector(0, 4);
  // Fill the movers array
  for (var i = 0; i < 7; i++) {
    movers[i] = new Mover(random(0, width), 0, random(5, 25));
  }

}
 
function draw() {
    // Draw the array of movers
  for (var i = 0; i < 7; i++) {
    var moverMass = movers[i].mass;
 
    // Make a copy of velocity and assign it to friction.
    var friction = movers[i].velocity;
	
    friction.mult(-1);
	if(friction.mag() != 0){
		friction.normalize();
	}
	else{
		friction = createVector(0, 0);
	}
    friction.mult(coefficient);
	console.log(friction.y, friction.x);
 
    m = movers[i];
    m.update();
    m.checkEdges();
    m.applyForce(gravity);
//	console.log(movers[1].velocity.y);
    m.applyForce(friction);
    m.display();
	console.log(friction.x);

  }
 
 
    // On click, make a gust of wind.
  if (mouseIsPressed) {
    for (var i = 0; i < 7; i++) {
      m = movers[i];
      m.applyForce(wind);
    }
  }

}  

 function Mover( _x, _y, _mass) {
	this.mass = _mass;
    this.location = createVector(_x, _y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
 } 
 
  Mover.prototype.update = function() {
    var topspeed = 50;
	
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    // Reset acceleration, ready to recieve new forces.
    this.acceleration.mult(0);
  }

 Mover.prototype.display = function() {
 
    ellipse(this.location.x, this.location.y, 2, 2);
    fill(250);
 
  }
 

 
  // Adds a PVector to acceleration to apply a force
  // Important to add and not replace so we don't mess up other forces
  // eg. make sure forces are accumulate.
  Mover.prototype.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
 
  Mover.prototype.checkEdges = function() {
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    }
 
     if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x *= -1;
    }
 
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y *= -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y *= -1;
    }
    
  }
  
 
function reRun() {
  createCanvas(800, 600);
  background(36, 83, 197);
  noStroke();
    
    for (var i = 0; i < 7; i++) {
      movers[i] = new Mover(random(0, width), 0, random(5, 25));
    }

  }

  
function keyPressed() {
  if (key == 'g')
  {
    gravity.y *= -1;
  }
  
    if (keyCode == 'r')
  {
    reRun();
  }
  
  if (keyCode == 's')
  {
//    if (!player.isPlaying())
//    player.play();
//  else
//    player.pause();
//  }
  
}
}