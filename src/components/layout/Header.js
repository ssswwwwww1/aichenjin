import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Modal, Form, Input, Checkbox, message, Tooltip, Badge, List, Empty, Spin, Drawer } from 'antd';
import {
  HomeOutlined,
  ExperimentOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BgColorsOutlined,
  CompassOutlined,
  BellOutlined,
  MessageOutlined,
  GlobalOutlined,
  CalendarOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, getUnreadNotificationCount } from '../../utils/api';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = ({ onChangeTheme, currentTheme }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loginForm] = Form.useForm();
  const location = useLocation();
  const [themeMenuVisible, setThemeMenuVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationDrawerVisible, setNotificationDrawerVisible] = useState(false);
  const [language, setLanguage] = useState('zh-CN');

  // 主题选项
  const themes = [
    { key: 'default', name: '默认主题', primaryColor: '#1890ff', backgroundColor: '#001529' },
    { key: 'dark', name: '深色主题', primaryColor: '#722ed1', backgroundColor: '#141414' },
    { key: 'light', name: '浅色主题', primaryColor: '#13c2c2', backgroundColor: '#f0f2f5' },
    { key: 'warm', name: '暖色主题', primaryColor: '#fa8c16', backgroundColor: '#fffbe6' }
  ];

  // 语言选项
  const languages = [
    { key: 'zh-CN', name: '简体中文' },
    { key: 'en-US', name: 'English' },
    { key: 'ja-JP', name: '日本語' },
    { key: 'ko-KR', name: '한국어' }
  ];

  // 模拟检查用户登录状态
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchNotificationCount();
    }
  }, []);

  // 定期更新通知计数
  useEffect(() => {
    if (isLoggedIn) {
      const intervalId = setInterval(() => {
        fetchNotificationCount();
      }, 60000); // 每分钟更新一次
      
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]);

  // 获取通知计数
  const fetchNotificationCount = async () => {
    try {
      // 真实环境中使用API调用
      // const response = await getUnreadNotificationCount();
      // setNotificationCount(response.count);
      
      // 模拟API响应
      const count = Math.floor(Math.random() * 10);
      setNotificationCount(count);
    } catch (error) {
      console.error("获取通知计数失败:", error);
    }
  };

  // 获取通知列表
  const fetchNotifications = async () => {
    if (!isLoggedIn) return;
    
    setNotificationsLoading(true);
    try {
      // 真实环境中使用API调用
      // const data = await getNotifications();
      // setNotifications(data);
      
      // 模拟API响应
      setTimeout(() => {
        const mockNotifications = [
          {
            id: '1',
            title: '您预订的"故宫深度体验"已确认',
            content: '您的行程将于明天上午10:00开始，请提前安排好出行。',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            read: false,
            type: 'booking'
          },
          {
            id: '2',
            title: '您收到了新的私信',
            content: '导游小李：您好！关于明天的行程，我想确认一下集合时间...',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            read: false,
            type: 'message'
          },
          {
            id: '3',
            title: '新的文化课程已上线',
            content: '《北京传统建筑艺术赏析》课程现已开放报名，点击查看详情。',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            read: true,
            type: 'course'
          },
          {
            id: '4',
            title: '您的评论收到了回复',
            content: '用户"文化爱好者"回复了您在"北京胡同文化"帖子下的评论。',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            read: true,
            type: 'comment'
          }
        ];
        setNotifications(mockNotifications);
        setNotificationsLoading(false);
      }, 800);
    } catch (error) {
      console.error("获取通知失败:", error);
      setNotificationsLoading(false);
    }
  };

  // 标记通知为已读
  const handleNotificationRead = async (id) => {
    try {
      // 真实环境中使用API调用
      // await markNotificationAsRead(id);
      
      // 更新本地状态
      setNotifications(prev => 
        prev.map(note => note.id === id ? { ...note, read: true } : note)
      );
      setNotificationCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("标记通知已读失败:", error);
    }
  };

  // 全部标记为已读
  const markAllAsRead = async () => {
    try {
      // 真实环境中使用API调用
      // await markAllNotificationsAsRead();
      
      // 更新本地状态
      setNotifications(prev => prev.map(note => ({ ...note, read: true })));
      setNotificationCount(0);
      message.success("所有通知已标记为已读");
    } catch (error) {
      console.error("标记所有通知已读失败:", error);
      message.error("操作失败，请稍后重试");
    }
  };

  // 打开通知抽屉时获取通知
  const openNotificationDrawer = () => {
    setNotificationDrawerVisible(true);
    fetchNotifications();
  };

  // 关闭通知抽屉
  const closeNotificationDrawer = () => {
    setNotificationDrawerVisible(false);
  };

  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const handleLoginCancel = () => {
    setLoginModalVisible(false);
  };

  const handleLoginSubmit = () => {
    loginForm.validateFields()
      .then(values => {
        console.log('登录信息:', values);
        
        // 模拟登录成功
        message.success({
          content: '登录成功!',
          icon: <motion.div 
            initial={{ scale: 0.5 }} 
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >✓</motion.div>
        });
        setIsLoggedIn(true);
        setLoginModalVisible(false);
        loginForm.resetFields();
        fetchNotificationCount(); // 登录后获取通知计数
      })
      .catch(info => {
        console.log('验证失败:', info);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setNotificationCount(0);
    localStorage.removeItem('token');
    message.success('已退出登录');
  };

  // 切换语言
  const handleLanguageChange = (langKey) => {
    setLanguage(langKey);
    message.success(`语言已切换为${languages.find(lang => lang.key === langKey)?.name || '新语言'}`);
    // 在实际应用中，这里应该调用国际化库的语言切换功能
  };

  const userMenuItems = [
    {
      key: '1',
      label: '个人中心',
      icon: <UserOutlined />,
      onClick: () => window.location.href = '/personal-center'
    },
    {
      key: '2',
      label: '设置',
      icon: <SettingOutlined />,
    },
    {
      key: '3',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  // 选择主题处理函数
  const handleThemeChange = (themeKey) => {
    onChangeTheme(themeKey);
    setThemeMenuVisible(false);
    
    message.success(`已切换至${themes.find(t => t.key === themeKey)?.name || '新主题'}`);
  };

  const themeMenuItems = themes.map(theme => ({
    key: theme.key,
    label: (
      <div 
        className="theme-item"
        onClick={() => handleThemeChange(theme.key)}
      >
        <div 
          className="theme-color-preview" 
          style={{
            backgroundColor: theme.primaryColor,
            borderColor: theme.key === currentTheme ? theme.primaryColor : 'transparent'
          }}
        />
        <span>{theme.name}</span>
        {theme.key === currentTheme && <span className="theme-selected">✓</span>}
      </div>
    )
  }));

  // 语言菜单项
  const languageMenuItems = languages.map(lang => ({
    key: lang.key,
    label: (
      <div 
        className="language-item"
        onClick={() => handleLanguageChange(lang.key)}
      >
        <span>{lang.name}</span>
        {lang.key === language && <span className="language-selected">✓</span>}
      </div>
    )
  }));

  // 获取通知图标
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageOutlined style={{ color: '#1890ff' }} />;
      case 'booking':
        return <CalendarOutlined style={{ color: '#52c41a' }} />;
      case 'course':
        return <ReadOutlined style={{ color: '#fa8c16' }} />;
      case 'comment':
        return <CommentOutlined style={{ color: '#722ed1' }} />;
      default:
        return <BellOutlined style={{ color: '#1890ff' }} />;
    }
  };

  // 格式化时间
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} 分钟前`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)} 小时前`;
    } else {
      return `${Math.floor(diffMins / 1440)} 天前`;
    }
  };

  return (
    <AntHeader className="main-header">
      <div className="header-content">
          <div className="logo">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <h1>首都文旅</h1>
            </Link>
          </motion.div>
        </div>
        <div className="nav-section">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            className="main-menu"
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="/ar-experience" icon={<ExperimentOutlined />}>
              <Link to="/ar-experience">AR体验</Link>
            </Menu.Item>
            <Menu.Item key="/cultural-learning" icon={<ReadOutlined />}>
              <Link to="/cultural-learning">文化学习</Link>
            </Menu.Item>
            <Menu.Item key="/community" icon={<TeamOutlined />}>
              <Link to="/community">社区交流</Link>
            </Menu.Item>
            <Menu.Item key="/route-planning" icon={<CompassOutlined />}>
              <Link to="/route-planning">路线规划</Link>
            </Menu.Item>
            <Menu.Item key="/personal-center" icon={<UserOutlined />}>
              <Link to="/personal-center">个人中心</Link>
            </Menu.Item>
          </Menu>
          
          <div className="header-actions">
            {/* 语言切换 */}
            <Dropdown 
              menu={{ items: languageMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Tooltip title="切换语言">
                <Button type="text" icon={<GlobalOutlined />} className="action-button" />
              </Tooltip>
            </Dropdown>
            
            {/* 主题切换 */}
            <Dropdown 
              menu={{ items: themeMenuItems }} 
              placement="bottomRight" 
              trigger={['click']}
              open={themeMenuVisible}
              onOpenChange={(visible) => setThemeMenuVisible(visible)}
            >
              <Tooltip title="切换主题">
                <Button 
                  type="text" 
                  icon={<BgColorsOutlined />} 
                  className="action-button"
                />
              </Tooltip>
            </Dropdown>
            
            {/* 通知中心 */}
            {isLoggedIn && (
              <Tooltip title="消息通知">
                <Badge count={notificationCount} overflowCount={99}>
                  <Button 
                    type="text" 
                    icon={<BellOutlined />} 
                    className="action-button"
                    onClick={openNotificationDrawer}
                  />
                </Badge>
              </Tooltip>
            )}
            
            {/* 用户菜单 */}
            {isLoggedIn ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
        <div className="user-avatar">
                  <motion.div whileHover={{ scale: 1.1 }}>
          <Avatar icon={<UserOutlined />} />
                  </motion.div>
                </div>
              </Dropdown>
            ) : (
              <Button type="primary" onClick={showLoginModal}>
                登录 / 注册
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* 登录模态框 */}
      <Modal
        title="用户登录"
        open={loginModalVisible}
        onCancel={handleLoginCancel}
        footer={null}
      >
        <Form
          form={loginForm}
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={handleLoginSubmit}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
          
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
            <a className="login-form-forgot" href="#!">
              忘记密码
            </a>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              登录
            </Button>
            或 <a href="#!">立即注册!</a>
          </Form.Item>
        </Form>
      </Modal>

      {/* 通知抽屉 */}
      <Drawer
        title={
          <div className="notification-drawer-header">
            <span>通知中心</span>
            <Button type="text" onClick={markAllAsRead} disabled={notificationCount === 0}>
              全部标为已读
            </Button>
          </div>
        }
        placement="right"
        onClose={closeNotificationDrawer}
        open={notificationDrawerVisible}
        width={380}
        className="notification-drawer"
      >
        {notificationsLoading ? (
          <div className="notification-loading">
            <Spin />
            <p>加载中...</p>
          </div>
        ) : notifications.length === 0 ? (
          <Empty description="暂无通知" />
        ) : (
          <List
            className="notification-list"
            dataSource={notifications}
            renderItem={item => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <List.Item 
                  className={`notification-item ${!item.read ? 'notification-unread' : ''}`}
                  onClick={() => handleNotificationRead(item.id)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(item.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{item.title}</div>
                    <div className="notification-message">{item.content}</div>
                    <div className="notification-time">{formatTime(item.createdAt)}</div>
                  </div>
                  {!item.read && <div className="notification-dot" />}
                </List.Item>
              </motion.div>
            )}
          />
        )}
      </Drawer>
    </AntHeader>
  );
};

export default Header; 