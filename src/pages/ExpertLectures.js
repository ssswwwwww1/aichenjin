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
  const [user, setUser] = useState(null);
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
    if (!user) {
      message.warning('请先登录后发送弹幕');
      return;
    }
    
    if (!danmakuInput.trim()) {
      message.warning('弹幕内容不能为空');
      return;
    }
    
    const newDanmaku = {
      id: danmaku.length + 1,
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
      danmakuElement.remove();
    }, 8000);
  };
  
  // 打开讲座详情
  const openLectureDetails = (lecture) => {
    setSelectedLecture(lecture);
    setLectureModalVisible(true);
    setUserRating(0);
    
    // 启动弹幕播放
    if (lecture.status === 'live') {
      if (danmakuTimer.current) {
        clearInterval(danmakuTimer.current);
      }
      
      // 模拟定时弹幕
      let index = 0;
      danmakuTimer.current = setInterval(() => {
        if (index < danmaku.length && showDanmaku) {
          displayNewDanmaku(danmaku[index]);
          index++;
        } else {
          clearInterval(danmakuTimer.current);
        }
      }, 2000);
    }
  };
  
  // 预约讲座
  const handleReservation = (lecture) => {
    if (!user) {
      message.warning('请先登录后预约讲座');
      return;
    }
    
    setSelectedLecture(lecture);
    setReservationModalVisible(true);
  };
  
  // 提交预约
  const submitReservation = (values) => {
    console.log('预约信息:', values);
    
    // 更新已预约的讲座
    const newReservations = [...reservedLectures, selectedLecture.id];
    setReservedLectures(newReservations);
    localStorage.setItem('reservedLectures', JSON.stringify(newReservations));
    
    message.success('讲座预约成功，我们会通过短信提醒您');
    setReservationModalVisible(false);
  };
  
  // 切换弹幕显示
  const toggleDanmaku = () => {
    setShowDanmaku(!showDanmaku);
    if (danmakuContainerRef.current) {
      danmakuContainerRef.current.style.display = !showDanmaku ? 'block' : 'none';
    }
  };
  
  // 模拟播放/暂停视频
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // 实际项目中应该控制视频播放/暂停
  };
  
  // 提交讨论
  const submitDiscussion = () => {
    if (!user) {
      message.warning('请先登录后参与讨论');
      return;
    }
    
    if (!discussionInput.trim()) {
      message.warning('评论内容不能为空');
      return;
    }
    
    const newDiscussion = {
      user: user.nickname,
      avatar: user.avatar,
      content: discussionInput,
      time: '刚刚',
      likes: 0
    };
    
    // 获取或初始化当前讲座的评论
    const lectureDiscussions = discussions[selectedLecture.id] || [];
    const updatedDiscussions = [newDiscussion, ...lectureDiscussions];
    
    // 更新讨论
    const newDiscussions = { 
      ...discussions, 
      [selectedLecture.id]: updatedDiscussions 
    };
    
    setDiscussions(newDiscussions);
    localStorage.setItem('lectureDiscussions', JSON.stringify(newDiscussions));
    setDiscussionInput('');
    
    message.success('评论发布成功');
  };
  
  // 获取当前讲座的讨论
  const getLectureDiscussions = () => {
    if (!selectedLecture) return [];
    return discussions[selectedLecture.id] || [];
  };

  return (
    <div className="expert-lectures-container">
      <div className="page-header">
        <Title level={2}>专家讲座</Title>
        <Text type="secondary">探索文化瑰宝，聆听专家讲解，互动交流学习</Text>
      </div>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab} className="lectures-tabs">
        <TabPane tab={<span><FireOutlined /> 正在直播</span>} key="live">
          <Row gutter={[24, 24]}>
            {filteredLectures('live').map(lecture => (
              <Col xs={24} sm={12} md={8} key={lecture.id}>
                <Card 
                  hoverable 
                  cover={
                    <div className="lecture-card-cover">
                      <img alt={lecture.title} src={lecture.coverImage} />
                      <Badge count="直播中" className="live-badge" />
                      <div className="lecture-card-overlay">
                        <Button 
                          type="primary" 
                          icon={<PlayCircleOutlined />}
                          onClick={() => openLectureDetails(lecture)}
                        >
                          立即观看
                        </Button>
                      </div>
                    </div>
                  }
                  className="lecture-card"
                >
                  <Card.Meta
                    avatar={<Avatar src={lecture.avatar} size="large" />}
                    title={lecture.title}
                    description={
                      <>
                        <div className="lecture-speaker">
                          {lecture.speaker} · {lecture.speakerTitle}
                        </div>
                        <div className="lecture-meta">
                          <span><CalendarOutlined /> {lecture.date}</span>
                          <span><ClockCircleOutlined /> {lecture.time}</span>
                        </div>
                        <div className="lecture-tags">
                          {lecture.tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                          ))}
                        </div>
                        <div className="lecture-stats">
                          <span><TeamOutlined /> {lecture.participants}人参与</span>
                          <span><LikeOutlined /> {lecture.likes}人点赞</span>
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        
        <TabPane tab={<span><CalendarOutlined /> 即将开始</span>} key="upcoming">
          <Row gutter={[24, 24]}>
            {filteredLectures('upcoming').map(lecture => (
              <Col xs={24} sm={12} md={8} key={lecture.id}>
                <Card 
                  hoverable 
                  cover={
                    <div className="lecture-card-cover">
                      <img alt={lecture.title} src={lecture.coverImage} />
                      <div className="lecture-card-overlay">
                        <Button 
                          type="primary" 
                          onClick={() => handleReservation(lecture)}
                          disabled={reservedLectures.includes(lecture.id)}
                        >
                          {reservedLectures.includes(lecture.id) ? '已预约' : '预约讲座'}
                        </Button>
                      </div>
                    </div>
                  }
                  className="lecture-card"
                >
                  <Card.Meta
                    avatar={<Avatar src={lecture.avatar} size="large" />}
                    title={lecture.title}
                    description={
                      <>
                        <div className="lecture-speaker">
                          {lecture.speaker} · {lecture.speakerTitle}
                        </div>
                        <div className="lecture-meta">
                          <span><CalendarOutlined /> {lecture.date}</span>
                          <span><ClockCircleOutlined /> {lecture.time}</span>
                        </div>
                        <div className="lecture-tags">
                          {lecture.tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                          ))}
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        
        <TabPane tab={<span><VideoCameraOutlined /> 录播回顾</span>} key="recorded">
          <Row gutter={[24, 24]}>
            {filteredLectures('recorded').map(lecture => (
              <Col xs={24} sm={12} md={8} key={lecture.id}>
                <Card 
                  hoverable 
                  cover={
                    <div className="lecture-card-cover">
                      <img alt={lecture.title} src={lecture.coverImage} />
                      <div className="lecture-card-overlay">
                        <Button 
                          type="primary" 
                          icon={<PlayCircleOutlined />}
                          onClick={() => openLectureDetails(lecture)}
                        >
                          观看回放
                        </Button>
                      </div>
                    </div>
                  }
                  className="lecture-card"
                >
                  <Card.Meta
                    avatar={<Avatar src={lecture.avatar} size="large" />}
                    title={lecture.title}
                    description={
                      <>
                        <div className="lecture-speaker">
                          {lecture.speaker} · {lecture.speakerTitle}
                        </div>
                        <div className="lecture-meta">
                          <span><CalendarOutlined /> {lecture.date}</span>
                          <span><ClockCircleOutlined /> {lecture.duration}分钟</span>
                        </div>
                        <div className="lecture-tags">
                          {lecture.tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                          ))}
                        </div>
                        <div className="lecture-stats">
                          <span><TeamOutlined /> {lecture.participants}人观看</span>
                          <span><LikeOutlined /> {lecture.likes}人点赞</span>
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
      
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
                          description={item.time}
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