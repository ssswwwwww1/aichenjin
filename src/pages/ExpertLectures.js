import React, { useState, useEffect, useRef } from 'react';
import {
  Row, Col, Card, Avatar, Button, Input, List, Tag, Tabs, Modal, Form,
  Rate, Badge, Tooltip, Space, Typography, Divider, message
} from 'antd';
import {
  PlayCircleOutlined, TeamOutlined, CalendarOutlined, ClockCircleOutlined,
  CommentOutlined, SendOutlined, LikeOutlined, ShareAltOutlined,
  UserOutlined, BookOutlined, VideoCameraOutlined, FireOutlined
} from '@ant-design/icons';
import './ExpertLectures.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

// 模拟讲座数据
const lecturesData = [
  {
    id: 1,
    title: '故宫建筑艺术与文化内涵',
    speaker: '王旭东',
    speakerTitle: '故宫博物院院长',
    avatar: 'https://via.placeholder.com/100',
    coverImage: 'https://via.placeholder.com/600x400?text=故宫建筑讲座',
    date: '2025-08-15',
    time: '15:00-16:30',
    duration: 90,
    tags: ['建筑艺术', '文化遗产', '故宫'],
    participants: 1245,
    likes: 867,
    description: '本次讲座将深入探讨故宫古建筑的设计理念、建造工艺和文化象征，带您领略东方建筑美学的精髓与帝王宫殿的独特魅力。',
    status: 'upcoming', // upcoming, live, recorded
    videoUrl: 'https://example.com/video1',
    relatedMaterials: [
      { title: '《故宫建筑研究》', type: 'book' },
      { title: '《紫禁城建筑艺术图解》', type: 'book' }
    ]
  },
  {
    id: 2,
    title: '中国传统戏曲的传承与创新',
    speaker: '李伟',
    speakerTitle: '国家京剧院院长',
    avatar: 'https://via.placeholder.com/100',
    coverImage: 'https://via.placeholder.com/600x400?text=传统戏曲讲座',
    date: '2025-07-28',
    time: '19:00-21:00',
    duration: 120,
    tags: ['戏曲艺术', '非遗传承', '京剧'],
    participants: 986,
    likes: 723,
    description: '本讲座将探讨中国传统戏曲的历史发展、艺术特点及现代传承与创新之路，特别聚焦京剧艺术的当代价值与未来发展。',
    status: 'live',
    videoUrl: 'https://example.com/video2',
    relatedMaterials: [
      { title: '《京剧艺术导论》', type: 'book' },
      { title: '《中国戏曲发展史》', type: 'book' }
    ]
  },
  {
    id: 3,
    title: '中国古代陶瓷与窑址考古发现',
    speaker: '张涛',
    speakerTitle: '中国国家博物馆研究员',
    avatar: 'https://via.placeholder.com/100',
    coverImage: 'https://via.placeholder.com/600x400?text=陶瓷考古讲座',
    date: '2025-07-10',
    time: '14:30-16:00',
    duration: 90,
    tags: ['陶瓷艺术', '考古发现', '文物保护'],
    participants: 1502,
    likes: 912,
    description: '讲座将分享近年来中国重要古代窑址的最新考古发现，解析中国陶瓷技艺的演变历程和艺术特征，展示不同时期陶瓷的文化内涵。',
    status: 'recorded',
    videoUrl: 'https://example.com/video3',
    relatedMaterials: [
      { title: '《中国陶瓷史》', type: 'book' },
      { title: '《古窑址考古研究》', type: 'book' }
    ]
  }
];

// 模拟弹幕数据
const initialDanmaku = [
  { id: 1, content: '讲解得太精彩了！', color: '#fff', time: 15, user: 'user1' },
  { id: 2, content: '这个文物背后的故事真是惊人', color: '#fff', time: 28, user: 'user2' },
  { id: 3, content: '可以详细解释一下这个建筑工艺吗？', color: '#fff', time: 45, user: 'user3' },
  { id: 4, content: '学到了很多知识，感谢专家分享！', color: '#fff', time: 62, user: 'user4' },
  { id: 5, content: '希望能多举办这样的讲座', color: '#fff', time: 80, user: 'user5' }
];

