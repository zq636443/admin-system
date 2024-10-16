/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-11 13:45:03
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 21:27:42
 * @FilePath: /admin-system/src/services/users/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from '@umijs/max';

export const login = async (body) => {
  return request(`/user-service/userManager/managerLogin`, {
    method: 'POST',
    params: body,
  });
};

export const getMenuList = async () => {
  return request('/user-service/menu/user', {
    method: 'GET',
  });
};

export const outLogin = async () => {
  return request('/user-service/users/logout', {
    method: 'DELETE'
  });
};

