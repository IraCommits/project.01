/**
 * The default DOM element used by the utilities when no element is provided.
 * This selects the element with id "thing0" if present.
 * @type {HTMLElement|null}
 */
export const thing = document.querySelector("#thing0");

const state = {
  // store x/y in pixels (initialized to center of window)
  x: (window.innerWidth || 0) * 0.5,
  y: (window.innerHeight || 0) * 0.5,
  hue: 0,
  saturation: 100,
  lightness: 50,
  opacity: 1,
  // width/height in pixels (defaults chosen to match typical examples)
  width: 100,
  height: 100,
  roundedness: 0,
  rotation: 0,
};

/* Colour-related functions */
/**
 * Set the background colour of an element using HSL(A) values and update
 * the internal colour state.
 *
 * @param {number} h - Hue (0..360)
 * @param {number} [s=100] - Saturation in percent (0..100)
 * @param {number} [l=50] - Lightness in percent (0..100)
 * @param {number} [a=1] - Alpha/opacity (0..1)
 * @param {HTMLElement} [element=thing] - Optional element to update. If null,
 *   only the internal state is updated.
 * @returns {void}
 */
export function setColour(h, s = 100, l = 50, a = 1, element = thing) {
  state.hue = h;
  state.saturation = s;
  state.lightness = l;
  state.opacity = a;
  if (element != null) {
    element.style.backgroundColor = `hsl(${ h }, ${ s }%, ${ l }%, ${ a })`;
  }
}

/* Position-related functions */
function transform(element = thing) {
  if (element != null) {
    // state.x/state.y are stored in pixels now
    element.style.transform = `translate(${ state.x }px, ${ state.y }px) rotate(${ state.rotation }deg)`;
  }
}

/**
 * Set position using normalized coordinates (fractions of the window size).
 * The supplied x and y should be values in the range 0..1 where 0 is the
 * left/top and 1 is the right/bottom of the window. Internally the values
 * are converted to pixels and stored in `state.x`/`state.y`.
 *
 * @param {number} x - Normalized x position (0..1)
 * @param {number} y - Normalized y position (0..1)
 * @param {HTMLElement} [element=thing] - Optional element to update. If
 *   provided, the element's transform will be updated immediately.
 * @returns {void}
 */
export function setPosition(x, y, element = thing) {
  // x and y are fractions of the window size (0..1). Convert to pixels
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;

  state.x = x * w;
  state.y = y * h;

  if (element != null) {
    transform(element);
  }
}

/**
 * Set position using pixel coordinates.
 *
 * @param {number} px - X position in pixels from the left of the window
 * @param {number} py - Y position in pixels from the top of the window
 * @param {HTMLElement} [element=thing] - Optional element to update.
 * @returns {void}
 */
export function setPositionPixels(px, py, element = thing) {
  // With pixel-based state, just store the px/py values directly.
  state.x = px;
  state.y = py;

  if (element != null) {
    transform(element);
  }
}

/**
 * Set the size of the element. Call as either:
 *  - setSize(size)                    -> square (width = height = size)
 *  - setSize(width, height)          -> independent width and height
 *
 * If you want to target a specific element you must pass it as the third
 * argument: setSize(size, null, element) or setSize(width, height, element).
 *
 * @param {number} sizeOrWidth - Either the uniform size (px) or the width (px)
 * @param {number|null} [height=null] - Height in px. When omitted (null) height
 *   defaults to the same value as width.
 * @param {HTMLElement} [element=thing] - Optional element to update.
 * @returns {void}
 */
export function setSize(sizeOrWidth, height = null, element = thing) {
  const width = sizeOrWidth;
  const h = (height === null) ? sizeOrWidth : height;

  // Update state width/height
  state.width = width;
  state.height = h;

  const target = element || thing;
  if (target != null) {
    target.style.width = `${ width }px`;
    target.style.height = `${ h }px`;
  }
}

/**
 * Set the rotation (in degrees) for the element and update internal state.
 *
 * @param {number} rotation - Rotation in degrees
 * @param {HTMLElement} [element=thing] - Optional element to update.
 * @returns {void}
 */
export function setRotation(rotation, element = thing) {
  state.rotation = rotation;
  if (element != null) {
    transform(element);
  }
}

/**
 * Set the roundedness of the element (as a fraction, 0..1) and update
 * internal state. A value of 1 corresponds to 100% border-radius.
 *
 * @param {number} roundedness - Fractional roundedness (0..1)
 * @param {HTMLElement} [element=thing] - Optional element to update.
 * @returns {void}
 */
export function setRoundedness(roundedness, element = thing) {
  state.roundedness = roundedness;

  if (element != null) {
    element.style.borderRadius = `${ roundedness * 100 }%`;
  }
}

/**
 * Create and insert a new "thing" element into the document.
 * - className: the CSS class to give the element (default: 'thing')
 * - id: optional id to set for the element; if the id is already used a numeric
 *       suffix will be appended to keep it unique.
 * Returns the newly created HTMLElement.
 */
/**
 * Create and insert a new "thing" element into the document.
 *
 * @param {string|null} [id=null] - Optional id to assign to the element. If
 *   the id already exists in the document a numeric suffix will be appended
 *   (e.g. "id-1").
 * @param {string} [className="thing"] - CSS class to apply to the created
 *   element.
 * @returns {HTMLElement} The created element.
 */
export function createThing(id = null, className = "thing") {
  const el = document.createElement("div");

  if (className) {
    el.className = className;
  }

  if (id) {
    // Ensure the id is unique in the document; if it's taken append -1, -2 ...
    let newId = id;
    let counter = 1;
    while (document.getElementById(newId)) {
      newId = `${id}-${counter++}`;
    }
    el.id = newId;
  }

  // Append to document body so it's visible by default. Styling should come
  // from the stylesheet (.thing or #thing) rather than inline defaults.
  document.body.appendChild(el);

  return el;
}
