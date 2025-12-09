// src/index.js
// PeppaJS - Peppa Pig-inspired JS micro-framework 🐷
//
// Exports (ESM & CJS via bundlers):
//   - createPen
//   - Piglet
//   - snort
//
// Concepts:
// - Pen: the app root (createPen)
// - Piglet: a tiny component (Piglet)
// - oink: dispatch an action (data-oink, data-oink-event, data-oink-value)
// - snort: schedule an async update (snort)

/**
 * Schedule a micro-task ("snort").
 * Falls back to setTimeout if Promises are unavailable.
 */
function snort(cb) {
  if (typeof Promise !== "undefined") {
    Promise.resolve().then(cb);
  } else {
    setTimeout(cb, 0);
  }
}

/**
 * Define a component ("Piglet").
 * @param {string} name
 * @param {(props: any, children: string) => string} renderFn
 */
function Piglet(name, renderFn) {
  if (typeof renderFn !== "function") {
    throw new Error("Piglet('" + name + "') needs a render function");
  }
  const comp = function (props = {}, children = "") {
    return renderFn(props, children);
  };
  comp.displayName = name;
  return comp;
}

/**
 * Create a Pen (root app).
 * @param {object} options
 *  - root: DOM element or selector
 *  - state: initial state object
 *  - actions: { [name]: (state, payload) => newPartialState | void }
 *  - view: (state, helpers) => HTML string
 */
function createPen(options) {
  let { root, state = {}, actions = {}, view } = options || {};

  if (!root) {
    throw new Error("PeppaJS.createPen requires a root element or selector.");
  }

  if (typeof root === "string") {
    const el = document.querySelector(root);
    if (!el) {
      throw new Error("PeppaJS.createPen could not find root: " + root);
    }
    root = el;
  }

  if (typeof view !== "function") {
    throw new Error("PeppaJS.createPen requires a view(state, helpers) function.");
  }

  // Clone initial state to avoid mutating the original object by accident
  let currentState;
  try {
    if (typeof structuredClone === "function") {
      currentState = structuredClone(state);
    } else {
      currentState = JSON.parse(JSON.stringify(state));
    }
  } catch (e) {
    currentState = state;
  }

  const listeners = {};

  function getState() {
    return currentState;
  }

  function on(eventName, handler) {
    if (!listeners[eventName]) listeners[eventName] = [];
    listeners[eventName].push(handler);
    return function off() {
      const arr = listeners[eventName];
      if (!arr) return;
      const idx = arr.indexOf(handler);
      if (idx >= 0) arr.splice(idx, 1);
    };
  }

  function emit(eventName, payload) {
    const arr = listeners[eventName];
    if (!arr) return;
    arr.forEach((fn) => fn(payload));
  }

  function dispatch(actionName, payload) {
    const action = actions[actionName];
    if (typeof action !== "function") {
      console.warn("[PeppaJS] No such action:", actionName);
      return;
    }

    const result = action(currentState, payload);

    // Allow mutation (no return) or immutable style (return partial state)
    if (result && typeof result === "object") {
      currentState = Object.assign({}, currentState, result);
    }

    snort(render);
  }

  function wireOinks() {
    const nodes = root.querySelectorAll("[data-oink]");
    nodes.forEach((node) => {
      const actionName = node.dataset.oink;
      const eventName = node.dataset.oinkEvent || "click";

      node.addEventListener(eventName, function (ev) {
        const value =
          node.dataset.oinkValue !== undefined
            ? node.dataset.oinkValue
            : node.value !== undefined
            ? node.value
            : undefined;

        dispatch(actionName, { event: ev, value });
      });
    });
  }

  function render() {
    const helpers = {
      Piglet,
      oink: dispatch,
      snort,
      emit,
      on
    };

    const html = view(currentState, helpers);
    root.innerHTML = html;
    wireOinks();
  }

  // Initial render
  render();

  return {
    getState,
    oink: dispatch,
    snort,
    on,
    emit,
    root
  };
}

// Bundle up into a single object for default export and browser global
const PeppaJS = {
  createPen,
  Piglet,
  snort
};

// Attach to globalThis in browsers for <script> tag usage
if (typeof globalThis !== "undefined") {
  // Don't clobber an existing one if present
  if (!globalThis.PeppaJS) {
    globalThis.PeppaJS = PeppaJS;
  }
}

export { createPen, Piglet, snort };
export default PeppaJS;