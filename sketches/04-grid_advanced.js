// Import the library
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 1024, 1024 ]
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  const gridW = width * .8;
  const gridH = height * .8;
  const cols = 10;
  const rows = 10;
  const cells = cols * rows;
  const marginX = (width - gridW) * .5;
  const marginY = (height - gridH) * .5;
  const cellW = gridW / cols;
  const cellH = gridH / rows;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < cells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const w = cellW * .8;
      const h = cellH * .8;
      const x = cellW * col;
      const y = cellH * row;

      // Simplex 2D Noise number
      // Range of n: -1 to 1
      const n = random.noise2D(x, y, 0.001);

      let angle = n * Math.PI;  // -180 to 180
      angle *= 0.2;             // -36 to 36
      const scale = math.mapRange(n, -1, 1, 1, 30);
      console.log(n);

      context.save();
      context.translate(marginX, marginY);
      context.translate(x, y);
      context.translate(cellW * .5, cellH * .5);

      context.rotate(angle);
      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(-w * .5, 0);
      context.lineTo(w * .5, 0);
      context.stroke();

      context.restore();

    }

  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
