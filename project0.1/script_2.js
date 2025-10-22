/*
 * IDB Programming: Code Playground
 */

import * as Util from "../util.js";

//
let socks = []; // All socks
let activeSock = null; // Sock currently being dragged

let pileX = [100, 200, 300]; // X positions for sock pile
let pileY = [100, 150, 200]; // Y positions for sock pile

let closet = Util.createThing("closet"); // Closet element
Util.setSize(100, closet);
Util.setColour(180, 100, 50, 1, closet);
Util.setRoundedness(0.1, closet);
Util.setPositionPixels(100, 400, closet);

const sockSize = 50; // Sock size

// Target boxes
const targetBoxes = [
  { x: 500, y: 200, width: 150, height: 150, hue: 120, color: "red" },
  { x: 500, y: 400, width: 150, height: 150, hue: 240, color: "green" },
  { x: 500, y: 600, width: 150, height: 150, hue: 360, color: "blue" },
];

// Appearence target boxes. It could be changed
for (const box of targetBoxes) {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.left = `${box.x}px`;
  div.style.top = `${box.y}px`;
  div.style.width = `${box.width}px`;
  div.style.height = `${box.height}px`;
  div.style.border = `4px solid ${box.color}`;
  div.style.borderRadius = "12px";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.fontFamily = "sans-serif";
  div.style.fontWeight = "bold";
  div.style.color = box.color;
  div.textContent = box.color.toUpperCase();
  document.body.appendChild(div);
  box.element = div;
}

//  FUNCTIONS
function generateSocks() {
  // Clear existing socks
  for (const s of socks) {
    s.element.remove();
  }
  socks = [];

  // Create 3 socks
  for (let i = 0; i < 3; i++) {
    let sock = Util.createThing();

    const x = pileX[i];
    const y = pileY[i];
    const hue = i * 120 + 120;

    Util.setSize(sockSize, null, sock);
    Util.setPositionPixels(x, y, sock);
    Util.setColour(hue, 100, 50, 1, sock);
    Util.setRoundedness(0.5, sock);

    const sockObj = {
      element: sock,
      x,
      y,
      hue,
      isDragging: false,
    };
    socks.push(sockObj);

    //  attach pointerdown listener right here
    sock.addEventListener("pointerdown", (e) => handlePointerDown(e, sockObj));
  }
}

// HANDLERS
function handlePointerDown(event, sock) {
  sock.isDragging = true;
  activeSock = sock;
}

function handlePointerUp() {
  if (activeSock) {
    activeSock.isDragging = false;
    activeSock = null;
  }
}

function handlePointerMove(event) {
  if (activeSock && activeSock.isDragging) {
    activeSock.x = event.x - sockSize / 2;
    activeSock.y = event.y - sockSize / 2;
  }
}

// MAIN LOOP
function loop() {
  for (const sock of socks) {
    Util.setPositionPixels(sock.x, sock.y, sock.element);
  }
  requestAnimationFrame(loop);
}

// SETUP
function setup() {
  closet.addEventListener("click", generateSocks);

  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);

  requestAnimationFrame(loop);
}

setup();
