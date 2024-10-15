/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-10 21:48:26
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 15:06:34
 * @FilePath: /admin-system/config/defaultSettings.ts
 */
import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#D8B269',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '绩牛数智营销',
  pwa: true,
  logo: 'https://media-test.jiniutech.com/dev/image/78817af7-7158-4b0d-ba9f-23fa02c99ccf.png',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
