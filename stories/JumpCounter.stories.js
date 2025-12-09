import { createPen, Piglet } from '../src/index.js';
import { getThemeStyles } from '../.storybook/theme-styles.js';

export default {
  title: 'PeppaJS/Piglet/JumpCounter',
  tags: ['autodocs'],
  render: ({ count = 0 }, context) => {
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
    const theme = context?.globals?.theme || 'light';
    container.setAttribute('data-theme', theme);
    container.className = 'pen';
    
    // Add theme styles
    const style = document.createElement('style');
    style.textContent = getThemeStyles();
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
