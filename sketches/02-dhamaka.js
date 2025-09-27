// Import the library
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [1024, 1024]
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const ix = width * .5;
    const iy = height * .5;
    const w = width * 0.1;
    const h = height * 0.01;
    const n = 40;
    const radius = width * .3;
    const slice = math.degToRad(360 / n);
    let angle;
    let cx, cy;

    for (let i = 0; i < n; i++) {
      angle = slice * i;
      cx = ix + radius * Math.cos(angle);
      cy = iy + radius * Math.sin(angle);
      
      // Rays
      context.save();
      context.translate(cx, cy);
      context.rotate(angle);
      context.scale(random.range(.2, .5), random.range(.1, 2));

      context.beginPath();
      context.rect(-w * random.range(0, .5), -h * .5, w, h);
      context.fill();
      context.restore();

      // Arcs
      context.save();
      context.translate(ix, iy);
      context.rotate(angle);

      context.lineWidth = random.range(5, 20);
      context.beginPath();
      context.arc(0, 0, 
        radius * random.range(.2, 1.3), 
        slice * random.range(-8, 1), // startAngle
        slice * random.range(1, 5)); // endAngle
      context.stroke();
      context.restore();

    }

  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
