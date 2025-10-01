// Import the library
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const TweakPane = require('tweakpane');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 1024, 1024 ],
  animate: true
};

// TweakPane parameters
const params = {
  cols: 20,
  rows: 20,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  animate: true,
  frame: 0,
  lineCap: "butt",
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  return ({ frame }) => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const gridW = width * 0.8;
    const gridH = height * 0.8;
    const cols = params.cols;
    const rows = params.rows;
    const cells = cols * rows;
    const marginX = (width - gridW) * 0.5;
    const marginY = (height - gridH) * 0.5;
    const cellW = gridW / cols;
    const cellH = gridH / rows;


    for (let i = 0; i < cells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const w = cellW * 0.85;
      const h = cellH * 0.85;
      const x = cellW * col;
      const y = cellH * row;

      const f = params.animate ? frame * 10 : params.frame;

      // Simplex 2D Noise number
      // Range of n: -1 to 1
      // const n = random.noise2D(x + frame * 10, y, params.freq);
      const n = random.noise3D(x, y, f, params.freq);

      let angle = n * Math.PI;  // -180 to 180
      angle *= params.amp;             // -36 to 36
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(marginX, marginY);
      context.translate(x, y);
      context.translate(cellW * 0.5, cellH * 0.5);

      context.rotate(angle);
      context.lineWidth = scale;
      // context.lineWidth = 5;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(-w * 0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();

    }

  };
};

// Pane
const createPane = () => {
  const pane = new TweakPane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' } });
  folder.addInput(params, 'cols', { min: 2, max: 40, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 40, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amp', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999 });
};
createPane();

// Start the sketch with parameters
canvasSketch(sketch, settings);
