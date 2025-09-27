// Import the library
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 1024, 1024 ],
  animate: true,
  fps: 60
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  const n = 40;

  // collection of agents
  const agents = [];
  for (let i = 0; i < n; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Handling connection
    for (let i = 0; i < n; i++) {
      const agent = agents[ i ];
      for (let j = i + 1; j < n; j++) {
        const other = agents[ j ];

        // Ignore line if the distance is more than 200
        const dist = agent.distance(other);
        if (dist > 200) continue;

        // variable lineWidth based on the distance.
        context.lineWidth = math.mapRange(dist, 0, 200, 20, .5);

        // draw connecting lines
        context.beginPath();
        context.moveTo(agent.x, agent.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
    }

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

  distance (other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  draw (context) {
    context.save();
    context.translate(this.x, this.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }

  update () {
    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  bounce (width, height) {
    if (this.x <= 0 || width <= this.x) this.vel.x *= -1;
    if (this.y <= 0 || height <= this.y) this.vel.y *= -1;
  }
}