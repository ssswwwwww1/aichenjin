import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Typography, Spin, Modal, List, Avatar } from 'antd';
import { AudioOutlined, CloseOutlined, SendOutlined, SoundOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { getCulturalInformation } from '../utils/api';
import './VoiceAssistant.css';

const { Text, Title, Paragraph } = Typography;

const VoiceAssistant = () => {
  const [visible, setVisible] = useState(false);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const messagesEndRef = useRef(null);
  
  // 支持的语音指令列表
  const supportedCommands = [
    { command: "介绍一下故宫", description: "了解故宫的历史和建筑特色" },
    { command: "讲解京剧脸谱", description: "获取关于京剧脸谱的文化知识" },
    { command: "长城有多长", description: "查询长城的基本信息" },
    { command: "天坛祭天仪式", description: "了解天坛祭天仪式的历史与文化意义" },
    { command: "唐诗宋词代表作", description: "获取唐诗宋词的代表作品介绍" }
  ];

  // 滚动到最新消息
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleAssistant = () => {
    setVisible(!visible);
    // 重置状态
    if (!visible) {
      // 添加欢迎消息
      if (messages.length === 0) {
        setMessages([
          {
            id: Date.now(),
            type: 'assistant',
            content: '您好，我是您的文化语音助手。我可以回答关于中国传统文化的问题，帮助您了解更多文化知识。请问有什么可以帮您的？'
          }
        ]);
      }
    }
  };

  // 模拟语音识别
  const startListening = () => {
    setListening(true);
    // 模拟语音识别过程
    setTimeout(() => {
      setListening(false);
      // 模拟一个随机查询
      const queries = ["请介绍一下故宫的历史", "京剧脸谱的色彩含义是什么？", "中国四大发明是哪些？"];
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
      setCurrentQuery(randomQuery);
      
      // 将用户的查询添加到消息列表
      addMessage('user', randomQuery);
      
      // 处理查询
      processQuery(randomQuery);
    }, 2000);
  };

  // 模拟处理语音查询
  const processQuery = async (query) => {
    setProcessing(true);
    
    try {
      // 在真实环境中，这里应该调用API处理查询
      // const response = await getCulturalInformation(query);
      
      // 模拟API响应
      await new Promise(resolve => setTimeout(resolve, 1500));
      let response;
      
      if (query.includes("故宫")) {
        response = {
          answer: "故宫，又称紫禁城，位于北京中轴线的中心，是明清两代的皇宫，也是世界上规模最大、保存最完整的木质结构古建筑群。它始建于明成祖永乐四年（1406年），历时14年才建成。故宫占地面积约72万平方米，有大小宫殿七十多座，房屋九千余间。其建筑布局严谨，体现了中国传统的等级制度和对称美学理念。",
          relatedLinks: [
            { title: "故宫博物院官网", url: "https://www.dpm.org.cn/" },
            { title: "故宫建筑特色", url: "#" }
          ]
        };
      } else if (query.includes("京剧") || query.includes("脸谱")) {
        response = {
          answer: "京剧脸谱是京剧表演中的一种特殊化妆方式，通过不同的色彩和图案来表现人物的性格和身份。主要色彩含义有：红色代表忠诚勇猛，如关羽；黑色象征刚直正义，如包拯；蓝色表示刚烈桀骜，如窦尔敦；黄色暗示残暴凶狠，如典韦；白色则代表奸诈多疑，如曹操；金银色多用于神仙和佛教人物。脸谱的纹样也有丰富含义，如'三块瓦'代表勇猛，'歪锋'表示奸诈等。",
          relatedLinks: [
            { title: "京剧脸谱种类详解", url: "#" },
            { title: "国家级非物质文化遗产保护名录", url: "#" }
          ]
        };
      } else if (query.includes("四大发明")) {
        response = {
          answer: "中国古代四大发明是指造纸术、指南针、火药和印刷术。造纸术由蔡伦改进于东汉时期；指南针起源于战国时期的司南，宋代发展为航海用的指南针；火药在唐朝炼丹过程中被发现；活字印刷术则由北宋的毕昇发明。这四大发明对世界文明的发展产生了深远影响，推动了人类社会的进步。",
          relatedLinks: [
            { title: "四大发明的历史演变", url: "#" },
            { title: "中国科技史", url: "#" }
          ]
        };
      } else {
        response = {
          answer: "抱歉，我目前还没有关于这个问题的详细信息。您可以尝试询问有关故宫、京剧脸谱、中国四大发明等话题的问题，或者浏览我们的文化学习板块获取更多信息。",
          relatedLinks: []
        };
      }
      
      // 将助手的回复添加到消息列表
      addMessage('assistant', response.answer, response.relatedLinks);
    } catch (error) {
      console.error("处理查询时出错:", error);
      addMessage('assistant', "抱歉，处理您的请求时出现了问题，请稍后再试。");
    } finally {
      setProcessing(false);
      setCurrentQuery('');
    }
  };

  // 添加消息到对话历史
  const addMessage = (type, content, links = []) => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      links
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  // 处理文本输入查询
  const handleTextQuery = () => {
    if (!currentQuery.trim()) return;
    
    // 将用户的查询添加到消息列表
    addMessage('user', currentQuery);
    
    // 处理查询
    processQuery(currentQuery);
    
    // 清空输入
    setCurrentQuery('');
  };

  // 显示帮助模态框
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  
  const showHelpModal = () => {
    setHelpModalVisible(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextQuery();
    }
  };

  // 渲染消息气泡
  const renderMessage = (message) => {
    const isAssistant = message.type === 'assistant';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`va-message ${isAssistant ? 'assistant' : 'user'}`}
      >
        <div className="va-message-avatar">
          {isAssistant ? (
            <Avatar className="assistant-avatar" icon={<SoundOutlined />} />
          ) : (
            <Avatar className="user-avatar" icon={<UserOutlined />} />
          )}
        </div>
        <div className="va-message-content">
          <div className="va-message-bubble">
            <Paragraph>{message.content}</Paragraph>
            
            {isAssistant && message.links && message.links.length > 0 && (
              <div className="va-related-links">
                <Text strong>相关链接：</Text>
                <ul>
                  {message.links.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* 浮动按钮 */}
      <motion.div 
        className="va-float-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button 
          type="primary" 
          shape="circle" 
          icon={visible ? <CloseOutlined /> : <SoundOutlined />} 
          size="large" 
          onClick={toggleAssistant}
          className="va-toggle-btn"
        />
      </motion.div>
      
      {/* 语音助手面板 */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="va-container"
          >
            <Card 
              title={
                <div className="va-header">
                  <SoundOutlined className="va-icon" />
                  <span>文化语音助手</span>
                </div>
              }
              extra={
                <Button type="text" icon={<CloseOutlined />} onClick={toggleAssistant} />
              }
              className="va-card"
            >
              <div className="va-body">
                <div className="va-messages">
                  {messages.map(message => renderMessage(message))}
                  {processing && (
                    <div className="va-processing">
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                      <Text>思考中...</Text>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="va-controls">
                  <div className="va-input-container">
                    <input 
                      type="text"
                      placeholder="输入您的问题..."
                      value={currentQuery}
                      onChange={e => setCurrentQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="va-text-input"
                      disabled={processing || listening}
                    />
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleTextQuery}
                      disabled={!currentQuery.trim() || processing || listening}
                      className="va-send-btn"
                    />
                  </div>
                  
                  <div className="va-action-buttons">
                    <Button
                      icon={<AudioOutlined />}
                      onClick={startListening}
                      loading={listening}
                      disabled={processing}
                      className={`va-voice-btn ${listening ? 'listening' : ''}`}
                    >
                      {listening ? '正在聆听...' : '按住说话'}
                    </Button>
                    <Button type="link" onClick={showHelpModal}>
                      查看可用指令
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 帮助模态框 */}
      <Modal
        title="支持的语音指令"
        open={helpModalVisible}
        onCancel={() => setHelpModalVisible(false)}
        footer={null}
        className="va-help-modal"
      >
        <List
          itemLayout="horizontal"
          dataSource={supportedCommands}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<AudioOutlined />} />}
                title={item.command}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <Paragraph className="va-help-tip">
          提示：您也可以尝试询问其他关于中国传统文化的问题，助手会尽力回答。
        </Paragraph>
      </Modal>
    </>
  );
};

export default VoiceAssistant; 