import { createPen, Piglet } from '../src/index.js';

export default {
  title: 'PeppaJS/Piglet/JumpCounter',
  tags: ['autodocs'],
  render: ({ count = 0 }) => {
    // Create a Piglet component
    const JumpCounter = Piglet('JumpCounter', function (props) {
      return `
        <div class="pig-card">
          <h2>Puddle Jumps <span class="badge">oinks: ${props.count}</span></h2>
          <p>
            Every click is another jump into a muddy puddle.
          </p>
          <button
            class="muddy-btn primary"
            data-oink="jump"
          >
            Jump in a puddle 🐷
          </button>
          <button
            class="muddy-btn secondary"
            data-oink="reset"
          >
            Dry off (reset)
          </button>
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
        max-width: 480px;
        margin: 0 auto;
        background: #fff7fb;
        border-radius: 16px;
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
        padding: 1.5rem;
        border: 3px solid #ffc4d9;
        font-family: system-ui, sans-serif;
      }

      .pig-card {
        border-radius: 12px;
        border: 2px dashed #ffc4d9;
        padding: 1rem;
        margin-bottom: 1rem;
        background: #fff;
      }

      .pig-card h2 {
        margin-top: 0;
        font-size: 1.2rem;
      }

      .muddy-btn {
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        margin-right: 0.5rem;
      }

      .muddy-btn.primary {
        background: #ff7aa2;
        color: #fff;
      }

      .muddy-btn.secondary {
        background: #ffd1e3;
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

    // Create the Pen app
    const app = createPen({
      root: container,
      state: {
        jumps: count
      },
      actions: {
        jump(state) {
          return { jumps: state.jumps + 1 };
        },
        reset() {
          return { jumps: 0 };
        }
      },
      view(state) {
        return JumpCounter({ count: state.jumps });
      }
    });

    return container;
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Initial number of puddle jumps',
    },
  },
};

export const Default = {
  args: {
    count: 0,
  },
};

export const WithInitialJumps = {
  args: {
    count: 5,
  },
};

export const ManyJumps = {
  args: {
    count: 42,
  },
};
