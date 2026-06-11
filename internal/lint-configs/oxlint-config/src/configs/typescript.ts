import type { OxlintConfig } from 'oxlint';

const typescript: OxlintConfig = {
  rules: {
    'typescript/ban-ts-comment': 'error',
    // Keep the first type-aware rollout conservative. These rules currently
    // produce high-volume diagnostics and need file-by-file cleanup later.
    'typescript/await-thenable': 'off',
    'typescript/no-base-to-string': 'off',
    'typescript/no-duplicate-type-constituents': 'off',
    'typescript/no-floating-promises': 'off',
    'typescript/no-misused-spread': 'off',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-redundant-type-constituents': 'off',
    'typescript/no-unnecessary-boolean-literal-compare': 'off',
    'typescript/no-unnecessary-type-assertion': 'off',
    'typescript/no-unnecessary-type-arguments': 'off',
    'typescript/no-unnecessary-template-expression': 'off',
    'typescript/no-unsafe-enum-comparison': 'off',
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/no-var-requires': 'error',
    'typescript/restrict-template-expressions': 'off',
    'typescript/triple-slash-reference': 'error',
    'typescript/unbound-method': 'off',

    // TODO: vsh lint 已开启 --type-aware;以下 type-aware 规则当前在仓库内有违规,
    // 暂时关闭、后续清理(TODO)。其中 no-useless-default-assignment 在
    // apps/backend-mock 还需开启 strictNullChecks 才能正常运行。
    'typescript/consistent-return': 'off',
    'typescript/no-unnecessary-type-conversion': 'off',
    'typescript/no-unnecessary-type-parameters': 'off',
    'typescript/no-useless-default-assignment': 'off',

    'typescript/adjacent-overload-signatures': 'error',
    'typescript/consistent-type-assertions': 'error',
    'typescript/no-dynamic-delete': 'error',
    'typescript/no-invalid-void-type': 'error',
    'typescript/no-non-null-asserted-nullish-coalescing': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/prefer-function-type': 'error',
    'typescript/prefer-literal-enum-member': 'error',
    'typescript/unified-signatures': 'error',
  },
};

export { typescript };
