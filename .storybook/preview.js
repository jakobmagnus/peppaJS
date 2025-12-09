/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
          { value: 'muddy', icon: 'circle', title: 'Muddy' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-theme', theme);
      wrapper.style.minHeight = '100vh';
      wrapper.style.padding = '2rem';
      
      // Apply theme-specific styles
      const themeStyles = {
        light: {
          background: '#fffafc',
          color: '#333',
        },
        dark: {
          background: '#1a1a1a',
          color: '#e0e0e0',
        },
        muddy: {
          background: '#4a3728',
          color: '#f5e6d3',
        },
      };
      
      const styles = themeStyles[theme] || themeStyles.light;
      wrapper.style.background = styles.background;
      wrapper.style.color = styles.color;
      
      const result = story();
      wrapper.appendChild(result);
      return wrapper;
    },
  ],
};

export default preview;
