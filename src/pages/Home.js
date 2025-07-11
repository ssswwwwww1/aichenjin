import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Card, Button, Carousel, Statistic, Divider, Modal, Form, Input, DatePicker, Radio, message, Tag, notification } from 'antd';
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
  RightOutlined
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
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: { 
    y: -10,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" }
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
  const [userCount, setUserCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const carouselRef = useRef();

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

  // 统计数字动画
  useEffect(() => {
    if (visibleSections.statsSection) {
      const userCountTarget = 10283;
      const viewCountTarget = 28741;
      const ratingCountTarget = 98.2;
      
      const duration = 2000; // 动画持续时间
      const frameRate = 60; // 每秒更新次数
      const totalFrames = duration / 1000 * frameRate;
      
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        
        if (progress < 1) {
          setUserCount(Math.floor(userCountTarget * progress));
          setViewCount(Math.floor(viewCountTarget * progress));
          setRatingCount(parseFloat((ratingCountTarget * progress).toFixed(1)));
        } else {
          setUserCount(userCountTarget);
          setViewCount(viewCountTarget);
          setRatingCount(ratingCountTarget);
          clearInterval(timer);
        }
      }, 1000 / frameRate);
      
      return () => clearInterval(timer);
    }
  }, [visibleSections.statsSection]);

  const carouselItems = [
    {
      title: '圆明园春色',
      description: '感受皇家园林的恢弘与秀美，领略圆明园的历史与自然风光。',
      image: '/images/IMG_20250710_100540.png',
      link: '/ar-experience'
    },
    {
      title: '国家博物馆',
      description: '中国国家博物馆，见证中华文明的辉煌与传承。',
      image: '/images/IMG_20250710_100551.png',
      link: '/cultural-learning'
    },
    {
      title: '长城壮丽风光',
      description: '登临长城，感受中华民族的坚韧与辉煌。',
      image: '/images/IMG_20250710_100603.png',
      link: '/community'
    },
    {
      title: '天坛祈年殿',
      description: '了解天坛的建筑奥秘与祭天文化，感受古代祭祀的庄严氛围。',
      image: '/images/IMG_20250710_100616.png',
      link: '/community'
    },
    {
      title: '颐和园美景',
      description: '颐和园，皇家园林的典范，湖光山色尽收眼底。',
      image: '/images/IMG_20250710_101048.png',
      link: '/cultural-learning'
    },
    {
      title: '国子监文化街',
      description: '国子监，古代最高学府，感受浓厚的文化氛围。',
      image: '/images/IMG_20250710_101058.png',
      link: '/cultural-learning'
    }
  ];

  const featureItems = [
    {
      icon: <ExperimentOutlined style={{color:'#D32F2F'}} />, // 红色点缀
      title: 'AR长城探秘',
      description: '通过AR技术，身临其境体验长城历史与风光。'
    },
    {
      icon: <ReadOutlined style={{color:'#1976D2'}} />, // 蓝色点缀
      title: '故宫文化讲堂',
      description: '深入了解故宫建筑、文物与皇家礼仪。'
    },
    {
      icon: <TeamOutlined style={{color:'#388E3C'}} />, // 绿色点缀
      title: '胡同文化互动',
      description: '参与胡同文化活动，体验地道北京生活。'
    },
    {
      icon: <ExperimentOutlined style={{color:'#FBC02D'}} />, // 金色点缀
      title: '天坛祭祀体验',
      description: '数字化还原天坛祭祀盛典，感受古代文化仪式。'
    },
    {
      icon: <ReadOutlined style={{color:'#8E24AA'}} />, // 紫色点缀
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
          >
        {carouselItems.map((item, index) => (
          <div key={index}>
            <div 
              className="carousel-item" 
                  style={{backgroundImage: `url(${item.image})`}}
                >
                  <div className="container">
                    <AnimatePresence>
                      {currentCarouselIndex === index && (
                        <motion.div 
                          className="carousel-content"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.h2 
                            className="carousel-title"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {item.title}
                          </motion.h2>
                          <motion.p 
                            className="carousel-description"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            {item.description}
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                <Link to={item.link}>
                              <Button type="primary" size="large">
                                立即探索 <ArrowRightOutlined />
                  </Button>
                </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

          <div className="carousel-buttons">
            <Button 
              shape="circle" 
              icon={<LeftOutlined />} 
              onClick={carouselPrev}
              className="carousel-button prev"
            />
            <Button 
              shape="circle" 
              icon={<RightOutlined />} 
              onClick={carouselNext}
              className="carousel-button next"
            />
          </div>
        </div>

        {/* 统计数据区域 */}
        <motion.div 
          id="statsSection" 
          className="stats-section animate-section"
          variants={fadeIn}
          initial="hidden"
          animate={visibleSections.statsSection ? "visible" : "hidden"}
        >
          <Row gutter={[24, 24]} justify="space-around">
            <Col xs={12} sm={12} md={6} lg={6}>
              <motion.div className="stat-item" variants={fadeInUp}>
                <Statistic title="注册用户" value={userCount} prefix={<UserOutlined />} />
              </motion.div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <motion.div className="stat-item" variants={fadeInUp}>
                <Statistic title="景点浏览" value={viewCount} prefix={<EyeOutlined />} />
              </motion.div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <motion.div className="stat-item" variants={fadeInUp}>
                <Statistic title="用户满意度" value={ratingCount} suffix="%" precision={1} prefix={<LikeOutlined />} />
              </motion.div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <motion.div className="stat-item" variants={fadeInUp}>
                <Statistic title="文化遗产" value={42} prefix={<StarOutlined />} />
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* 特色服务区域 */}
        <div className="section-wrapper">
          <Title level={2} className="section-title">特色服务</Title>
          <motion.div 
            id="featureSection" 
            className="feature-section animate-section"
            variants={staggerChildren}
            initial="hidden"
            animate={visibleSections.featureSection ? "visible" : "hidden"}
          >
            <Row gutter={[24, 24]}>
            {featureItems.map((item, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <motion.div 
                    className="feature-card card-hover"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                  <div className="feature-icon">{item.icon}</div>
                    <Title level={4} className="feature-title">{item.title}</Title>
                  <Paragraph className="feature-desc">{item.description}</Paragraph>
                  </motion.div>
              </Col>
            ))}
          </Row>
          </motion.div>
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