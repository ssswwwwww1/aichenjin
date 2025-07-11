import React, { useState, useEffect } from 'react';
import { 
  Typography, Row, Col, Card, Form, Select, Button, Input, 
  Checkbox, Steps, message, Spin, Tag, List, Divider 
} from 'antd';
import { 
  RobotOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
  StarOutlined,
  BulbOutlined,
  SendOutlined,
  PictureOutlined
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
  const [savedRoutes, setSavedRoutes] = useState([]);

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

  // 当组件加载时，从localStorage获取保存的路线
  useEffect(() => {
    const savedUserRoutes = localStorage.getItem('userSavedRoutes');
    if (savedUserRoutes) {
      try {
        const parsedRoutes = JSON.parse(savedUserRoutes);
        setSavedRoutes(parsedRoutes);
      } catch (e) {
        console.error('解析保存的路线数据失败', e);
        setSavedRoutes([]);
      }
    }
  }, []);

  const handleAiRouteSubmit = () => {
    routeForm.validateFields().then(values => {
      setAiRouteLoading(true);
      setActiveTab('result');
      console.log('路线定制需求:', values);
      
      // 实际项目中应该替换为真实API调用
      setTimeout(() => {
        // 根据表单值生成更个性化的路线
        const days = values.days;
        const interests = values.interests;
        const budget = values.budget;
        const travelers = values.travelers;
        
        // 根据兴趣生成不同类型的景点
        const generatePlaces = (day, interests) => {
          const placesByInterest = {
            history: [
              { 
                name: '故宫博物院', 
                duration: '3小时',
                description: '参观紫禁城，了解明清历史',
                arFeatures: ['皇宫3D复原', '虚拟角色互动']
              },
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
              }
            ],
            architecture: [
              { 
                name: '北京国家大剧院', 
                duration: '2小时',
                description: '欣赏现代建筑艺术',
                arFeatures: ['建筑结构解析', '虚拟导览']
              },
              { 
                name: '颐和园', 
                duration: '3小时',
                description: '游览皇家园林',
                arFeatures: ['园林布局讲解', '历史故事重现']
              }
            ],
            nature: [
              { 
                name: '香山公园', 
                duration: '3小时',
                description: '欣赏自然风光',
                arFeatures: ['植物识别', '季节变化展示']
              },
              { 
                name: '北京植物园', 
                duration: '2小时',
                description: '探索植物多样性',
                arFeatures: ['珍稀植物介绍', '生态系统展示']
              }
            ],
            food: [
              { 
                name: '王府井小吃街', 
                duration: '2小时',
                description: '品尝北京特色小吃',
                arFeatures: ['美食历史介绍', '制作工艺展示']
              },
              { 
                name: '簋街', 
                duration: '2小时',
                description: '体验北京夜生活与美食',
                arFeatures: ['人气餐厅推荐', '菜品营养分析']
              }
            ],
            cultural: [
              { 
                name: '798艺术区', 
                duration: '3小时',
                description: '体验当代艺术文化',
                arFeatures: ['艺术品解析', '创作过程展示']
              },
              { 
                name: '什刹海', 
                duration: '2小时',
                description: '体验老北京胡同文化',
                arFeatures: ['胡同文化讲解', '虚拟时光穿越']
              }
            ]
          };
          
          // 根据用户选择的兴趣随机选择景点
          let selectedPlaces = [];
          
          // 确保每天有2-3个景点
          const placesPerDay = day === 1 ? 3 : 2;
          
          // 从用户选择的兴趣中选择景点
          for (let interest of interests) {
            if (placesByInterest[interest] && selectedPlaces.length < placesPerDay) {
              // 随机选择一个该兴趣的景点
              const randomIndex = Math.floor(Math.random() * placesByInterest[interest].length);
              selectedPlaces.push(placesByInterest[interest][randomIndex]);
            }
          }
          
          // 如果选择的景点不足，从所有兴趣中补充
          while (selectedPlaces.length < placesPerDay) {
            const allInterests = Object.keys(placesByInterest);
            const randomInterest = allInterests[Math.floor(Math.random() * allInterests.length)];
            const places = placesByInterest[randomInterest];
            const randomPlace = places[Math.floor(Math.random() * places.length)];
            
            // 确保不重复添加
            if (!selectedPlaces.some(p => p.name === randomPlace.name)) {
              selectedPlaces.push(randomPlace);
            }
          }
          
          return selectedPlaces;
        };
        
        // 生成行程安排
        const steps = [];
        for (let i = 1; i <= days; i++) {
          steps.push({
            day: i,
            places: generatePlaces(i, interests)
          });
        }
        
        // 根据预算生成不同的贴士
        const budgetTips = {
          low: '选择经济型住宿和公共交通可以节省开支',
          medium: '可以考虑购买景点联票，性价比更高',
          high: '推荐预约专业导游服务，获得更深入的文化体验'
        };
        
        const mockResult = {
          title: `${days}天${interests.includes('history') ? '历史文化' : '休闲'}路线`,
          description: `为${travelers}位游客量身定制，特别关注${interests.map(i => interestOptions.find(opt => opt.value === i)?.label).join('、')}兴趣方向`,
          steps: steps,
          tips: [
            '早晨游览景点，避开人流高峰',
            '准备舒适的鞋子，部分景点需要较多步行',
            '下载我们的AR应用，增强体验效果',
            budgetTips[budget] || '合理安排预算，确保旅行体验'
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
      setSavedRoutes(updatedRoutes);
      
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
              className="main-card glass-effect" 
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
                    interests: ['history', 'cultural']
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
              className="sidebar-card glass-effect"
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
              className="sidebar-card glass-effect"
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
                          <div className="rating-score">{item.rating}分</div>
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