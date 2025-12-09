// examples/basic/main.js

// When developing locally (before publishing to npm):
import { createPen, Piglet, snort } from "../../src/index.js";
// After publishing, this would become:
// import { createPen, Piglet, snort } from "peppajs";

// Piglet: counter card
const JumpCounter = Piglet("JumpCounter", function (props) {
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

// Piglet: mood chooser card
const PigMood = Piglet("PigMood", function (props) {
  const options = ["happy", "sleepy", "excited", "muddy"];
  const badges = {
    happy: "✨",
    sleepy: "😴",
    excited: "🎉",
    muddy: "🟤"
  };

  const buttons = options
    .map(function (mood) {
      const active = mood === props.mood;
      return `
        <button
          class="muddy-btn ${active ? "primary" : "secondary"}"
          data-oink="setMood"
          data-oink-value="${mood}"
        >
          ${badges[mood]} ${mood}
        </button>
      `;
    })
    .join("");

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

// Create the Pen (app)
const app = createPen({
  root: "#app",
  state: {
    jumps: 0,
    mood: "happy"
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
  view(state /*, helpers */) {
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

// Optional: event bus demo
app.on("debug", function (payload) {
  console.log("[Pen debug]", payload);
});
snort(function () {
  app.emit("debug", { message: "Pen is ready!" });
});