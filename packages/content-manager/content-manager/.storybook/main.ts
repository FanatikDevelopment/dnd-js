import type { StorybookConfig } from '@storybook/react-vite';

import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  core: {},

  stories: [
    '../src/app/**/*.stories.mdx',
    '../src/app/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: ['@storybook/addon-essentials'],

  async viteFinal(config: any) {
    return mergeConfig(config, {});
  },

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath:
          'packages/content-manager/content-manager/vite.config.ts',
      },
    },
  },

  docs: {
    autodocs: true,
  },
};

module.exports = config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
