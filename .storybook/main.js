const path = require('path');

module.exports = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },

  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(config.resolve?.alias || {}),
          '@': path.resolve(__dirname, '../src'),
        },
      },
    };
  },

  docs: {
    autodocs: true
  }
};

