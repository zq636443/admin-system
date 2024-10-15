/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-10 21:48:26
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-11 10:54:37
 * @FilePath: /admin-system/src/components/Footer/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DefaultFooter } from '@ant-design/pro-components';
import React,{Fragment} from 'react';


const imgStyle = {
  display: 'inline-block',
  width: '18px',
  marginTop: '-6px',
}

const imgSrc = require( '@/assets/images/beian.png' );

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: '关于绩牛',
          title: '关于绩牛',
          href: 'https://jiniutech.com',
          blankTarget: true,
        },
        {
          key: 'beian',
          title: <span><img style={imgStyle} src={imgSrc} alt="" />闽公网安备 35020302033335号</span>,
          href: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020302033335',
          blankTarget: true,
        },
      ]}
      copyright={''}
    />
  );
};

export default Footer;
