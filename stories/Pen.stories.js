import { createPen, Piglet } from '../src/index.js';
import { getThemeStyles } from '../.storybook/theme-styles.js';

export default {
  title: 'PeppaJS/Core/Pen',
  tags: ['autodocs'],
  render: ({ initialJumps = 0, initialMood = 'happy' }, context) => {
    // Define Piglet components
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

    const PigMood = Piglet('PigMood', function (props) {
      const options = ['happy', 'sleepy', 'excited', 'muddy'];
      const badges = {
        happy: '✨',
        sleepy: '😴',
        excited: '🎉',
        muddy: '🟤'
      };

      const buttons = options
        .map(function (mood) {
          const active = mood === props.mood;
          return `
            <button
              class="muddy-btn ${active ? 'primary' : 'secondary'}"
              data-oink="setMood"
              data-oink-value="${mood}"
            >
              ${badges[mood]} ${mood}
            </button>
          `;
        })
        .join('');

      return `
        <div class="pig-card">
          <h2>Little Pig Mood</h2>
          <p>Current mood:
            <span class="mood">${badges[props.mood]} ${props.mood}</span>
          </p>
          <div>${buttons}</div>
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

    // Create the Pen app (root application)
    const app = createPen({
      root: container,
      state: {
        jumps: initialJumps,
        mood: initialMood
      },
      actions: {
        jump(state) {
          return { jumps: state.jumps + 1 };
        },
        reset() {
          return { jumps: 0 };
        },
        setMood(state, payload) {
          return { mood: payload.value || state.mood };
        }
      },
      view(state) {
        return `
          <h1>PeppaJS 🐽</h1>
          <p>
            A tiny Peppa-inspired micro-framework:
            components are <strong>Piglets</strong>,
            the app is a <strong>Pen</strong>, and actions are little
            <strong>oinks</strong>.
          </p>
          ${JumpCounter({ count: state.jumps })}
          ${PigMood({ mood: state.mood })}
        `;
      }
    });

    return container;
  },
  argTypes: {
    initialJumps: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Initial number of puddle jumps',
    },
    initialMood: {
      control: { type: 'select' },
      options: ['happy', 'sleepy', 'excited', 'muddy'],
      description: 'Initial mood of the little pig',
    },
  },
};

export const Default = {
  args: {
    initialJumps: 0,
    initialMood: 'happy',
  },
};

export const MuddyStart = {
  args: {
    initialJumps: 10,
    initialMood: 'muddy',
  },
};

export const ExcitedPig = {
  args: {
    initialJumps: 5,
    initialMood: 'excited',
  },
};

export const SleepyPig = {
  args: {
    initialJumps: 0,
    initialMood: 'sleepy',
  },
};
