/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-11 09:58:01
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-11 09:58:19
 * @FilePath: /admin-system/src/models/login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useCallback } from 'react';

export default () => {
  const [counter, setCounter] = useState(0);
  const increment = useCallback(() => setCounter((c) => c + 1), []);
  const decrement = useCallback(() => setCounter((c) => c - 1), []);
  return { counter, increment, decrement };
};
