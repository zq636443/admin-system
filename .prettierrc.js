/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-10 21:48:26
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 14:51:13
 * @FilePath: /admin-system/.prettierrc.js
 */
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  tabWidth: 2,
  semi: true,
  spaceBeforeFunctionParen: true,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-two-style-order',
  ],
};

// const fabric = require('@umijs/fabric');

// module.exports = {
//   ...fabric.prettier,
// };