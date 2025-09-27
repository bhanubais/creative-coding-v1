## canvas-sketch

- [Installation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/installation.md)
- [Hello World Sketch](https://github.com/mattdesl/canvas-sketch/blob/master/docs/hello-world.md)

## Quick start

New file
`npx canvas-sketch-cli sketches/sketch-01.js --new --open`

Open existed file
`npx canvas-sketch-cli sketches/sketch-01.js --open`

## Boilerplate for a new sketch

```js
// Import the library
import canvasSketch from "canvas-sketch";

// Specify some output parameters
const settings = {
  // The [width, height] of the artwork in pixels
  dimensions: [400, 400]
};

// Start the sketch
const sketch = (props) => {
  // Destructure what we need from props
  const { context, width, height } = props;

  return () => {
    // Fill the canvas with pink
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    // Now draw a white rectangle in the center
    context.strokeStyle = "white";
    context.lineWidth = 4;
    context.strokeRect(width / 4, height / 4, width / 2, height / 2);
  };
};

// Start the sketch with parameters
canvasSketch(sketch, settings);

```
