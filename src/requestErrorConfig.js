// import type { RequestOptions } from '@@/plugin-request/request';
// import type { RequestConfig } from '@umijs/max';
import {message, notification} from 'antd';
import cookies from 'js-cookie';

// 错误处理方案： 错误类型
// enum ErrorShowType {
//   SILENT = 0,
//   WARN_MESSAGE = 1,
//   ERROR_MESSAGE = 2,
//   NOTIFICATION = 3,
//   REDIRECT = 9,
// }
// 与后端约定的响应数据格式
// interface ResponseStructure {
//   success: boolean;
//   data: any;
//   errorCode?: number;
//   errorMessage?: string;
//   showType?: ErrorShowType;
// }

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = ( response, callUrl ) => {
  if ( response.status >= 200 && response.status < 300 ) return;
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error( {
    message: `请求错误 ${response.status}: ${callUrl}`,
    description: errortext,
  } );
  const error = new Error( errortext );
  error.name = response.status;
  error.response = response;
  throw error;
};

const changeDatas = ( response, callUrl ) => {
  if ( response.status === 200 ) {
    const TOKEN = response.headers['x-auth-token'];
    const expires = new Date( new Date().getTime() + 2 * 60 * 60 * 1000 );
    if ( TOKEN ) {
      cookies.set( 'JINIU_DATA_PRODUCT_CMS_TOKEN', TOKEN, {expires} );
      localStorage.setItem( 'JINIU_DATA_PRODUCT_CMS_TOKEN', TOKEN );
      sessionStorage.removeItem( 'JINIU_DATA_PRODUCT_CMS_TOKEN' );
    }
    if ( callUrl.indexOf( '/user-service/users/ssoLogin' ) > -1 ) {
      if ( TOKEN ) {
        sessionStorage.setItem( 'JINIU_DATA_PRODUCT_CMS_TOKEN', TOKEN );
        cookies.remove( 'JINIU_DATA_PRODUCT_CMS_TOKEN' );
      }
    } else if ( callUrl.indexOf( '/user-service/users/logout' ) > -1 ) {
      // 如果是退出登录就删除缓存
      localStorage.removeItem( 'JINIU-CMS-authority' );
      localStorage.removeItem( 'JINIU_DATA_PRODUCT_CMS_USERINFO' );
      cookies.remove( 'JINIU_DATA_PRODUCT_CMS_TOKEN' );
      sessionStorage.removeItem( 'JINIU_DATA_PRODUCT_CMS_TOKEN' );
    }
  }
};

