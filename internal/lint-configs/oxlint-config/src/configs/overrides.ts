import type { OxlintConfig } from 'oxlint';

const overrides: OxlintConfig = {
  overrides: [
    {
      files: ['*.d.ts', '**/*.d.ts'],
      rules: {
        'import/no-unassigned-import': 'off',
        'typescript/triple-slash-reference': 'off',
      },
    },
    {
      files: [
        '**/__tests__/**/*.js',
        '**/__tests__/**/*.cjs',
        '**/__tests__/**/*.mjs',
        '**/__tests__/**/*.jsx',
        '**/__tests__/**/*.ts',
        '**/__tests__/**/*.cts',
        '**/__tests__/**/*.mts',
        '**/__tests__/**/*.tsx',
        '**/*.spec.js',
        '**/*.spec.cjs',
        '**/*.spec.mjs',
        '**/*.spec.jsx',
        '**/*.spec.ts',
        '**/*.spec.cts',
        '**/*.spec.mts',
        '**/*.spec.tsx',
        '**/*.test.js',
        '**/*.test.cjs',
        '**/*.test.mjs',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.cts',
        '**/*.test.mts',
        '**/*.test.tsx',
        '**/*.bench.js',
        '**/*.bench.cjs',
        '**/*.bench.mjs',
        '**/*.bench.jsx',
        '**/*.bench.ts',
        '**/*.bench.cts',
        '**/*.bench.mts',
        '**/*.bench.tsx',
        '**/*.benchmark.js',
        '**/*.benchmark.cjs',
        '**/*.benchmark.mjs',
        '**/*.benchmark.jsx',
        '**/*.benchmark.ts',
        '**/*.benchmark.cts',
        '**/*.benchmark.mts',
        '**/*.benchmark.tsx',
      ],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['packages/@core/base/shared/src/utils/inference.ts'],
      rules: {
        'vue/prefer-import-from-vue': 'off',
      },
    },
    {
      files: ['packages/@core/ui-kit/menu-ui/src/sub-menu.vue'],
      rules: {
        'import/no-self-import': 'off',
      },
    },
    {
      files: [
        'scripts/**/*.js',
        'scripts/**/*.cjs',
        'scripts/**/*.mjs',
        'scripts/**/*.jsx',
        'scripts/**/*.ts',
        'scripts/**/*.cts',
        'scripts/**/*.mts',
        'scripts/**/*.tsx',
        'internal/**/*.js',
        'internal/**/*.cjs',
        'internal/**/*.mjs',
        'internal/**/*.jsx',
        'internal/**/*.ts',
        'internal/**/*.cts',
        'internal/**/*.mts',
        'internal/**/*.tsx',
      ],
      rules: {
        'no-console': 'off',
        'unicorn/no-process-exit': 'off',
      },
    },
    // apps 内部:禁止其它代码深层引入 #/api、#/layouts、#/locales、#/stores
    // (应通过各自的 barrel 入口引入);api 层自身需要引入 #/api/request,故豁免 api 目录。
    // 备注:原 eslint 的 no-restricted-imports 用 gitignore 语义匹配 group,
    // 以 `#` 开头会被当作注释而静默失效,oxlint 按字面匹配才真正生效。
    {
      excludeFiles: ['**/vite.config.ts', 'apps/*/src/api/**'],
      files: ['apps/**/**'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['#/api/*'],
                message:
                  'The #/api package cannot be imported, please use the @core package itself',
              },
              {
                group: ['#/layouts/*'],
                message:
                  'The #/layouts package cannot be imported, please use the @core package itself',
              },
              {
                group: ['#/locales/*'],
                message:
                  'The #/locales package cannot be imported, please use the @core package itself',
              },
              {
                group: ['#/stores/*'],
                message:
                  'The #/stores package cannot be imported, please use the @core package itself',
              },
            ],
          },
        ],
      },
    },
    // @core 内部组件不能引入 @vben/* 里面的包
    {
      excludeFiles: ['**/vite.config.ts'],
      files: ['packages/@core/**/**'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@vben/*'],
                message:
                  'The @core package cannot import the @vben package, please use the @core package itself',
              },
            ],
          },
        ],
      },
    },
    // @core/base 内部不能引入 @vben/* 或者 @vben-core/* 里面的包
    {
      excludeFiles: ['**/vite.config.ts'],
      files: ['packages/@core/base/**/**'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@vben/*', '@vben-core/*'],
                message:
                  'The @vben-core/shared package cannot import the @vben package, please use the @core/shared package itself',
              },
            ],
          },
        ],
      },
    },
    // 基础包不能引入 @vben/* 里面的包
    {
      excludeFiles: ['**/vite.config.ts'],
      files: [
        'packages/types/**/**',
        'packages/utils/**/**',
        'packages/icons/**/**',
        'packages/constants/**/**',
        'packages/styles/**/**',
        'packages/stores/**/**',
        'packages/preferences/**/**',
        'packages/locales/**/**',
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@vben/*'],
                message:
                  'The @vben package cannot be imported, please use the @core package itself',
              },
            ],
          },
        ],
      },
    },
    // 后端模拟代码与文档,不需要太多规则
    {
      files: ['apps/backend-mock/**/**', 'docs/**/**'],
      rules: {
        'no-console': 'off',
      },
    },
    // playwright 配置允许使用 console
    {
      files: ['**/**/playwright.config.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};

export { overrides };
