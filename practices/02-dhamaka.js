// Import the library
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 1080, 1080 ],
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  const n = 40;
  let radius = width * 0.3;
  const slice = math.degToRad(360 / n);

  const ix = width * 0.5;
  const iy = height * 0.5;

  const w = width * 0.125;
  const h = width * 0.0125;
  let cx, cy, angle;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    for (let i = 0; i < n; i++) {
      angle = i * slice;
      cx = ix + radius * Math.cos(angle);
      cy = iy + radius * Math.sin(angle);

      // Rays
      context.save();
      context.translate(cx, cy);
      context.rotate(angle);
      context.scale(random.range(0.2, .5), random.range(0.2, 2));

      context.beginPath();
      context.rect(-w * random.range(0, 0.5), -h * 0.5, w, h);
      context.fill();

      context.restore();


      // Arcs
      context.save();
      context.translate(ix, iy);
      context.rotate(angle);

      context.lineWidth = random.range(5, 20);
      context.beginPath();
      context.arc(0, 0, 
        radius * random.range(0.2, 1.3), 
        slice * random.range(-8, 1), 
        slice * random.range(1, 5)
      );
      context.stroke();
      
      context.restore();

    }

  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
