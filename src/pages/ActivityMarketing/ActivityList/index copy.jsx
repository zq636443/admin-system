/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-14 14:06:10
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-14 19:09:22
 * @FilePath: /admin-system/src/pages/ActivityMarketing/ActivityList/index.jsx
 */
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef } from 'react';
// import {useRequest} from '@umijs/max';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import moment from 'moment';
import { fetchActivityList } from './service';

function extractKeyValue(obj, defaultSort) {
  let result = {};
  const a = Object.prototype.toString.call(obj);
  if (obj && a === '[object Object]' && Object.keys(obj).length > 0) {
    result = Object.entries(obj).map(([key, value]) => ({ key, value }))[0];
  } else {
    result = Object.entries(defaultSort).map(([key, value]) => ({ key, value }))[0];
  }
  return result;
}
function Index() {
  const actionRef = useRef(null);
  const getActivityList = async (data, sort, filter) => {
    const columnKey = {
      startTime: 'start_time',
      endTime: 'end_time',
      createTime: 'create_time',
    };
    const columnOrder = {
      descend: 'desc',
      ascend: 'asc',
    };

    const sortInfoObj = extractKeyValue(sort, { startTime: 'descend' });
    const { name, id, current } = data || {};
    const params = {
      pageNum: current || 1,
      pageSize: 10,
      orderBy: `${columnKey[sortInfoObj.key]} ${columnOrder[sortInfoObj.value]}`,
      showV3: true,
      version: 'V3',
      isEnd: 'ALL',
      roles: '',
      name: name,
      id,
    };
    console.log(data, sort, filter);
    const { success, result } = await fetchActivityList(params);
    return {
      data: result.list,
      success: success,
      total: result.total,
    };
  };

  useEffect(() => {
    getActivityList();
  }, []);

  const columns = [
    {
      title: <span>活动名称</span>,
      dataIndex: 'name',
      key: 'name',
      render: (name) => <span>{name}</span>,
    },
    {
      title: <span>活动ID</span>,
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span>{id}</span>,
    },
    {
      title: <span>活动类型</span>,
      dataIndex: 'activityType',
      key: 'activityType',
      // render: activityType => <span>{getValue( activityTypes, activityType ) || '--'}</span>,
      search: false,
    },
    {
      title: <span>开始时间</span>,
      dataIndex: 'startTime',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (startTime) => (
        <span>{startTime ? moment(startTime).format('YYYY-MM-DD') : '--'}</span>
      ),
      search: false,
    },
    {
      title: <span>结束时间</span>,
      dataIndex: 'endTime',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (endTime) => <span>{endTime ? moment(endTime).format('YYYY-MM-DD') : ''}</span>,
      search: false,
    },
    {
      title: <span>活动期数</span>,
      dataIndex: 'periods',
      key: 'periods',
      // width: 120,
      render: (periods) => <span>{periods || '--'}</span>,
      search: false,
    },
    {
      title: <span>状态</span>,
      dataIndex: 'state',
      key: 'state',
      // width: 160,
      render: (state) => {
        // return <span>{getValue( activityStates, state )}</span>
      },
      search: false,
    },
    {
      title: <span>创建时间</span>,
      width: 200,
      dataIndex: 'createTime',
      key: 'create_time',
      sorter: true,
      // sortOrder: sortedInfo.columnKey === 'create_time' && sortedInfo.order,
      sortDirections: ['descend', 'ascend'],
      render: (createTime) => <span>{createTime || '--'}</span>,
      search: false,
    },
    {
      title: <span>创建人</span>,
      dataIndex: 'createUsername',
      key: 'createUsername',
      // width: 120,
      render: (createUsername) => <span>{createUsername || '--'}</span>,
      search: false,
    },
    {
      title: <span>所属部门</span>,
      dataIndex: 'createUserOrg',
      key: 'createUserOrg',
      // width: 120,
      render: (createUserOrg) => <span>{createUserOrg || '--'}</span>,
      search: false,
    },
    {
      title: <span style={{ textAlign: 'center' }}>操作</span>,
      // dataIndex: 'id',
      fixed: 'right',
      // width: 210,
      // render: ( id, item ) => (
      //   <div>
      //     <span
      //       style={{ marginRight: 15, cursor: 'pointer', color: '#1890ff' }}
      //       onClick={() => getCurrentCollaborsInfo( item.id, 'edit', () => onEditBees( { item } ) )}
      //     >编辑
      //     </span>
      //     <span
      //       style={{ marginRight: 15, cursor: 'pointer', color: '#1890ff' }}
      //       onClick={( e ) => openQRCodeModal( e, item )}
      //     >
      //       预览
      //     </span>
      //     <Popover
      //       placement="bottomRight"
      //       content={
      //         <div style={{ display: 'flex', flexDirection: 'column' }}>
      //           <span
      //             style={{ margin: '0 20px 10px', cursor: 'pointer', color: '#1890ff' }}
      //             onClick={( e ) => onCopyBees( e, item.id )}
      //           >复制活动
      //           </span>

      //           <span
      //             style={{ margin: '0 20px 10px', cursor: 'pointer', color: '#1BB557' }}
      //             onClick={( e ) => jumpDataCenter( e, item )}
      //           >
      //             数据中心
      //           </span>
      //           <span
      //             style={{ margin: '0 20px 10px', cursor: 'pointer', color: '#efb208' }}
      //             onClick={( e ) => handleAddTemplate( e, item )}
      //           >添加至模版
      //           </span>
      //           {
      //             item.version === 'V2' &&
      //             <>
      //               <span
      //                 style={{ margin: '0 20px 10px', cursor: 'pointer', color: '#efb208' }}
      //                 onClick={( e ) => onOpenFeatureModal( e, item )}
      //               >未来版本设置
      //               </span>
      //             </>
      //           }
      //           <span
      //             style={{ margin: '0 20px 10px', cursor: 'pointer', color: '#efb208' }}
      //             onClick={( e ) => onExportActivity( e, item )}
      //           >导出活动配置
      //           </span>
      //           <span
      //             style={{ margin: '0 20px 10px', cursor: 'pointer', color: '#efb208' }}
      //             onClick={( e ) => getRoleGroupList( item.id, 'cooperate', () => onCooperateManager( e, item, true ) )}
      //           >协作管理
      //           </span>
      //           <span
      //             style={{ cursor: 'pointer', margin: '0 20px 10px', color: '#f5222d' }}
      //           >
      //             <Popconfirm
      //               placement="top"
      //               title={`是否确认删除:${item.name}`}
      //               onConfirm={( e ) => getCurrentCollaborsInfo( item.id, 'delete', () => onDeleteBees( e, item.id ) )}
      //               okText="是"
      //               cancelText="否"
      //             >
      //               <span>删除活动</span>
      //             </Popconfirm>
      //           </span>
      //         </div>
      //       }
      //     >
      //       <span style={{ marginRight: 15, cursor: 'pointer', color: '#1890ff' }}>更多</span>
      //     </Popover>
      //   </div>
      // ),
      search: false,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary">
            <PlusOutlined /> 导入活动
          </Button>,
        ]}
        request={getActivityList}
        columns={columns}
        pagination={{
          pageSize: 10, // 每页显示10条
        }}
        // rowSelection={{
        //   onChange: ( _, selectedRows ) => {
        //     setSelectedRows( selectedRows );
        //   },
        // }}
      />
    </PageContainer>
  );
}

export default Index;
