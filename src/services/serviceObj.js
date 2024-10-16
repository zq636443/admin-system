/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-15 15:25:32
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 15:58:26
 * @FilePath: /admin-system/src/services/serviceObj.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const apiObj = {
  dev: 'http://api.test.jiniutech.cn',
  pro: 'https://api-hd.jiniutech.com',
  uat: 'http://hd-uat.jiniutech.com',
}
const BASE_API = apiObj[REACT_APP_ENV];

export default {
  userService: `${BASE_API}/user-service`,
  fileService: `${BASE_API}/file-service/files/`,
  statisticsService: `${BASE_API}/statistics-service`,
  activityService: `${BASE_API}/activity-service`,
  libraryService: `${BASE_API}/file-service`,
  equityCenterService: `${BASE_API}/right-service`, // 权益中心服务
  fileFontService: `${BASE_API}/file-service`, // 字体服务
}