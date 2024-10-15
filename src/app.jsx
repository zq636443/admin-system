import { AvatarDropdown, AvatarName } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { getMenuList } from './services/users/index.js';
const isDev = process.env.REACT_APP_ENV === 'dev';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    const { success, code, result } = await getMenuList();
    if (success && code === 200 && result) {
      return result;
    } else {
      return undefined;
    }
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (![loginPath, '/user/register', '/user/register-result'].includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      menu: currentUser.menuTrees,
      authorizationKeys: currentUser.codes,
      currentUser: currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout

const transformData = (data) => {
  return (
    data?.length &&
    data.map((item) => {
      const transformedItem = {
        ...item,
        path: item.router,
        children: item.childList.length > 0 ? transformData(item.childList) : undefined,
        title: item.name,
        value: item.id,
      };
      return transformedItem;
    })
  );
};

export const layout = ({ initialState, setInitialState }) => {
  const { currentUser, menu } = initialState || {};
  return {
    // actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      const token = localStorage.getItem('JINIU_DATA_PRODUCT_CMS_TOKEN');
      if (!token && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    actionsRender: () => {},
    menuDataRender: () => transformData(menu),
    // menuItemRender: (menuItemProps, defaultDom) => {
    //   return (
    //     <Link to={menuItemProps.path}>
    //       <span>{menuItemProps.name}</span>
    //     </Link>
    //   );
    // },
    collapsed: false,
    menu: {
      type: 'group',
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: ( children ) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return (
    //     <>
    //       {children}
    //       {isDev === false && (
    //         <SettingDrawer
    //           disableUrlParams
    //           enableDarkTheme
    //           settings={initialState?.settings}
    //           onSettingChange={( settings ) => {
    //             setInitialState( ( preInitialState ) => ( {
    //               ...preInitialState,
    //               settings,
    //             } ) );
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */

const { REACT_APP_ENV = 'dev' } = process.env;
const apiObj = {
  dev: 'http://api.test.jiniutech.cn',
  pro: 'https://api-hd.jiniutech.com',
  uat: 'http://hd-uat.jiniutech.com',
};

const BASE_API = apiObj[REACT_APP_ENV];
export const request = {
  baseURL: BASE_API,
  ...errorConfig,
};