export const errorConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: ( res ) => {
      const {success, data, errorCode, errorMessage, showType} = res;
      if ( !success ) {
        const error = new Error( errorMessage );
        error.name = 'BizError';
        error.info = {errorCode, errorMessage, showType, data};
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: ( error, opts ) => {
      if ( opts?.skipErrorHandler ) throw error;
      // 我们的 errorThrower 抛出的错误。
      if ( error.name === 'BizError' ) {
        const errorInfo = error.info;
        if ( errorInfo ) {
          const {errorMessage, errorCode} = errorInfo;
          switch ( errorInfo.showType ) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning( errorMessage );
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error( errorMessage );
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open( {
                description: errorMessage,
                message: errorCode,
              } );
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error( errorMessage );
          }
        }
      } else if ( error.response ) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error( `Response status:${error.response.status}` );
      } else if ( error.request ) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error( 'None response! Please retry.' );
      } else {
        // 发送请求时出了点问题
        message.error( 'Request error, please retry.' );
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    ( config ) => {
      // 拦截请求配置，进行个性化处理。
      const TOKEN = cookies.get( 'JINIU_DATA_PRODUCT_CMS_TOKEN' ) || sessionStorage.getItem( 'JINIU_DATA_PRODUCT_CMS_TOKEN' );
      const tokenObj = TOKEN ? {'X-Auth-Token': TOKEN} : {};
      // 拦截请求配置，进行个性化处理。
      const headers = {...config?.headers, ...tokenObj};
      return {...config, headers};


      // let callUrl = url;
      // const options = {
      //   ...option,
      // };
      // const TOKEN = cookies.get( 'JINIU_DATA_PRODUCT_CMS_TOKEN' ) || sessionStorage.getItem( 'JINIU_DATA_PRODUCT_CMS_TOKEN' );
      // const tokenObj = TOKEN ? { 'X-Auth-Token': TOKEN } : {};
    
      // const fingerprint = callUrl + ( options.body ? JSON.stringify( options.body ) : '' );
      // const hashcode = hash
      //   .sha256()
      //   .update( fingerprint )
      //   .digest( 'hex' );
    
      // let newOptions = { ...options };
      // if ( option.method === 'POST' || option.method === 'PUT' || option.method === 'DELETE' ) {
      //   if ( !( newOptions.body instanceof FormData ) ) {
      //     if ( formType === 'FORM' ) {
      //       newOptions.headers = {
      //         Accept: 'application/json',
      //         'Content-Type': 'application/x-www-form-urlencoded',
      //         ...newOptions.headers,
      //         ...tokenObj,
      //       };
      //       if ( isFile ) {
      //         delete newOptions.headers['Content-Type'];
      //         const data = new FormData();
      //         Object.entries( newOptions.body ).forEach( ( item ) => {
      //           const value = item[1] === false ? item[1] : item[1] || ''
      //           data.append( item[0], value );
      //         } );
      //         newOptions.body = data;
      //       } else {
      //         newOptions.body = stringify( newOptions.body );
      //       }
      //     } else if ( formType === 'JSON' ) {
      //       newOptions.headers = {
      //         Accept: 'application/json',
      //         'Content-Type': 'application/json',
      //         ...newOptions.headers,
      //         ...tokenObj,
      //       };
      //       newOptions.body = JSON.stringify( newOptions.body );
      //     }
      //   } else {
      //     // newOptions.body is FormData
      //     newOptions.headers = {
      //       Accept: 'application/json',
      //       ...newOptions.headers,
      //       ...tokenObj,
      //     };
      //   }
      // } else if ( option.method === 'GET' || option.method === 'PATCH' ) {
      //   const { body } = option;
      //   if ( body ) {
      //     const paramsArray = [];
      //     // 拼接参数
      //     /* eslint-disable consistent-return */
      //     Object.keys( body ).forEach( key => {
      //       if ( body[key] || body[key] === false || body[key] === 0 ) {
      //         return paramsArray.push( `${key}=${encodeURIComponent( body[key] )}` );
      //       }
      //     } );
      //     /* eslint-enable consistent-return */
    
      //     if ( url.search( /\?/ ) === -1 ) {
      //       callUrl += `?${paramsArray.join( '&' )}`;
      //     } else {
      //       callUrl += `&${paramsArray.join( '&' )}`;
      //     }
      //   } else {
      //     callUrl = url;
      //   }
      //   newOptions = !TOKEN
      //     ? { method: option.method }
      //     : {
      //         method: option.method,
      //         headers: {
      //           ...tokenObj,
      //         },
      //       };
      // }
    
      // const expirys = options.expirys && 60;
      // // options.expirys !== false, return the cache,
      // if ( options.expirys !== false ) {
      //   const cached = sessionStorage.getItem( hashcode );
      //   const whenCached = sessionStorage.getItem( `${hashcode}:timestamp` );
      //   if ( cached !== null && whenCached !== null ) {
      //     const age = ( Date.now() - whenCached ) / 1000;
      //     if ( age < expirys ) {
      //       const response = new Response( new Blob( [cached] ) );
      //       return response.json();
      //     }
      //     sessionStorage.removeItem( hashcode );
      //     sessionStorage.removeItem( `${hashcode}:timestamp` );
      //   }
      // }


    },
  ],

  // 响应拦截器
  responseInterceptors: [
    ( response ) => {
      const {
        data,
        config: {url},
      } = response;

      checkStatus( response, url );
      changeDatas( response, url );
      if ( response.code === 2002 ) {
        notification.error( {
          message: `账号存在安全风险，请及时修改密码！`,
          description: response.message,
        } );
      }
      if ( response.code === 2001 ) {
        cookies.remove( 'JINIU_DATA_PRODUCT_CMS_TOKEN' );
        localStorage.removeItem( 'JINIU-CMS-authority' );
        localStorage.removeItem( 'JINIU_DATA_PRODUCT_CMS_USERINFO' );
        // const hiddenBar = sessionStorage.getItem('hiddenBar');
        // if (hiddenBar) {
        //   const callBackUrlMap = {
        //     dev: 'http://s-cms30.test.jiniutech.cn',
        //     uat: 'http://uat.cms.jiniutech.com',
        //     pro: 'https://api.jiniutech.com', // 生产暂时没有 TODO:
        //   };
        //   window.parent.postMessage(
        //     {
        //       code: 2001,
        //       message: "登录过期，请重新登录！",
        //     },
        //     callBackUrlMap[BUILD_ENV]
        //   );
        // } else {
        //   setTimeout(() => {
        //     const { href } = window.location;
        //     if (href.indexOf('redirect') <= -1) {
        //       router.replace({
        //         pathname: '/user/login',
        //         search: stringify({
        //           redirect: href,
        //         }),
        //       });
        //     }
        //   }, 100);
        // }
      } else if ( response.code !== 200 ) {
        if ( response.tip || response.message ) {
          message.error( response.tip || response.message );
        }
      }
      const status = response.code;
      // if ( status === 401 ) {
      //   window.g_app._store.dispatch( {
      //     type: 'login/logout',
      //   } );
      //   return;
      // }
      if ( status === 403 ) {
        router.push( '/exception/403' );
        return;
      }
      if ( status <= 504 && status >= 500 ) {
        router.push( '/exception/500' );
        return;
      }
      if ( status >= 404 && status < 422 ) {
        router.push( '/exception/404' );
      }
      return response;
    },
  ],
};
