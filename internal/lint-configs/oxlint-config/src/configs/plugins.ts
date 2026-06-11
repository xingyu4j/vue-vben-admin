import type { OxlintConfig } from 'oxlint';

const plugins: OxlintConfig = {
  plugins: [
    'eslint',
    'unicorn',
    'typescript',
    'oxc',
    'import',
    'vitest',
    'node',
    'vue',
  ],
};

export { plugins };
