/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-16 10:37:00
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 10:38:11
 * @FilePath: /admin-system/src/pages/Team/TeamManagement/service.js
 */
import { request } from '@umijs/max';

export async function getTeamList(obj) {
  return request(`user-service/team/list`, {
    method: 'GET',
    params: obj
  });
}