const ExpertLectures = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [danmakuInput, setDanmakuInput] = useState('');
  const [danmaku, setDanmaku] = useState(initialDanmaku);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDanmaku, setShowDanmaku] = useState(true);
  const [lectureModalVisible, setLectureModalVisible] = useState(false);
  const [reservationModalVisible, setReservationModalVisible] = useState(false);
  const [user, setUser] = useState({ id: 'guest', username: '游客', avatar: null }); // 提供默认用户
  const [userRating, setUserRating] = useState(0);
  const [reservedLectures, setReservedLectures] = useState([]);
  const [discussionInput, setDiscussionInput] = useState('');
  const [discussions, setDiscussions] = useState({});
  
  const danmakuContainerRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const danmakuTimer = useRef(null);
  
  // 从localStorage加载用户数据和预约数据
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('解析用户数据失败', e);
      }
    }
    
    const savedReservations = localStorage.getItem('reservedLectures');
    if (savedReservations) {
      try {
        setReservedLectures(JSON.parse(savedReservations));
      } catch (e) {
        console.error('解析预约数据失败', e);
      }
    }
    
    const savedDiscussions = localStorage.getItem('lectureDiscussions');
    if (savedDiscussions) {
      try {
        setDiscussions(JSON.parse(savedDiscussions));
      } catch (e) {
        console.error('解析讨论数据失败', e);
      }
    }
    
    // 清除定时器
    return () => {
      if (danmakuTimer.current) {
        clearInterval(danmakuTimer.current);
      }
    };
  }, []);
  
  // 讲座过滤函数
  const filteredLectures = (status) => {
    return lecturesData.filter(lecture => lecture.status === status);
  };
  
  // 发送弹幕
  const sendDanmaku = () => {
    if (!danmakuInput.trim()) {
      message.warning('弹幕内容不能为空');
      return;
    }
    
    const newDanmaku = {
      id: Date.now(),
      content: danmakuInput,
      color: '#fff',
      time: Math.floor(Math.random() * 100), // 模拟视频进度
      user: user.username
    };
    
    setDanmaku([...danmaku, newDanmaku]);
    setDanmakuInput('');
    
    // 显示新弹幕
    displayNewDanmaku(newDanmaku);
    
    message.success('弹幕发送成功');
  };
  
  // 显示弹幕动画
  const displayNewDanmaku = (danmakuItem) => {
    if (!danmakuContainerRef.current || !showDanmaku) return;
    
    const danmakuElement = document.createElement('div');
    danmakuElement.className = 'danmaku-item';
    danmakuElement.innerText = danmakuItem.content;
    danmakuElement.style.color = danmakuItem.color;
    
    // 随机垂直位置
    const top = Math.floor(Math.random() * 80) + 10; // 10% - 90%的位置
    danmakuElement.style.top = `${top}%`;
    
    danmakuContainerRef.current.appendChild(danmakuElement);
    
    // 弹幕动画结束后移除元素
    setTimeout(() => {
      if (danmakuElement.parentNode) {
        danmakuElement.remove();
      }
    }, 8000);
  };
  
  // 打开讲座详情
  const openLectureDetails = (lecture) => {
    setSelectedLecture(lecture);
    setLectureModalVisible(true);
    setUserRating(0);
    
    // 停止之前的定时器
    if (danmakuTimer.current) {
      clearInterval(danmakuTimer.current);
    }
    
    // 只有对直播讲座启动弹幕播放
    if (lecture.status === 'live') {
      // 模拟定时弹幕
      let index = 0;
      danmakuTimer.current = setInterval(() => {
        if (index < danmaku.length && showDanmaku) {
          displayNewDanmaku(danmaku[index]);
          index = (index + 1) % danmaku.length; // 循环播放
        }
      }, 2000);
    }
  };
  
  // 预约讲座
  const handleReservation = (lecture) => {
    setSelectedLecture(lecture);
    setReservationModalVisible(true);
  };
  
  // 提交预约
  const submitReservation = (values) => {
    console.log('预约信息:', values);
    
    // 更新已预约的讲座
    if (selectedLecture) {
      const newReservations = [...reservedLectures, selectedLecture.id];
      setReservedLectures(newReservations);
      
      // 保存到localStorage
      try {
        localStorage.setItem('reservedLectures', JSON.stringify(newReservations));
      } catch (e) {
        console.error('保存预约数据失败', e);
      }
      
      message.success('讲座预约成功，我们会通过短信提醒您');
      setReservationModalVisible(false);
    }
  };
  
  // 开关弹幕显示
  const toggleDanmaku = () => {
    setShowDanmaku(!showDanmaku);
    
    if (!showDanmaku && danmakuContainerRef.current) {
      // 清空现有弹幕
      while (danmakuContainerRef.current.firstChild) {
        danmakuContainerRef.current.removeChild(danmakuContainerRef.current.firstChild);
      }
    }
  };
  
  // 切换视频播放状态
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // 在真实环境中，这里应该控制视频元素
    if (videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.pause();
      } else {
        videoPlayerRef.current.play();
      }
    }
  };
  
  // 提交讨论
  const submitDiscussion = () => {
    if (!discussionInput.trim()) {
      message.warning('评论内容不能为空');
      return;
    }
    
    if (!selectedLecture) {
      return;
    }
    
    // 创建新讨论
    const newDiscussion = {
      id: Date.now(),
      content: discussionInput,
      user: user.username,
      avatar: user.avatar || 'https://via.placeholder.com/40',
      time: new Date().toISOString(),
      likes: 0
    };
    
    // 更新讨论列表
    const lectureId = selectedLecture.id;
    const updatedDiscussions = {
      ...discussions,
      [lectureId]: [
        ...(discussions[lectureId] || []),
        newDiscussion
      ]
    };
    
    setDiscussions(updatedDiscussions);
    setDiscussionInput('');
    
    // 保存到localStorage
    try {
      localStorage.setItem('lectureDiscussions', JSON.stringify(updatedDiscussions));
    } catch (e) {
      console.error('保存讨论数据失败', e);
    }
    
    message.success('评论发布成功');
  };
  
  // 获取讲座评论
  const getLectureDiscussions = () => {
    if (!selectedLecture) return [];
    return discussions[selectedLecture.id] || [];
  };
  
  // 格式化时间
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      
      if (diffDays < 1) {
        return '今天';
      } else if (diffDays < 2) {
        return '昨天';
      } else if (diffDays < 7) {
        return `${diffDays}天前`;
      } else {
        return date.toLocaleDateString();
      }
    } catch (e) {
      return timestamp;
    }
  };
  
  // 检查讲座是否已预约
  const isLectureReserved = (lectureId) => {
    return reservedLectures.includes(lectureId);
  };
  
  return (
    <div className="expert-lectures-page">
      <div className="page-header">
        <div className="container">
          <Title level={1}>文化专家讲座</Title>
          <Paragraph>
            聆听文化专家分享，了解传统文化的精髓与魅力
          </Paragraph>
        </div>
      </div>
      
      <div className="container main-content">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="即将开讲" key="upcoming">
            <Row gutter={[24, 24]}>
              {filteredLectures('upcoming').map(lecture => (
                <Col xs={24} sm={12} md={8} key={lecture.id}>
                  <Card
                    hoverable
                    cover={
                      <div className="lecture-cover" style={{ backgroundImage: `url(${lecture.coverImage})` }}>
                        <Badge.Ribbon text="即将开讲" color="green" />
                      </div>
                    }
                    className="lecture-card"
                  >
                    <Card.Meta
                      title={lecture.title}
                      description={
                        <>
                          <div className="lecture-meta">
                            <Avatar src={lecture.avatar} /> 
                            <span>{lecture.speaker}</span>
                            <div className="speaker-title">{lecture.speakerTitle}</div>
                          </div>
                          <div className="lecture-info">
                            <div><CalendarOutlined /> {lecture.date} {lecture.time}</div>
                            <div><ClockCircleOutlined /> {lecture.duration}分钟</div>
                            <div><TeamOutlined /> {lecture.participants}人参与</div>
                          </div>
                          <div className="lecture-tags">
                            {lecture.tags.map((tag, index) => (
                              <Tag key={index}>{tag}</Tag>
                            ))}
                          </div>
                        </>
                      }
                    />
                    <div className="card-actions">
                      <Button 
                        type="primary" 
                        onClick={() => handleReservation(lecture)}
                        disabled={isLectureReserved(lecture.id)}
                      >
                        {isLectureReserved(lecture.id) ? '已预约' : '预约讲座'}
                      </Button>
                      <Button onClick={() => openLectureDetails(lecture)}>
                        详情
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
          
          <TabPane tab="正在直播" key="live">
            <Row gutter={[24, 24]}>
              {filteredLectures('live').map(lecture => (
                <Col xs={24} sm={12} key={lecture.id}>
                  <Card
                    hoverable
                    cover={
                      <div className="lecture-cover live-cover" style={{ backgroundImage: `url(${lecture.coverImage})` }}>
                        <Badge.Ribbon text="直播中" color="red" />
                        <div className="play-button" onClick={() => openLectureDetails(lecture)}>
                          <PlayCircleOutlined />
                        </div>
                      </div>
                    }
                    className="lecture-card live-card"
                  >
                    <Card.Meta
                      title={lecture.title}
                      description={
                        <>
                          <div className="lecture-meta">
                            <Avatar src={lecture.avatar} /> 
                            <span>{lecture.speaker}</span>
                            <div className="speaker-title">{lecture.speakerTitle}</div>
                          </div>
                          <div className="lecture-info">
                            <div><TeamOutlined /> <span className="participants-count">{lecture.participants}</span> 人正在观看</div>
                          </div>
                          <div className="lecture-tags">
                            {lecture.tags.map((tag, index) => (
                              <Tag key={index}>{tag}</Tag>
                            ))}
                          </div>
                        </>
                      }
                    />
                    <div className="card-actions">
                      <Button 
                        type="primary" 
                        icon={<PlayCircleOutlined />}
                        onClick={() => openLectureDetails(lecture)}
                      >
                        观看直播
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
              {filteredLectures('live').length === 0 && (
                <Col span={24}>
                  <div className="empty-state">
                    <VideoCameraOutlined className="empty-icon" />
                    <Title level={4}>暂无正在直播的讲座</Title>
                    <Paragraph>请关注即将开讲的讲座，或观看历史讲座回放</Paragraph>
                  </div>
                </Col>
              )}
            </Row>
          </TabPane>
          
          <TabPane tab="往期回放" key="recorded">
            <Row gutter={[24, 24]}>
              {filteredLectures('recorded').map(lecture => (
                <Col xs={24} sm={12} md={8} key={lecture.id}>
                  <Card
                    hoverable
                    cover={
                      <div className="lecture-cover" style={{ backgroundImage: `url(${lecture.coverImage})` }}>
                        <div className="play-button" onClick={() => openLectureDetails(lecture)}>
                          <PlayCircleOutlined />
                        </div>
                      </div>
                    }
                    className="lecture-card recorded-card"
                  >
                    <Card.Meta
                      title={lecture.title}
                      description={
                        <>
                          <div className="lecture-meta">
                            <Avatar src={lecture.avatar} /> 
                            <span>{lecture.speaker}</span>
                          </div>
                          <div className="lecture-stats">
                            <div><TeamOutlined /> {lecture.participants}次观看</div>
                            <div><LikeOutlined /> {lecture.likes}人点赞</div>
                          </div>
                          <div className="lecture-tags">
                            {lecture.tags.map((tag, index) => (
                              <Tag key={index}>{tag}</Tag>
                            ))}
                          </div>
                        </>
                      }
                    />
                    <div className="card-actions">
                      <Button 
                        type="primary" 
                        icon={<PlayCircleOutlined />}
                        onClick={() => openLectureDetails(lecture)}
                      >
                        观看回放
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
        </Tabs>
      </div>
      
      {/* 讲座观看模态框 */}
      <Modal
        title={selectedLecture?.title}
        open={lectureModalVisible}
        onCancel={() => {
          setLectureModalVisible(false);
          if (danmakuTimer.current) {
            clearInterval(danmakuTimer.current);
          }
        }}
        footer={null}
        width={1000}
        className="lecture-modal"
      >
        {selectedLecture && (
          <div className="lecture-player-container">
            <div className="video-player-wrapper">
              <div className="video-player" ref={videoPlayerRef}>
                <img 
                  src={selectedLecture.coverImage} 
                  alt={selectedLecture.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div className="video-controls">
                  <Button 
                    icon={isPlaying ? <span>❚❚</span> : <PlayCircleOutlined />} 
                    onClick={togglePlay}
                    type="primary"
                    shape="circle"
                    size="large"
                  />
                </div>
              </div>
              
              {/* 弹幕区域 */}
              <div 
                className="danmaku-container" 
                ref={danmakuContainerRef}
                style={{ display: showDanmaku ? 'block' : 'none' }}
              ></div>
              
              <div className="danmaku-control">
                <Input 
                  placeholder="发送弹幕..." 
                  value={danmakuInput} 
                  onChange={e => setDanmakuInput(e.target.value)}
                  onPressEnter={sendDanmaku}
                  disabled={!showDanmaku || !user}
                  addonAfter={
                    <Button 
                      type="text" 
                      icon={<SendOutlined />} 
                      onClick={sendDanmaku}
                      disabled={!showDanmaku || !user}
                    />
                  }
                  addonBefore={
                    <Tooltip title={showDanmaku ? "关闭弹幕" : "开启弹幕"}>
                      <Button 
                        type="text" 
                        icon={<CommentOutlined />} 
                        onClick={toggleDanmaku}
                        className={!showDanmaku ? 'danmaku-disabled' : ''}
                      />
                    </Tooltip>
                  }
                />
              </div>
            </div>
            
            <div className="lecture-details">
              <Tabs defaultActiveKey="details">
                <TabPane tab="讲座详情" key="details">
                  <div className="lecture-info">
                    <div className="speaker-info">
                      <Avatar src={selectedLecture.avatar} size={64} />
                      <div>
                        <Title level={5}>{selectedLecture.speaker}</Title>
                        <Text type="secondary">{selectedLecture.speakerTitle}</Text>
                      </div>
                    </div>
                    <Divider />
                    <Paragraph>{selectedLecture.description}</Paragraph>
                    <div className="tags-section">
                      {selectedLecture.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </div>
                    <div className="lecture-meta-info">
                      <div><CalendarOutlined /> 日期：{selectedLecture.date}</div>
                      <div><ClockCircleOutlined /> 时长：{selectedLecture.duration}分钟</div>
                    </div>
                    <div className="lecture-rating">
                      <Title level={5}>讲座评分</Title>
                      <div className="rating-control">
                        <Rate 
                          value={userRating} 
                          onChange={value => {
                            if (!user) {
                              message.warning('请先登录后评分');
                              return;
                            }
                            setUserRating(value);
                            message.success('评分成功，感谢您的反馈');
                          }} 
                        />
                        <span className="rate-text">{userRating ? `${userRating}分` : '请评分'}</span>
                      </div>
                    </div>
                    <div className="related-materials">
                      <Title level={5}>相关资料</Title>
                      <List
                        itemLayout="horizontal"
                        dataSource={selectedLecture.relatedMaterials}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<BookOutlined style={{ fontSize: '24px' }} />}
                              title={<a href="#">{item.title}</a>}
                              description={item.type === 'book' ? '图书资料' : '文章资料'}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="讨论区" key="discussion">
                  <List
                    className="discussion-list"
                    itemLayout="vertical"
                    dataSource={getLectureDiscussions()}
                    locale={{ emptyText: '暂无评论，快来发表第一条评论吧' }}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button type="text" icon={<LikeOutlined />}>点赞 {item.likes}</Button>,
                          <Button type="text" icon={<CommentOutlined />}>回复</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar}>{item.user.charAt(0)}</Avatar>}
                          title={item.user}
                          description={formatTime(item.time)}
                        />
                        {item.content}
                      </List.Item>
                    )}
                  />
                  <Divider />
                  <div className="discussion-input">
                    <TextArea 
                      rows={4} 
                      placeholder={user ? "分享您的想法和问题..." : "请先登录后评论"} 
                      disabled={!user}
                      value={discussionInput}
                      onChange={e => setDiscussionInput(e.target.value)}
                    />
                    <div className="discussion-submit">
                      <Button 
                        type="primary" 
                        icon={<CommentOutlined />}
                        onClick={submitDiscussion}
                        disabled={!user || !discussionInput.trim()}
                      >
                        发表评论
                      </Button>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        )}
      </Modal>
      
      {/* 讲座预约模态框 */}
      <Modal
        title="预约讲座"
        open={reservationModalVisible}
        onCancel={() => setReservationModalVisible(false)}
        footer={null}
      >
        {selectedLecture && (
          <Form layout="vertical" onFinish={submitReservation}>
            <div className="reservation-lecture-info">
              <img 
                src={selectedLecture.coverImage} 
                alt={selectedLecture.title} 
                className="reservation-image" 
              />
              <div className="reservation-lecture-details">
                <Title level={4}>{selectedLecture.title}</Title>
                <div><UserOutlined /> 主讲人：{selectedLecture.speaker}</div>
                <div><CalendarOutlined /> 日期：{selectedLecture.date}</div>
                <div><ClockCircleOutlined /> 时间：{selectedLecture.time}</div>
              </div>
            </div>
            
            <Divider />
            
            <Form.Item
              name="name"
              label="姓名"
              initialValue={user?.nickname || ''}
              rules={[{ required: true, message: '请输入您的姓名' }]}
            >
              <Input placeholder="请输入您的真实姓名" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="手机号码"
              rules={[{ required: true, message: '请输入您的手机号码' }]}
            >
              <Input placeholder="用于讲座开始前通知" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="电子邮箱"
            >
              <Input placeholder="用于接收讲座资料（选填）" />
            </Form.Item>
            
            <Form.Item
              name="interests"
              label="感兴趣的主题"
            >
              <Input placeholder="请输入您感兴趣的相关主题（选填）" />
            </Form.Item>
            
            <Form.Item
              name="reminder"
              label="提醒方式"
              initialValue={['sms', 'email']}
            >
              <Space>
                <Button type="primary">短信提醒</Button>
                <Button>邮件提醒</Button>
                <Button>日历添加</Button>
              </Space>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                确认预约
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ExpertLectures; 