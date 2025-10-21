/*
 * IDB Programming: Code Playground
 */

import * as Util from "../util.js";

// State variables
let things = [];
let activeThing = null;

// Settings
const size = 100;

// Animation loop
function loop() {
  for (const thing of things) {
    Util.setPositionPixels(thing.x, thing.y, thing.element);
  }
  requestAnimationFrame(loop);
}

// Create n circles
function createThing(n) {
  for (let i = 0; i < n; i++) {
    const element = Util.createThing();
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);
    const hue = (i * 360) / n;

    Util.setPositionPixels(x, y, element);
    Util.setColour(hue, 100, 50, 0.7, element);

    things.push({ element, x, y, hue, isDragging: false });
  }
}

// Event handlers
function handlePointerDown(event, thing) {
  thing.isDragging = true;
  activeThing = thing;
}

function handlePointerUp() {
  if (activeThing) {
    activeThing.isDragging = false;
    activeThing = null;
  }
}

function handlePointerMove(event) {
  if (activeThing && activeThing.isDragging) {
    activeThing.x = event.x - size / 2;
    activeThing.y = event.y - size / 2;
  }
}

// Setup everything
function setup() {
  createThing(12);

  // Pointerdown for each circle
  for (const thing of things) {
    thing.element.addEventListener("pointerdown", (e) =>
      handlePointerDown(e, thing)
    );
  }

  // Global pointer listeners
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);

  requestAnimationFrame(loop);
}

setup();
