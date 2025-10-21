/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "../util.js";

// State variables are the parts of your program that change over time.
let rotate = 0;
let roundedness = 0;

// Settings variables should contain all of the "fixed" parts of your programs

// Code that runs over and over again
function loop() {
  rotate += 1;
  Util.setRotation(rotate % 360);
  roundedness += 0.005;
  Util.setRoundedness(Math.sin(roundedness) * 0.2 + 0.25);

  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
