import { createPen, Piglet } from '../src/index.js';
import { getThemeStyles } from '../.storybook/theme-styles.js';

export default {
  title: 'PeppaJS/Core/Router',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## MudPuddle Router

A simple hash-based router built into PeppaJS. Define routes as an object mapping paths to component functions.

### Features:
- Hash-based navigation (\`#/path\`)
- Automatic route updates on navigation
- 404 fallback support
- Current route stored in state

### Usage:
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
        `,
      },
    },
  },
  render: (args, context) => {
    // Page components
    const HomePage = Piglet('HomePage', function (props) {
      return `
        <div class="page-content">
          <h2>🏠 Home</h2>
          <p>Welcome to the Muddy Puddle Router demonstration!</p>
          <p>Current route: <span class="badge">${props.route}</span></p>
        </div>
      `;
    });

    const AboutPage = Piglet('AboutPage', function (props) {
      return `
        <div class="page-content">
          <h2>📖 About</h2>
          <p>Learn about PeppaJS and its features.</p>
          <p>Current route: <span class="badge">${props.route}</span></p>
        </div>
      `;
    });

    const CounterPage = Piglet('CounterPage', function (props) {
      return `
        <div class="page-content">
          <h2>🎯 Counter</h2>
          <p><strong>Count:</strong> <span class="badge">${props.count}</span></p>
          <button class="muddy-btn" data-oink="increment">Increment 🐷</button>
          <button class="muddy-btn" data-oink="decrement">Decrement</button>
          <p>Current route: <span class="badge">${props.route}</span></p>
        </div>
      `;
    });

    const NotFoundPage = Piglet('NotFoundPage', function (props) {
      return `
        <div class="page-content">
          <h2>🚫 404 - Page Not Found</h2>
          <p>The route <code>${props.route}</code> doesn't exist.</p>
          <p><a href="#/">Go back home</a></p>
        </div>
      `;
    });

    // Create a container element
    const container = document.createElement('div');
    const theme = context?.globals?.theme || 'light';
    container.setAttribute('data-theme', theme);
    container.className = 'pen';
    
    // Add theme styles
    const style = document.createElement('style');
    style.textContent = getThemeStyles() + `
      .pen {
        max-width: 640px;
      }
    `;
    document.head.appendChild(style);

    // Define routes
    const routes = {
      '/': HomePage,
      '/about': AboutPage,
      '/counter': CounterPage,
      '404': NotFoundPage
    };

    // Create the Pen with routing
    const app = createPen({
      root: container,
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
        const currentRoute = state.route || '/';
        
        return `
          <h1>PeppaJS 🐽 MudPuddle Router</h1>
          
          <nav class="nav">
            <a href="#/" class="${currentRoute === '/' ? 'active' : ''}">Home</a>
            <a href="#/about" class="${currentRoute === '/about' ? 'active' : ''}">About</a>
            <a href="#/counter" class="${currentRoute === '/counter' ? 'active' : ''}">Counter</a>
            <a href="#/invalid" class="${currentRoute === '/invalid' ? 'active' : ''}">404 Demo</a>
          </nav>
          
          ${helpers.route()}
        `;
      }
    });

    return container;
  },
};

export const Default = {};
