import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Button, List, Avatar, Typography, Spin, Empty, Badge, Tabs, message, Dropdown, Modal, Form } from 'antd';
import { SendOutlined, SmileOutlined, PictureOutlined, AudioOutlined, UserAddOutlined, MoreOutlined, CloseOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { getChatRooms, getChatMessages, sendChatMessage, createChatRoom } from '../utils/api';
import './ChatSystem.css';

const { Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const ChatSystem = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [createRoomVisible, setCreateRoomVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const [createRoomForm] = Form.useForm();
  
  // 模拟数据
  useEffect(() => {
    // 在真实环境中，这里应该调用API获取聊天室列表
    const mockRooms = [
      {
        id: '1',
        name: '故宫文化爱好者',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        type: 'group',
        lastMessage: '李明: 下周日有人去故宫参观吗？',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        unread: 2
      },
      {
        id: '2',
        name: '北京文旅导游',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        type: 'personal',
        lastMessage: '您好，我是您预订的导游小李',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        unread: 0
      },
      {
        id: '3',
        name: '长城徒步小分队',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        type: 'group',
        lastMessage: '王华: 本周六集合时间确定了吗？',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        unread: 5
      }
    ];
    
    setChatRooms(mockRooms);
  }, []);
  
  // 选择聊天室时获取消息
  const selectChatRoom = (roomId) => {
    setLoading(true);
    setCurrentRoom(chatRooms.find(room => room.id === roomId));
    
    // 在真实环境中，这里应该调用API获取聊天消息
    setTimeout(() => {
      const mockMessages = generateMockMessages(roomId);
      setMessages(mockMessages);
      setLoading(false);
      
      // 标记该房间消息已读
      setChatRooms(prev => 
        prev.map(room => 
          room.id === roomId ? { ...room, unread: 0 } : room
        )
      );
      
      // 滚动到底部
      scrollToBottom();
    }, 800);
  };
  
  // 生成模拟消息
  const generateMockMessages = (roomId) => {
    const now = Date.now();
    const currentUser = { id: 'currentUser', name: '我' };
    
    if (roomId === '1') {
      return [
        {
          id: '1',
          content: '大家好，欢迎加入故宫文化爱好者群组！',
          sender: { id: 'admin', name: '管理员', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
          timestamp: new Date(now - 86400000 * 3).toISOString(),
          type: 'text'
        },
        {
          id: '2',
          content: '大家好，我是刚刚加入的小王，对故宫建筑很感兴趣。',
          sender: { id: 'wang', name: '小王', avatar: 'https://randomuser.me/api/portraits/men/36.jpg' },
          timestamp: new Date(now - 86400000 * 2).toISOString(),
          type: 'text'
        },
        {
          id: '3',
          content: '欢迎！下周日我们组织一次故宫参观活动，有兴趣吗？',
          sender: { id: 'zhang', name: '张老师', avatar: 'https://randomuser.me/api/portraits/women/26.jpg' },
          timestamp: new Date(now - 86400000).toISOString(),
          type: 'text'
        },
        {
          id: '4',
          content: '这是上次我们参观的照片，分享给大家',
          sender: { id: 'zhang', name: '张老师', avatar: 'https://randomuser.me/api/portraits/women/26.jpg' },
          timestamp: new Date(now - 86400000 + 1000).toISOString(),
          type: 'image',
          imageUrl: 'https://images.unsplash.com/photo-1548248823-ce16a73b6d49'
        },
        {
          id: '5',
          content: '我很感兴趣！请问具体时间和集合地点？',
          sender: { id: 'wang', name: '小王', avatar: 'https://randomuser.me/api/portraits/men/36.jpg' },
          timestamp: new Date(now - 43200000).toISOString(),
          type: 'text'
        },
        {
          id: '6',
          content: '下周日上午9点，故宫午门集合',
          sender: { id: 'zhang', name: '张老师', avatar: 'https://randomuser.me/api/portraits/women/26.jpg' },
          timestamp: new Date(now - 3600000).toISOString(),
          type: 'text'
        },
        {
          id: '7',
          content: '下周日有人去故宫参观吗？我也想加入！',
          sender: { id: 'li', name: '李明', avatar: 'https://randomuser.me/api/portraits/men/42.jpg' },
          timestamp: new Date(now - 1800000).toISOString(),
          type: 'text'
        }
      ];
    } else if (roomId === '2') {
      return [
        {
          id: '1',
          content: '您好，我是您预订的导游小李',
          sender: { id: 'guide', name: '导游小李', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
          timestamp: new Date(now - 7200000).toISOString(),
          type: 'text'
        },
        {
          id: '2',
          content: '您预订的明天故宫深度游行程已经确认',
          sender: { id: 'guide', name: '导游小李', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
          timestamp: new Date(now - 7190000).toISOString(),
          type: 'text'
        },
        {
          id: '3',
          content: '您好！请问明天具体几点集合？',
          sender: currentUser,
          timestamp: new Date(now - 3600000).toISOString(),
          type: 'text'
        },
        {
          id: '4',
          content: '上午9点在故宫东华门集合，我会提前到达',
          sender: { id: 'guide', name: '导游小李', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
          timestamp: new Date(now - 3540000).toISOString(),
          type: 'text'
        },
        {
          id: '5',
          content: '好的，明天见！',
          sender: currentUser,
          timestamp: new Date(now - 3520000).toISOString(),
          type: 'text'
        }
      ];
    } else {
      return [
        {
          id: '1',
          content: '大家好，我是徒步领队小张，欢迎加入长城徒步小分队！',
          sender: { id: 'leader', name: '领队小张', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
          timestamp: new Date(now - 604800000).toISOString(),
          type: 'text'
        },
        {
          id: '2',
          content: '这是我们的行程安排，请大家查收',
          sender: { id: 'leader', name: '领队小张', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
          timestamp: new Date(now - 604790000).toISOString(),
          type: 'file',
          fileName: '长城徒步行程.pdf'
        },
        {
          id: '3',
          content: '请问需要准备什么装备吗？',
          sender: { id: 'wang', name: '小王', avatar: 'https://randomuser.me/api/portraits/men/36.jpg' },
          timestamp: new Date(now - 518400000).toISOString(),
          type: 'text'
        },
        {
          id: '4',
          content: '建议携带：登山鞋、帽子、防晒霜、水和干粮',
          sender: { id: 'leader', name: '领队小张', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
          timestamp: new Date(now - 518300000).toISOString(),
          type: 'text'
        },
        {
          id: '5',
          content: '本周六集合时间确定了吗？',
          sender: { id: 'wanghua', name: '王华', avatar: 'https://randomuser.me/api/portraits/men/72.jpg' },
          timestamp: new Date(now - 86400000).toISOString(),
          type: 'text'
        },
        {
          id: '6',
          content: '是的，上午8点在地铁八达岭长城站集合',
          sender: { id: 'leader', name: '领队小张', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
          timestamp: new Date(now - 43200000).toISOString(),
          type: 'text'
        }
      ];
    }
  };
  
  // 发送消息
  const sendMessage = () => {
    if (!messageInput.trim() || !currentRoom) return;
    
    const newMessage = {
      id: Date.now().toString(),
      content: messageInput.trim(),
      sender: { id: 'currentUser', name: '我' },
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');
    
    // 在真实环境中，这里应该调用API发送消息
    // sendChatMessage(currentRoom.id, messageInput);
    
    // 滚动到底部
    setTimeout(scrollToBottom, 100);
  };
  
  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // 创建新聊天室
  const handleCreateRoom = (values) => {
    // 在真实环境中，这里应该调用API创建聊天室
    // createChatRoom(values).then(newRoom => {...})
    
    const newRoom = {
      id: `new-${Date.now()}`,
      name: values.name,
      type: values.type,
      avatar: values.type === 'group' 
        ? 'https://randomuser.me/api/portraits/lego/1.jpg' 
        : 'https://randomuser.me/api/portraits/women/90.jpg',
      lastMessage: '',
      timestamp: new Date().toISOString(),
      unread: 0
    };
    
    setChatRooms(prev => [newRoom, ...prev]);
    setCreateRoomVisible(false);
    createRoomForm.resetFields();
    message.success(`${values.type === 'group' ? '群组' : '聊天'} "${values.name}" 创建成功`);
  };
  
  // 格式化时间
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return days[date.getDay()];
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  };
  
  // 渲染消息项
  const renderMessageItem = (message) => {
    const isSelf = message.sender.id === 'currentUser';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`message-item ${isSelf ? 'self' : ''}`}
      >
        {!isSelf && (
          <Avatar
            src={message.sender.avatar}
            size="large"
            icon={<UserOutlined />}
            className="message-avatar"
          />
        )}
        <div className="message-content">
          {!isSelf && <Text className="message-sender">{message.sender.name}</Text>}
          <div className={`message-bubble ${isSelf ? 'self' : ''}`}>
            {message.type === 'text' && <Text>{message.content}</Text>}
            {message.type === 'image' && (
              <img 
                src={message.imageUrl} 
                alt="聊天图片" 
                className="message-image" 
                onClick={() => window.open(message.imageUrl, '_blank')}
              />
            )}
            {message.type === 'file' && (
              <div className="message-file">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <div className="file-name">{message.fileName}</div>
                  <div className="file-action">点击下载</div>
                </div>
              </div>
            )}
          </div>
          <Text className="message-time">{formatTime(message.timestamp)}</Text>
        </div>
        {isSelf && (
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="message-avatar self"
          />
        )}
      </motion.div>
    );
  };
  
  return (
    <div className="chat-system">
      <Card className="chat-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="chat-tabs">
          <TabPane 
            tab={<span><TeamOutlined /> 聊天室</span>}
            key="1"
          >
            <div className="chat-container">
              <div className="chat-sidebar">
                <div className="chat-header">
                  <h3>我的聊天</h3>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<UserAddOutlined />}
                    onClick={() => setCreateRoomVisible(true)}
                  />
                </div>
                <div className="chat-rooms">
                  {chatRooms.map(room => (
                    <div
                      key={room.id}
                      className={`chat-room-item ${currentRoom?.id === room.id ? 'active' : ''}`}
                      onClick={() => selectChatRoom(room.id)}
                    >
                      <Badge count={room.unread} overflowCount={99} offset={[-5, 5]}>
                        <Avatar 
                          src={room.avatar} 
                          size="large" 
                          icon={room.type === 'group' ? <TeamOutlined /> : <UserOutlined />}
                        />
                      </Badge>
                      <div className="chat-room-info">
                        <div className="chat-room-name">{room.name}</div>
                        <div className="chat-room-message">{room.lastMessage}</div>
                      </div>
                      <div className="chat-room-time">{formatTime(room.timestamp)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chat-main">
                {currentRoom ? (
                  <>
                    <div className="chat-header">
                      <div className="chat-title">
                        <Avatar 
                          src={currentRoom.avatar} 
                          icon={currentRoom.type === 'group' ? <TeamOutlined /> : <UserOutlined />}
                        />
                        <h3>{currentRoom.name}</h3>
                      </div>
                      <Dropdown 
                        menu={{ 
                          items: [
                            { key: '1', label: '查看信息' },
                            { key: '2', label: '清空聊天记录' },
                            { key: '3', label: '退出' + (currentRoom.type === 'group' ? '群组' : '聊天') }
                          ]
                        }} 
                        trigger={['click']}
                      >
                        <Button type="text" icon={<MoreOutlined />} />
                      </Dropdown>
                    </div>
                    
                    <div className="messages-container">
                      {loading ? (
                        <div className="loading-container">
                          <Spin tip="加载中..." />
                        </div>
                      ) : messages.length > 0 ? (
                        <div className="messages-list">
                          {messages.map(message => (
                            <div key={message.id} className="message-wrapper">
                              {renderMessageItem(message)}
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      ) : (
                        <Empty description="暂无消息" />
                      )}
                    </div>
                    
                    <div className="message-input-area">
                      <div className="message-tools">
                        <Button type="text" icon={<SmileOutlined />} />
                        <Button type="text" icon={<PictureOutlined />} />
                        <Button type="text" icon={<AudioOutlined />} />
                      </div>
                      <div className="message-form">
                        <TextArea
                          value={messageInput}
                          onChange={e => setMessageInput(e.target.value)}
                          placeholder="输入消息..."
                          autoSize={{ minRows: 1, maxRows: 4 }}
                          onPressEnter={e => {
                            if (!e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                        />
                        <Button
                          type="primary"
                          icon={<SendOutlined />}
                          onClick={sendMessage}
                          disabled={!messageInput.trim()}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="no-chat-selected">
                    <Empty description="请选择一个聊天" />
                  </div>
                )}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
      
      <Modal
        title="创建新的聊天"
        open={createRoomVisible}
        onCancel={() => setCreateRoomVisible(false)}
        footer={null}
      >
        <Form
          form={createRoomForm}
          layout="vertical"
          onFinish={handleCreateRoom}
        >
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择聊天类型' }]}
            initialValue="personal"
          >
            <Tabs defaultActiveKey="personal">
              <TabPane tab="私聊" key="personal" />
              <TabPane tab="群聊" key="group" />
            </Tabs>
          </Form.Item>
          
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入聊天名称" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              创建
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChatSystem; 