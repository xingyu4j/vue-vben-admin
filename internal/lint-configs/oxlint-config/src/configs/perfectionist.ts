import type { OxlintConfig } from 'oxlint';

// 通过 oxlint 的 jsPlugin 能力运行 eslint-plugin-perfectionist，
// 接管 import / export 排序（替代 oxfmt 的 sortImports），
// 这样未排序时可在编辑器内联报错，并支持 `oxlint --fix` 自动修复。
// 仅启用 import/export 相关三条规则；perfectionist 其余规则（sort-objects、
// sort-interfaces、sort-jsx-props 等）暂不启用。
const perfectionist: OxlintConfig = {
  jsPlugins: [
    {
      name: 'perfectionist',
      specifier: 'eslint-plugin-perfectionist',
    },
  ],
  rules: {
    'perfectionist/sort-exports': [
      'error',
      {
        order: 'asc',
        type: 'natural',
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        customGroups: [
          {
            selector: 'type',
            groupName: 'vben-core-type',
            elementNamePattern: '^@vben-core/.+',
          },
          {
            selector: 'type',
            groupName: 'vben-type',
            elementNamePattern: '^@vben/.+',
          },
          {
            selector: 'type',
            groupName: 'vue-type',
            elementNamePattern: ['^vue$', '^vue-.+', '^@vue/.+'],
          },
          {
            groupName: 'vben',
            elementNamePattern: '^@vben/.+',
          },
          {
            groupName: 'vben-core',
            elementNamePattern: '^@vben-core/.+',
          },
          {
            groupName: 'vue',
            elementNamePattern: ['^vue$', '^vue-.+', '^@vue/.+'],
          },
        ],
        environment: 'node',
        groups: [
          ['type-external', 'type-builtin', 'type-import'],
          'vue-type',
          'vben-type',
          'vben-core-type',
          ['type-parent', 'type-sibling', 'type-index'],
          ['type-internal'],
          'value-builtin',
          'vue',
          'vben',
          'vben-core',
          'value-external',
          'value-internal',
          ['value-parent', 'value-sibling', 'value-index'],
          'side-effect',
          'side-effect-style',
          'style',
          'ts-equals-import',
          'unknown',
        ],
        internalPattern: ['^#/.+'],
        newlinesBetween: 1,
        order: 'asc',
        type: 'natural',
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        order: 'asc',
        type: 'natural',
      },
    ],
  },
};

export { perfectionist };
