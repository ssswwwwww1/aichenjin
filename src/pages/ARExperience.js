import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Card, Tabs, Button, List, Tag, Modal, message, notification } from 'antd';
import { motion } from 'framer-motion';
import { 
  CompassOutlined, 
  EnvironmentOutlined, 
  InfoCircleOutlined,
  MobileOutlined,
  ScanOutlined,
  QrcodeOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  HeartOutlined,
  HistoryOutlined,
  ShareAltOutlined,
  StarOutlined,
  ArrowRightOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import './ARExperience.css';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Meta } = Card;

// 简化动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Create motion components
const MotionCard = motion(Card);
const MotionRow = motion(Row);

const ARExperience = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [visibleSections, setVisibleSections] = useState({});
  const [likedItems, setLikedItems] = useState({});
  
  // 优化懒加载实现
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 监视懒加载元素
    const lazyElements = document.querySelectorAll('.lazy-load');
    lazyElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      lazyElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  // 场景列表数据
  const scenarioList = [
    {
      id: 1,
      title: '长城·万里长城',
      cover: '/images/IMG_20250710_100603.png',
      description: '通过AR技术探索长城的建筑特色和历史故事',
      location: '北京市延庆区八达岭',
      tags: ['文化遗产', '古建筑', '历史'],
      qrcode: 'https://via.placeholder.com/200x200?text=长城AR体验',
      features: ['3D建筑复原', '历史人物互动', '语音导览', '文物知识库']
    },
    {
      id: 2,
      title: '圆明园·皇家园林',
      cover: '/images/IMG_20250710_100540.png',
      description: '漫步圆明园，AR叠加展示皇家园林的恢弘与秀美',
      location: '北京市海淀区清华西路28号',
      tags: ['园林艺术', '历史', '皇家'],
      qrcode: 'https://via.placeholder.com/200x200?text=圆明园AR体验',
      features: ['园林故事讲解', '四季景观变换', '互动拍照']
    },
    {
      id: 3,
      title: '天坛·祈年殿',
      cover: '/images/IMG_20250710_100616.png',
      description: '了解天坛的建筑奥秘与祭天文化，感受古代祭祀的庄严氛围',
      location: '北京市东城区天坛路',
      tags: ['祭祀文化', '古建筑', '历史'],
      qrcode: 'https://via.placeholder.com/200x200?text=天坛AR体验',
      features: ['建筑3D还原', '祭祀仪式演示', '互动体验']
    },
    {
      id: 4,
      title: '颐和园·湖光山色',
      cover: '/images/IMG_20250710_101048.png',
      description: '颐和园，皇家园林的典范，湖光山色尽收眼底',
      location: '北京市海淀区新建宫门路19号',
      tags: ['园林', '皇家', '自然风光'],
      qrcode: 'https://via.placeholder.com/200x200?text=颐和园AR体验',
      features: ['湖景互动', '历史讲解', '虚拟导览']
    },
    {
      id: 5,
      title: '国家博物馆·文明瑰宝',
      cover: '/images/IMG_20250710_100551.png',
      description: '中国国家博物馆，见证中华文明的辉煌与传承',
      location: '北京市东城区东长安街16号',
      tags: ['博物馆', '文物', '历史'],
      qrcode: 'https://via.placeholder.com/200x200?text=国博AR体验',
      features: ['文物3D旋转', '出土过程演示', '专家讲解']
    },
    {
      id: 6,
      title: '国子监·文化街',
      cover: '/images/IMG_20250710_101058.png',
      description: '国子监，古代最高学府，感受浓厚的文化氛围',
      location: '北京市东城区国子监街',
      tags: ['学府', '文化', '历史'],
      qrcode: 'https://via.placeholder.com/200x200?text=国子监AR体验',
      features: ['街区漫游', '文化讲解', '互动体验']
    }
  ];

  const guideSteps = [
    {
      icon: <MobileOutlined />,
      title: '下载APP',
      content: '在应用商店搜索"首都文旅"，下载并安装我们的应用'
    },
    {
      icon: <ScanOutlined />,
      title: '扫描景点二维码',
      content: '在景点入口或导览图旁找到AR体验二维码，使用APP扫描进入相应体验'
    },
    {
      icon: <EnvironmentOutlined />,
      title: '定位景点',
      content: '根据APP指引，将手机摄像头对准特定景点或文物'
    },
    {
      icon: <CompassOutlined />,
      title: '开始探索',
      content: '跟随屏幕上的AR内容，探索历史文化知识，与虚拟内容互动'
    }
  ];
  
  const routeTemplates = [
    {
      id: 'family',
      name: '亲子家庭路线',
      description: '适合带孩子的家庭，包含互动性强、知识丰富的景点',
      icon: <TeamOutlined style={{ color: '#ff7875' }} />
    },
    {
      id: 'cultural',
      name: '文化深度路线',
      description: '适合文化爱好者，深入了解历史文化底蕴',
      icon: <HistoryOutlined style={{ color: '#52c41a' }} />
    },
    {
      id: 'photography',
      name: '摄影打卡路线',
      description: '适合摄影爱好者，包含最佳拍照点和美景推荐',
      icon: <HeartOutlined style={{ color: '#faad14' }} />
    },
    {
      id: 'time_saving',
      name: '时间紧凑路线',
      description: '适合时间有限的游客，合理安排高效游览路线',
      icon: <ClockCircleOutlined style={{ color: '#1890ff' }} />
    }
  ];

  const popularRoutes = [
    {
      id: 1,
      title: '故宫-天安门-景山公园',
      cover: '/images/retouch_2025071012240330.jpg',
      duration: '约4小时',
      distance: '3.5公里',
      description: '体验皇家建筑群和中轴线景观',
      tags: ['经典路线', '历史文化', '摄影打卡'],
      rating: 4.9,
      reviewCount: 1253
    },
    {
      id: 2,
      title: '颐和园-圆明园-清华园',
      cover: '/images/retouch_2025071012240355.jpg',
      duration: '约6小时',
      distance: '5公里',
      description: '探索皇家园林和学府文化',
      tags: ['园林景观', '自然风光', '历史文化'],
      rating: 4.8,
      reviewCount: 863
    },
    {
      id: 3,
      title: '国家博物馆-天坛-前门大街',
      cover: '/images/retouch_2025071012240377.jpg',
      duration: '约5小时',
      distance: '4公里',
      description: '中华文明历史与传统文化体验',
      tags: ['博物馆', '古建筑', '美食'],
      rating: 4.7,
      reviewCount: 756
    },
    {
      id: 4,
      title: '长城-十三陵-鸟巢',
      cover: '/images/retouch_2025071012240391.jpg',
      duration: '约7小时',
      distance: '45公里',
      description: '古迹与现代建筑结合的特色路线',
      tags: ['世界遗产', '自然风光', '现代建筑'],
      rating: 4.9,
      reviewCount: 1056
    }
  ];

  const interestOptions = [
    { label: '历史文化', value: 'history' },
    { label: '艺术建筑', value: 'architecture' },
    { label: '自然风光', value: 'nature' },
    { label: '美食体验', value: 'food' },
    { label: '购物休闲', value: 'shopping' },
    { label: '亲子活动', value: 'family' },
    { label: '摄影打卡', value: 'photography' },
    { label: '文化体验', value: 'cultural' }
  ];

  const handleLike = (itemId) => {
    setLikedItems(prev => {
      const newState = { ...prev };
      newState[itemId] = !newState[itemId];
      
      if (newState[itemId]) {
        notification.success({
          message: '收藏成功',
          description: '已加入您的收藏列表',
          placement: 'bottomRight',
          duration: 2
        });
      } else {
        notification.info({
          message: '已取消收藏',
          description: '已从您的收藏列表中移除',
          placement: 'bottomRight',
          duration: 2
        });
      }
      
      return newState;
    });
  };

  const handleShare = (item) => {
    notification.success({
      message: '分享成功',
      description: `已复制"${item.title}"的分享链接到剪贴板`,
      placement: 'bottomRight',
      duration: 2
    });
  };

  const showModal = (scenario) => {
    setCurrentScenario(scenario);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handlePreviewRoute = (route) => {
    console.log('预览路线:', route);
    message.success({
      content: '路线已加载到AR地图中，请打开APP查看',
      style: {
        marginTop: '20vh',
      },
    });
  };

  return (
    <motion.div 
      className="ar-experience-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="ar-hero">
        <div className="container">
          <Title level={1} className="ar-hero-title">AR文化体验</Title>
          <Paragraph className="ar-hero-desc">
            运用增强现实技术，为您提供沉浸式的传统文化体验，
            让历史文化场景在您的眼前栩栩如生地展现。
          </Paragraph>
        </div>
      </div>

      <div className="container">
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
          <TabPane tab="体验景点" key="1">
            <div id="scenarioSection">
            <Row gutter={[24, 24]}>
              {scenarioList.map((scenario, index) => (
                <Col xs={24} sm={12} md={6} key={scenario.id}>
                  <Card
                    hoverable
                    className={`scenario-card lazy-load`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    cover={<img alt={scenario.title} src={scenario.cover} />}
                  >
                    <Meta 
                      title={scenario.title} 
                      description={
                        <>
                          <div className="scenario-location">
                            <EnvironmentOutlined /> {scenario.location}
                          </div>
                          <Paragraph ellipsis={{ rows: 2 }} className="scenario-desc">
                            {scenario.description}
                          </Paragraph>
                          <div className="scenario-tags">
                            {scenario.tags.map((tag, index) => (
                              <Tag key={index}>{tag}</Tag>
                            ))}
                          </div>
                        </>
                      } 
                    />
                    <div className="scenario-button">
                      <Button 
                        type="primary" 
                        icon={<InfoCircleOutlined />}
                        onClick={() => showModal(scenario)}
                      >
                        了解详情
                      </Button>
                    </div>
                    <div className="scenario-actions">
                      <Button 
                        type="text" 
                        icon={likedItems[scenario.id] ? 
                          <HeartOutlined style={{ color: '#ff4d4f' }} /> : 
                          <HeartOutlined />
                        }
                        onClick={() => handleLike(scenario.id)}
                      >
                        收藏
                      </Button>
                      <Button 
                        type="text" 
                        icon={<ShareAltOutlined />}
                        onClick={() => handleShare(scenario)}
                      >
                        分享
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            </div>
          </TabPane>
          
          <TabPane tab="AR路线预览" key="2">
            <div id="routesSection" className="routes-section">
              <div className="routes-header">
                <Title level={2} className="section-title">热门研学路线</Title>
              </div>
              
              <Row gutter={[24, 24]}>
                {popularRoutes.map((route, index) => (
                  <Col xs={24} sm={12} key={route.id}>
                    <Card hoverable className={`route-card lazy-load`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="route-card-content">
                        <div className="route-image">
                          <img src={route.cover} alt={route.title} />
                        </div>
                        <div className="route-info">
                          <Title level={4}>{route.title}</Title>
                          <div className="route-meta">
                            <span><ClockCircleOutlined /> {route.duration}</span>
                            <span><EnvironmentOutlined /> {route.distance}</span>
                          </div>
                          <div className="route-rating">
                            <span className="rating-score"><StarOutlined /> {route.rating}</span>
                            <span className="rating-count">({route.reviewCount}条点评)</span>
                          </div>
                          <Paragraph ellipsis={{ rows: 2 }} className="route-description">
                            {route.description}
                          </Paragraph>
                          <div className="route-tags">
                            {route.tags.map((tag, index) => (
                              <Tag key={index}>{tag}</Tag>
                            ))}
                          </div>
                          <div className="route-actions">
                            <Button 
                              type="primary" 
                              onClick={() => handlePreviewRoute(route)}
                              className="preview-button"
                            >
                              AR路线预览
                            </Button>
                            <Button 
                              type="text" 
                              icon={likedItems[`route-${route.id}`] ? 
                                <HeartOutlined style={{ color: '#ff4d4f' }} /> : 
                                <HeartOutlined />
                              }
                              onClick={() => handleLike(`route-${route.id}`)}
                            >
                              收藏
                            </Button>
                            <Button 
                              type="text" 
                              icon={<ShareAltOutlined />}
                              onClick={() => handleShare(route)}
                            >
                              分享
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              
              <div id="templatesSection" className="route-templates">
                <Title level={3}>路线模板</Title>
                <Row gutter={[16, 16]}>
                  {routeTemplates.map((template, index) => (
                    <Col xs={24} sm={12} md={6} key={template.id}>
                      <Card 
                        hoverable 
                        className={`template-card lazy-load`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => {
                          window.location.href = '/route-planning';
                        }}
                      >
                        <div className="template-icon">{template.icon}</div>
                        <Title level={4}>{template.name}</Title>
                        <Paragraph>{template.description}</Paragraph>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </TabPane>
          
          <TabPane tab="使用指南" key="3">
            <div id="guideSection" className="guide-section">
              <Title level={2} className="section-title">如何使用AR功能</Title>
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
                dataSource={guideSteps}
                renderItem={(item, index) => (
                  <List.Item>
                    <Card className={`guide-card lazy-load`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="guide-icon">{item.icon}</div>
                      <div className="guide-step">步骤 {index + 1}</div>
                      <Title level={4} className="guide-title">{item.title}</Title>
                      <Paragraph className="guide-content">{item.content}</Paragraph>
                    </Card>
                  </List.Item>
                )}
              />
              <div className="guide-download lazy-load">
                <Title level={3}>立即下载体验</Title>
                <div className="qr-codes">
                  <div className="qr-item">
                    <img 
                      src="https://via.placeholder.com/150x150?text=App+Store" 
                      alt="App Store" 
                      className="qr-image"
                    />
                    <div className="qr-title">App Store</div>
                  </div>
                  <div className="qr-item">
                    <img 
                      src="https://via.placeholder.com/150x150?text=Google+Play" 
                      alt="Google Play" 
                      className="qr-image"
                    />
                    <div className="qr-title">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          
          <TabPane tab="技术介绍" key="4">
            <div id="techSection" className="tech-section lazy-load">
              <Title level={2} className="section-title">AR技术说明</Title>
              <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                  <Paragraph>
                    我们的AR体验基于Google ARCore和Apple ARKit技术开发，
                    结合计算机视觉、机器学习和传感器融合等先进技术，
                    为用户提供精准的空间定位和虚拟内容叠加功能。
                  </Paragraph>
                  <Paragraph>
                    系统通过SLAM（同步定位与地图构建）技术，
                    可以实时分析周围环境，将虚拟的历史场景、
                    文物信息准确叠加到实际景点中。
                  </Paragraph>
                  <Paragraph>
                    同时，我们利用TensorFlow进行目标检测和图像识别，
                    使系统能够自动识别文物和建筑特征，提供相应的文化信息。
                  </Paragraph>
                </Col>
                <Col xs={24} md={12}>
                  <Card className="tech-feature-card">
                    <Title level={3}>核心功能</Title>
                    <ul className="tech-feature-list">
                      <li>实时环境识别与跟踪</li>
                      <li>高精度3D模型重建</li>
                      <li>文物智能识别</li>
                      <li>历史场景实时渲染</li>
                      <li>多语言语音导览</li>
                      <li>AR互动拍照与分享</li>
                      <li>离线缓存内容</li>
                    </ul>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </div>

      {/* AR场景详情模态框 */}
      <Modal
        title={currentScenario ? currentScenario.title : ''}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            关闭
          </Button>,
          <Button key="experience" type="primary">
            开始体验
          </Button>
        ]}
        width={700}
      >
        {currentScenario && (
          <div className="scenario-detail">
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <img src={currentScenario.cover} alt={currentScenario.title} className="detail-image" />
                <div className="detail-qrcode">
                  <QrcodeOutlined /> 扫码体验
                  <img src={currentScenario.qrcode} alt="AR体验二维码" />
                </div>
              </Col>
              <Col xs={24} md={12}>
                <Paragraph>{currentScenario.description}</Paragraph>
                <div className="detail-location">
                  <EnvironmentOutlined /> <strong>地点：</strong>{currentScenario.location}
                </div>
                <div className="detail-features">
                  <Title level={4}>AR体验特色</Title>
                  <ul>
                    {currentScenario.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default ARExperience; 