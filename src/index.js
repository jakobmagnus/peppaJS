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
 *  - routes: optional object mapping route paths to components for MudPuddle router.
 *      Keys are route paths (e.g., "/", "/about") or "404" for fallback.
 *      Values are component functions with signature (state, helpers) => HTML string.
 *      Example:
 *        {
 *          "/": HomeComponent,
 *          "/about": AboutComponent,
 *          "404": NotFoundComponent
 *        }
 */
function createPen(options) {
  let { root, state = {}, actions = {}, view, routes } = options || {};

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

  function getCurrentRoute() {
    return window.location.hash.slice(1) || "/";
  }

  // Initialize route if routes are provided
  if (routes) {
    currentState.route = getCurrentRoute();
  }

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

  // Internal state update for router
  function updateState(partialState) {
    currentState = Object.assign({}, currentState, partialState);
    snort(render);
  }

  // Event delegation handler for oinks
  function handleDelegatedEvent(ev) {
    // Find the closest element with data-oink
    let target = ev.target;
    while (target && target !== root) {
      if (target.hasAttribute("data-oink")) {
        const actionName = target.getAttribute("data-oink");
        const expectedEvent = target.getAttribute("data-oink-event") || "click";
        
        // Only dispatch if the event type matches
        if (ev.type === expectedEvent) {
          const value =
            target.hasAttribute("data-oink-value")
              ? target.getAttribute("data-oink-value")
              : target.value !== undefined
              ? target.value
              : undefined;

          if (ev.type === "submit") {
            ev.preventDefault();
          }
          dispatch(actionName, { event: ev, value });
          break;
        }
      }
      target = target.parentElement;
    }
  }

  // Setup global event delegation for standard events
  const delegatedEvents = ["click", "change", "input", "submit", "keydown", "keyup"];
  delegatedEvents.forEach((eventType) => {
    root.addEventListener(eventType, handleDelegatedEvent);
  });

  // MudPuddle Router: helper function to render matched route component
  function route() {
    if (!routes) return "";
    
    const currentRoute = currentState.route || "/";
    const component = routes[currentRoute] || routes["404"] || routes["/"];
    
    if (typeof component === "function") {
      return component(currentState, helpers);
    }
    
    return component || "";
  }

  const helpers = {
    Piglet,
    oink: dispatch,
    snort,
    emit,
    on,
    route
  };

  function render() {
    const html = view(currentState, helpers);
    root.innerHTML = html;
  }

  // MudPuddle Router: listen for hash changes
  let hashChangeHandler = null;
  if (routes) {
    hashChangeHandler = function () {
      updateState({ route: getCurrentRoute() });
    };
    window.addEventListener("hashchange", hashChangeHandler);
  }

  // Initial render
  render();

  function destroy() {
    // Remove event delegation listeners
    delegatedEvents.forEach((eventType) => {
      root.removeEventListener(eventType, handleDelegatedEvent);
    });
    
    // Remove hash change listener
    if (hashChangeHandler) {
      window.removeEventListener("hashchange", hashChangeHandler);
    }
    
    // Clear custom event listeners
    Object.keys(listeners).forEach(key => {
      listeners[key] = [];
    });
    // Clear the root element
    root.innerHTML = "";
  }

  return {
    getState,
    oink: dispatch,
    snort,
    on,
    emit,
    root,
    destroy
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