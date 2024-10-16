/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-14 19:15:34
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-15 20:23:01
 * @FilePath: /admin-system/src/pages/ActivityMarketing/ActivityList/style.style.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    card: {
      '.ant-card-meta-title': {
        marginBottom: '12px',
        '& > a': {
          display: 'inline-block',
          maxWidth: '100%',
          color: token.colorTextHeading,
        },
      },
      '.ant-card-body:hover': {
        '.ant-card-meta-title > a': {
          color: token.colorPrimary,
        },
      },
    },
    item: {
      height: '64px',
    },
    cardList: {
      flex: '1',
      scrollbarWidth: 'none', // Firefox 隐藏滚动条
      '&::-webkit-scrollbar': {
        display: 'none', // Chrome/Safari 隐藏滚动条
      },
      '.ant-list .ant-list-item-content-single': { maxWidth: '100%', overflowX: 'hidden' },
      '.ant-card-body':{
        padding: '10px'
      }
    },
    extraImg: {
      width: '155px',
      marginTop: '-20px',
      textAlign: 'center',
      img: { width: '100%' },
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none',
      },
    },
    newButton: {
      width: '100%',
      height: '201px',
      color: token.colorTextSecondary,
      backgroundColor: token.colorBgContainer,
      borderColor: token.colorBorder,
    },
    cardAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '48px',
    },
    cardDescription: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
    },
    pageHeaderContent: {
      position: 'relative',
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        paddingBottom: '30px',
      },
    },
    contentLink: {
      marginTop: '16px',
      a: {
        marginRight: '32px',
        img: {
          width: '24px',
        },
      },
      img: { marginRight: '8px', verticalAlign: 'middle' },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        a: {
          marginRight: '16px',
        },
      },
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        position: 'absolute',
        bottom: '-4px',
        left: '0',
        width: '1000px',
        a: {
          marginRight: '16px',
        },
        img: {
          marginRight: '4px',
        },
      },
    },
    active: {
      border: '2px solid #EDBB62',
      borderRadius: '12px',
    },
    activityStatusList: {
      display: 'flex',
      marginBottom: '25px',
    },
    activityStatesBox: {
      display: 'flex',
      alignItems: 'center',
      width: '240px',
      height: '80px',
      marginTop: '20px',
      marginRight: '45px',
      backgroundImage: 'linear-gradient(162deg, #FDFDFD 0%, #F8FAFB 98%)',
      border: '1px solid #E7E9EC',
      borderRadius: '4px',
      cursor: 'pointer',
      img: {
        width: '55px',
        margin: '0 20px',
      },
    },
    activityStatesNum: {
      color: '#17233D',
      fontWeight: 500,
      fontSize: '22px',
    },
    activityStatesActive: {
      background: '#FFF9F1',
      border: '1px solid #EDBB62',
    },

    blockActivityCardImg: {
      position: 'relative',
      flex: 1,
      width: '100%',
      height: '274px',
      overflow: 'hidden',
      cursor: 'pointer',
      'img:nth-child(1)': {
        transform: 'translateY(0)',
        width: '100%',
        overflow: 'hidden',
        transition: 'all 0.66s ease-in-out',
      },
    },
    blockActivityCardStatus: {
      position: 'absolute',
      bottom: '7px',
      left: '7px',
      width: '60px',
    },
    blockActivityCardBottom:{
      position:'relative',
      cursor:'pointer',
    },
    blockActivityCardBottomName:{
      margin:'5px 0',
      overflow:'hidden',
      textOverflow:'ellipsis',
      whiteSpace:'nowrap',
      fontSize:'14px',
      fontWeight:500,
      color:'#333',
    },
    blockActivityCardBottomTime:{
      display:'flex',
      alignItems:'center',
      color:'#666',
      fontWeight:400,
      fontSize:'12px',
      'img:nth-child(1)':{
        width:'15px',
        marginRight:'2px',
      }
    },
    activityEdit: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 0,
      backgroundColor: '#fff',
      opacity: 0,
      transition: 'all 0.4s',
    },
  
    activityEditbox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
  
    activityEditboxItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      margin:'0 20px'
    },
  
    editboxIcon: {
      padding: '6px',
      color: '#EDBB62',
      fontSize: '20px',
      backgroundImage: 'linear-gradient(162deg, #FDFDFD 0%, #F8FAFB 98%)',
      border: '0.5px solid #E7E9EC',
      borderRadius: '4px',
    },
  
    activityEditboxText: {
      marginTop: '5px',
      color: '#17233D',
      fontSize: '12px',
    },
  
    activityEditboxItemSecond: {
      margin: '0 20px',
    },
    
    showEditBox: {
      height: '100%',
      opacity: 1,
    }
  };
});

export default useStyles;
