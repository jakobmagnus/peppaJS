import { createPen, Piglet } from '../src/index.js';

export default {
  title: 'PeppaJS/Piglet/PigMood',
  tags: ['autodocs'],
  render: ({ mood = 'happy' }) => {
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
        margin-bottom: 0.5rem;
      }

      .muddy-btn.primary {
        background: #ff7aa2;
        color: #fff;
      }

      .muddy-btn.secondary {
        background: #ffd1e3;
      }

      .mood {
        font-weight: 600;
      }
    `;
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
