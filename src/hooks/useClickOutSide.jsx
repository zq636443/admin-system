/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-15 10:01:49
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 10:01:51
 * @FilePath: /admin-system/src/hooks/useClickOutSide.jsx
 */
import { useEffect } from 'react';

function useClickOutside(ref, callback) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}

export default useClickOutside;
