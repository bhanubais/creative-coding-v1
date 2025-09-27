// Import the library
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [1024, 1024],
  animate: true,
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  // collection of agents
  const agents = [];
  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // draw all agents
    agents.forEach(agent => {
      agent.draw(context);
      agent.update();
      agent.bounce(width, height);
    });

  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent extends Vector {
  constructor(x, y) {
    super(x, y);
    this.radius = random.range(4, 12);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.x <= 0 || width <= this.x) this.vel.x *= -1;
    if (this.y <= 0 || height <= this.y) this.vel.y *= -1;
  }
}