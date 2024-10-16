/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-10 21:48:26
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 10:30:52
 * @FilePath: /admin-system/src/pages/exception/403/index.tsx
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
