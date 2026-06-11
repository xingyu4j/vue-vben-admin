import { defineConfig as defineOxfmtConfig } from 'oxfmt';

type OxfmtConfig = Parameters<typeof defineOxfmtConfig>[0];

const oxfmtConfig: OxfmtConfig = defineOxfmtConfig({
  printWidth: 80,
  proseWrap: 'never',
  semi: true,
  singleQuote: true,
  sortPackageJson: false,
  // 暂时关闭，改动较多，后续可以考虑开启，支持vue与现有的eslint-plugin-better-tailwindcss会冲突
  // sortTailwindcss: {
  //   functions: ['clsx', 'cn', 'cva', 'tw'],
  //   stylesheet: './internal/tailwind-config/src/theme.css',
  //   preserveWhitespace: true,
  // },
  trailingComma: 'all',
  overrides: [
    {
      files: [
        '*.json',
        '*.json5',
        '*.jsonc',
        '*.code-workspace',
        '**/*.json',
        '**/*.json5',
        '**/*.jsonc',
        '**/*.code-workspace',
      ],
      options: {
        trailingComma: 'none',
      },
    },
  ],
});

function defineConfig(config: OxfmtConfig = {}): OxfmtConfig {
  return defineOxfmtConfig({
    ...oxfmtConfig,
    ...config,
  });
}

export { defineConfig, oxfmtConfig };
export type { OxfmtConfig };
