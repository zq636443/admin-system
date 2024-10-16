/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-15 10:02:19
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 15:28:45
 * @FilePath: /admin-system/src/utils/index.js
 */
import cookies from "js-cookie";
import { notification, Modal, Icon } from 'antd';
import serviceObj from "../services/serviceObj";

/**
 * 获取URL中的参数值
 * 
 * @param {string} parameterName - 参数名称
 * @param {string} [str] - 可选字符串，搜索和哈希参数的组合
 * @returns {string|null} - 参数值，如果未找到则返回null
 */
export function getUrlParameter(parameterName, str) {
  const reg = new RegExp(`(^|&|\\?)${parameterName}=([^&]*)(&|$)`, 'i');
  let arr;
  let arr1;
  if (str) {
    arr = str.match(reg);
    arr1 = str.match(reg);
  } else {
    arr = window.location.search.substr(1).match(reg);
    arr1 = window.location.hash.substr(2).match(reg);
  }

  if (arr) {
    return arr[2];
  }
  if (arr1) {
    return arr1[2];
  }

  return null;
}

export function showSuccess() {
  Modal.confirm({
    content: '导出请求已加载到队列中，稍等可在导出列表中下载。',
    okText: '立即查看',
    cancelText: '关闭',
    icon: <Icon style={{ color: '#54c51c' }} type="check-circle" />,
    onOk() {
      window.open(`/system/exportList`)
    },
    onCancel() { },
  });
}
export function exportXlsx({ type, uri, xlsxName, callBack, responseType = "POST" }) {
  const TOKEN = cookies.get('JINIU_DATA_PRODUCT_CMS_TOKEN') || sessionStorage.getItem('JINIU_DATA_PRODUCT_CMS_TOKEN');
  const tokenObj = TOKEN ? { 'X-Auth-Token': TOKEN } : {};
  return fetch(`${serviceObj[type]}/${uri}`, {
    method: 'get',
    responseType,
    headers: {
      ...tokenObj,
    }
  }).then(res => {
    return res.blob();
  }).then(blob => {
    // 暂时处理方法 后端返回message:"任务已提交，请在导出任务中查看"大小为97b
    if (blob.size > 100) {
      // application/vnd.ms-excel -> xlsx文件
      // text/plain -> txt文件
      const bl = new Blob([blob], { type: blob.type });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(bl);
      link.download = xlsxName;
      link.click();
      window.URL.revokeObjectURL(link.href);
      if (callBack) callBack();
    } else {
      if (callBack) callBack();
      showSuccess();
    }
  }).catch(() => {
    notification.error({
      message: '文件导出失败',
      description: '请刷新后，重新尝试',
    });
  })
}