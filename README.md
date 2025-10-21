# CodePlayground

Simple browser playground for animating a shape on the page using utilities from `Animations/util.js`.

The utilities assume there is an element with id `thing` in the DOM (see `Animations/index.html`). All functions accept an optional `element` parameter to target a different element; by default they operate on the exported `thing` element.

## Usage

In a module script (e.g., `Animations/script.js`):

```js
import { thing, setColour, setPosition, setSize, setRotation, setRoundedness } from "./util.js";

// Center the shape, make it blue and round, then rotate it
setPosition(0.5, 0.5);
setSize(120);
setColour(220, 80, 60, 1);
setRoundedness(1);
setRotation(45);

// Target a different element explicitly
const other = document.getElementById("other-thing");
setColour(0, 100, 50, 0.8, other);
```

Notes
- Coordinates are treated as fractions of the current viewport (`window.innerWidth/innerHeight`). Values are not clamped; numbers outside `[0,1]` can move the element off-screen.
- Position and rotation are applied via CSS `left`/`top` and a `transform` combining `translate(...)` and `rotate(...)`.
- If the target element is missing, functions still update internal state but skip DOM updates.

## API (from `Animations/util.js`)

### `thing: HTMLElement | null`
The DOM element with id `thing`, or `null` if not found. Used as the default target for all functions.

### `setColour(h, s = 100, l = 50, a = 1, element = thing): void`
Sets `element.style.backgroundColor` using HSL with alpha and updates internal color state.
- h: number (0–360) hue degrees
- s: number (0–100) saturation percent
- l: number (0–100) lightness percent
- a: number (0–1) opacity (alpha)
- element: HTMLElement to style; defaults to `thing`
Example: `setColour(200, 80, 60, 0.8)`

### `setPosition(x, y, element = thing): void`
Sets the element’s position relative to the viewport and reapplies transform (translate + current rotation).
- x: number; horizontal position as a fraction of `window.innerWidth`
- y: number; vertical position as a fraction of `window.innerHeight`
- element: HTMLElement to move; defaults to `thing`
Effect: sets `style.left/top` in pixels and `style.transform` to `translate(x*vw, y*vh) rotate(rotation)

### `setPositionPixels(px, py, element = thing): void`
Set the element position using pixel coordinates measured from the top-left
of the viewport.
- px: number; x position in pixels
- py: number; y position in pixels
- element: HTMLElement to move; defaults to `thing`
Effect: stores pixel coordinates and reapplies `style.transform` using
`translate(px, py) rotate(rotation)`.`.

### `setSize(size|width, height = null, element = thing): void`
Set the element size. The function supports two main forms:

- `setSize(size)` -> square: width = height = size (backwards compatible)
- `setSize(width, height)` -> set width and height independently (both in px)

To target a different element, pass it as the third argument: `setSize(size, null, element)` or `setSize(w, h, element)`.

Note: internal state previously exposed as `state.size` is now split into `state.width` and `state.height` (both in pixels).

### `setRotation(rotation, element = thing): void`
Sets rotation in degrees and reapplies transform with current position.
- rotation: number; degrees clockwise
- element: HTMLElement to rotate; defaults to `thing`
Effect: updates `style.transform` to include `rotate(rotation)` alongside `translate(...)`.

### `setRoundedness(roundedness, element = thing): void`
Controls corner radius as a percentage of the element’s size.
- roundedness: number; typical range 0 (square) to 1 (circle)
- element: HTMLElement to style; defaults to `thing`
Effect: sets `style.borderRadius` to `${roundedness * 100}%`.

### `createThing(id = null, className = "thing"): HTMLElement`
Create and append a new `div` element to the document body. The created
element will have the provided `className` and optional `id`. If the id is
already present in the document a numeric suffix will be appended to keep it
unique (e.g. `id-1`).
- id: optional string id to assign
- className: CSS class to add (defaults to `thing`)
Returns: the newly created `HTMLElement`.

