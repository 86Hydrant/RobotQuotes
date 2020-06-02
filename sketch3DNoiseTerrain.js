// 3D Perlin noise - terrain

let width = 3000;
let height = 1300;
let scl = 10;
let rows = height / scl;
let cols = width / scl;
let xoff = 0;
let yoff = 0;
let inc = 0.07;
let terrain = [];
let terrainFill = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    terrainFill[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
      terrainFill[x][y] = 0;
    }
  }
}

function draw() {
  background(12, 28, 64);
  frameRate(20);

  //Draw Stars

  push();
  stroke(255);
  noFill();
  noLoop();
  for (let j = 0; j < 50; j++) {
    translate(random(-600, 0), random(-400, 0), random(-600, -300));
    sphere(2);
  }
  pop();
  push();
  stroke(255);
  noFill();

  for (let u = 0; u < 50; u++) {
    translate(random(-100, 800), random(-400, -200), random(-600, -300));
    sphere(2);
  }
  pop();

  //Draw northern lights
  push();

  translate(-450, -720, -350);
  let yoff = 0;
  for (let y = 1; y < 200; y = y + 0.1) {
    let xoff = 0;
    // Playing around with different noise variables
    let noiseX = map(noise(xoff, yoff), 0, 1, 0, 3);
    let noiseY = map(noise(xoff + 0.3, yoff + 0.3), 0, 1, 0, 100);
    let strokeN = map(noise(xoff, yoff), 0, 1, 0, 100);

    strokeWeight(8);
    //Slight randomness added to stroke to simulate the lights moving naturally
    stroke(
      10 * random(1.1, 1.2),
      strokeN * 2 * random(1.1, 1.2),
      100 * random(1.1, 1.2),
      10 * random(1.1, 1.2)
    );
    line(y * noiseX - 1, y, y * noiseX, y + noiseY + 18);
    line(y * noiseX - 2, y, y * noiseX, y + noiseY + 15);
    line(y * noiseX - 3, y, y * noiseX, y + noiseY + 13);
    line(y * noiseX, y, y * noiseX, y + noiseY);
    //Slight randomness added to stroke to simulate the lights moving naturally
    stroke(
      strokeN * 0.4 * random(1.1, 1.2),
      strokeN * 2 * random(1.1, 1.2),
      strokeN * 0.4 * random(1.1, 1.2),
      100
    );
    line(y * noiseX, y, y * noiseX, y + noiseY);

    xoff += 0.06;
    yoff += 0.005;
  }
  pop();

  // draw 3D terrain
  //calculating noise values for the x and y of the terrain and changing them slightly for every loop
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -80, 80);
      //making seperate noise values for the colour
      terrainFill[x][y] = map(noise(xoff, yoff), 0, 1, 0, 255);
      xoff += inc;
    }
    yoff += inc;
  }
  // rotate the canvas so it looks natural
  rotateX(4000);
  //move it so it covers the entire width of the screen and is centered
  translate(-width / 2, -height / 2 + 50);

  for (y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (x = 0; x < cols; x++) {
      //taking away the outlines of the triangle strip
      noStroke();
      //making the colour change according to the noise values
      fill(
        terrainFill[x][y] * 0.2,
        terrainFill[x][y] * 0.15,
        terrainFill[x][y] * 0.4
      );
      //making the vertex points for the triangle strip, one to the side and one down for every row
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }

    endShape();
  }

  //  noLoop();
}

// make it so the visuals are redrawn when the button is pressed
const button = document.getElementById("button");
button.addEventListener("click", function () {
  redraw();
});

//make sure the sketch is resized when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
