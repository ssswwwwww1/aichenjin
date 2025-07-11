import React, { useState, useEffect } from 'react';
import { 
  Typography, Row, Col, Card, Form, Select, Button, Input, 
  Checkbox, Steps, message, Spin, Tag, List, Timeline, Divider 
} from 'antd';
import { 
  RobotOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
  TeamOutlined, 
  HeartOutlined,
  BulbOutlined,
  SendOutlined,
  PictureOutlined,
  StarOutlined
} from '@ant-design/icons';
import './RoutePlanning.css';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const RoutePlanning = () => {
  const [aiRouteLoading, setAiRouteLoading] = useState(false);
  const [aiRouteResult, setAiRouteResult] = useState(null);
  const [routeForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('form');

  // 兴趣选项
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
  
  // 路线模板
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
      icon: <StarOutlined style={{ color: '#52c41a' }} />
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
  
  // 保存的路线
  const savedRoutes = [
    {
      id: 1,
      title: '北京3日文化之旅',
      days: 3,
      created: '2025-03-15',
      description: '故宫、天坛、颐和园等文化景点深度游'
    },
    {
      id: 2,
      title: '古都一日精华游',
      days: 1,
      created: '2025-03-10',
      description: '紧凑行程，打卡北京必游景点'
    }
  ];

  // 当组件加载时，从localStorage获取保存的路线
  useEffect(() => {
    const savedUserRoutes = localStorage.getItem('userSavedRoutes');
    if (savedUserRoutes) {
      try {
        // 暂时不覆盖示例数据，仅用于演示功能正常工作
        console.log('从localStorage加载的路线:', JSON.parse(savedUserRoutes));
      } catch (e) {
        console.error('解析保存的路线数据失败', e);
      }
    }
  }, []);

  const handleAiRouteSubmit = () => {
    routeForm.validateFields().then(values => {
      setAiRouteLoading(true);
      setActiveTab('result');
      console.log('路线定制需求:', values);
      
      // 模拟AI处理时间
      setTimeout(() => {
        const mockResult = {
          title: `${values.days}天${values.interests.includes('history') ? '历史文化' : '休闲'}路线`,
          description: `为${values.travelers}位游客量身定制，特别关注${values.interests.join('、')}兴趣方向`,
          steps: [
            {
              day: 1,
              places: [
                { 
                  name: '故宫博物院', 
                  duration: '3小时',
                  description: '参观紫禁城，了解明清历史',
                  arFeatures: ['皇宫3D复原', '虚拟角色互动']
                },
                { 
                  name: '景山公园', 
                  duration: '1小时',
                  description: '俯瞰紫禁城全景',
                  arFeatures: ['全景导览', '历史变迁展示']
                },
                { 
                  name: '什刹海', 
                  duration: '2小时',
                  description: '体验老北京胡同文化',
                  arFeatures: ['胡同文化讲解', '虚拟时光穿越']
                }
              ]
            },
            {
              day: 2,
              places: [
                { 
                  name: '天坛公园', 
                  duration: '2小时',
                  description: '探索古代祭天文化',
                  arFeatures: ['祭天仪式重现', '古代建筑解析']
                },
                { 
                  name: '国家博物馆', 
                  duration: '3小时',
                  description: '了解中国历史文明',
                  arFeatures: ['文物3D展示', '出土过程演示']
                },
                { 
                  name: '王府井大街', 
                  duration: '2小时',
                  description: '现代商业与传统文化交融',
                  arFeatures: ['历史变迁展示', '美食推荐']
                }
              ]
            }
          ],
          tips: [
            '早晨游览景点，避开人流高峰',
            '准备舒适的鞋子，部分景点需要较多步行',
            '下载我们的AR应用，增强体验效果',
            '每个景点都有AR标记点，请留意寻找'
          ]
        };
        
        setAiRouteResult(mockResult);
        setAiRouteLoading(false);
      }, 2000);
    }).catch(errorInfo => {
      message.error('请填写必要的信息');
      console.log('表单验证失败:', errorInfo);
    });
  };
  
  const resetForm = () => {
    routeForm.resetFields();
    setAiRouteResult(null);
    setActiveTab('form');
  };
  
  const saveRoute = () => {
    if (!aiRouteResult) {
      message.warning('请先生成路线');
      return;
    }
    
    // 保存路线到localStorage
    const routeToSave = {
      id: Date.now(),
      title: aiRouteResult.title,
      days: routeForm.getFieldValue('days'),
      created: new Date().toISOString().split('T')[0],
      description: aiRouteResult.description
    };
    
    try {
      // 获取已有的保存路线
      const existingSavedRoutes = localStorage.getItem('userSavedRoutes');
      let updatedRoutes = [];
      
      if (existingSavedRoutes) {
        updatedRoutes = JSON.parse(existingSavedRoutes);
      }
      
      updatedRoutes.push(routeToSave);
      localStorage.setItem('userSavedRoutes', JSON.stringify(updatedRoutes));
      
      message.success('路线已保存到我的行程，可在个人中心查看');
    } catch (e) {
      console.error('保存路线失败', e);
      message.error('保存失败，请稍后再试');
    }
  };
  
  const previewRoute = () => {
    message.success('路线已加载到AR地图中，请打开APP查看');
  };

  return (
    <div className="route-planning-page">
      <div className="page-header">
        <div className="container">
          <Title level={1}>AI路线规划</Title>
          <Paragraph>
            输入您的兴趣和需求，让AI为您定制完美的文化研学路线
          </Paragraph>
        </div>
      </div>

      <div className="container main-content">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Card 
              className="main-card" 
              title={
                <div className="card-title">
                  {activeTab === 'form' ? (
                    <><RobotOutlined /> 智能路线规划</> 
                  ) : (
                    <><BulbOutlined /> 规划结果</>
                  )}
                </div>
              }
              extra={
                aiRouteResult && 
                <Button type="link" onClick={resetForm}>重新规划</Button>
              }
            >
              {activeTab === 'form' ? (
                <Form 
                  form={routeForm} 
                  layout="vertical"
                  initialValues={{
                    days: 2,
                    travelers: 2,
                    budget: 'medium',
                    interests: ['history', 'cultural'],
                    template: ''
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item 
                        name="days" 
                        label="行程天数" 
                        rules={[{ required: true, message: '请选择行程天数' }]}
                      >
                        <Select>
                          <Option value={1}>1天</Option>
                          <Option value={2}>2天</Option>
                          <Option value={3}>3天</Option>
                          <Option value={5}>5天</Option>
                          <Option value={7}>7天</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item 
                        name="travelers" 
                        label="出行人数" 
                        rules={[{ required: true, message: '请选择出行人数' }]}
                      >
                        <Select>
                          <Option value={1}>1人</Option>
                          <Option value={2}>2人</Option>
                          <Option value={3}>3-5人</Option>
                          <Option value={6}>6-10人</Option>
                          <Option value={10}>10人以上</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item 
                    name="budget" 
                    label="预算范围" 
                    rules={[{ required: true, message: '请选择预算范围' }]}
                  >
                    <Select>
                      <Option value="low">经济型</Option>
                      <Option value="medium">标准型</Option>
                      <Option value="high">高端型</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item 
                    name="interests" 
                    label="兴趣偏好" 
                    rules={[{ required: true, message: '请至少选择一个兴趣偏好', type: 'array' }]}
                  >
                    <Checkbox.Group options={interestOptions} />
                  </Form.Item>

                  <Form.Item 
                    name="template" 
                    label="路线模板（可选）"
                  >
                    <div className="template-cards">
                      <Row gutter={[16, 16]}>
                        {routeTemplates.map(template => (
                          <Col key={template.id} xs={24} sm={12}>
                            <Card 
                              hoverable 
                              className="template-card"
                              onClick={() => routeForm.setFieldsValue({ template: template.id })}
                            >
                              <div className="template-icon">{template.icon}</div>
                              <div className="template-info">
                                <div className="template-name">{template.name}</div>
                                <div className="template-description">{template.description}</div>
                              </div>
                              <div className={`template-selected ${routeForm.getFieldValue('template') === template.id ? 'active' : ''}`}></div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Form.Item>

                  <Form.Item 
                    name="additionalRequirements" 
                    label="额外需求（可选）"
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="请输入您的特殊需求，如无障碍设施、儿童友好场所等"
                    />
                  </Form.Item>

                  <Form.Item className="form-actions">
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<SendOutlined />} 
                      onClick={handleAiRouteSubmit}
                    >
                      生成路线
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <div className="result-container">
                  {aiRouteLoading ? (
                    <div className="loading-container">
                      <Spin size="large" />
                      <div className="loading-text">AI正在为您规划最佳路线，请稍候...</div>
                    </div>
                  ) : aiRouteResult && (
                    <>
                      <div className="result-header">
                        <Title level={2}>{aiRouteResult.title}</Title>
                        <Paragraph>{aiRouteResult.description}</Paragraph>
                      </div>
                      
                      <Divider orientation="left">行程安排</Divider>
                      
                      <Steps 
                        direction="vertical" 
                        current={-1} 
                        className="route-steps"
                      >
                        {aiRouteResult.steps.map((step, index) => (
                          <Step 
                            key={index}
                            title={`第${step.day}天`}
                            description={
                              <div className="day-plan">
                                <List
                                  itemLayout="horizontal"
                                  dataSource={step.places}
                                  renderItem={place => (
                                    <List.Item className="place-item">
                                      <div className="place-content">
                                        <div className="place-name">{place.name}</div>
                                        <div className="place-duration">
                                          <ClockCircleOutlined /> {place.duration}
                                        </div>
                                        <div className="place-description">{place.description}</div>
                                        <div className="place-features">
                                          <Text type="secondary">AR功能：</Text>
                                          {place.arFeatures.map((feature, idx) => (
                                            <Tag key={idx} color="blue">{feature}</Tag>
                                          ))}
                                        </div>
                                      </div>
                                    </List.Item>
                                  )}
                                />
                              </div>
                            }
                          />
                        ))}
                      </Steps>
                      
                      <Divider orientation="left">旅行贴士</Divider>
                      
                      <ul className="travel-tips">
                        {aiRouteResult.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                      
                      <div className="result-actions">
                        <Button 
                          type="primary" 
                          icon={<StarOutlined />}
                          onClick={saveRoute}
                        >
                          保存路线
                        </Button>
                        <Button 
                          icon={<PictureOutlined />}
                          onClick={previewRoute}
                        >
                          AR预览
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card 
              title="我的保存路线" 
              className="sidebar-card"
              extra={<a href="#!">查看全部</a>}
            >
              {savedRoutes.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={savedRoutes}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<div className="route-days">{item.days}天</div>}
                        title={item.title}
                        description={
                          <>
                            <div>{item.description}</div>
                            <div className="saved-date">创建于 {item.created}</div>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <div className="empty-content">
                  <p>暂无保存的路线</p>
                </div>
              )}
            </Card>
            
            <Card 
              title="热门景点推荐" 
              className="sidebar-card"
              style={{ marginTop: 24 }}
            >
              <List
                itemLayout="horizontal"
                dataSource={[
                  { name: '故宫博物院', rating: 4.9, visitors: '年游客量1600万' },
                  { name: '颐和园', rating: 4.8, visitors: '年游客量1000万' },
                  { name: '长城', rating: 4.9, visitors: '年游客量900万' }
                ]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={
                        <>
                          <Rate disabled defaultValue={Math.round(item.rating)} />
                          <span className="rating-score">{item.rating}</span>
                          <div>{item.visitors}</div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RoutePlanning; 