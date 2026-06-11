import type { OxlintConfig } from 'oxlint';

import { configs } from 'oxlint-plugin-vize';
// 通过 oxlint 的 jsPlugin 运行 Vize（自带 Rust Vue parser），为 .vue 模板提供
// vue / a11y / html / ssr 等检查（这些是 oxlint 原生 vue 插件与 eslint-plugin-vue
// 都未覆盖的部分）。基线采用 `all` 预设（131 条），仅关闭「噪音大户」与会阻断
// lint 的 error 级违规规则；其余低频 warning 保留，便于后续逐步清理。
//
// 注意：
// 1. Vize 处于实验阶段（unofficial / alpha）。
// 2. 模板规则的诊断位置锚定在 `<script>` 块开头，编辑器波浪线可能标错行。
// 3. 行尾数字为引入时（全仓 .vue）实测的违规数。
const vue: OxlintConfig = {
  jsPlugins: [
    {
      name: 'vize',
      specifier: 'oxlint-plugin-vize',
    },
  ],
  rules: {
    ...configs.all,

    // 高频 warning——暂时关闭，待评估后再决定是否开启
    'vize/vue/component-definition-name-casing': 'off', // 242
    'vize/vue/attribute-order': 'off', // 91
    'vize/a11y/no-static-element-interactions': 'off', // 56
    'vize/a11y/click-events-have-key-events': 'off', // 39
    'vize/a11y/mouse-events-have-key-events': 'off',
    'vize/a11y/form-control-has-label': 'off',
    'vize/a11y/label-has-for': 'off',
    'vize/vue/no-unsafe-url': 'off', // 37
    'vize/vue/v-slot-style': 'off', // 30
    'vize/ssr/no-browser-globals-in-ssr': 'off', // 14

    // error 级违规——暂时关闭以保持 lint 通过，待清理代码后再开启
    'vize/vue/no-reserved-component-names': 'off', // 23
    'vize/vue/permitted-contents': 'off', // 6
    'vize/vue/no-mutating-props': 'off', // 2

    'vize/a11y/no-redundant-roles': 'off',
    'vize/vue/require-scoped-style': 'off',

    'vue/prefer-import-from-vue': 'error',
    'vue/prop-name-casing': ['error', 'camelCase'],
  },
};

export { vue };
