/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-16 10:21:03
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 10:30:57
 * @FilePath: /admin-system/config/routeOption/teamMenu.js
 */
const teamMenu = [{
  name: 'team',
  path: '/team',
  routes: [
    {
      path: '/team',
      redirect: '/team/teamManagement',
    },
    {
      name: 'teamManagement',
      path: '/team/teamManagement',
      component: './Team/TeamManagement',
    },
  ]
}]

export default teamMenu