/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-14 14:10:13
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 20:03:53
 * @FilePath: /admin-system/src/pages/ActivityMarketing/ActivityList/service.js
 */
import { request } from '@umijs/max';

export async function fetchActivityList(params) {
  return request('/activity-service/activity/info', {
    method: 'GET',
    params,
  });
}

export async function fetchActiveStatistics(params) {
  return request(`/activity-service/activity/info/status/statistics`, {
    method: 'GET',
    params,
  });
}


export async function importActivity(params) {
  return request('/activity-service/activity/info/import', {
    method: 'POST',
    params: params.file,
    formType: 'JSON'
  })
}
