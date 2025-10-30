// Import the library
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 500, 500 ],
};

const points = [];

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  const m = 10; // number cells in a column
  const n = 10; // number of cells in a row
  const strokeColor = '#dce4f1';
  const lineWidth = 0.5;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // create the grid
    grid(context, width, height, m, n, lineWidth, strokeColor);

    // move each intersection points randomly
    points.forEach(point => {
      setInterval(() => {
        point.move();
      }, 50);
    });
  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);

const grid = (context, width, height, m = 4, n = 3, lineWidth = 0.5, strokeColor = 'pink') => {
  const w = Math.floor(width / n); // cell's width
  const h = Math.floor(height / m); // cell's height

  context.lineWidth = lineWidth;
  context.strokeStyle = strokeColor;

  const intersects = (m - 1) * (n - 1);

  for (let i = 0; i < intersects; i++) {
    const ix = (i % (n - 1)) + 1;
    const iy = Math.floor(i / (n - 1)) + 1;
    const x = w * ix;
    const y = h * iy;

    // Grid
    // ------------------
    context.save();
    context.beginPath();
    // Vertical Line
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, height);
    // Horizontal Line
    context.moveTo(0, y + 0.5);
    context.lineTo(width, y + 0.5);
    context.stroke();
    context.restore();

    // Intersects
    // ------------------
    const point = new Point(x, y);
    points.push(point);
    point.draw(context, strokeColor);
  }

};

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Point extends Vector {
  constructor(x, y) {
    super(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
  }

  draw (context, color = '#dce4f1') {
    context.fillStyle = color;
    context.save();
    context.beginPath();
    context.arc(this.x + 0.5, this.y + 0.5, 3, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  move () {
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
}