/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-14 21:12:57
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-14 21:17:38
 * @FilePath: /admin-system/src/pages/ActivityMarketing/ActivityList/data.js
 */

const all = require('./images/all.png');
const start = require('./images/start.png');
const end = require('./images/end.png');
const activityStatusList = [
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

export default activityStatusList;
