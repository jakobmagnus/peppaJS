import { createPen, Piglet } from '../src/index.js';

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
  render: () => {
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
    container.className = 'pen';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .pen {
        max-width: 640px;
        margin: 0 auto;
        background: #fff7fb;
        border-radius: 16px;
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
        padding: 1.5rem;
        border: 3px solid #ffc4d9;
        font-family: system-ui, sans-serif;
      }

      .pen h1 {
        margin-top: 0;
        font-size: 1.6rem;
      }

      .nav {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #ffc4d9;
        flex-wrap: wrap;
      }

      .nav a {
        padding: 0.5rem 1rem;
        border-radius: 999px;
        text-decoration: none;
        background: #ffd1e3;
        color: #333;
        font-weight: 600;
        transition: background 0.2s;
      }

      .nav a:hover {
        background: #ff7aa2;
        color: #fff;
      }

      .nav a.active {
        background: #ff7aa2;
        color: #fff;
      }

      .page-content {
        border-radius: 12px;
        border: 2px dashed #ffc4d9;
        padding: 1.5rem;
        background: #fff;
      }

      .page-content h2 {
        margin-top: 0;
        font-size: 1.3rem;
      }

      .muddy-btn {
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        margin-right: 0.5rem;
        background: #ff7aa2;
        color: #fff;
      }

      .badge {
        display: inline-block;
        padding: 0.25rem 0.7rem;
        border-radius: 999px;
        background: #ffe69f;
        font-size: 0.75rem;
        margin-left: 0.4rem;
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
