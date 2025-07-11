import React, { useState, useEffect } from 'react';
import {
  Row, Col, Card, Avatar, Button, Input, Tabs, Tag, List,
  Typography, Space, Divider, Upload, message, Modal, Form, Select
} from 'antd';
import {
  UserOutlined, TeamOutlined, PictureOutlined, VideoCameraOutlined,
  LikeOutlined, CommentOutlined, ShareAltOutlined, UploadOutlined,
  CalendarOutlined, FireOutlined, HeartOutlined, StarOutlined,
  FlagOutlined, SmileOutlined, EnvironmentOutlined, ClockCircleOutlined
} from '@ant-design/icons';
import './FamilyGroup.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Meta } = Card;

// 模拟社区内容数据
const communityData = {
  posts: [
    {
      id: 1,
      author: '阳光妈妈',
      avatar: 'https://via.placeholder.com/50',
      title: '周末故宫行，孩子们的文化探索之旅',
      content: '周末带着孩子们去了故宫，给大家分享一下我们的行程和感受！孩子们对古建筑和历史故事特别感兴趣，特别是太和殿的讲解环节，孩子们听得非常认真...',
      images: [
        'https://via.placeholder.com/300x200?text=故宫亲子游1',
        'https://via.placeholder.com/300x200?text=故宫亲子游2',
        'https://via.placeholder.com/300x200?text=故宫亲子游3'
      ],
      tags: ['亲子游', '故宫', '文化体验'],
      time: '2小时前',
      likes: 28,
      comments: 12,
      location: '北京故宫博物院'
    },
    {
      id: 2,
      author: '文化小达人',
      avatar: 'https://via.placeholder.com/50',
      title: '带孩子体验传统剪纸，培养动手能力和文化素养',
      content: '今天参加了文化中心组织的传统剪纸体验课，孩子们不仅学会了基本的剪纸技巧，还了解了剪纸背后的文化含义。分享一些活动照片和作品展示...',
      images: [
        'https://via.placeholder.com/300x200?text=剪纸活动1',
        'https://via.placeholder.com/300x200?text=剪纸活动2'
      ],
      tags: ['传统手工', '剪纸', '亲子活动'],
      time: '1天前',
      likes: 36,
      comments: 8,
      location: '北京市文化活动中心'
    }
  ],
  events: [
    {
      id: 1,
      title: '亲子故事会：中国传统节日的故事',
      cover: 'https://via.placeholder.com/300x200?text=亲子故事会',
      date: '2025-08-15',
      time: '14:00-16:00',
      location: '北京市朝阳区文化馆',
      organizer: '文化传承联盟',
      participants: 15,
      maxParticipants: 30,
      description: '通过讲故事的形式，让孩子们了解中国传统节日的由来和习俗，增强文化认同感。活动包括故事分享、互动问答和手工制作环节。'
    },
    {
      id: 2,
      title: '小小考古学家：探秘古代文物',
      cover: 'https://via.placeholder.com/300x200?text=小小考古学家',
      date: '2025-08-22',
      time: '10:00-12:00',
      location: '北京历史博物馆',
      organizer: '博物馆教育部',
      participants: 23,
      maxParticipants: 25,
      description: '通过模拟考古发掘、文物拼图等互动游戏，让孩子们了解考古工作和文物保护的重要性，培养历史兴趣和保护意识。'
    }
  ],
  groups: [
    {
      id: 1,
      name: '文化小达人',
      avatar: 'https://via.placeholder.com/50',
      description: '专注于中国传统文化启蒙和体验的亲子社群',
      members: 128,
      topics: 86,
      tags: ['传统文化', '亲子活动', '文化启蒙']
    },
    {
      id: 2,
      name: '博物馆探险队',
      avatar: 'https://via.placeholder.com/50',
      description: '组织各类博物馆参观和主题活动，让孩子在游玩中学习',
      members: 96,
      topics: 42,
      tags: ['博物馆', '历史探索', '文化遗产']
    }
  ]
};

