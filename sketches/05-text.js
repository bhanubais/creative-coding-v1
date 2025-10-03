// Import the library
const canvasSketch = require('canvas-sketch');

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [ 1080, 1080 ]
};

let manager;
let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  const cell = 20;
  const scale = 1 / cell;
  const cols = Math.floor(width * scale);
  const rows = Math.floor(height * scale);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return () => {
    // Fill the canvas with pink
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);
    
    fontSize = cols;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = "top";
    typeContext.textAlign = "center";

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft;
    const my = metrics.actualBoundingBoxAscent;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5;
    const ty = (rows - mh) * 0.5;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    // typeContext.rect(0, 0, mw, mh);
    // typeContext.strokeStyle = 'white';
    // typeContext.stroke();

    typeContext.fillText(text, mx, my);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[ i * 4 + 0 ];
      const g = typeData[ i * 4 + 1 ];
      const b = typeData[ i * 4 + 2 ];
      const a = typeData[ i * 4 + 3 ];

      context.save();
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      // context.fillRect(0, 0, cell, cell);

      context.beginPath();
      context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      context.fill();
      
      context.restore();
    }

    context.drawImage(typeCanvas, 0, 0);
  };
};

const onKeyUp = e => {
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', onKeyUp);

// Start the sketch with parameters
const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();


/*
const url = "https://picsum.photos/id/265/420/300";

const loadSomeImage = url => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

// Async calling
const start = async () => {
  const img = await loadSomeImage(url);
  console.log('Image width: ', img.width);
  console.log('This line');
};

// 
// const start = () => {
//   loadSomeImage(url).then(img => {
//     console.log('Image width: ', img.width);
//   });
//   console.log('This line');
// };

start();
*/
