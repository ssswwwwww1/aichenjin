import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Card, Button, Carousel, Divider, Modal, Form, Input, DatePicker, Radio, message, Tag, notification, Upload, Progress, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExperimentOutlined,
  ReadOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  LikeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ShareAltOutlined,
  StarOutlined,
  HeartOutlined,
  HeartFilled,
  LeftOutlined,
  RightOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  DownloadOutlined,
  CheckCircleTwoTone
} from '@ant-design/icons';
import './Home.css';

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { TextArea } = Input;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }
  },
  hover: { 
    y: -10,
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(63, 81, 181, 0.2)",
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

// Card hover animation
const MotionCard = motion(Card);

const Home = () => {
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [bookingForm] = Form.useForm();
  const [bookedProducts, setBookedProducts] = useState([]);
  const [visibleSections, setVisibleSections] = useState({});
  const [likedItems, setLikedItems] = useState({});
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const carouselRef = useRef();

  // AI剪辑相关状态
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [aiUploading, setAiUploading] = useState(false);
  const [aiUploadProgress, setAiUploadProgress] = useState(0);
  const [aiVideoFile, setAiVideoFile] = useState(null);
  const [aiResultReady, setAiResultReady] = useState(false);

  // 用于记录元素是否可见的观察器
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 监视各个部分
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // 模拟AI分析进度
  useEffect(() => {
    let timer;
    if (aiUploading && aiUploadProgress < 100) {
      timer = setInterval(() => {
        setAiUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setAiUploading(false);
            setTimeout(() => setAiResultReady(true), 800);
            return 100;
          }
          return prev + Math.floor(Math.random() * 10 + 5);
        });
      }, 400);
    }
    return () => clearInterval(timer);
  }, [aiUploading, aiUploadProgress]);

  // 上传前处理
  const beforeUpload = (file) => {
    setAiVideoFile(file);
    setAiUploadProgress(0);
    setAiResultReady(false);
    setAiUploading(true);
    return false; // 阻止自动上传
  };

  // 关闭Modal时重置
  const handleAiModalClose = () => {
    setAiModalVisible(false);
    setAiVideoFile(null);
    setAiUploadProgress(0);
    setAiResultReady(false);
    setAiUploading(false);
  };

  const carouselItems = [
    {
      title: '圆明园春色',
      description: '感受皇家园林的恢弘与秀美，领略圆明园的历史与自然风光。',
      image: '/images/IMG_20250710_100540.png',
      link: '/route-planning'
    },
    {
      title: '国家博物馆',
      description: '中国国家博物馆，见证中华文明的辉煌与传承。',
      image: '/images/IMG_20250710_100551.png',
      link: '/route-planning'
    },
    {
      title: '长城壮丽风光',
      description: '登临长城，感受中华民族的坚韧与辉煌。',
      image: '/images/IMG_20250710_100603.png',
      link: '/route-planning'
    },
    {
      title: '天坛祈年殿',
      description: '了解天坛的建筑奥秘与祭天文化，感受古代祭祀的庄严氛围。',
      image: '/images/IMG_20250710_100616.png',
      link: '/route-planning'
    },
    {
      title: '颐和园美景',
      description: '颐和园，皇家园林的典范，湖光山色尽收眼底。',
      image: '/images/IMG_20250710_101048.png',
      link: '/route-planning'
    },
    {
      title: '国子监文化街',
      description: '国子监，古代最高学府，感受浓厚的文化氛围。',
      image: '/images/IMG_20250710_101058.png',
      link: '/route-planning'
    }
  ];

  const featureItems = [
    {
      icon: <ExperimentOutlined style={{color:'#3F51B5'}} />, // 主色调
      title: 'AR长城探秘',
      description: '通过AR技术，身临其境体验长城历史与风光。'
    },
    {
      icon: <ReadOutlined style={{color:'#00BCD4'}} />, // 辅助色
      title: '故宫文化讲堂',
      description: '深入了解故宫建筑、文物与皇家礼仪。'
    },
    {
      icon: <TeamOutlined style={{color:'#4CAF50'}} />, // 绿色
      title: '胡同文化互动',
      description: '参与胡同文化活动，体验地道北京生活。'
    },
    {
      icon: <ExperimentOutlined style={{color:'#FFC107'}} />, // 黄色
      title: '天坛祭祀体验',
      description: '数字化还原天坛祭祀盛典，感受古代文化仪式。'
    },
    {
      icon: <ReadOutlined style={{color:'#5C6BC0'}} />, // 浅蓝紫色
      title: '京剧国粹赏析',
      description: '学习京剧知识，欣赏经典剧目与脸谱艺术。'
    }
  ];

  const cultureItems = [
    {
      id: 'culture1',
      title: '圆明园春色',
      cover: '/images/IMG_20250710_100540.png',
      description: '皇家园林的恢弘与秀美，历史与自然的完美融合。'
    },
    {
      id: 'culture2',
      title: '国家博物馆',
      cover: '/images/IMG_20250710_100551.png',
      description: '中国国家博物馆，见证中华文明的辉煌与传承。'
    },
    {
      id: 'culture3',
      title: '长城壮丽风光',
      cover: '/images/IMG_20250710_100603.png',
      description: '万里长城，中华民族的象征，见证历史沧桑。'
    },
    {
      id: 'culture4',
      title: '天坛祈年殿',
      cover: '/images/IMG_20250710_100616.png',
      description: '天坛建筑精美，祭祀文化源远流长。'
    },
    {
      id: 'culture5',
      title: '颐和园美景',
      cover: '/images/IMG_20250710_101048.png',
      description: '颐和园，皇家园林的典范，湖光山色尽收眼底。'
    },
    {
      id: 'culture6',
      title: '国子监文化街',
      cover: '/images/IMG_20250710_101058.png',
      description: '国子监，古代最高学府，感受浓厚的文化氛围。'
    }
  ];

  const productItems = [
    {
      id: 1,
      title: '古城文化一日游',
      cover: '/images/retouch_2025071012240330.jpg',
      price: 299,
      description: '探访北京胡同文化，感受老北京的风土人情',
      tags: ['含午餐', '专业讲解', '交通接送'],
      rating: 4.7,
      reviews: 128
    },
    {
      id: 2,
      title: '故宫深度体验',
      cover: '/images/retouch_2025071012240355.jpg',
      price: 399,
      description: '深入了解故宫建筑与文化，体验皇家礼仪',
      tags: ['专业讲解', '含门票', 'VR体验'],
      rating: 4.9,
      reviews: 256
    },
    {
      id: 3,
      title: '长城研学活动',
      cover: '/images/retouch_2025071012240377.jpg',
      price: 349,
      description: '登临长城，体验历史，感受中华文明的伟大',
      tags: ['亲子活动', '含午餐', '研学证书'],
      rating: 4.8,
      reviews: 186
    },
    {
      id: 4,
      title: '非遗文化体验',
      cover: '/images/retouch_2025071012240391.jpg',
      price: 199,
      description: '亲身体验非物质文化遗产，感受传统技艺魅力',
      tags: ['手工制作', '文化讲解', '成果带回'],
      rating: 4.6,
      reviews: 98
    }
  ];

  // 处理点赞功能
  const handleLike = (itemId) => {
    setLikedItems(prevLiked => {
      const isLiked = !prevLiked[itemId];
      
      // 显示点赞通知
      if (isLiked) {
        notification.success({
          message: '收藏成功',
          description: '已添加到您的收藏列表',
          placement: 'bottomRight',
          duration: 3,
        });
      } else {
        notification.info({
          message: '取消收藏',
          description: '已从您的收藏列表中移除',
          placement: 'bottomRight',
          duration: 3,
        });
      }
      
      return {
        ...prevLiked,
        [itemId]: isLiked
      };
    });
  };

  // 处理分享功能
  const handleShare = (item) => {
    message.success(`分享"${item.title}"成功`);
    
    notification.info({
      message: '分享成功',
      description: `您已成功分享"${item.title}"到社交媒体`,
      placement: 'bottomRight',
      duration: 3,
    });
  };

  // 轮播图控制
  const carouselNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  
  const carouselPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  // 轮播图切换时更新索引
  const handleCarouselChange = (current) => {
    setCurrentCarouselIndex(current);
  };

  // 预订模态框
  const showBookingModal = (product) => {
    setCurrentProduct(product);
    setBookingModalVisible(true);
  };

  const handleBookingCancel = () => {
    setBookingModalVisible(false);
  };

  const handleBookingSubmit = () => {
    bookingForm.validateFields()
      .then(values => {
        console.log('预订信息:', values);
        
        // 模拟预订成功
        setBookedProducts([...bookedProducts, currentProduct.id]);
        setBookingModalVisible(false);
        bookingForm.resetFields();
        
        // 显示成功通知
        notification.success({
          message: '预订成功',
          description: `您已成功预订"${currentProduct.title}"`,
          placement: 'bottomRight',
          duration: 4,
        });
      })
      .catch(info => {
        console.log('验证失败:', info);
      });
  };

  const isProductBooked = (productId) => {
    return bookedProducts.includes(productId);
  };

  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        {/* 轮播图区域 */}
        <div className="carousel-container">
          <Carousel 
            autoplay 
            effect="fade" 
            ref={carouselRef}
            beforeChange={handleCarouselChange}
            afterChange={setCurrentCarouselIndex}
          >
            {carouselItems.map((item, index) => (
              <div key={index}>
                <Link to={item.link} className="carousel-link">
                  <div 
                    className="carousel-item" 
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="carousel-content">
                      <motion.h1 
                        className="carousel-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {item.title}
                      </motion.h1>
                      <motion.p 
                        className="carousel-description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {item.description}
                      </motion.p>
                      <motion.button
                        className="explore-button"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          boxShadow: "0 8px 25px rgba(63, 81, 181, 0.5)" 
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        了解更多 <ArrowRightOutlined />
                      </motion.button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
          <div className="carousel-buttons">
            <button 
              className="carousel-button prev" 
              onClick={carouselPrev}
              aria-label="上一张"
            >
              <LeftOutlined />
            </button>
            <button 
              className="carousel-button next" 
              onClick={carouselNext}
              aria-label="下一张"
            >
              <RightOutlined />
            </button>
          </div>
        </div>
        
        {/* 特色服务区域 */}
        <div className="section-wrapper feature-wrapper">
          <Title level={2} className="section-title">特色服务</Title>
          <motion.div 
            id="featureSection" 
            className="feature-section animate-section"
            variants={fadeInUp}
            initial="hidden"
            animate={visibleSections.featureSection ? "visible" : "hidden"}
          >
            {/* 移除featureItems.map渲染的所有卡片，只保留feature-highlight部分 */}
            <div className="feature-highlight">
              <Row gutter={[32, 32]} align="middle">
                <Col xs={24} md={12} lg={14}>
                  <motion.div 
                    className="highlight-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={visibleSections.featureSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Title level={3} className="highlight-title">沉浸式文化体验</Title>
                    <div className="highlight-features">
                      <div className="highlight-feature-item">
                        <div className="highlight-feature-icon">
                          <ExperimentOutlined style={{color:'#3F51B5'}} />
                        </div>
                        <div className="highlight-feature-text">
                          <strong>AR技术增强</strong>
                          <p>通过AR技术，让文化遗产活起来</p>
                        </div>
                      </div>
                      <div className="highlight-feature-item">
                        <div className="highlight-feature-icon">
                          <TeamOutlined style={{color:'#4CAF50'}} />
                        </div>
                        <div className="highlight-feature-text">
                          <strong>互动体验</strong>
                          <p>参与互动活动，深入了解传统文化</p>
                        </div>
                      </div>
                      <div className="highlight-feature-item">
                        <div className="highlight-feature-icon">
                          <ReadOutlined style={{color:'#00BCD4'}} />
                        </div>
                        <div className="highlight-feature-text">
                          <strong>专业讲解</strong>
                          <p>专业讲解员带您领略文化魅力</p>
                        </div>
                      </div>
                    </div>
                    <div className="highlight-tags">
                      <Tag color="blue">AR体验</Tag>
                      <Tag color="cyan">数字展示</Tag>
                      <Tag color="geekblue">文化传承</Tag>
                      <Tag color="purple">互动体验</Tag>
                    </div>
                    <Button type="primary" size="large" className="highlight-button" onClick={() => window.location.href = '/ar-experience'}>
                      探索全部服务 <ArrowRightOutlined />
                    </Button>
                  </motion.div>
                </Col>
                <Col xs={24} md={12} lg={10}>
                  <motion.div 
                    className="highlight-image-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={visibleSections.featureSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <img 
                      src="/images/retouch_2025071012240413.jpg" 
                      alt="文化体验" 
                      className="highlight-image" 
                    />
                    <div className="highlight-image-text">传统与现代的完美结合</div>
                  </motion.div>
                </Col>
              </Row>
            </div>
          </motion.div>
        </div>
        {/* 新增AI剪辑视频功能板块 */}
        <div className="section-wrapper ai-video-section">
          <Title level={2} className="section-title">AI剪辑视频</Title>
          <motion.div 
            className="ai-video-feature animate-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} md={14}>
                <div className="ai-video-content">
                  <Title level={3} className="ai-video-title">智能AI视频剪辑</Title>
                  <Paragraph className="ai-video-desc">
                    利用AI技术，自动识别精彩片段、智能配乐、字幕生成、风格滤镜等，轻松生成高质量短视频，助力文化传播与个人创作。
                  </Paragraph>
                  <ul className="ai-video-features-list">
                    <li>自动精彩片段提取</li>
                    <li>智能配乐与音效</li>
                    <li>一键添加字幕</li>
                    <li>多种风格滤镜</li>
                    <li>支持多格式导出与分享</li>
                  </ul>
                  <Button type="primary" size="large" className="ai-video-upload-btn" icon={<UploadOutlined />} onClick={() => setAiModalVisible(true)}>
                    上传视频体验AI剪辑
                  </Button>
                </div>
              </Col>
              <Col xs={24} md={10}>
                <div className="ai-video-image-container">
                  <img src="/images/retouch_2025070917094884.png" alt="AI剪辑视频" className="ai-video-image" />
                  <div className="ai-video-image-text">AI让视频创作更简单</div>
                </div>
              </Col>
            </Row>
          </motion.div>
          {/* AI剪辑视频Modal */}
          <Modal
            title="AI智能视频剪辑"
            open={aiModalVisible}
            onCancel={handleAiModalClose}
            footer={null}
            width={aiResultReady ? 700 : 480}
          >
            {!aiResultReady && (
              <div style={{ textAlign: 'center', padding: 24 }}>
                <Upload.Dragger
                  name="video"
                  accept="video/*"
                  beforeUpload={beforeUpload}
                  showUploadList={aiVideoFile ? [{ name: aiVideoFile.name }] : false}
                  disabled={aiUploading || aiResultReady}
                  style={{ marginBottom: 24 }}
                >
                  <p className="ant-upload-drag-icon">
                    <VideoCameraOutlined style={{ fontSize: 40, color: '#3F51B5' }} />
                  </p>
                  <p className="ant-upload-text">点击或拖拽上传视频文件</p>
                  <p className="ant-upload-hint">支持mp4、mov等主流格式，单文件不超过200MB</p>
                </Upload.Dragger>
                {aiUploading && (
                  <div style={{ marginTop: 24 }}>
                    <Spin spinning={aiUploading} tip="AI智能分析中...">
                      <Progress percent={aiUploadProgress} status={aiUploadProgress < 100 ? 'active' : 'success'} />
                    </Spin>
                  </div>
                )}
              </div>
            )}
            {aiResultReady && (
              <div style={{ textAlign: 'center', padding: 24 }}>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 48 }} />
                <div style={{ margin: '16px 0 8px', fontSize: 18, fontWeight: 500 }}>AI剪辑完成！</div>
                <div style={{ marginBottom: 16, color: '#888' }}>以下为智能剪辑片段预览：</div>
                <Row gutter={[16, 16]} justify="center">
                  <Col span={8}>
                    <div className="ai-clip-thumb">
                      <img src="/images/retouch_2025071012240330.jpg" alt="片段1" style={{ width: '100%', borderRadius: 8 }} />
                      <div>片段1：开场精彩</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="ai-clip-thumb">
                      <img src="/images/retouch_2025071012240355.jpg" alt="片段2" style={{ width: '100%', borderRadius: 8 }} />
                      <div>片段2：高光时刻</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="ai-clip-thumb">
                      <img src="/images/retouch_2025071012240377.jpg" alt="片段3" style={{ width: '100%', borderRadius: 8 }} />
                      <div>片段3：结尾总结</div>
                    </div>
                  </Col>
                </Row>
                <div style={{ margin: '24px 0 8px' }}>
                  <Button type="primary" icon={<DownloadOutlined />} style={{ marginRight: 16 }}>
                    下载剪辑视频
                  </Button>
                  <Button icon={<ShareAltOutlined />}>
                    分享到社交平台
                  </Button>
                </div>
                <div style={{ marginTop: 16 }}>
                  <Button type="link" onClick={handleAiModalClose}>返回继续剪辑</Button>
                </div>
              </div>
            )}
          </Modal>
        </div>

        {/* 文化场景区域 */}
        <div className="section-wrapper">
          <Title level={2} className="section-title">文化场景</Title>
          <motion.div 
            id="cultureSection" 
            className="culture-section animate-section"
            variants={staggerChildren}
            initial="hidden"
            animate={visibleSections.cultureSection ? "visible" : "hidden"}
          >
            <Row gutter={[16, 24]}>
              {cultureItems.slice(0, 6).map((item, index) => (
                <Col xs={24} sm={12} md={8} key={item.id}>
                  <MotionCard
                  className="culture-card card-hover"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  cover={<img alt={item.title} src={item.cover} />}
                    actions={[
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(item.id)}
                      >
                        {likedItems[item.id] ? 
                          <HeartFilled style={{ color: '#ff4d4f' }} /> : 
                          <HeartOutlined />
                        }
                      </motion.div>,
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(item)}
                      >
                        <ShareAltOutlined />
                      </motion.div>
                    ]}
                >
                  <Meta 
                    title={item.title} 
                    description={item.description} 
                  />
                  </MotionCard>
              </Col>
            ))}
          </Row>
            <motion.div 
              className="more-button"
              variants={fadeInUp}
            >
            <Link to="/cultural-learning">
                <Button type="primary">查看更多文化场景 <ArrowRightOutlined /></Button>
            </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* 预订模态框 */}
        {currentProduct && (
          <Modal
            title={`预订 ${currentProduct.title}`}
            open={bookingModalVisible}
            onCancel={handleBookingCancel}
            onOk={handleBookingSubmit}
            okText="确认预订"
            cancelText="取消"
          >
            <Form
              form={bookingForm}
              layout="vertical"
              initialValues={{ participants: 1, payment: 'online' }}
            >
              <Form.Item
                name="name"
                label="预订人姓名"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入预订人姓名" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="联系电话"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
              <Form.Item
                name="date"
                label="预订日期"
                rules={[{ required: true, message: '请选择日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="participants"
                label="参与人数"
                rules={[{ required: true, message: '请选择参与人数' }]}
              >
                <Radio.Group>
                  <Radio value={1}>1人</Radio>
                  <Radio value={2}>2人</Radio>
                  <Radio value={3}>3人</Radio>
                  <Radio value={4}>4人及以上</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="payment"
                label="支付方式"
                rules={[{ required: true, message: '请选择支付方式' }]}
              >
                <Radio.Group>
                  <Radio value="online">在线支付</Radio>
                  <Radio value="offline">线下支付</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="notes"
                label="备注信息"
              >
                <TextArea rows={4} placeholder="如有特殊需求，请在此备注" />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </motion.div>
  );
};

export default Home; 