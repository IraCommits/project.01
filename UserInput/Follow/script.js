/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "../../util.js";

// State variables are the parts of your program that change over time.
let x=0;
let y=0;
let targetX = 0;
let targetY = 0;

// Settings variables should contain all of the "fixed" parts of your programs


// Functions
function moveTowards(current, target, amount=0.1){
  return current + (target - current) * amount;
}

// Code that runs over and over again
function loop() {
  x = moveTowards(x, targetX);
  y = moveTowards(y, targetY);

  Util.setPosition(x, y);

  window.requestAnimationFrame(loop);
}

function handlePointerMove(event){
  // window.innerWidth/Height is the width/height of the browser window
  targetX = event.x / window.innerWidth;
  targetY = event.y / window.innerHeight;
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here
  document.addEventListener('pointermove', handlePointerMove)

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
