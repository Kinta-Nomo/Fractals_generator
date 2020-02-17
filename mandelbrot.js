
range = 200; 
iteration = 5;
zoom = 100

function setup(){
  createCanvas(500,500);
  background(240);
  strokeWeight(3);
  //translate(250,250)  
  colorMode(HSB);
  drawMandelbrot(0, 0);
}

function mandelbrot(cr, ci, zr, zi, iterations){
  zr = 0
  zi = 0
  for (var i = 0; i<iterations; i++){
    newzr = zr**2 - zi**2 + cr
    newzi = 2*zr*zi + ci
    zr = newzr
    zi = newzi
    if ((zr**2 + zi**2)**0.5 > 2){
      return color(i*9,255,255)
    }
  }
  return color(0, 0, 0)
}

function drawMandelbrot(x, y){
  for (var i = -range; i < range; i++){
    for (var j = -range; j < range; j++){
      colour = mandelbrot((i+x)/zoom, (j+y)/zoom, 0, 0, 50)
      //stroke(color[0], color[1], color[2]);
      //point(i, j)
      set(i+250, j+250, colour);
    }
  }
  updatePixels();
}

function mouseReleased(){
  console.log(13)
  //zoom*=2
  //translate(250,250)  
  drawMandelbrot(mouseX-width/2, mouseY-height/2);
}