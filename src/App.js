import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';
import { AnimatePresence } from 'framer-motion';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ARExperience from './pages/ARExperience';
import CulturalLearning from './pages/CulturalLearning';
import Community from './pages/Community';
import PersonalCenter from './pages/PersonalCenter';
import RoutePlanning from './pages/RoutePlanning';
import NotFound from './pages/NotFound';
import './App.css';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import ReactPlugin from '@stagewise-plugins/react';

const { Content } = Layout;

// 自定义主题配置
const getThemeConfig = (isDarkMode) => ({
  algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: '#9D2933',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    borderRadius: 8,
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Button: {
      colorPrimaryHover: '#B62C2C',
      borderRadius: 4,
    },
    Card: {
      borderRadiusLG: 12,
    },
  },
});

// AnimatePresence 包装组件
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/ar-experience" element={<ARExperience />} />
        <Route path="/cultural-learning" element={<CulturalLearning />} />
        <Route path="/community" element={<Community />} />
        <Route path="/route-planning" element={<RoutePlanning />} />
        <Route path="/personal-center" element={<PersonalCenter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeConfig, setThemeConfig] = useState(getThemeConfig(false));
  const [collapsed, setCollapsed] = useState(false);

  // 监听系统主题变化
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else if (prefersDark) {
      setIsDarkMode(true);
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 更新主题配置
  useEffect(() => {
    setThemeConfig(getThemeConfig(isDarkMode));
    
    // 设置CSS变量
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // 存储用户选择
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // 切换主题
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className="app-container">
        <Header 
          onChangeTheme={toggleTheme} 
          isDarkMode={isDarkMode} 
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content className={`main-content ${collapsed ? 'collapsed' : ''}`}>
          <AnimatedRoutes />
        </Content>
        <Footer />
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      </Layout>
    </ConfigProvider>
  );
}

export default App; 