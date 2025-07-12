import React from 'react';
import { Layout, Row, Col, Typography, Divider, Space } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
  WechatOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <div className="container">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="footer-logo-container">
                <img src="/images/retouch_2025070917094884.png" alt="爱沉浸" className="footer-logo" />
                <Title level={4} className="footer-title">爱沉浸</Title>
              </div>
              <Text className="footer-text">
                我们致力于通过数字技术展现首都文化魅力，让传统与现代交相辉映，为您提供沉浸式的文化体验。
              </Text>
              <div className="social-links">
                <Space size="large">
                  <motion.a 
                    href="#!" 
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <WechatOutlined className="social-icon" />
                  </motion.a>
                  <motion.a 
                    href="#!" 
                    whileHover={{ scale: 1.2, rotate: -12 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TwitterOutlined className="social-icon" />
                  </motion.a>
                  <motion.a 
                    href="#!" 
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <InstagramOutlined className="social-icon" />
                  </motion.a>
                  <motion.a 
                    href="#!" 
                    whileHover={{ scale: 1.2, rotate: -12 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GithubOutlined className="social-icon" />
                  </motion.a>
                </Space>
              </div>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Title level={4} className="footer-title">快速链接</Title>
              <Link to="/" className="footer-link">
                <HomeOutlined /> 首页
              </Link><br />
              <Link to="/ar-experience" className="footer-link">
                <GlobalOutlined /> AR体验
              </Link><br />
              <Link to="/cultural-learning" className="footer-link">
                <GlobalOutlined /> 文化学习
              </Link><br />
              <Link to="/community" className="footer-link">
                <GlobalOutlined /> 社区交流
              </Link><br />
              <Link to="/route-planning" className="footer-link">
                <GlobalOutlined /> 路线规划
              </Link><br />
              <Link to="/personal-center" className="footer-link">
                <GlobalOutlined /> 个人中心
              </Link>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Title level={4} className="footer-title">联系我们</Title>
              <Text className="footer-text">
                <MailOutlined /> 邮箱: contact@capitalculture.cn
              </Text>
              <Text className="footer-text">
                <PhoneOutlined /> 电话: (010) 1234-5678
              </Text>
              <Text className="footer-text">
                <HomeOutlined /> 地址: 北京市东城区景山前街4号
              </Text>
            </motion.div>
          </Col>
        </Row>
        
        <Divider className="footer-divider" />
        
        <div className="footer-bottom">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Text className="copyright">
              © {new Date().getFullYear()} 爱沉浸 版权所有
            </Text>
          </motion.div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer; 