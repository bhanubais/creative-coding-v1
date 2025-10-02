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

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = "top";
    context.textAlign = "center";

    const metrics = context.measureText(text);
    const mx = metrics.actualBoundingBoxLeft;
    const my = metrics.actualBoundingBoxAscent;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - mw) * 0.5;
    const y = (height - mh) * 0.5;

    context.save();
    context.translate(x, y);

    context.beginPath();
    context.rect(0, 0, mw, mh);
    context.stroke();

    context.beginPath();
    context.fillText(text, mx, my);

    context.restore();
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
