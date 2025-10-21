/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "../util.js";

// State variables are the parts of your program that change over time.
let things = [Util.thing];

// Settings variables should contain all of the "fixed" parts of your programs

// Code that runs over and over again
function loop() {

  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  document.addEventListener('pointerdown', (e) => {
    const thing = Util.createThing();
    Util.setPosition(e.clientX / window.innerWidth, e.clientY / window.innerHeight, thing);
    things.push(thing);
  });

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
