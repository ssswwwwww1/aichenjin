import React, { useState } from 'react';
import { Typography, Row, Col, Card, Avatar, Tabs, List, Tag, Button, Progress, Divider, Statistic, Empty, Badge } from 'antd';
import {
  UserOutlined,
  EditOutlined,
  HeartOutlined,
  HistoryOutlined,
  StarOutlined,
  FileTextOutlined,
  TrophyOutlined,
  CommentOutlined,
  SettingOutlined,
  BellOutlined,
  ThunderboltOutlined,
  BookOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import VoiceAssistant from '../components/VoiceAssistant';
import './PersonalCenter.css';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Meta } = Card;

// 动画变体定义
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const PersonalCenter = () => {
  const [loginStatus, setLoginStatus] = useState(false); // 模拟登录状态
  
  // 模拟的用户数据
  const userData = {
    username: '文化探索者',
    avatar: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=150&q=80',
    bio: '热爱中华传统文化，致力于通过数字化方式传承与推广优秀文化遗产',
    level: 4,
    experience: 75,
    joined: '2024年1月',
    interests: ['古建筑', '传统工艺', '戏曲', '文物保护']
  };

  const learningHistory = [
    {
      id: 1,
      title: '故宫建筑解析',
      cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=120&q=80',
      progress: 80,
      lastLearnTime: '2天前'
    },
    {
      id: 2,
      title: '京剧脸谱鉴赏',
      cover: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=120&q=80',
      progress: 60,
      lastLearnTime: '1周前'
    },
    {
      id: 3,
      title: '中国传统节日与习俗',
      cover: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=120&q=80',
      progress: 30,
      lastLearnTime: '2周前'
    }
  ];

  const favoriteContent = [
    {
      id: 1,
      title: '中国古代服饰文化',
      type: '课程',
      cover: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=120&q=80',
      addTime: '3天前'
    },
    {
      id: 2,
      title: '非遗剪纸技艺学习心得',
      type: '文章',
      cover: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=120&q=80',
      addTime: '1周前'
    },
    {
      id: 3,
      title: '颐和园·长廊AR导览',
      type: 'AR体验',
      cover: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=120&q=80',
      addTime: '2周前'
    }
  ];

  const userComments = [
    {
      id: 1,
      content: '这篇文章对京剧脸谱的解析非常详细，学到了很多新知识！',
      target: '《京剧脸谱背后的文化密码》',
      time: '3天前'
    },
    {
      id: 2,
      content: 'AR体验非常棒，仿佛穿越回古代，期待更多景点加入这个功能。',
      target: '故宫·紫禁城AR体验',
      time: '1周前'
    }
  ];

  const userAchievements = [
    {
      id: 1,
      title: '文化探索者',
      icon: <StarOutlined />,
      description: '完成10门文化课程学习',
      achieved: true
    },
    {
      id: 2,
      title: '社区活跃者',
      icon: <CommentOutlined />,
      description: '发表20条有价值的评论',
      achieved: true
    },
    {
      id: 3,
      title: 'AR体验达人',
      icon: <TrophyOutlined />,
      description: '体验全部AR景点导览',
      achieved: false,
      progress: 60
    }
  ];

  // 模拟的通知数据
  const notifications = [
    {
      id: 1,
      title: '课程更新提醒',
      content: '您收藏的课程《中国古代服饰文化》已更新了新的章节',
      time: '1天前',
      read: false
    },
    {
      id: 2,
      title: '评论回复',
      content: '用户"传统工艺爱好者"回复了您的评论',
      time: '3天前',
      read: true
    },
    {
      id: 3,
      title: '活动邀请',
      content: '您被邀请参加"非遗技艺线下工作坊"活动',
      time: '1周前',
      read: true
    }
  ];

  // 用户学习计划
  const learningPlans = [
    {
      id: 1,
      title: '传统建筑艺术赏析',
      duration: '8周课程',
      startDate: '2025-03-15',
      completion: 45,
      nextLesson: '木构架建筑特点分析',
      nextDate: '2025-03-22'
    },
    {
      id: 2,
      title: '中国传统绘画技法',
      duration: '12周课程',
      startDate: '2025-04-01',
      completion: 25,
      nextLesson: '山水画构图要领',
      nextDate: '2025-04-10'
    }
  ];

  // 渲染登录前页面
  const renderLoginPrompt = () => (
    <motion.div 
      className="login-prompt"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Avatar size={80} icon={<UserOutlined />} />
      <Title level={3}>欢迎来到个人中心</Title>
      <Paragraph>登录后可以记录您的学习进度、收藏感兴趣的内容并参与社区互动</Paragraph>
      <div className="login-buttons">
        <Button 
          type="primary" 
          size="large" 
          onClick={() => setLoginStatus(true)}
          className="login-button"
        >
          登录
        </Button>
        <Button size="large" className="register-button">注册</Button>
      </div>
    </motion.div>
  );

  // 渲染登录后页面
  const renderUserCenter = () => (
    <>
      <motion.div 
        className="user-profile-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8} className="profile-left">
            <motion.div 
              className="user-avatar-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar size={120} src={userData.avatar} />
              <div className="user-level-badge">Lv.{userData.level}</div>
            </motion.div>
          </Col>
          <Col xs={24} md={16} className="profile-right">
            <motion.div 
              className="user-info-container"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="user-name-row">
                <Title level={3} className="user-name">{userData.username}</Title>
                <Button icon={<EditOutlined />} type="link">编辑资料</Button>
              </div>
              <Paragraph className="user-bio">{userData.bio}</Paragraph>
              <div className="user-stats">
                <div className="user-stat-item">
                  <div className="stat-label">加入时间</div>
                  <div className="stat-value">{userData.joined}</div>
                </div>
                <div className="user-stat-item">
                  <div className="stat-label">经验值</div>
                  <div className="stat-value">
                    <Progress 
                      percent={userData.experience} 
                      size="small" 
                      format={() => `${userData.experience}/100`}
                      className="exp-progress"
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="user-interests">
                <span className="interests-label">兴趣标签：</span>
                {userData.interests.map((interest, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Tag className="interest-tag">{interest}</Tag>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      <Divider />

      <motion.div 
        className="user-data-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row gutter={[16, 16]}>
          <Col xs={8}>
            <motion.div variants={itemVariants}>
              <Card className="stat-card">
                <Statistic 
                  title="学习课程" 
                  value={8} 
                  suffix="门" 
                  valueStyle={{ color: '#9D2933' }}
                  prefix={<BookOutlined />}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={8}>
            <motion.div variants={itemVariants}>
              <Card className="stat-card">
                <Statistic 
                  title="收藏内容" 
                  value={15} 
                  suffix="个" 
                  valueStyle={{ color: '#9D2933' }}
                  prefix={<HeartOutlined />}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={8}>
            <motion.div variants={itemVariants}>
              <Card className="stat-card">
                <Statistic 
                  title="社区贡献" 
                  value={24} 
                  suffix="条" 
                  valueStyle={{ color: '#9D2933' }}
                  prefix={<CommentOutlined />}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      <div className="user-content-section">
        <Tabs defaultActiveKey="1" className="user-tabs">
          <TabPane 
            tab={<span><HistoryOutlined /> 学习记录</span>} 
            key="1"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="tab-content-container"
            >
              {learningHistory.length > 0 ? (
                <List
                  className="history-list"
                  itemLayout="horizontal"
                  dataSource={learningHistory}
                  renderItem={item => (
                    <motion.div variants={itemVariants}>
                      <Card className="history-card">
                        <div className="history-item">
                          <div className="history-cover" style={{ backgroundImage: `url(${item.cover})` }}></div>
                          <div className="history-content">
                            <div className="history-title">{item.title}</div>
                            <div className="history-progress">
                              <Progress percent={item.progress} size="small" status="active" />
                            </div>
                            <div className="history-time">上次学习：{item.lastLearnTime}</div>
                          </div>
                          <Button type="primary" className="history-continue-btn">继续学习</Button>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                />
              ) : (
                <Empty description="暂无学习记录" />
              )}
              
              <Divider orientation="left">学习计划</Divider>
              
              <List
                className="plan-list"
                itemLayout="vertical"
                dataSource={learningPlans}
                renderItem={item => (
                  <motion.div variants={itemVariants}>
                    <Card className="plan-card" hoverable>
                      <div className="plan-header">
                        <div className="plan-title">{item.title}</div>
                        <div className="plan-meta">
                          <CalendarOutlined /> {item.duration}
                        </div>
                      </div>
                      <div className="plan-progress">
                        <div className="progress-text">完成进度：{item.completion}%</div>
                        <Progress 
                          percent={item.completion} 
                          strokeColor={{
                            from: '#108ee9',
                            to: '#87d068',
                          }}
                          showInfo={false}
                        />
                      </div>
                      <div className="plan-next">
                        <div>下次课程：{item.nextLesson}</div>
                        <div>时间：{item.nextDate}</div>
                      </div>
                      <div className="plan-actions">
                        <Button type="primary">进入学习</Button>
                        <Button>课程表</Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              />
            </motion.div>
          </TabPane>
          
          <TabPane 
            tab={<span><HeartOutlined /> 我的收藏</span>} 
            key="2"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="tab-content-container"
            >
              {favoriteContent.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {favoriteContent.map(item => (
                    <Col xs={24} sm={12} md={8} key={item.id}>
                      <motion.div variants={itemVariants}>
                        <Card
                          hoverable
                          cover={<div className="favorite-cover" style={{ backgroundImage: `url(${item.cover})` }}></div>}
                          className="favorite-card"
                        >
                          <Meta 
                            title={item.title} 
                            description={
                              <div className="favorite-meta">
                                <Tag color="blue">{item.type}</Tag>
                                <span className="favorite-time">收藏于 {item.addTime}</span>
                              </div>
                            }
                          />
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Empty description="暂无收藏内容" />
              )}
            </motion.div>
          </TabPane>
          
          <TabPane 
            tab={<span><CommentOutlined /> 我的评论</span>} 
            key="3"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="tab-content-container"
            >
              {userComments.length > 0 ? (
                <List
                  className="comments-list"
                  itemLayout="vertical"
                  dataSource={userComments}
                  renderItem={item => (
                    <motion.div variants={itemVariants}>
                      <Card className="comment-card">
                        <div className="comment-target">评论于 {item.target}</div>
                        <div className="comment-content">{item.content}</div>
                        <div className="comment-time">{item.time}</div>
                      </Card>
                    </motion.div>
                  )}
                />
              ) : (
                <Empty description="暂无评论记录" />
              )}
            </motion.div>
          </TabPane>
          
          <TabPane 
            tab={<span><TrophyOutlined /> 我的成就</span>} 
            key="4"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="tab-content-container"
            >
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
                dataSource={userAchievements}
                renderItem={item => (
                  <List.Item>
                    <motion.div variants={itemVariants}>
                      <Card 
                        className={`achievement-card ${item.achieved ? 'achieved' : ''}`}
                        hoverable
                      >
                        <div className="achievement-icon">
                          {item.icon}
                        </div>
                        <div className="achievement-title">{item.title}</div>
                        <div className="achievement-description">{item.description}</div>
                        {!item.achieved && (
                          <div className="achievement-progress">
                            <Progress percent={item.progress} size="small" />
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  </List.Item>
                )}
              />
            </motion.div>
          </TabPane>

          <TabPane 
            tab={<span><BellOutlined /> 消息通知</span>} 
            key="5"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="tab-content-container"
            >
              <List
                className="notification-list"
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={item => (
                  <motion.div variants={itemVariants}>
                    <Card 
                      className={`notification-card ${!item.read ? 'unread' : ''}`}
                      hoverable
                    >
                      <div className="notification-content">
                        <div className="notification-title">
                          {!item.read && <Badge status="processing" />}
                          {item.title}
                        </div>
                        <div className="notification-text">{item.content}</div>
                        <div className="notification-time">{item.time}</div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              />
            </motion.div>
          </TabPane>

          <TabPane 
            tab={<span><SettingOutlined /> 账户设置</span>} 
            key="6"
          >
            <Empty description="账户设置功能开发中" />
          </TabPane>
        </Tabs>
      </div>
      
      {/* 语音助手组件 */}
      <VoiceAssistant />
    </>
  );

  return (
    <div className="personal-center-page">
      <div className="container">
        {loginStatus ? renderUserCenter() : renderLoginPrompt()}
      </div>
    </div>
  );
};

export default PersonalCenter; 