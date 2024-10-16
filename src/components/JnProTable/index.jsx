/*
 * @Author: zq636443 zq636443@163.com
 * @Date: 2024-10-14 14:06:10
 * @LastEditors: zq636443 zq636443@163.com
 * @LastEditTime: 2024-10-16 14:37:57
 * @FilePath: /admin-system/src/pages/ActivityMarketing/ActivityList/index.jsx
 */
import { ProTable } from '@ant-design/pro-components';

function extractKeyValue(obj) {
  if (obj && typeof obj === 'object' && Object.keys(obj).length > 0) {
    return Object.entries(obj).map(([key, value]) => ({ key, value }))[0] || null;
  }
  return null;
}

function Index(props) {
  const { headerTitle, rowKey, toolBarRender, columns, request, sortConfig, ...rest } = props;
  const getList = async (data = {}, sort) => {
    const sortFieldMapping = {
      startTime: 'start_time',
      endTime: 'end_time',
      createTime: 'create_time',
      expireTime: 'expire_time',
      ...(sortConfig?.sortFieldMapping || {}),
    };

    const sortOrderMapping = {
      descend: 'desc',
      ascend: 'asc',
      ...(sortConfig?.sortOrderMapping || {}),
    };

    // 提取排序信息
    const sortInfoObj = extractKeyValue(sort);
    const { current = 1, ...rest } = data;

    // 构建请求参数
    const params = {
      pageNum: current,
      pageSize: 10,
      ...rest,
      ...(sortInfoObj && {
        orderBy: `${sortFieldMapping[sortInfoObj.key]} ${sortOrderMapping[sortInfoObj.value]}`,
      }),
    };

    // 获取团队列表
    const { success, result = {} } = await request(params);
    return {
      data: result.list || [],
      success,
      total: result.total || 0,
    };
  };
  return (
    <ProTable
      headerTitle={headerTitle || false}
      rowKey={rowKey || 'id'}
      search={{ labelWidth: 80 }}
      toolBarRender={toolBarRender || false}
      request={getList}
      columns={columns}
      pagination={{
        pageSize: 10,
      }}
      options={false}
      {...rest}
    />
  );
}

export default Index;
