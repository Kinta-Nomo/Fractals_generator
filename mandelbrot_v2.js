
range = 200; 
iteration = 50;
zoom = 100
centerx = 0
centery = 0

picture = []
for (var i = 0; i<range*2; i++){
  picture.push([])
  for (var j = 0; j<range*2; j++){
    picture[i].push(0);
  }
}

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
      picture[i+range][j+range] = colour
      //stroke(color[0], color[1], color[2]);
      //point(i, j)
      //set(i+250, j+250, colour);
    }
  }
  //updatePixels();
}

function updateMandelbrot(){
  for (var i = 0; i < range*2; i++){
    for (var j = 0; j < range*2; j++){
      try{
        set(i, j, picture[i][j]);
      }catch(err){
        debugger
        console.log(picture[i][j])
      }
    }
  }
  updatePixels();
  //console.log("ran")
}


function draw(){
  if (isDown){
    for (var i = 0; i < range*2; i++){
      for (var j = 0; j < range*2; j++){
        try{
          set(i, j, picture[i][j]);
        }catch(err){
          debugger
          console.log(picture[i][j])
        }
      }
    }
    updatePixels();
    //console.log("ran")
  }
} 


function mouseDragged(){
  difference = [mouseX-prevPos[0], mouseY-prevPos[1]];
  centerx -= difference[0];
  console.log(centerx, difference);

  if (difference[0] > 0){
    picture = picture.slice(0, (range*2)-difference[0]);

    //for newly generated points, calculate for all
    for (i = 0; i<difference[0]; i++){
      picture.splice(i,0,[])
      for (j = -range; j<range; j++){
        picture[i].push(mandelbrot(((i-200)+centerx)/zoom, (j+centery)/zoom, 0, 0, iteration))
      }
    }
  }else if (difference[0] < 0){

    picture = picture.slice(-difference[0], range*2)
    
    //for newly generated points, calculate for all
    for (i = 0; i>difference[0]; i--){
      picture.splice(picture.length+i,0,[]);
      for (j = -range; j<range; j++){
        picture[picture.length-1+i].push(mandelbrot(((i+200)+centerx)/zoom, (j+centery)/zoom, 0, 0, iteration))
      }
    }
  }


  // debugger

  prevPos = [mouseX, mouseY];
  
}

isDown = 0
prevPos = []
innitialPos = []

function mousePressed(){
  prevPos = [mouseX, mouseY];
  innitialPos = [mouseX, mouseY];
  isDown = true
}

function mouseReleased(){
  isDown = false
  // console.log(13)
  // //zoom*=2
  // //translate(250,250)  
  // drawMandelbrot(mouseX-width/2, mouseY-height/2);
}


function mouseWheel(event) {
  if (event.delta > 0){
    zoom += 100
    drawMandelbrot(centerx, centery);
    updateMandelbrot();
  }else if(event.delta < 0){
    zoom -= 100
    drawMandelbrot(centerx, centery);
    updateMandelbrot();
  }
}