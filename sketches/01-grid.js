// Import the library
const canvasSketch = require('canvas-sketch');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: 'A4',
  orientation: 'landscape',
  pixelsPerInch: 300
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  // grid constants
  const size = Math.min(width, height);
  const n = 5;
  const w = size * 0.1;
  const h = size * 0.1;
  const gap = size * 0.03; // Space between cells
  const gtr = size * 0.01;  // gutter: space between outer and inner square

  // make sure the grid will be in center of the page
  const x0 = (width - (w * n + gap * (n - 1))) / 2;
  const y0 = (height - (h * n + gap * (n - 1))) / 2;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = size * 0.01;

    // Creating Grid
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        const cx = x0 + (w + gap) * row;
        const cy = y0 + (h + gap) * col;

        // Outer square
        context.beginPath();
        context.strokeRect(cx, cy, w, h);

        // Inner square
        if (Math.random() > 0.5) {
          context.beginPath();
          context.strokeRect(cx + gtr, cy + gtr, w - gtr * 2, h - gtr * 2);
        }
      }
    }

  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
