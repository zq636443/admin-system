/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-12 10:13:59
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-14 10:14:22
 * @FilePath: /admin-system/src/pages/home/home.jsx
 */
import {useIntl} from '@umijs/max';
import {GridContent} from '@ant-design/pro-components';
import useStyles from './style.style';

function Home() {
  const {styles} = useStyles();
  return (
    <GridContent>
      <div className={styles.mian}>{useIntl().formatMessage( {id: 'menu.home'} )}</div>
    </GridContent>
  )
}

export default Home;
