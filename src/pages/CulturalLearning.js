import React, { useState, useRef } from 'react';
import { Typography, Row, Col, Card, Button, Tabs, Form, Select, Slider, Radio, Input, Avatar, Divider, message, List, Tag } from 'antd';
import { 
  RobotOutlined,
  SoundOutlined,
  QuestionCircleOutlined,
  SendOutlined,
  AudioOutlined,
  HistoryOutlined,
  UserOutlined,
  StarOutlined,
  ApiOutlined
} from '@ant-design/icons';
import './CulturalLearning.css';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const CulturalLearning = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [aiAvatar, setAiAvatar] = useState('/images/retouch_2025070917094884.png');
  const [voiceType, setVoiceType] = useState('female1');
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: '你好！我是非遗文化智能助手，请问有什么可以帮助你的？', time: '14:30' }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const messageEndRef = useRef(null);

  // 非遗文化主题
  const culturalTopics = [
    { title: '京剧艺术', icon: <StarOutlined style={{ color: '#1890ff' }} /> },
    { title: '景泰蓝制作', icon: <StarOutlined style={{ color: '#1890ff' }} /> },
    { title: '北京风筝', icon: <StarOutlined style={{ color: '#1890ff' }} /> },
    { title: '宫廷刺绣', icon: <StarOutlined style={{ color: '#1890ff' }} /> },
    { title: '皮影戏', icon: <StarOutlined style={{ color: '#1890ff' }} /> },
    { title: '北京曲艺', icon: <StarOutlined style={{ color: '#1890ff' }} /> },
  ];

  // 智能体外观选项
  const avatarOptions = [
    { value: '/images/retouch_2025070917094884.png', label: '文化学者' },
    { value: '/images/retouch_2025071012240413.jpg', label: '京剧艺术家' },
    { value: '/images/retouch_2025071012240433.jpg', label: '传统工艺师' },
  ];

  // 智能体音色选项
  const voiceOptions = [
    { value: 'female1', label: '女声（温柔）' },
    { value: 'female2', label: '女声（活泼）' },
    { value: 'male1', label: '男声（浑厚）' },
    { value: 'male2', label: '男声（平和）' },
    { value: 'elder', label: '长者声音' },
  ];

  // 历史问答记录
  const historicalQuestions = [
    '京剧的四大行当是什么？',
    '景泰蓝制作需要哪些步骤？',
    '北京风筝有什么特点？',
    '宫廷刺绣的历史渊源',
    '皮影戏的角色有哪些种类？',
    '传统北京曲艺包括哪些形式？'
  ];

  // 处理发送消息
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage = {
      role: 'user',
      content: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory([...chatHistory, newUserMessage]);
    setInputMessage('');
    
    // 模拟AI回复
    setTimeout(() => {
      let aiResponse = '';
      
      if (inputMessage.includes('京剧')) {
        aiResponse = '京剧是中国国粹，四大行当是生、旦、净、丑。生为男性角色，旦为女性角色，净为脸谱化的角色，丑为喜剧角色。京剧起源于清朝乾隆年间，至今已有200多年历史。';
      } else if (inputMessage.includes('景泰蓝')) {
        aiResponse = '景泰蓝是北京特有的传统工艺品，又称"铜胎掐丝珐琅"。制作步骤包括制胎、掐丝、烧焊、施彩、烧制和打磨抛光。景泰蓝因明代景泰年间兴盛而得名，是北京非常重要的非物质文化遗产。';
      } else if (inputMessage.includes('风筝')) {
        aiResponse = '北京风筝源于宫廷，历史悠久，造型多样，色彩艳丽。北京风筝的代表人物是韩凤鸣、魏元泰和哈氏三兄弟，他们的作品被称为"北京三派"。北京风筝的特点是扎制精良，绘画精美，整体轻巧灵活。';
      } else {
        aiResponse = '这是个很有趣的问题。非物质文化遗产是指各族人民世代相传的、与群众生活密切相关的各种传统文化表现形式和文化空间。北京有很多珍贵的非遗项目，包括京剧、景泰蓝、风筝等。您想了解更具体的内容吗？';
      }
      
      const newAiMessage = {
        role: 'ai',
        content: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prevChat => [...prevChat, newAiMessage]);
      scrollToBottom();
    }, 1000);
  };

  // 处理语音输入
  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      message.info('正在聆听您的问题...');
      // 这里应该是实际的语音识别API调用
      setTimeout(() => {
        setIsRecording(false);
        setInputMessage('请介绍一下北京的传统文化');
        message.success('语音识别完成');
      }, 2000);
    } else {
      message.info('停止录音');
    }
  };

  // 历史问题点击处理
  const handleHistoryClick = (question) => {
    setInputMessage(question);
  };

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="cultural-learning-page">
      <div className="page-header">
        <div className="container">
          <Title>文化学习中心</Title>
          <Paragraph>了解首都非遗文化，探索传统智慧</Paragraph>
        </div>
      </div>

      <div className="container">
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="custom-tabs">
          <TabPane tab="智能体定制" key="1">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card title="智能体外观" className="avatar-card">
                  <div className="avatar-preview">
                    <Avatar src={aiAvatar} size={180} />
                  </div>
                  <Form layout="vertical" className="avatar-form">
                    <Form.Item label="选择形象">
                      <Select 
                        value={aiAvatar} 
                        onChange={setAiAvatar}
                        style={{ width: '100%' }}
                      >
                        {avatarOptions.map(option => (
                          <Option key={option.value} value={option.value}>
                            <div className="avatar-option">
                              <Avatar src={option.value} size={24} />
                              <span>{option.label}</span>
              </div>
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="角色背景">
                      <Radio.Group defaultValue="scholar">
                        <Radio value="scholar">学者型</Radio>
                        <Radio value="artist">艺术家型</Radio>
                        <Radio value="storyteller">故事讲述型</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="专业领域">
                      <Select mode="multiple" placeholder="选择专业领域" defaultValue={['京剧', '皮影戏']}>
                        <Option value="京剧">京剧</Option>
                        <Option value="景泰蓝">景泰蓝</Option>
                        <Option value="皮影戏">皮影戏</Option>
                        <Option value="风筝">风筝</Option>
                        <Option value="宫廷刺绣">宫廷刺绣</Option>
                        <Option value="曲艺">曲艺</Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card title="智能体音色" className="voice-card">
                  <Form layout="vertical">
                    <Form.Item label="选择音色">
                      <Select 
                        value={voiceType} 
                        onChange={setVoiceType}
                        style={{ width: '100%' }}
                      >
                        {voiceOptions.map(option => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="语速调节">
                      <Slider defaultValue={50} marks={{ 0: '慢', 50: '适中', 100: '快' }} />
                    </Form.Item>
                    <Form.Item label="音调调节">
                      <Slider defaultValue={50} marks={{ 0: '低', 50: '中', 100: '高' }} />
                    </Form.Item>
                    <Form.Item label="语气风格">
                      <Radio.Group defaultValue="natural">
                        <Radio value="natural">自然平和</Radio>
                        <Radio value="formal">庄重正式</Radio>
                        <Radio value="lively">活泼生动</Radio>
                        <Radio value="elder">长者风格</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" icon={<SoundOutlined />} block>
                        试听音色
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card title="智能体特性" className="feature-card">
                  <Form layout="vertical">
                    <Form.Item label="知识深度">
                      <Slider defaultValue={70} marks={{ 0: '基础', 50: '进阶', 100: '专家' }} />
                    </Form.Item>
                    <Form.Item label="回答风格">
                      <Radio.Group defaultValue="detailed">
                        <Radio value="concise">简明扼要</Radio>
                        <Radio value="detailed">详尽解释</Radio>
                        <Radio value="storytelling">故事化表达</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="特色功能">
                      <Checkbox.Group defaultValue={['quiz', 'recommendation']}>
                        <Row>
                          <Col span={12}>
                            <Checkbox value="quiz">知识问答</Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox value="recommendation">文化推荐</Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox value="storytelling">讲述故事</Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox value="guide">文化导览</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" icon={<ApiOutlined />} block>
                        保存定制设置
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="文化问答" key="2">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={16}>
                <Card className="chat-card">
                  <div className="chat-container">
                    {chatHistory.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`message-item ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
                      >
                        {msg.role === 'ai' && (
                          <Avatar src={aiAvatar} size={40} className="message-avatar" />
                        )}
                        <div className="message-content">
                          <div className="message-bubble">
                            {msg.content}
                          </div>
                          <div className="message-time">{msg.time}</div>
                        </div>
                        {msg.role === 'user' && (
                          <Avatar icon={<UserOutlined />} size={40} className="message-avatar" />
                        )}
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                        </div>
                  <Divider />
                  <div className="chat-input">
                    <Input 
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      onPressEnter={handleSendMessage}
                      placeholder="请输入您想了解的非遗文化问题..."
                      prefix={<QuestionCircleOutlined />}
                      suffix={
                        <Button 
                          type={isRecording ? "primary" : "default"}
                          icon={<AudioOutlined />}
                          onClick={handleVoiceInput}
                          shape="circle"
                          size="small"
                        />
                      }
                    />
                    <Button 
                      type="primary" 
                      icon={<SendOutlined />} 
                      onClick={handleSendMessage}
                    >
                      发送
                    </Button>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card title="热门文化主题" className="topics-card">
              <List
                    dataSource={culturalTopics}
                renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={item.icon}
                          title={<a onClick={() => setInputMessage(`请介绍${item.title}`)}>{item.title}</a>}
                        />
                  </List.Item>
                )}
              />
              </Card>
                <Card title="历史问答记录" className="history-card">
                  <List
                    dataSource={historicalQuestions}
                    renderItem={item => (
                      <List.Item>
                        <a onClick={() => handleHistoryClick(item)}>
                          <HistoryOutlined /> {item}
                        </a>
                      </List.Item>
                    )}
                  />
              </Card>
            </Col>
          </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

// 新增的Checkbox组件，因为原代码中没有import
const Checkbox = ({ children, value, ...props }) => {
  return (
    <Radio {...props} value={value}>
      {children}
    </Radio>
  );
};

Checkbox.Group = Radio.Group;

export default CulturalLearning; 