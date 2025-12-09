import { createPen, Piglet } from '../src/index.js';
import { getThemeStyles } from '../.storybook/theme-styles.js';

export default {
  title: 'PeppaJS/Piglet/PigMood',
  tags: ['autodocs'],
  render: ({ mood = 'happy' }, context) => {
    // Create a Piglet component
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

    // Create the Pen app
    const app = createPen({
      root: container,
      state: {
        mood: mood
      },
      actions: {
        setMood(state, payload) {
          return { mood: payload.value || state.mood };
        }
      },
      view(state) {
        return PigMood({ mood: state.mood });
      }
    });

    return container;
  },
  argTypes: {
    mood: {
      control: { type: 'select' },
      options: ['happy', 'sleepy', 'excited', 'muddy'],
      description: 'Current mood of the little pig',
    },
  },
};

export const Happy = {
  args: {
    mood: 'happy',
  },
};

export const Sleepy = {
  args: {
    mood: 'sleepy',
  },
};

export const Excited = {
  args: {
    mood: 'excited',
  },
};

export const Muddy = {
  args: {
    mood: 'muddy',
  },
};
