/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-10 21:48:26
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 15:18:58
 * @FilePath: /admin-system/.eslintrc.js
 */
module.exports = {
  extends: [
    require.resolve('@umijs/lint/dist/config/eslint'),
    // 'eslint:recommended',
    // 'plugin:react/recommended',
    // 'prettier',
    // 'plugin:prettier/recommended',
  ],
  plugins: ['import'],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // 确保包含你的文件扩展名
      },
    },
  },

  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [2, { ignore: ['^@/', '^umijs/'] }],
    // 'import/no-extraneous-dependencies': [
    //   2,
    //   {
    //     optionalDependencies: true,
    //     devDependencies: ['**/tests/**.js', '/mock/**/**.js', '**/**.test.js'],
    //   },
    // ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
    'compat/compat': 0,
    'react/react-in-jsx-scope': 'off',
    'no-eval': 0,
    'react/destructuring-assignment': 0,
    'react/no-access-state-in-setstate': 0,
    'space-in-parens': ['error', 'never'],
    'no-irregular-whitespace': 'error',
    'object-curly-spacing': 0,
    'comma-spacing': 'error',
    'import/extensions': 0,
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error'
  },
};