// 主组件
const FamilyGroup = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [postForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentForm] = Form.useForm();
  
  // 从localStorage加载用户数据
  const [user, setUser] = useState({ id: 'guest', username: '游客', nickname: '游客', avatar: null });
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('解析用户数据失败', e);
      }
    }
    
    // 加载已加入的小组
    const savedJoinedGroups = localStorage.getItem('joinedGroups');
    if (savedJoinedGroups) {
      try {
        setJoinedGroups(JSON.parse(savedJoinedGroups));
      } catch (e) {
        console.error('解析加入的小组数据失败', e);
      }
    }
    
    // 加载点赞状态
    const savedLikedPosts = localStorage.getItem('likedPosts');
    if (savedLikedPosts) {
      try {
        setLikedPosts(JSON.parse(savedLikedPosts));
      } catch (e) {
        console.error('解析点赞数据失败', e);
      }
    }
  }, []);
  
  // 处理发布帖子
  const handlePostSubmit = (values) => {
    console.log('发布内容:', values);
    console.log('上传的图片:', fileList);
    
    // 处理上传的图片
    const uploadedImages = fileList.map(file => 
      file.thumbUrl || 'https://via.placeholder.com/300x200?text=用户上传图片'
    );
    
    // 生成新帖子
    const newPost = {
      id: Date.now(),
      author: user.nickname || user.username,
      avatar: user.avatar || 'https://via.placeholder.com/50',
      title: values.title,
      content: values.content,
      images: uploadedImages.length > 0 ? uploadedImages : [],
      tags: values.tags || [],
      time: '刚刚',
      likes: 0,
      comments: 0,
      location: values.location || null
    };
    
    // 添加帖子到本地存储
    try {
      const savedPosts = localStorage.getItem('userPosts');
      let updatedPosts = [];
      
      if (savedPosts) {
        updatedPosts = JSON.parse(savedPosts);
      }
      
      updatedPosts.push(newPost);
      localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
      
      // 更新显示
      communityData.posts.unshift(newPost);
      
      message.success('发布成功！');
      setPostModalVisible(false);
      postForm.resetFields();
      setFileList([]);
    } catch (e) {
      console.error('保存帖子失败', e);
      message.error('发布失败，请稍后再试');
    }
  };
  
  // 处理图片上传
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  
  // 处理活动报名
  const handleEventRegister = (event) => {
    // 检查活动是否已满
    if (event.participants >= event.maxParticipants) {
      message.warning('该活动已报满，请选择其他活动');
      return;
    }
    
    setSelectedEvent(event);
    setEventModalVisible(true);
  };
  
  // 提交活动报名
  const handleEventSubmit = (values) => {
    console.log('活动报名信息:', values);
    
    if (!selectedEvent) {
      message.error('未选择活动');
      return;
    }
    
    // 更新活动参与人数
    const updatedEvent = {
      ...selectedEvent,
      participants: selectedEvent.participants + values.participants
    };
    
    // 更新本地数据
    const eventIndex = communityData.events.findIndex(e => e.id === selectedEvent.id);
    if (eventIndex !== -1) {
      communityData.events[eventIndex] = updatedEvent;
    }
    
    // 保存到localStorage
    try {
      const savedEvents = localStorage.getItem('registeredEvents') || '[]';
      const registeredEvents = JSON.parse(savedEvents);
      
      registeredEvents.push({
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        registrationTime: new Date().toISOString(),
        participants: values.participants,
        contactName: values.contactName,
        contactPhone: values.contactPhone
      });
      
      localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
    } catch (e) {
      console.error('保存活动报名信息失败', e);
    }
    
    message.success('报名成功！我们会通过短信通知您活动详情');
    setEventModalVisible(false);
  };
  
  // 处理加入小组
  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setGroupModalVisible(true);
  };
  
  // 确认加入小组
  const confirmJoinGroup = () => {
    if (!selectedGroup) {
      return;
    }
    
    if (joinedGroups.includes(selectedGroup.id)) {
      message.info('您已经是该小组成员');
      setGroupModalVisible(false);
      return;
    }
    
    // 更新小组成员数
    const updatedGroups = communityData.groups.map(group => {
      if (group.id === selectedGroup.id) {
        return { ...group, members: group.members + 1 };
      }
      return group;
    });
    
    communityData.groups = updatedGroups;
    
    // 更新已加入小组列表
    const newJoinedGroups = [...joinedGroups, selectedGroup.id];
    setJoinedGroups(newJoinedGroups);
    
    // 保存到localStorage
    try {
      localStorage.setItem('joinedGroups', JSON.stringify(newJoinedGroups));
      message.success(`成功加入"${selectedGroup.name}"小组！`);
    } catch (e) {
      console.error('保存加入小组数据失败', e);
      message.error('加入小组失败，请稍后再试');
    }
    
    setGroupModalVisible(false);
  };
  
  // 处理点赞
  const handleLike = (postId) => {
    // 切换点赞状态
    const isLiked = likedPosts[postId];
    const newLikedPosts = {
      ...likedPosts,
      [postId]: !isLiked
    };
    
    // 更新点赞数
    const updatedPosts = communityData.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    
    communityData.posts = updatedPosts;
    setLikedPosts(newLikedPosts);
    
    // 保存到localStorage
    try {
      localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
    } catch (e) {
      console.error('保存点赞数据失败', e);
    }
    
    // 显示消息
    if (!isLiked) {
      message.success('点赞成功');
    }
  };
  
  // 打开评论模态框
  const openCommentModal = (post) => {
    setSelectedPost(post);
    setCommentModalVisible(true);
    commentForm.resetFields();
  };
  
  // 提交评论
  const handleCommentSubmit = (values) => {
    if (!selectedPost) return;
    
    console.log('评论内容:', values);
    
    // 更新帖子评论数
    const updatedPosts = communityData.posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    });
    
    communityData.posts = updatedPosts;
    
    // 保存评论到localStorage
    try {
      const savedComments = localStorage.getItem('postComments') || '{}';
      const comments = JSON.parse(savedComments);
      
      const postComments = comments[selectedPost.id] || [];
      postComments.push({
        id: Date.now(),
        postId: selectedPost.id,
        content: values.content,
        user: user.nickname || user.username,
        avatar: user.avatar || 'https://via.placeholder.com/40',
        time: new Date().toISOString()
      });
      
      comments[selectedPost.id] = postComments;
      localStorage.setItem('postComments', JSON.stringify(comments));
    } catch (e) {
      console.error('保存评论数据失败', e);
    }
    
    message.success('评论成功');
    setCommentModalVisible(false);
  };
  
  // 处理分享
  const handleShare = (post) => {
    // 实际项目中应实现分享功能
    message.info('分享功能开发中');
  };
  
  // 检查是否已加入小组
  const isGroupJoined = (groupId) => {
    return joinedGroups.includes(groupId);
  };
  
  // 检查帖子是否已点赞
  const isPostLiked = (postId) => {
    return !!likedPosts[postId];
  };
  
  return (
    <div className="family-group-page">
      <div className="page-header">
        <div className="container">
          <Title level={1}>家庭亲子团</Title>
          <Paragraph className="page-description">
            发现和分享亲子文化活动，与家庭一起体验传统文化的魅力
          </Paragraph>
        </div>
      </div>
      
      <div className="container main-content">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="文化社区" key="community">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={16}>
                <Card className="post-box">
                  <div className="post-form-header">
                    <Avatar src={user.avatar} icon={!user.avatar && <UserOutlined />} />
                    <Button 
                      type="dashed" 
                      block 
                      onClick={() => setPostModalVisible(true)}
                      className="post-trigger"
                    >
                      分享您的亲子文化体验...
                    </Button>
                  </div>
                  <div className="post-actions">
                    <Button icon={<PictureOutlined />} onClick={() => setPostModalVisible(true)}>
                      图片
                    </Button>
                    <Button icon={<VideoCameraOutlined />} onClick={() => setPostModalVisible(true)}>
                      视频
                    </Button>
                    <Button icon={<EnvironmentOutlined />} onClick={() => setPostModalVisible(true)}>
                      位置
                    </Button>
                  </div>
                </Card>
                
                <Divider orientation="left">社区动态</Divider>
                
                {communityData.posts.map(post => (
                  <Card 
                    key={post.id} 
                    className="post-card"
                    hoverable
                  >
                    <div className="post-header">
                      <div className="post-author">
                        <Avatar src={post.avatar} />
                        <div className="author-info">
                          <div className="author-name">{post.author}</div>
                          <div className="post-time">{post.time}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="post-content">
                      <div className="post-title">{post.title}</div>
                      <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}>
                        {post.content}
                      </Paragraph>
                      
                      {post.images && post.images.length > 0 && (
                        <div className="post-images">
                          <Row gutter={[8, 8]}>
                            {post.images.map((image, index) => (
                              <Col 
                                key={index} 
                                xs={post.images.length === 1 ? 24 : 12} 
                                md={post.images.length === 1 ? 24 : 8}
                              >
                                <div 
                                  className="image-item" 
                                  style={{ backgroundImage: `url(${image})` }}
                                />
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                      
                      {post.location && (
                        <div className="post-location">
                          <EnvironmentOutlined /> {post.location}
                        </div>
                      )}
                      
                      <div className="post-tags">
                        {post.tags.map((tag, index) => (
                          <Tag key={index}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                    
                    <div className="post-actions-bar">
                      <Button 
                        icon={<LikeOutlined />} 
                        className={`action-btn ${isPostLiked(post.id) ? 'active' : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        赞 ({post.likes})
                      </Button>
                      <Button 
                        icon={<CommentOutlined />} 
                        className="action-btn"
                        onClick={() => openCommentModal(post)}
                      >
                        评论 ({post.comments})
                      </Button>
                      <Button 
                        icon={<ShareAltOutlined />} 
                        className="action-btn"
                        onClick={() => handleShare(post)}
                      >
                        分享
                      </Button>
                    </div>
                  </Card>
                ))}
              </Col>
              
              <Col xs={24} md={8}>
                <Card 
                  title={<><CalendarOutlined /> 亲子文化活动</>} 
                  extra={<a href="#!">更多</a>}
                  className="side-card"
                >
                  {communityData.events.map(event => (
                    <Card 
                      key={event.id}
                      hoverable
                      className="event-card"
                      cover={
                        <div className="event-cover" style={{ backgroundImage: `url(${event.cover})` }}>
                          {event.participants >= event.maxParticipants && (
                            <div className="event-full-badge">已满</div>
                          )}
                        </div>
                      }
                    >
                      <div className="event-title">{event.title}</div>
                      <div className="event-info">
                        <div><CalendarOutlined /> {event.date}</div>
                        <div><ClockCircleOutlined /> {event.time}</div>
                        <div><EnvironmentOutlined /> {event.location}</div>
                        <div><TeamOutlined /> {event.participants}/{event.maxParticipants}人</div>
                      </div>
                      <div className="event-actions">
                        <Button 
                          type="primary" 
                          onClick={() => handleEventRegister(event)}
                          disabled={event.participants >= event.maxParticipants}
                          block
                        >
                          {event.participants >= event.maxParticipants ? '名额已满' : '立即报名'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </Card>
                
                <Card 
                  title={<><TeamOutlined /> 亲子兴趣小组</>} 
                  extra={<a href="#!">更多</a>}
                  className="side-card"
                  style={{ marginTop: 24 }}
                >
                  <List
                    dataSource={communityData.groups}
                    renderItem={group => (
                      <List.Item className="group-item">
                        <List.Item.Meta
                          avatar={<Avatar src={group.avatar} size={40} />}
                          title={group.name}
                          description={
                            <>
                              <div className="group-stats">
                                <span>{group.members} 成员</span>
                                <span>{group.topics} 话题</span>
                              </div>
                              <div className="group-tags">
                                {group.tags.slice(0, 2).map((tag, index) => (
                                  <Tag key={index}>{tag}</Tag>
                                ))}
                              </div>
                            </>
                          }
                        />
                        <Button 
                          type={isGroupJoined(group.id) ? "default" : "primary"}
                          size="small"
                          onClick={() => handleJoinGroup(group)}
                          disabled={isGroupJoined(group.id)}
                        >
                          {isGroupJoined(group.id) ? '已加入' : '加入'}
                        </Button>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        
        <TabPane tab={<span><CalendarOutlined /> 亲子活动</span>} key="events">
          <Row gutter={[24, 24]}>
            {communityData.events.map(event => (
              <Col xs={24} sm={12} key={event.id}>
                <Card 
                  hoverable 
                  cover={<img alt={event.title} src={event.cover} />} 
                  className="event-card"
                >
                  <Meta
                    title={event.title}
                    description={
                      <>
                        <div className="event-meta">
                          <div><CalendarOutlined /> {event.date} {event.time}</div>
                          <div><EnvironmentOutlined /> {event.location}</div>
                          <div><TeamOutlined /> 参与人数: {event.participants}/{event.maxParticipants}</div>
                        </div>
                        <Paragraph ellipsis={{ rows: 3 }}>{event.description}</Paragraph>
                        <div className="event-footer">
                          <div className="event-organizer">主办方: {event.organizer}</div>
                          <Button 
                            type="primary" 
                            onClick={() => handleEventRegister(event)}
                            disabled={event.participants >= event.maxParticipants}
                          >
                            {event.participants >= event.maxParticipants ? '已满额' : '立即报名'}
                          </Button>
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        
        <TabPane tab={<span><FlagOutlined /> 兴趣小组</span>} key="groups">
          <Row gutter={[24, 24]}>
            {communityData.groups.map(group => (
              <Col xs={24} sm={12} md={8} key={group.id}>
                <Card className="group-card">
                  <div className="group-header">
                    <Avatar src={group.avatar} size={64}>{group.name.charAt(0)}</Avatar>
                    <div className="group-title">
                      <Title level={4}>{group.name}</Title>
                      <div className="group-stats">
                        <span><TeamOutlined /> {group.members}成员</span>
                        <span><CommentOutlined /> {group.topics}话题</span>
                      </div>
                    </div>
                  </div>
                  <Paragraph>{group.description}</Paragraph>
                  <div className="group-tags">
                    {group.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <Button 
                    type={joinedGroups.includes(group.id) ? "default" : "primary"} 
                    block
                    onClick={() => handleJoinGroup(group)}
                  >
                    {joinedGroups.includes(group.id) ? '已加入' : '加入小组'}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
      
      {/* 发布内容模态框 */}
      <Modal
        title="发布内容"
        open={postModalVisible}
        onCancel={() => setPostModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={postForm} layout="vertical" onFinish={handlePostSubmit}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="输入标题..." />
          </Form.Item>
          
          <Form.Item
            name="content"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <TextArea rows={4} placeholder="分享您的育儿经验或文化活动..." />
          </Form.Item>
          
          <Form.Item name="location">
            <Input prefix={<EnvironmentOutlined />} placeholder="添加地点（选填）" />
          </Form.Item>
          
          <Form.Item label="上传图片">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 9 ? null : (
                <div>
                  <PictureOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          
          <Form.Item name="tags" label="添加标签">
            <Select mode="tags" placeholder="输入标签">
              <Select.Option value="亲子活动">亲子活动</Select.Option>
              <Select.Option value="传统文化">传统文化</Select.Option>
              <Select.Option value="手工制作">手工制作</Select.Option>
              <Select.Option value="博物馆">博物馆</Select.Option>
              <Select.Option value="户外探索">户外探索</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              发布
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* 活动报名模态框 */}
      <Modal
        title="活动报名"
        open={eventModalVisible}
        onCancel={() => setEventModalVisible(false)}
        footer={null}
      >
        {selectedEvent && (
          <Form layout="vertical" onFinish={handleEventSubmit}>
            <div className="event-registration-header">
              <img src={selectedEvent.cover} alt={selectedEvent.title} className="event-image" />
              <div className="event-details">
                <Title level={4}>{selectedEvent.title}</Title>
                <div><CalendarOutlined /> {selectedEvent.date} {selectedEvent.time}</div>
                <div><EnvironmentOutlined /> {selectedEvent.location}</div>
              </div>
            </div>
            
            <Divider />
            
            <Form.Item
              name="parentName"
              label="家长姓名"
              initialValue={user?.nickname || ''}
              rules={[{ required: true, message: '请输入家长姓名' }]}
            >
              <Input placeholder="请输入您的姓名" />
            </Form.Item>
            
            <Form.Item
              name="childName"
              label="孩子姓名"
              rules={[{ required: true, message: '请输入孩子姓名' }]}
            >
              <Input placeholder="请输入孩子的姓名" />
            </Form.Item>
            
            <Form.Item
              name="childAge"
              label="孩子年龄"
              rules={[{ required: true, message: '请输入孩子年龄' }]}
            >
              <Input type="number" placeholder="请输入孩子的年龄" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[{ required: true, message: '请输入联系电话' }]}
            >
              <Input placeholder="用于活动通知和确认" />
            </Form.Item>
            
            <Form.Item
              name="specialNeeds"
              label="特殊需求"
            >
              <TextArea rows={3} placeholder="如有任何特殊需求，请在此说明（选填）" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                确认报名
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
      
      {/* 加入小组确认模态框 */}
      <Modal
        title="加入兴趣小组"
        open={groupModalVisible}
        onCancel={() => setGroupModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setGroupModalVisible(false)}>
            取消
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={confirmJoinGroup}
            disabled={selectedGroup && joinedGroups.includes(selectedGroup.id)}
          >
            {selectedGroup && joinedGroups.includes(selectedGroup.id) ? '已加入' : '确认加入'}
          </Button>,
        ]}
      >
        {selectedGroup && (
          <div className="join-group-content">
            <div className="group-info">
              <Avatar src={selectedGroup.avatar} size={64}>{selectedGroup.name.charAt(0)}</Avatar>
              <div className="group-detail">
                <Title level={4}>{selectedGroup.name}</Title>
                <Text type="secondary">{selectedGroup.description}</Text>
                <div className="group-stats">
                  <span><TeamOutlined /> {selectedGroup.members}成员</span>
                  <span><CommentOutlined /> {selectedGroup.topics}话题</span>
                </div>
              </div>
            </div>
            <Divider />
            <div className="group-rules">
              <Title level={5}>小组规则</Title>
              <ul>
                <li>尊重每位成员，保持友善交流</li>
                <li>分享内容须与小组主题相关</li>
                <li>禁止发布广告或不适当内容</li>
                <li>尊重知识产权，勿擅自转载他人作品</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
      
      {/* 评论模态框 */}
      <Modal
        title="发表评论"
        open={commentModalVisible}
        onCancel={() => setCommentModalVisible(false)}
        footer={null}
      >
        {selectedPost && (
          <div>
            <div className="comment-post-info">
              <div className="post-title">{selectedPost.title}</div>
              <div className="post-author">
                <Avatar src={selectedPost.avatar} size="small" />
                <span>{selectedPost.author}</span>
              </div>
            </div>
            <Divider />
            <Form form={commentForm} layout="vertical" onFinish={handleCommentSubmit}>
              <Form.Item
                name="comment"
                rules={[{ required: true, message: '请输入评论内容' }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="请输入您的评论..." 
                  autoFocus 
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  发表评论
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FamilyGroup; 