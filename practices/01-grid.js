// Import the library
const canvasSketch = require('canvas-sketch');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 600, 600 ],
  // animate: true,
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  const rows = 5;
  const cols = 5;
  const cells = rows * cols;
  const gWidth = width * 0.8;
  const gHeight = height * 0.8;
  const x = (width - gWidth) * 0.5;
  const y = (height - gHeight) * 0.5;

  const gap = width * 0.03;
  const cw = (gWidth - (gap * (cols - 1))) / cols;
  const ch = (gHeight - (gap * (rows - 1))) / rows;

  let col, row, cx, cy;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = 5;

    for (let i = 0; i < cells; i++) {
      col = i % cols;
      row = Math.floor(i / cols);
      cx = col * (cw + gap);
      cy = row * (ch + gap);

      context.save();
      context.translate(x, y);
      context.translate(cx, cy);
      context.beginPath();
      context.rect(0, 0, cw, ch);
      context.stroke();
      
      if (Math.random() < 0.5) {
        context.beginPath();
        context.lineWidth = 10;
        context.rect(5, 5, cw - 10, ch - 10);
        context.stroke();
      }
      
      context.restore();
    }

  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
