# Storybook Documentation

This repository uses [Storybook](https://storybook.js.org/) to document and test the PeppaJS UI components.

## Running Storybook

To run Storybook in development mode:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006/`.

## Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

The built files will be output to the `storybook-static/` directory.

## Available Stories

### Introduction
- Framework overview and API documentation

### Piglet Components
- **JumpCounter**: Interactive counter component with puddle jump tracking
- **PigMood**: Mood selector component with emoji states

### Core Components
- **Pen**: Full application example combining multiple Piglets
- **Router**: MudPuddle Router demonstration with hash-based navigation

## Story Structure

Stories are located in the `stories/` directory. Each story file demonstrates:
- Component usage and API
- Interactive controls for props
- Multiple variants showing different states
- Live, interactive examples

## Adding New Stories

To add a new story:

1. Create a new file in `stories/` with the `.stories.js` extension
2. Import the PeppaJS components you want to showcase
3. Define the story configuration and render function
4. Export story variants

Example:

```javascript
import { Piglet } from '../src/index.js';

export default {
  title: 'PeppaJS/MyComponent',
  tags: ['autodocs'],
  render: ({ prop1 }) => {
    const MyComponent = Piglet('MyComponent', (props) => {
      return `<div>${props.text}</div>`;
    });
    
    const container = document.createElement('div');
    container.innerHTML = MyComponent({ text: prop1 });
    return container;
  },
  argTypes: {
    prop1: { control: 'text', description: 'Text to display' },
  },
};

export const Default = {
  args: { prop1: 'Hello!' },
};
```
