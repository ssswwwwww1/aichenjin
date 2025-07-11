import React, { useState } from 'react';
import { Typography, Row, Col, Card, Avatar, Button, Tabs, List, Form, Input, Tag, Divider } from 'antd';
import { Comment } from '@ant-design/compatible';
import { 
  LikeOutlined, 
  MessageOutlined, 
  ShareAltOutlined, 
  UserOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  SmileOutlined,
  FireOutlined,
  TeamOutlined,
  TrophyOutlined,
  CommentOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import ChatSystem from '../components/ChatSystem';
import './Community.css';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Meta } = Card;

// Animation variants
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

const Community = () => {
  const [commentValue, setCommentValue] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  
  const communityPosts = [
    {
      id: 1,
      author: '文化爱好者',
      avatar: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=40&q=80',
      title: '故宫春节灯会，一场视觉与文化的盛宴',
      content: '昨天有幸参观了故宫新春灯会，整个紫禁城被璀璨的彩灯点亮，传统与现代的结合令人惊叹。大家有去的吗？分享一下感受吧！',
      time: '2小时前',
      likes: 156,
      comments: 28,
      shares: 42,
      images: [
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80'
      ],
      tags: ['故宫', '文化活动', '新春灯会']
    },
    {
      id: 2,
      author: '传统工艺爱好者',
      avatar: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=40&q=80',
      title: '非遗剪纸技艺学习心得',
      content: '最近参加了一个非遗剪纸工艺的线下工作坊，学习了基本技法和创新设计。这门古老的艺术形式真的很有魅力，分享几张我的作品，请大家指教！',
      time: '5小时前',
      likes: 98,
      comments: 36,
      shares: 15,
      images: [
        'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80'
      ],
      tags: ['非物质文化遗产', '剪纸', '传统工艺']
    },
    {
      id: 3,
      author: '戏曲研究者',
      avatar: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=40&q=80',
      title: '京剧脸谱背后的文化密码',
      content: '京剧脸谱的色彩和图案都有特定的文化含义，今天给大家分享一些有趣的知识。红色代表忠诚勇猛，黑色象征刚正不阿，黄色则暗示凶猛残暴...',
      time: '1天前',
      likes: 205,
      comments: 47,
      shares: 68,
      images: [
        'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80'
      ],
      tags: ['京剧', '脸谱', '戏曲艺术']
    }
  ];

  const groups = [
    {
      id: 1,
      name: '传统文化爱好者',
      avatar: 'https://via.placeholder.com/60?text=文化',
      members: 3528,
      description: '交流分享中国传统文化知识，共同探讨文化传承与创新'
    },
    {
      id: 2,
      name: '古建筑保护与欣赏',
      avatar: 'https://via.placeholder.com/60?text=古建',
      members: 1286,
      description: '关注中国传统建筑的保护、研究与欣赏，分享古建筑游览体验'
    },
    {
      id: 3,
      name: '非遗传承计划',
      avatar: 'https://via.placeholder.com/60?text=非遗',
      members: 952,
      description: '致力于非物质文化遗产的记录、传承与推广，连接匠人与爱好者'
    },
    {
      id: 4,
      name: '亲子文化体验',
      avatar: 'https://via.placeholder.com/60?text=亲子',
      members: 2103,
      description: '面向家庭的传统文化体验活动，让孩子从小接触优秀传统文化'
    }
  ];
  
  const events = [
    {
      id: 1,
      title: '故宫博物院"匠心传承"特展',
      cover: 'https://via.placeholder.com/300x150?text=故宫特展',
      date: '2025年4月10日 - 6月15日',
      location: '故宫博物院',
      participants: 120
    },
    {
      id: 2,
      title: '非遗技艺线下工作坊',
      cover: 'https://via.placeholder.com/300x150?text=非遗工作坊',
      date: '2025年3月25日 14:00-17:00',
      location: '市文化中心',
      participants: 45
    },
    {
      id: 3,
      title: '亲子传统节日文化体验',
      cover: 'https://via.placeholder.com/300x150?text=亲子文化体验',
      date: '2025年4月5日 10:00-16:00',
      location: '市少年宫',
      participants: 78
    }
  ];

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('发表评论:', commentValue);
    setCommentValue('');
  };

  return (
    <motion.div 
      className="community-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="community-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Title level={1} className="community-hero-title">文化社区</Title>
            <Paragraph className="community-hero-desc">
              连接文化爱好者，分享传统文化体验，共同传承中华文明
            </Paragraph>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<span><NotificationOutlined /> 社区动态</span>} key="1">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={16}>
                {/* 发布区 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="post-editor">
                    <Form.Item>
                      <TextArea 
                        rows={3} 
                        placeholder="分享你的文化体验、见解或问题..." 
                        value={commentValue}
                        onChange={handleCommentChange}
                      />
                    </Form.Item>
                    <div className="post-actions">
                      <div className="post-tools">
                        <Button icon={<PictureOutlined />}>图片</Button>
                        <Button icon={<VideoCameraOutlined />}>视频</Button>
                        <Button icon={<SmileOutlined />}>表情</Button>
                      </div>
                      <Button 
                        type="primary" 
                        onClick={handleCommentSubmit} 
                        disabled={!commentValue.trim()}
                      >
                        发布
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                <Divider />

                {/* 社区内容标签页 */}
                <Tabs defaultActiveKey="1" className="community-tabs">
                  <TabPane tab="最新动态" key="1">
                    <motion.div 
                      className="posts-list"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {communityPosts.map(post => (
                        <motion.div
                          key={post.id}
                          variants={itemVariants}
                        >
                          <Card 
                            className="post-card"
                            hoverable
                          >
                            <div className="post-header">
                              <Avatar src={post.avatar} /> 
                              <div className="post-info">
                                <div className="post-author">{post.author}</div>
                                <div className="post-time">{post.time}</div>
                              </div>
                            </div>
                            <Title level={4} className="post-title">{post.title}</Title>
                            <Paragraph className="post-content">{post.content}</Paragraph>
                            
                            {post.images && post.images.length > 0 && (
                              <div className="post-images">
                                <Row gutter={[8, 8]}>
                                  {post.images.map((image, index) => (
                                    <Col key={index} span={post.images.length === 1 ? 24 : 8}>
                                      <motion.div 
                                        className="post-image" 
                                        style={{ 
                                          backgroundImage: `url(${image})`,
                                          paddingBottom: post.images.length === 1 ? '50%' : '100%'
                                        }}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.2 }}
                                      />
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            )}
                            
                            <div className="post-tags">
                              {post.tags.map((tag, index) => (
                                <Tag key={index}>{tag}</Tag>
                              ))}
                            </div>
                            
                            <div className="post-actions-bar">
                              <Button 
                                icon={<LikeOutlined />} 
                                className="action-btn"
                              >
                                赞 ({post.likes})
                              </Button>
                              <Button 
                                icon={<MessageOutlined />} 
                                className="action-btn"
                              >
                                评论 ({post.comments})
                              </Button>
                              <Button 
                                icon={<ShareAltOutlined />} 
                                className="action-btn"
                              >
                                分享 ({post.shares})
                              </Button>
                            </div>

                            <Divider />

                            {/* 评论区 */}
                            <div className="comments-section">
                              <Comment
                                author="文化爱好者"
                                avatar={<Avatar src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=40&q=80" />}
                                content={
                                  <p>我也去看了，真的很震撼！特别是结合了AR技术的灯组，非常有创意。</p>
                                }
                                datetime="1小时前"
                              />
                              <div className="comment-input">
                                <Form.Item>
                                  <TextArea rows={2} placeholder="写下你的评论..." />
                                </Form.Item>
                                <Button type="primary" size="small">评论</Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabPane>
                  <TabPane tab="热门讨论" key="2">
                    <p>暂无内容</p>
                  </TabPane>
                  <TabPane tab="我的关注" key="3">
                    <p>暂无内容</p>
                  </TabPane>
                </Tabs>
              </Col>
              
              <Col xs={24} md={8}>
                {/* 热门圈子 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card 
                    title={<span><FireOutlined style={{ color: '#ff4d4f' }} /> 热门圈子</span>}
                    className="sidebar-card"
                  >
                    <List
                      dataSource={groups}
                      renderItem={group => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar src={group.avatar} size={40} />}
                            title={<a href="#!">{group.name}</a>}
                            description={
                              <>
                                <TeamOutlined /> {group.members} 成员
                                <Paragraph ellipsis={{ rows: 2 }} className="group-desc">
                                  {group.description}
                                </Paragraph>
                              </>
                            }
                          />
                          <Button size="small">加入</Button>
                        </List.Item>
                      )}
                    />
                    <div className="more-link">
                      <a href="#!">查看更多圈子 &gt;</a>
                    </div>
                  </Card>
                </motion.div>
                
                {/* 热门活动 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card 
                    title={<span><TrophyOutlined style={{ color: '#faad14' }} /> 文化活动</span>}
                    className="sidebar-card"
                  >
                    <List
                      dataSource={events}
                      renderItem={event => (
                        <List.Item>
                          <Card
                            hoverable
                            cover={<img alt={event.title} src={event.cover} />}
                            className="event-card"
                          >
                            <Meta
                              title={event.title}
                              description={
                                <>
                                  <p>{event.date}</p>
                                  <p>{event.location}</p>
                                  <p><TeamOutlined /> {event.participants}人参与</p>
                                </>
                              }
                            />
                            <Button type="primary" block className="event-btn">
                              报名参加
                            </Button>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab={<span><CommentOutlined /> 实时聊天</span>} key="2">
            <Row>
              <Col xs={24}>
                <ChatSystem />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Community; 