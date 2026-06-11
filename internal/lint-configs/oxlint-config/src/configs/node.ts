import type { OxlintConfig } from 'oxlint';

const node: OxlintConfig = {
  rules: {
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-exports-assign': 'error',
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
  },
};

export { node };
