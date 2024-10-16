/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-10 21:48:26
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 09:15:18
 * @FilePath: /admin-system/src/pages/exception/403/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Link } from '@umijs/max';
import { Button, Result } from 'antd';

export default () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Link to="/">
        <Button type="primary">回到首页</Button>
      </Link>
    }
  />
);
