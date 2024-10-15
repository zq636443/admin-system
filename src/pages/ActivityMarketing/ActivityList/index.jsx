import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Card, Divider, List, message, Radio } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import activityStatusList from './data';
import { fetchActiveStatistics, fetchActivityList } from './service';
import useStyles from './style.style';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const CardItem = ({ data }) => {
  const { styles } = useStyles();
  const imgBoxRef = useRef(null);
  const imgRef = useRef(null);
  const { coverPicture, id } = data || {};

  const handleMouseEnter = () => {
    const scrollSpeed = 120; // 调整滑动速度
    if (!imgBoxRef?.current || !imgRef?.current) return;
    const maxScroll = imgBoxRef?.current?.scrollHeight - imgBoxRef?.current?.clientHeight;
    imgRef.current.style.transition = `all ${maxScroll / scrollSpeed}s linear`;
    imgRef.current.style.transform = `translateY(${-maxScroll}px)`;
  };

  const handleMouseLeave = () => {
    if (!imgRef?.current) return;
    imgRef.current.style.transition = 'transform 2s ease';
    imgRef.current.style.transform = `translateY(0px)`;
  };

  return (
    <div
      key={id}
      className={styles.blockActivityCardImg}
      ref={imgBoxRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // onClick={( e ) => jumpDataCenter( e, item )}
    >
      <img alt="" src={coverPicture} ref={imgRef} />
      {/* <img className={styles.blockActivityCardStatus} alt="" src={statusUrl} /> */}
    </div>
  );
};

const CardList = () => {
  const { styles } = useStyles();
  const formRef = useRef(null);
  const [activeStatisticsData, setActiveStatisticsData] = useState({});
  const [activityStatesType, setActivityStatesType] = useState('ALL');
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [roles, setroles] = useState('');
  const [hasMore, setHasMore] = useState(true); // 控制是否还有更多数据

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

  const handleSearch = async () => {
    resetList();
  };
  const handleReset = () => {
    setPageNum(1);
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
            <div className={styles.activityStatesNum}>{activeStatisticsData[val] || 0}</div>
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
              <Button key="import" type="primary" onClick={() => {}} style={{ marginLeft: 8 }}>
                导入活动
              </Button>,
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
      message.success('加载更多数据');
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
          style={{ overflowX: 'hidden' }}
        >
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 6,
            }}
            dataSource={list}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      style={{ width: 240, height: 340 }}
                      cover={<CardItem data={item} />}
                    >
                      <Card.Meta title={<a>{item.name}</a>} />
                    </Card>
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
