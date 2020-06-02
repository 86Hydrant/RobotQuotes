// northern lights

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  frameRate(10);

  //bezier(x1, y1, x2, y2, x3, y3, x4, y4)

  //  bezier(100, 100, 150, 150, 120, 200, 300, 200);
  translate(50, 100);
  let yoff = 0;
  for (let y = 1; y < 10; y = y + 0.1) {
    let xoff = 0;
    let noiseX = map(noise(xoff, yoff), 0, 1, 0, 20);
    //  for (let x = 1; x < 20; x++) {
    console.log(noiseX);
    stroke(0, 100 * noiseX, 150, noiseX * 10);
    strokeWeight(3);

    //line(x1, y1, x2, y2);
    line(y * noiseX, y, y * noiseX, y + 5);
    //  line(y * noiseX + 1, y, y * noiseX + 1, y + floor(random(15)) + 10);

    xoff += 0.02;
    //  }
    yoff += 0.02;
  }
}
