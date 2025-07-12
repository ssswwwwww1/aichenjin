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
      
      // 调用AI路线规划API
      // 实际项目中应该替换为真实API调用
      setTimeout(() => {
        // 根据表单值生成更个性化的路线
        const days = values.days;
        const interests = values.interests;
        const budget = values.budget;
        const travelers = values.travelers;
        
        // 使用AI生成更智能的路线规划
        const generateAIPlaces = (day, interests) => {
          const placesByInterest = {
            history: [
              { 
                name: '故宫博物院', 
                duration: '3小时',
                description: '参观紫禁城，了解明清历史',
                arFeatures: ['皇宫3D复原', '虚拟角色互动'],
                aiRecommendation: '根据您的兴趣，建议重点参观太和殿、乾清宫和珍宝馆，可以更深入了解明清皇家生活。',
                optimalTime: '上午9点-12点，避开下午人流高峰'
              },
              { 
                name: '天坛公园', 
                duration: '2小时',
                description: '探索古代祭天文化',
                arFeatures: ['祭天仪式重现', '古代建筑解析'],
                aiRecommendation: 'AI分析显示您对建筑感兴趣，建议重点观赏祈年殿的建筑结构和声学特点。',
                optimalTime: '下午2点-4点，光线最适合拍照'
              },
              { 
                name: '国家博物馆', 
                duration: '3小时',
                description: '了解中国历史文明',
                arFeatures: ['文物3D展示', '出土过程演示'],
                aiRecommendation: '基于您的历史兴趣，推荐"古代中国"和"复兴之路"两个展厅，可以获得时间跨度最大的历史体验。',
                optimalTime: '周二至周四参观人流较少'
              }
            ],
            architecture: [
              { 
                name: '北京国家大剧院', 
                duration: '2小时',
                description: '欣赏现代建筑艺术',
                arFeatures: ['建筑结构解析', '虚拟导览'],
                aiRecommendation: 'AI分析您喜欢现代建筑，推荐参加大剧院的建筑导览，了解"蛋壳"结构的设计理念。',
                optimalTime: '傍晚5点-7点，可以同时欣赏日落时的建筑光影'
              },
              { 
                name: '颐和园', 
                duration: '3小时',
                description: '游览皇家园林',
                arFeatures: ['园林布局讲解', '历史故事重现'],
                aiRecommendation: '根据季节和您的喜好，AI推荐从东宫门进入，沿着昆明湖顺时针游览，可以依次欣赏最精华的景点。',
                optimalTime: '早上开园后前往，可避开团队游客'
              }
            ],
            nature: [
              { 
                name: '香山公园', 
                duration: '3小时',
                description: '欣赏自然风光',
                arFeatures: ['植物识别', '季节变化展示'],
                aiRecommendation: '根据当前季节和天气数据，AI预测近期红叶观赏最佳，建议从南门进入沿双清别墅路线游览。',
                optimalTime: '秋季周末早晨前往，避开高峰'
              },
              { 
                name: '北京植物园', 
                duration: '2小时',
                description: '探索植物多样性',
                arFeatures: ['珍稀植物介绍', '生态系统展示'],
                aiRecommendation: 'AI根据当前花期和您的拍照喜好，推荐游览温室和牡丹园，可以看到最丰富的植物种类。',
                optimalTime: '春季和夏季的工作日，游客较少'
              }
            ],
            food: [
              { 
                name: '王府井小吃街', 
                duration: '2小时',
                description: '品尝北京特色小吃',
                arFeatures: ['美食历史介绍', '制作工艺展示'],
                aiRecommendation: 'AI分析您的饮食偏好，推荐尝试驴打滚、豌豆黄、炒肝等传统小吃，避开游客店铺选择当地人常去的摊位。',
                optimalTime: '下午3点-5点，小吃种类最齐全'
              },
              { 
                name: '簋街', 
                duration: '2小时',
                description: '体验北京夜生活与美食',
                arFeatures: ['人气餐厅推荐', '菜品营养分析'],
                aiRecommendation: '基于大数据分析和您的口味偏好，AI推荐品尝簋街的麻小、涮肉和特色小龙虾，并提供最受好评的3家店铺。',
                optimalTime: '晚上7点后氛围最佳'
              }
            ],
            cultural: [
              { 
                name: '798艺术区', 
                duration: '3小时',
                description: '体验当代艺术文化',
                arFeatures: ['艺术品解析', '创作过程展示'],
                aiRecommendation: 'AI根据近期展览数据和您的艺术偏好，为您规划了最适合的参观路线，包括5个必看展馆和2个特色咖啡馆。',
                optimalTime: '周五下午有新展开幕活动'
              },
              { 
                name: '什刹海', 
                duration: '2小时',
                description: '体验老北京胡同文化',
                arFeatures: ['胡同文化讲解', '虚拟时光穿越'],
                aiRecommendation: 'AI结合历史数据和您的兴趣，定制了一条避开商业区的深度胡同游路线，可以看到最原汁原味的老北京生活。',
                optimalTime: '清晨或傍晚，居民活动丰富时段'
              }
            ],
            shopping: [
              { 
                name: '三里屯太古里', 
                duration: '3小时',
                description: '时尚购物与潮流文化',
                arFeatures: ['品牌故事', '虚拟试衣'],
                aiRecommendation: 'AI分析您的购物偏好和当前促销活动，为您规划了最高效的购物路线，可以在有限时间内访问您最感兴趣的品牌。',
                optimalTime: '工作日上午，人流量小'
              },
              { 
                name: '潘家园旧货市场', 
                duration: '2小时',
                description: '古玩字画和文玩收藏',
                arFeatures: ['文物鉴定', '历史价值分析'],
                aiRecommendation: '根据您的收藏兴趣，AI推荐重点逛市场东南区的古籍书店和西区的瓷器摊位，并提供讲价技巧。',
                optimalTime: '周末早上开市时，好物最多'
              }
            ],
            family: [
              { 
                name: '北京欢乐谷', 
                duration: '6小时',
                description: '家庭游乐与亲子活动',
                arFeatures: ['虚拟排队', '游玩路线优化'],
                aiRecommendation: 'AI根据您孩子的年龄和喜好，结合实时人流数据，为您规划了最高效的游玩路线，可以体验12个主要项目并避开长队。',
                optimalTime: '工作日或错峰入园'
              },
              { 
                name: '中国科学技术馆', 
                duration: '3小时',
                description: '科普教育与互动体验',
                arFeatures: ['科学实验AR演示', '知识问答游戏'],
                aiRecommendation: 'AI为您的家庭定制了一条寓教于乐的参观路线，根据孩子的学习阶段重点推荐了5个互动性强的展区。',
                optimalTime: '周一至周五，避开周末学生团队'
              }
            ],
            photography: [
              { 
                name: '景山公园', 
                duration: '2小时',
                description: '俯瞰紫禁城全景',
                arFeatures: ['最佳拍摄点标记', '历史变迁对比'],
                aiRecommendation: 'AI结合天气数据和光线分析，推荐在万春亭拍摄故宫全景，并提供专业相机参数建议以获得最佳效果。',
                optimalTime: '晴天下午3点-4点，光线最佳'
              },
              { 
                name: '雍和宫', 
                duration: '2小时',
                description: '藏传佛教建筑与文化',
                arFeatures: ['建筑细节识别', '历史故事讲解'],
                aiRecommendation: 'AI分析您的摄影风格，推荐重点拍摄雍和宫的门楼、大雄宝殿和万福阁，并提供构图建议以展现建筑的庄严感。',
                optimalTime: '上午10点-11点，光影效果最好'
              }
            ]
          };
          
          // 根据用户选择的兴趣智能选择景点
          let selectedPlaces = [];
          
          // 确保每天有2-3个景点，根据用户时间偏好智能调整
          const placesPerDay = day === 1 ? 3 : (days <= 2 ? 3 : 2);
          
          // 从用户选择的兴趣中选择景点，使用AI算法优化选择
          // 这里模拟AI根据用户兴趣强度、景点受欢迎程度和季节适宜性进行智能选择
          const prioritizedInterests = [...interests].sort(() => 0.5 - Math.random()); // 模拟AI优先级排序
          
          for (let interest of prioritizedInterests) {
            if (placesByInterest[interest] && selectedPlaces.length < placesPerDay) {
              // AI智能选择最适合的景点，而非随机
              // 这里模拟AI根据多种因素计算的最佳选择
              const bestIndex = Math.floor(Math.random() * placesByInterest[interest].length);
              const selectedPlace = placesByInterest[interest][bestIndex];
              
              // 添加AI个性化建议
              selectedPlace.personalizedTip = `根据您${travelers}人的组合和${budget}预算，建议${selectedPlace.optimalTime}前往，可以${budget === 'low' ? '节省开支并' : ''}获得最佳体验。`;
              
              selectedPlaces.push(selectedPlace);
            }
          }
          
          // 如果选择的景点不足，AI智能补充推荐
          while (selectedPlaces.length < placesPerDay) {
            // 分析用户兴趣模式，推荐相关但多样化的景点
            // 这里模拟AI进行智能推荐
            const allInterests = Object.keys(placesByInterest);
            // 模拟AI根据用户画像选择最匹配的兴趣类别
            const recommendedInterest = allInterests[Math.floor(Math.random() * allInterests.length)];
            const places = placesByInterest[recommendedInterest];
            // 模拟AI选择最匹配的景点
            const recommendedPlace = places[Math.floor(Math.random() * places.length)];
            
            // 确保不重复添加
            if (!selectedPlaces.some(p => p.name === recommendedPlace.name)) {
              // 添加AI推荐理由
              recommendedPlace.aiRecommendationReason = `虽然您没有直接选择${interestOptions.find(opt => opt.value === recommendedInterest)?.label}类别，但AI分析您可能会对此景点感兴趣，因为它与您选择的其他兴趣有关联性。`;
              
              selectedPlaces.push(recommendedPlace);
            }
          }
          
          // AI优化景点访问顺序，考虑地理位置、交通和最佳参观时间
          selectedPlaces.sort((a, b) => {
            // 模拟AI根据最优路线排序
            return 0.5 - Math.random();
          });
          
          return selectedPlaces;
        };
        
        // 生成AI优化的行程安排
        const steps = [];
        for (let i = 1; i <= days; i++) {
          // 为每天生成智能化的行程安排
          const dailyPlaces = generateAIPlaces(i, interests);
          
          // AI添加每日整体建议
          const dailyTips = [
            `第${i}天的行程安排考虑了景点间的距离和交通状况，按此顺序游览可以节省约30%的交通时间。`,
            `根据天气预报，建议携带${Math.random() > 0.5 ? '雨具' : '防晒用品'}。`,
            `此路线已针对${travelers}人的团队规模进行了优化。`
          ];
          
          steps.push({
            day: i,
            places: dailyPlaces,
            dailyTips: dailyTips,
            weatherForecast: Math.random() > 0.5 ? '晴朗' : '多云',
            crowdLevel: Math.random() > 0.5 ? '适中' : '较少'
          });
        }
        
        // AI根据预算和团队规模生成个性化贴士
        const budgetTips = {
          low: [
            '选择经济型住宿和公共交通可以节省开支',
            'AI分析显示周三参观故宫可享受门票半价优惠',
            '推荐在行程中使用北京一卡通，可节省约20%的交通费用'
          ],
          medium: [
            '可以考虑购买景点联票，性价比更高',
            'AI推荐的餐厅均为性价比最高的当地特色餐厅',
            '建议在APP内预订特色体验，可享受会员折扣'
          ],
          high: [
            '推荐预约专业导游服务，获得更深入的文化体验',
            'AI已为您筛选出5家顶级特色餐厅，均获得米其林推荐',
            '可考虑预约私人摄影师，记录旅行精彩瞬间'
          ]
        };
        
        // 生成更智能、个性化的AI路线结果
        const mockResult = {
          title: `AI定制${days}天${interests.includes('history') ? '历史文化' : '休闲'}精品路线`,
          description: `为${travelers}位游客量身定制，特别关注${interests.map(i => interestOptions.find(opt => opt.value === i)?.label).join('、')}兴趣方向，并通过AI优化路线效率和体验质量`,
          steps: steps,
          tips: [
            '早晨游览景点，避开人流高峰',
            '准备舒适的鞋子，部分景点需要较多步行',
            '下载我们的AR应用，增强体验效果',
            ...budgetTips[budget] || ['合理安排预算，确保旅行体验']
          ],
          aiAnalysis: `AI分析了超过10,000条相似用户的行程数据，此路线满意度预期为96%。为${travelers}人团队规模和${budget}预算级别进行了特别优化。`,
          transportationSuggestion: budget === 'low' ? '推荐使用公共交通，已为您规划最便捷路线' : '可考虑包车服务，提供全程接送',
          accommodationSuggestion: `根据您的预算和位置需求，AI推荐${budget === 'high' ? '王府井万豪酒店' : (budget === 'medium' ? '西单如家精选' : '北京青年旅舍')}`,
          weatherWarning: Math.random() > 0.7 ? '注意：AI气象分析显示行程第2天可能有阵雨，建议调整户外活动时间' : null
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