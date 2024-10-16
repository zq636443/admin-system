/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-11 13:45:03
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 10:31:01
 * @FilePath: /admin-system/src/services/users/index.js
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

