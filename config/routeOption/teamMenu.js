/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-16 10:21:03
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 10:26:23
 * @FilePath: /admin-system/config/routeOption/teamMenu.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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