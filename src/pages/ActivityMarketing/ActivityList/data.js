/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-14 21:12:57
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 21:53:30
 * @FilePath: /admin-system/src/pages/ActivityMarketing/ActivityList/data.js
 */

const all = require('./assets/images/all.png');
const start = require('./assets/images/start.png');
const end = require('./assets/images/end.png');
export const activityStatusList = [
  {
    key: 'ALL',
    name: '全部',
    val: 'total',
    img: all,
  },
  {
    key: 'START',
    name: '进行中',
    val: 'startNum',
    img: start,
  },
  {
    key: 'END',
    name: '已完成',
    val: 'endNum',
    img: end,
  },
];

export const gridConfig = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 4,
  xxl: 5,
};


