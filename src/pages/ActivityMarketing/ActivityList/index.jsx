import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Divider, List, message, Radio, Upload } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardItem from './CardItem';
import { activityStatusList, gridConfig } from './data';
import { fetchActiveStatistics, fetchActivityList, importActivity } from './service';
import useStyles from './style.style';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const CardList = () => {
  const { styles } = useStyles();
  const formRef = useRef(null);
  const [activeStatisticsData, setActiveStatisticsData] = useState({});
  const [activityStatesType, setActivityStatesType] = useState('ALL');
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [roles, setroles] = useState('');
  const [hasMore, setHasMore] = useState(true); // 控制是否还有更多数据
  const [uploading, setUploading] = useState(false);

  const { loading, run: getActivityList } = useRequest(
    async () => {
      const searchValue = formRef.current?.getFieldsValue();
      const params = {
        pageNum,
        pageSize: 20,
        orderBy: `create_time desc`,
        showV3: true,
        version: 'V3',
        isEnd: activityStatesType,
        roles,
        ...searchValue,
      };
      const result = await fetchActivityList(params);
      return { data: result };
    },
    {
      manual: true,
      onSuccess: ({ result }) => {
        if (result?.list?.length === 0) {
          setHasMore(false);
        }
        setList([...list, ...result?.list]);
      },
    },
  );

  useRequest(
    async () => {
      const result = await fetchActiveStatistics({ roles });
      return { data: result };
    },
    {
      onSuccess: ({ result }) => {
        setActiveStatisticsData(result);
      },
    },
  );

  const resetList = useCallback(() => {
    setPageNum(1);
    setList([]);
    setHasMore(true);
  }, []);

  const handleColloborChange = (e) => {
    const value = e.target.value;
    resetList();
    setroles(value);
  };

  const handleChangeCurrtstatus = (e) => {
    resetList();
    setActivityStatesType(e);
  };

  const handleSearch = async (value) => {
    const { id, name } = value;
    if (!id && !name) return;
    resetList();
    getActivityList();
  };
  const handleReset = () => {
    resetList();
    getActivityList();
  };

  const beforeUpload = async (file) => {
    if (!file) return;
    const { lastModified, name } = file;
    if (name.substring(name.length - 3) !== 'txt') {
      message.error('文件格式类型不是txt');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    if (lastModified) {
      formData.append('file', file); // 文件对象
    } else {
      formData.append('file', file, name);
    }
    const res = await importActivity({ file: formData });
    if (res.success) {
      resetList();
      getActivityList();
      message.success('导入活动成功，奖品需重新配置');
    }
    setUploading(false);
  };

  const renderCollaborationTabs = () => {
    return (
      <RadioGroup onChange={handleColloborChange} defaultValue="">
        <RadioButton value="">全部</RadioButton>
        <RadioButton value="CREATOR">我的</RadioButton>
        <RadioButton value="MANAGER,EDITOR,VIEWER">我协作的</RadioButton>
      </RadioGroup>
    );
  };
  const renderStatistics = () => {
    const statisticsItem = activityStatusList.map((item) => {
      const { key, img, name, val } = item;
      return (
        <div
          key={key}
          onClick={() => handleChangeCurrtstatus(key)}
          className={`${styles.activityStatesBox} ${activityStatesType === key ? styles.activityStatesActive : ''}`}
        >
          <img alt="" src={img} />
          <div>
            <div className={styles.activityStatesNum}>{activeStatisticsData?.[val] || 0}</div>
            <div>{name}</div>
          </div>
        </div>
      );
    });

    return <div className={styles.activityStatusList}>{statisticsItem}</div>;
  };
  const renderSearchForm = () => {
    return (
      <ProForm
        formRef={formRef}
        onFinish={handleSearch}
        initialValues={{ id: '', name: '' }}
        layout="inline"
        submitter={{
          render: (props) => {
            return [
              <Button type="primary" key="submit" onClick={() => props.submit()}>
                搜索
              </Button>,
              <Button
                key="reset"
                type="primary"
                onClick={() => {
                  props.reset();
                  handleReset();
                }}
                style={{ marginLeft: 8 }}
              >
                清空
              </Button>,
              <Upload
                key="import"
                fileList={[]}
                beforeUpload={beforeUpload}
                disabled={uploading}
                accept=".txt"
                style={{
                  width: 'auto',
                  height: 'auto',
                  background: 'none',
                  border: 'none',
                  marginLeft: 8,
                }}
              >
                <Button type="primary" loading={uploading}>
                  导入活动
                </Button>
              </Upload>,
            ];
          },
        }}
      >
        <ProFormText name="id" label="活动 ID" placeholder="请输入活动 ID" />
        <ProFormText name="name" label="活动名称" placeholder="请输入活动名称" />
      </ProForm>
    );
  };
  const loadMoreData = () => {
    if (!loading && hasMore) {
      setPageNum((prev) => prev + 1);
    }
  };

  const content = (
    <>
      {renderCollaborationTabs()}
      {renderStatistics()}
      {renderSearchForm()}
    </>
  );

  useEffect(() => {
    getActivityList();
  }, [pageNum, roles, activityStatesType]);

  return (
    <PageContainer
      breadcrumbRender={false}
      title={false}
      content={content}
      footer={false}
      style={{ background: '#fff' }}
    >
      <div
        className={styles.cardList}
        id="scrollableDiv"
        style={{
          width: '100%',
          height: 1000,
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={list.length}
          next={loadMoreData}
          hasMore={true}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
          style={{ overflow: 'hidden' }}
        >
          <List
            rowKey="id"
            loading={loading}
            grid={gridConfig}
            dataSource={list}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <CardItem data={item} />
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> 新增产品
                  </Button>
                </List.Item>
              );
            }}
          />
        </InfiniteScroll>
      </div>
    </PageContainer>
  );
};
export default CardList;
