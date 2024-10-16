/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-14 13:51:22
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 10:31:08
 * @FilePath: /admin-system/config/routeOption/activityMenu.js
 */
const activityMenu = [
  {
    name: 'activityTemplate',
    icon: 'icon-statistics',
    path: '/activityTemplate',
    routes: [
      {
        path: '/activityTemplate',
        redirect: '/activityTemplate/bees',
      },
      // 活动模板管理
      {
        name: 'template',
        path: '/activityTemplate/template',
        component: './home/index'
      },
      //活动列表
      {
        name: 'bees',
        path: '/activityTemplate/bees',
        component: './ActivityMarketing/ActivityList'
      },
    ]
  }
]

export default activityMenu