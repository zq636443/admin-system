/* eslint-disable eqeqeq */
import { EllipsisOutlined, FileSearchOutlined, FormOutlined } from '@ant-design/icons';
import { Card, Popover } from 'antd';
import moment from 'moment';
import { useRef, useState } from 'react';
import { exportXlsx } from '../../../utils';
import useStyles from './style.style';

const ongoing = require('./assets/images/ongoing.png');
const finish = require('./assets/images/finish.png');
const defaultCoverPicture = require('./assets/images/coverPicture.png');
const activityTime = require('./assets/images/activityTime.png');

const CardItem = ({ data }) => {
  const { styles } = useStyles();
  const [showActivityEditBox, setShowActivityEditBox] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const imgBoxRef = useRef(null);
  const imgRef = useRef(null);
  const { coverPicture, id, endTime, timeType, startTime, name } = data || {};
  const statusUrl = endTime == null || moment(endTime) > moment() || !timeType ? ongoing : finish;

  const onExportActivity = (e, item) => {
    e.stopPropagation();
    if (!item || (item && !item.id)) return;
    const { id, name } = item;
    const ajaxUrl = `activity/info/export/${id}`;
    if (exportLoading) return;
    setExportLoading(true);
    exportXlsx({
      type: 'activityService',
      uri: ajaxUrl,
      xlsxName: `${name}.txt`,
      callBack: () => {
        setExportLoading(false);
      },
    });
  };

  const handleMouseEnter = () => {
    const scrollSpeed = 180; // 调整滑动速度
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

  const cardItem = () => {
    return (
      <div
        key={id}
        className={styles.blockActivityCardImg}
        ref={imgBoxRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // onClick={( e ) => jumpDataCenter( e, item )}
      >
        <img alt="" src={coverPicture || defaultCoverPicture} ref={imgRef} />
        <img className={styles.blockActivityCardStatus} alt="" src={statusUrl} />
      </div>
    );
  };

  const cardMetaTitle = () => {
    return (
      <div
        className={styles.blockActivityCardBottom}
        onMouseEnter={() => setShowActivityEditBox(true)}
        onMouseLeave={() => setShowActivityEditBox(false)}
      >
        <div className={styles.blockActivityCardBottomName}>{name}</div>
        <div className={styles.blockActivityCardBottomTime}>
          <img alt="" src={activityTime} />
          {startTime && timeType ? `${moment(startTime).format('YYYY.MM.DD')}-` : ''}
          {endTime && timeType ? moment(endTime).format('YYYY.MM.DD') : '--'}
        </div>
        <div
          className={`${styles.activityEdit}
            ${showActivityEditBox ? styles.showEditBox : ''}`}
        >
          <div className={styles.activityEditbox}>
            <div
              className={styles.activityEditboxItem}
              // onClick={() => getCurrentCollaborsInfo(item.id, 'edit', () => onEditBees({ item }))}
            >
              <FormOutlined className={styles.editboxIcon} />
              <div className={styles.activityEditboxText}>编辑</div>
            </div>
            <div
              className={styles.activityEditboxItem}
              // onClick={(e) => openQRCodeModal(e, item)}
            >
              <FileSearchOutlined className={styles.editboxIcon} />
              <div className={styles.activityEditboxText}>预览</div>
            </div>
            <Popover
              placement="rightTop"
              content={
                <div className={styles.activityEditboxMore}>
                  {/* <span style={{ color: '#1890ff' }} onClick={(e) => onCopyBees(e, item.id)}>
                    复制活动
                  </span> */}
                  {/* <span style={{ color: '#efb208' }} onClick={(e) => handleAddTemplate(e, item)}>
                    添加至模版
                  </span> */}
                  {/* {item.version === 'V2' && (
                    <>
                      <span
                        style={{ color: '#efb208' }}
                        onClick={(e) => onOpenFeatureModal(e, item)}
                      >
                        未来版本设置
                      </span>
                    </>
                  )} */}
                  <span style={{ color: '#efb208' }} onClick={(e) => onExportActivity(e, data)}>
                    导出活动配置
                  </span>
                  {/* <span
                    style={{ color: '#efb208' }}
                    onClick={(e) =>
                      getRoleGroupList(id, 'cooperate', () => onCooperateManager(e, item, true))
                    }
                  >
                    协作管理
                  </span> */}
                  {/* <span style={{ color: '#f5222d' }}>
                    <Popconfirm
                      placement="top"
                      title={`是否确认删除:${name}`}
                      onConfirm={(e) =>
                        getCurrentCollaborsInfo(id, 'delete', () => onDeleteBees(e, id))
                      }
                      okText="是"
                      cancelText="否"
                    >
                      <span>删除活动</span>
                    </Popconfirm>
                  </span> */}
                </div>
              }
            >
              <div className={styles.activityEditboxItem}>
                <EllipsisOutlined className={styles.editboxIcon} />
                {/* <Icon type="ellipsis" className={styles.editboxIcon} /> */}
                <div className={styles.activityEditboxText}>更多</div>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card hoverable className={styles.card} style={{ width: 240, height: 340 }} cover={cardItem()}>
      {cardMetaTitle()}
    </Card>
  );
};
export default CardItem;
