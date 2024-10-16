/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-14 14:06:10
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 14:48:16
 * @FilePath: /admin-system/src/pages/ActivityMarketing/ActivityList/index.jsx
 */
import ProTable from '@/components/JnProTable';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Switch } from 'antd';
import { useRef } from 'react';
import { getTeamList } from './service';
function Index() {
  const actionRef = useRef(null);
  const columns = [
    {
      title: '团队名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'LOGO',
      dataIndex: 'logo',
      valueType: 'avatar',
      key: 'logo',
      search: false,
      align: 'center',
    },
    {
      title: '成员数量',
      align: 'center',
      dataIndex: 'userNum',
      key: 'userNum',
      search: false,
    },
    {
      title: '激活状态',
      dataIndex: 'enable',
      key: 'enable',
      valueType: 'select',
      valueEnum: {
        '': { text: '全部' },
        true: { text: '已激活', status: 'Success' },
        false: { text: '禁用', status: 'Error' },
      },
      render: (_, record) => {
        return (
          <Popconfirm
            placement="top"
            title={`是否确认${record.enable ? '禁用' : '激活'}该团队`}
            // onConfirm={() => handleSwitch({ ...item, enable: !item.enable })}
            onConfirm={() => {}}
            okText="是"
            cancelText="否"
          >
            <Switch checked={record.enable} />
          </Popconfirm>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'create_time',
      sorter: true,
      defaultSortOrder: 'descend',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (record, _, action) => [
        <a
          key="1"
          // onClick={() => {
          //   setCurrCategory(item);
          //   setModalVisible(true);
          // }}
        >
          编辑
        </a>,
        <a
          key="2"
          // onClick={() => {
          //   handleShowMember(item.id);
          // }}
        >
          成员
        </a>,
      ],
    },
  ];
  const toolBarRender = () => [
    <Button type="primary" key="primary">
      <PlusOutlined /> 新建团队
    </Button>,
  ];

  return (
    <ProTable
      headerTitle="团队列表"
      actionRef={actionRef}
      rowKey="id"
      toolBarRender={toolBarRender}
      request={getTeamList}
      columns={columns}
    />
  );
}

export default Index;
