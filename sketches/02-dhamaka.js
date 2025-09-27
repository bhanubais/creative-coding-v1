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
    const n = 12;
    const radius = width * .3;
    const slice = math.degToRad(360 / n);
    let angle;
    let cx, cy;

    for (let i = 0; i < n; i++) {
      angle = slice * i;
      cx = ix + radius * Math.cos(angle);
      cy = iy + radius * Math.sin(angle);
      
      context.save();
      context.translate(cx, cy);
      context.rotate(angle);
      context.scale(1, random.range(1, 3));

      context.beginPath();
      context.rect(-w * .5, -h * .5, w, h);
      context.fill();
      context.restore();

      
    }

  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
