import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { GithubOutlined, YoutubeOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Text, Link, Title } = Typography;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.2,
    rotate: 12,
    color: "var(--primary-color, #1890ff)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Create motion components
const MotionTitle = motion(Title);
const MotionText = motion(Text);
const MotionLink = motion(Link);
const MotionSpace = motion(Space);

const Footer = () => {
  return (
    <AntFooter className="footer">
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <motion.div 
              className="footer-section"
              variants={itemVariants}
            >
              <MotionTitle 
                level={4} 
                className="footer-title"
                variants={itemVariants}
              >
                关于我们
              </MotionTitle>
              <MotionText 
                className="footer-text"
                variants={itemVariants}
              >
                首都文旅数字平台致力于传统文化传承与创新，
                利用AI、AR等前沿技术，为文化爱好者提供沉浸式体验。
              </MotionText>
            </motion.div>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={8}>
            <motion.div 
              className="footer-section"
              variants={itemVariants}
            >
              <MotionTitle 
                level={4} 
                className="footer-title"
                variants={itemVariants}
              >
                快速链接
              </MotionTitle>
              <MotionSpace 
                direction="vertical"
                variants={itemVariants}
              >
                <MotionLink 
                  href="/" 
                  className="footer-link"
                  variants={itemVariants}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  首页
                </MotionLink>
                <MotionLink 
                  href="/ar-experience" 
                  className="footer-link"
                  variants={itemVariants}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  AR体验
                </MotionLink>
                <MotionLink 
                  href="/cultural-learning" 
                  className="footer-link"
                  variants={itemVariants}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  文化学习
                </MotionLink>
                <MotionLink 
                  href="/community" 
                  className="footer-link"
                  variants={itemVariants}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  社区交流
                </MotionLink>
              </MotionSpace>
            </motion.div>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={8}>
            <motion.div 
              className="footer-section"
              variants={itemVariants}
            >
              <MotionTitle 
                level={4} 
                className="footer-title"
                variants={itemVariants}
              >
                联系我们
              </MotionTitle>
              <MotionText 
                className="footer-text"
                variants={itemVariants}
              >
                北京市朝阳区文化大道123号
              </MotionText>
              <MotionText 
                className="footer-text"
                variants={itemVariants}
              >
                电话: 010-12345678
              </MotionText>
              <MotionText 
                className="footer-text"
                variants={itemVariants}
              >
                邮箱: contact@capital-culture.com
              </MotionText>
              <Space className="social-links" size="middle">
                <motion.div variants={iconVariants} whileHover="hover">
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <GithubOutlined className="social-icon" />
                  </Link>
                </motion.div>
                <motion.div variants={iconVariants} whileHover="hover">
                  <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <YoutubeOutlined className="social-icon" />
                  </Link>
                </motion.div>
                <motion.div variants={iconVariants} whileHover="hover">
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <TwitterOutlined className="social-icon" />
                  </Link>
                </motion.div>
                <motion.div variants={iconVariants} whileHover="hover">
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <LinkedinOutlined className="social-icon" />
                  </Link>
                </motion.div>
              </Space>
            </motion.div>
          </Col>
        </Row>
        
        <Divider className="footer-divider" />
        
        <motion.div 
          className="footer-bottom"
          variants={itemVariants}
        >
          <MotionText 
            className="copyright"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            © {new Date().getFullYear()} 首都文旅数字平台. 保留所有权利.
          </MotionText>
        </motion.div>
      </motion.div>
    </AntFooter>
  );
};

export default Footer; 