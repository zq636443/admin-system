import {
  getTeamList,
  onTeamEdit,
  getTeamAdd,
  getTeamUsers,
  editTeamUsers,
  onRemoveTeamUser,
  onTeamAdd,
} from '@/services/teamManagement.service';
import { getRoleGroupList } from '@/services/bees.service'

export default {
  namespace: 'teamManagement',
  state: {
    loading: false,
    teamData: {
      list: [],
      total: 0,
    },
  },

  effects: {
    // 获取团队列表
    *getTeamList( { payload }, { call, put } ) {
      yield put( {
        type: 'setState',
        payload: {
          loading: true,
        },
      } );
      const { success, result } = yield call( getTeamList, payload );
      if ( success ) {
        yield put( {
          type: 'setState',
          payload: { teamData: result },
        } );
      }
      yield put( {
        type: 'setState',
        payload: {
          loading: false,
        },
      } );
    },
    // 编辑或者新增团队
    // getTeamAdd onTeamEdit
    *getTeamDeit( { payload, callBackFunc }, { call, put } ) {
      yield put( {
        type: 'setState',
        payload: {
          loading: true,
        },
      } );
      const { success } = yield call( payload.id ? onTeamEdit : getTeamAdd, payload );
      if ( success ) {
       if( callBackFunc ) callBackFunc( true );
      } else if( callBackFunc ) callBackFunc( false );
      yield put( {
        type: 'setState',
        payload: {
          loading: false,
        },
      } );
    },

    // 获取团队成员信息
    *getTeamUsers( { payload, callBackFunc }, { call, put } ) {
      yield put( {
        type: 'setState',
        payload: {
          loading: true,
        },
      } );
      const { success, result } = yield call( getTeamUsers, payload );
      if ( success ) {
        if ( callBackFunc ) callBackFunc( result );
      } else if ( callBackFunc ) callBackFunc( false );
      yield put( {
        type: 'setState',
        payload: {
          loading: false,
        },
      } );
    },
    // 新增团队成员
    *onTeamAdd( { payload, callBackFunc }, { call, put } ) {
      yield put( {
        type: 'setState',
        payload: {
          loading: true,
        },
      } );
      const { success } = yield call( onTeamAdd, payload );
      if ( success ) {
        if ( callBackFunc ) callBackFunc( true );
      } else if ( callBackFunc ) callBackFunc( false );
      yield put( {
        type: 'setState',
        payload: {
          loading: false,
        },
      } );
    },

    // 移除团队成员
    *onRemoveTeamUser( { payload, callBackFunc }, { call, put } ) {
      yield put( {
        type: 'setState',
        payload: {
          loading: true,
        },
      } );
      const { success } = yield call( onRemoveTeamUser, payload );
      if ( success ) {
        if ( callBackFunc ) callBackFunc( true );
      } else if ( callBackFunc ) callBackFunc( false );
      yield put( {
        type: 'setState',
        payload: {
          loading: false,
        },
      } );
    },

    // 编辑团队成员角色
    *editTeamUsers( { payload, callBackFunc }, { call, put } ) {
      yield put( {
        type: 'setState',
        payload: {
          loading: true,
        },
      } );
      const { success } = yield call( editTeamUsers, payload );
      if ( success ) {
        if ( callBackFunc ) callBackFunc( true );
      } else if ( callBackFunc ) callBackFunc( false );
      yield put( {
        type: 'setState',
        payload: {
          loading: false,
        },
      } );
    },

    // 获取权限对应角色列表
    *getRoleGroupList( { payload, callBackFunc }, { call, put } ) {
      const data = yield call( getRoleGroupList, payload );
      if ( data.success ) {
        yield put( {
          type: 'SetState',
          payload: { roleGroupList: data.result },
        } );
        if ( callBackFunc ) callBackFunc( data.result );
      }
    },
  },

  reducers: {
    setState( state, { payload } ) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
