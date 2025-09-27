## canvas-sketch

- [Installation](https://github.com/mattdesl/canvas-sketch/blob/master/docs/installation.md)
- [Hello World Sketch](https://github.com/mattdesl/canvas-sketch/blob/master/docs/hello-world.md)

## Quick start

**New file**

`npx canvas-sketch-cli sketches/sketch-01.js --new --open`

**Open existed file**

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

## Advanced Usages

### Output Folder

`--output=output/01`

While saving (pressing `ctrl+s` on the browser), the canvas design saves in the `output/01` folder.

### New file based on another file

`npx canvas-sketch-cli sketches/sketch-02.js --new --template=./sketches/sketch-01.js --open`

It will create a new file `sketch-02.js` with the exact code written inside `sketch-01.js`.

### Video output

`npm install @ffmpeg-installer/ffmpeg --global`

`--stream`

Press `ctrl+shift+s` to start streaming and again to stop streaming. After that an `mp4` file will be saved inside `--output` folder.

### Hot Reloading

`--hot`

Using this flag, the code changes will be evaluated and applied without forcing an entire page reload.

__Note__: While using this flag don't forget to "clean up" any side effects that your sketch creates. For example:

```js
const sketch = (props) => {
  const { context, width, height } = props;

  const timer = setInterval(() => {
    console.log('Tick!');
  });

  const onClick = () => {
    console.log('Screen clicked!');
  };
  window.addEventListener('click', onClick);

  return () => {
    render () {
      // Render your content ...
    },

    unload () {
      // Dispose of side-effects
      clearInterval(timer);
      window.removeEventListener('click', onClick);
    }
  };
};

canvasSketch(sketch, {animate: true});
```

If you are using ThreeJS, you can use `renderer.dispose()` to clean up its WebGL context during upload.

With regular page reloading (without the `--hot` flag), the browser will clean up resources automatically during page unload (including timers, events and canvas contexts). However, manually unloading resources is still a good practice if you want your sketch to be entirely self-contained and reusable.

### Multiple Sketches

If you happen to have multiple sketches (multiple `canvasSketch()` calls) in a single application, you will need to provide a unique `{ id }` for each sketch to ensure that hot reloading is applied correctly.

```js
canvasSketch(mainSketch, { id: 'primary' });
canvasSketch(otherSketch, { id: 'secondary' });
```

### Load resources folder

If you are building your website into a `public/`, `app/` or other sub-directory, you may need to specify this directory for assets to load with correct paths:

`--dir public`

## Building to a Website

```bash
# Render website to 'public/' without minification
npx canvas-sketch-cli mysketch.js --dir public --build --no-compress

# Render website to a single standalone file called 'index.html'
npx canvas-sketch-cli mysketch.js --name index --build --inline

# Render a website using a different HTML file and custom JS src
npx canvas-sketch-cli src/index.js --html=src/page.html --js=bundle.js
```

