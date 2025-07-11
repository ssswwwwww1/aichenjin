import React, { useState, useEffect } from 'react';
import {
  Row, Col, Card, Avatar, Button, Input, Tabs, Tag, List,
  Typography, Space, Divider, Upload, message, Modal, Form, Select
} from 'antd';
import {
  UserOutlined, TeamOutlined, PictureOutlined, VideoCameraOutlined,
  LikeOutlined, CommentOutlined, ShareAltOutlined, UploadOutlined,
  CalendarOutlined, FireOutlined, HeartOutlined, StarOutlined,
  FlagOutlined, SmileOutlined, EnvironmentOutlined
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
  const [user, setUser] = useState(null);
  
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
    if (!user) {
      message.warning('请先登录');
      return;
    }
    
    console.log('发布内容:', values);
    console.log('上传的图片:', fileList);
    
    // 处理上传的图片
    const uploadedImages = fileList.map(file => 
      file.thumbUrl || 'https://via.placeholder.com/300x200?text=用户上传图片'
    );
    
    // 生成新帖子
    const newPost = {
      id: Date.now(),
      author: user.nickname,
      avatar: user.avatar,
      title: values.title,
      content: values.content,
      images: uploadedImages.length > 0 ? uploadedImages : [],
      tags: values.tags || [],
      time: '刚刚',
      likes: 0,
      comments: 0,
      location: values.location || null
    };
    
    // 简化版：直接在前端添加帖子
    communityData.posts.unshift(newPost);
    
    message.success('发布成功！');
    setPostModalVisible(false);
    postForm.resetFields();
    setFileList([]);
  };
  
  // 处理图片上传
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  
  // 处理活动报名
  const handleEventRegister = (event) => {
    if (!user) {
      message.warning('请先登录');
      return;
    }
    
    setSelectedEvent(event);
    setEventModalVisible(true);
  };
  
  // 提交活动报名
  const handleEventSubmit = (values) => {
    console.log('活动报名信息:', values);
    
    // 更新活动参与人数
    const updatedEvents = communityData.events.map(event => {
      if (event.id === selectedEvent.id) {
        return { ...event, participants: event.participants + 1 };
      }
      return event;
    });
    
    communityData.events = updatedEvents;
    
    message.success('报名成功！我们会通过短信通知您活动详情');
    setEventModalVisible(false);
  };
  
  // 处理加入小组
  const handleJoinGroup = (group) => {
    if (!user) {
      message.warning('请先登录');
      return;
    }
    
    setSelectedGroup(group);
    setGroupModalVisible(true);
  };
  
  // 确认加入小组
  const confirmJoinGroup = () => {
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
    
    // 保存加入的小组
    const newJoinedGroups = [...joinedGroups, selectedGroup.id];
    setJoinedGroups(newJoinedGroups);
    localStorage.setItem('joinedGroups', JSON.stringify(newJoinedGroups));
    
    message.success(`成功加入"${selectedGroup.name}"小组`);
    setGroupModalVisible(false);
  };
  
  // 处理帖子点赞
  const handleLike = (postId) => {
    if (!user) {
      message.warning('请先登录');
      return;
    }
    
    // 检查是否已经点赞
    const hasLiked = likedPosts[postId];
    
    // 更新点赞状态
    const newLikedPosts = { ...likedPosts };
    
    if (hasLiked) {
      // 取消点赞
      delete newLikedPosts[postId];
      
      // 更新帖子点赞数
      communityData.posts = communityData.posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: Math.max(0, post.likes - 1) };
        }
        return post;
      });
    } else {
      // 点赞
      newLikedPosts[postId] = true;
      
      // 更新帖子点赞数
      communityData.posts = communityData.posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
    }
    
    // 保存点赞状态
    setLikedPosts(newLikedPosts);
    localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
  };
  
  // 打开评论模态框
  const openCommentModal = (post) => {
    if (!user) {
      message.warning('请先登录');
      return;
    }
    
    setSelectedPost(post);
    setCommentModalVisible(true);
  };
  
  // 提交评论
  const handleCommentSubmit = (values) => {
    console.log('评论内容:', values);
    
    // 更新帖子评论数
    communityData.posts = communityData.posts.map(post => {
      if (post.id === selectedPost.id) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    });
    
    message.success('评论成功');
    setCommentModalVisible(false);
    commentForm.resetFields();
  };
  
  // 处理分享
  const handleShare = (post) => {
    if (!user) {
      message.warning('请先登录');
      return;
    }
    
    // 模拟分享功能
    message.success('分享链接已复制到剪贴板');
  };
  
  return (
    <div className="family-group-container">
      <div className="page-header">
        <Title level={2}>亲子社群</Title>
        <Text type="secondary">分享育儿经验，参与文化活动，共同成长</Text>
      </div>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab} className="family-tabs">
        <TabPane tab={<span><TeamOutlined /> 社区动态</span>} key="community">
          <div className="post-actions">
            <Button 
              type="primary" 
              icon={<UploadOutlined />} 
              size="large"
              onClick={() => {
                if (!user) {
                  message.warning('请先登录');
                  return;
                }
                setPostModalVisible(true);
              }}
            >
              发布内容
            </Button>
          </div>
          
          <List
            itemLayout="vertical"
            size="large"
            dataSource={communityData.posts}
            renderItem={item => (
              <Card className="post-card" key={item.id}>
                <Meta
                  avatar={<Avatar src={item.avatar} size={50}>{item.author.charAt(0)}</Avatar>}
                  title={<a href="#">{item.title}</a>}
                  description={
                    <div className="post-meta">
                      <span className="author-name">{item.author}</span>
                      <span className="post-time">{item.time}</span>
                      {item.location && (
                        <span className="post-location">
                          <EnvironmentOutlined /> {item.location}
                        </span>
                      )}
                    </div>
                  }
                />
                <Paragraph className="post-content">{item.content}</Paragraph>
                
                {item.images && item.images.length > 0 && (
                  <div className="post-images">
                    <Row gutter={[8, 8]}>
                      {item.images.map((img, index) => (
                        <Col span={8} key={index}>
                          <div className="image-container">
                            <img src={img} alt={`图片${index + 1}`} />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
                
                <div className="post-tags">
                  {item.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                
                <div className="post-actions">
                  <Button 
                    type={likedPosts[item.id] ? "primary" : "text"} 
                    icon={<LikeOutlined />}
                    onClick={() => handleLike(item.id)}
                  >
                    点赞 {item.likes}
                  </Button>
                  <Button 
                    type="text" 
                    icon={<CommentOutlined />}
                    onClick={() => openCommentModal(item)}
                  >
                    评论 {item.comments}
                  </Button>
                  <Button 
                    type="text" 
                    icon={<ShareAltOutlined />}
                    onClick={() => handleShare(item)}
                  >
                    分享
                  </Button>
                </div>
              </Card>
            )}
          />
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