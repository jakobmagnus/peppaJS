// examples/router/main.js
// Demonstrating PeppaJS MudPuddle Router

import { createPen, Piglet } from "../../src/index.js";

// Page components
const HomePage = Piglet("HomePage", function (props) {
  return `
    <div class="page-content">
      <h2>🏠 Home - Welcome to the Muddy Puddle!</h2>
      <p>
        This example demonstrates the <strong>MudPuddle Router</strong> - 
        a simple hash-based router built into PeppaJS.
      </p>
      <p>
        Click the navigation links above to explore different routes. 
        The current route is tracked in <code>state.route</code>.
      </p>
      <p>Current route: <span class="badge">${props.route}</span></p>
    </div>
  `;
});

const AboutPage = Piglet("AboutPage", function (props) {
  return `
    <div class="page-content">
      <h2>📖 About PeppaJS</h2>
      <p>
        PeppaJS is a tiny Peppa Pig-inspired UI micro-framework with:
      </p>
      <ul>
        <li><strong>Piglets</strong> - reusable components</li>
        <li><strong>Pen</strong> - the app root</li>
        <li><strong>Oinks</strong> - event actions with data-oink attributes</li>
        <li><strong>MudPuddle Router</strong> - hash-based routing</li>
      </ul>
      <p>Current route: <span class="badge">${props.route}</span></p>
    </div>
  `;
});

const CounterPage = Piglet("CounterPage", function (props) {
  return `
    <div class="page-content">
      <h2>🎯 Counter Demo</h2>
      <p>
        A simple counter to show state management with routing.
      </p>
      <p>
        <strong>Count:</strong> <span class="badge">${props.count}</span>
      </p>
      <button class="muddy-btn" data-oink="increment">
        Increment 🐷
      </button>
      <button class="muddy-btn" data-oink="decrement">
        Decrement
      </button>
      <p>Current route: <span class="badge">${props.route}</span></p>
    </div>
  `;
});

const NotFoundPage = Piglet("NotFoundPage", function (props) {
  return `
    <div class="page-content">
      <h2>🚫 404 - Page Not Found</h2>
      <p>
        Oops! The route <code>${props.route}</code> doesn't exist.
      </p>
      <p>
        <a href="#/">Go back home</a>
      </p>
    </div>
  `;
});

// Define routes
const routes = {
  "/": HomePage,
  "/about": AboutPage,
  "/counter": CounterPage,
  "404": NotFoundPage
};

// Create the Pen with routing
const app = createPen({
  root: "#app",
  state: {
    count: 0
  },
  routes: routes,
  actions: {
    increment(state) {
      return { count: state.count + 1 };
    },
    decrement(state) {
      return { count: state.count - 1 };
    }
  },
  view(state, helpers) {
    const currentRoute = state.route || "/";
    
    return `
      <h1>PeppaJS 🐽 MudPuddle Router</h1>
      
      <nav class="nav">
        <a href="#/" class="${currentRoute === "/" ? "active" : ""}">Home</a>
        <a href="#/about" class="${currentRoute === "/about" ? "active" : ""}">About</a>
        <a href="#/counter" class="${currentRoute === "/counter" ? "active" : ""}">Counter</a>
        <a href="#/invalid" class="${currentRoute === "/invalid" ? "active" : ""}">404 Demo</a>
      </nav>
      
      ${helpers.route()}
    `;
  }
});

console.log("MudPuddle Router ready! Current state:", app.getState());
