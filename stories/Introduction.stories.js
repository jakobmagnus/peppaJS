export default {
  title: 'PeppaJS/Introduction',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# PeppaJS 🐷

A tiny Peppa Pig–inspired UI micro-framework.

## Concepts

- **Pen**: The app root (created with \`createPen\`)
- **Piglet**: A tiny reusable component (created with \`Piglet\`)
- **Oink**: An action dispatcher (using \`data-oink\` attributes)
- **Snort**: Schedule an async update (using \`snort\` function)

## Key Features

### Components (Piglets)
Define reusable components that render HTML based on props:

\`\`\`javascript
const MyComponent = Piglet('MyComponent', function(props, children) {
  return \`<div>\${props.text}</div>\`;
});
\`\`\`

### State Management
Manage application state with actions and reactive updates:

\`\`\`javascript
const app = createPen({
  root: '#app',
  state: { count: 0 },
  actions: {
    increment(state) {
      return { count: state.count + 1 };
    }
  },
  view(state, helpers) {
    return \`<div>Count: \${state.count}</div>\`;
  }
});
\`\`\`

### Event Handling (Oinks)
Dispatch actions using declarative \`data-oink\` attributes:

\`\`\`html
<button data-oink="increment">Click me</button>
<input data-oink="updateText" data-oink-event="input" />
\`\`\`

### Routing (MudPuddle Router)
Built-in hash-based routing for single-page applications:

\`\`\`javascript
const app = createPen({
  routes: {
    '/': HomePage,
    '/about': AboutPage,
    '404': NotFoundPage
  },
  view(state, helpers) {
    return helpers.route();
  }
});
\`\`\`

## API Reference

### \`createPen(options)\`
Create the root application container.

**Options:**
- \`root\`: DOM element or selector
- \`state\`: Initial state object
- \`actions\`: Object mapping action names to handler functions
- \`view\`: Render function that returns HTML string
- \`routes\`: Optional routes object for MudPuddle router

**Returns:** Pen instance with methods:
- \`getState()\`: Get current state
- \`oink(actionName, payload)\`: Dispatch an action
- \`on(eventName, handler)\`: Subscribe to events
- \`emit(eventName, payload)\`: Emit events
- \`destroy()\`: Cleanup and remove listeners

### \`Piglet(name, renderFn)\`
Define a reusable component.

**Parameters:**
- \`name\`: Component name (string)
- \`renderFn\`: Function that receives (props, children) and returns HTML string

**Returns:** Component function

### \`snort(callback)\`
Schedule an async micro-task update.

**Parameters:**
- \`callback\`: Function to execute asynchronously

## Examples

Explore the stories to see PeppaJS in action!
        `,
      },
    },
  },
};

export const Introduction = () => {
  const container = document.createElement('div');
  container.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; font-family: system-ui, sans-serif; padding: 2rem;">
      <h1 style="color: #ff7aa2;">🐷 Welcome to PeppaJS</h1>
      <p style="font-size: 1.1rem;">
        A tiny Peppa Pig-inspired UI micro-framework for building interactive web applications.
      </p>
      <div style="background: #fff7fb; border: 3px solid #ffc4d9; border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem;">
        <h2 style="margin-top: 0; color: #ff7aa2;">Quick Start</h2>
        <ol style="line-height: 1.8;">
          <li>Explore the <strong>Pen</strong> stories to see the full application</li>
          <li>Check out individual <strong>Piglet</strong> component stories</li>
          <li>Learn about routing with the <strong>Router</strong> examples</li>
        </ol>
      </div>
      <div style="margin-top: 1.5rem; padding: 1rem; background: #ffe69f; border-radius: 8px;">
        <p style="margin: 0;">
          <strong>💡 Tip:</strong> All stories are interactive! Try clicking buttons and interacting with components.
        </p>
      </div>
    </div>
  `;
  return container;
};
