const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务 - 为React应用服务
app.use(express.static(path.join(__dirname, '../build')));

// 模拟数据
const arExperiences = [
  {
    id: 1,
    title: '故宫·紫禁城',
    cover: 'https://via.placeholder.com/300x200?text=故宫紫禁城',
    description: '通过AR技术探索故宫紫禁城的建筑特色和历史故事',
    location: '北京市东城区景山前街4号',
    tags: ['文化遗产', '古建筑', '历史'],
    features: ['3D建筑复原', '历史人物互动', '语音导览', '文物知识库']
  },
  {
    id: 2,
    title: '颐和园·长廊AR导览',
    cover: 'https://via.placeholder.com/300x200?text=颐和园长廊',
    description: '在长廊漫步，AR叠加展示每幅彩绘背后的典故与艺术特色',
    location: '北京市海淀区新建宫门路19号',
    tags: ['园林艺术', '彩绘', '建筑'],
    features: ['彩绘故事讲解', '四季景观变换', '古人物对话', '互动拍照']
  }
];

const courses = [
  {
    id: 1,
    title: '故宫建筑解析',
    cover: 'https://via.placeholder.com/300x200?text=故宫建筑解析',
    description: '深入解析故宫建筑的布局、特色和历史文化意义',
    instructor: '王教授',
    duration: '3小时20分钟',
    rating: 4.8,
    category: 'architecture',
    type: 'video',
    lessonCount: 12
  },
  {
    id: 2,
    title: '中国传统剪纸艺术',
    cover: 'https://via.placeholder.com/300x200?text=中国传统剪纸艺术',
    description: '从基础入门到高级技巧，掌握传统剪纸艺术',
    instructor: '李老师',
    duration: '2小时45分钟',
    rating: 4.7,
    category: 'intangible',
    type: 'interactive',
    lessonCount: 8
  }
];

const communityPosts = [
  {
    id: 1,
    author: '文化爱好者',
    avatar: 'https://via.placeholder.com/40',
    title: '故宫春节灯会，一场视觉与文化的盛宴',
    content: '昨天有幸参观了故宫新春灯会，整个紫禁城被璀璨的彩灯点亮，传统与现代的结合令人惊叹。大家有去的吗？分享一下感受吧！',
    time: '2小时前',
    likes: 156,
    comments: 28,
    shares: 42,
    images: [
      'https://via.placeholder.com/300x200?text=故宫灯会1',
      'https://via.placeholder.com/300x200?text=故宫灯会2',
      'https://via.placeholder.com/300x200?text=故宫灯会3'
    ],
    tags: ['故宫', '文化活动', '新春灯会']
  }
];

// API路由
app.get('/api/ar-experiences', (req, res) => {
  res.json(arExperiences);
});

app.get('/api/ar-experiences/:id', (req, res) => {
  const experience = arExperiences.find(exp => exp.id === parseInt(req.params.id));
  if (!experience) {
    return res.status(404).json({ error: '未找到该体验' });
  }
  res.json(experience);
});

app.get('/api/courses', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    const filteredCourses = courses.filter(course => course.category === category);
    return res.json(filteredCourses);
  }
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({ error: '未找到该课程' });
  }
  res.json(course);
});

app.get('/api/community/posts', (req, res) => {
  res.json(communityPosts);
});

app.post('/api/community/posts', (req, res) => {
  const { title, content, tags, author } = req.body;
  
  // 简单验证
  if (!content || !author) {
    return res.status(400).json({ error: '缺少必要字段' });
  }
  
  const newPost = {
    id: communityPosts.length + 1,
    title: title || '无标题',
    content,
    author,
    avatar: 'https://via.placeholder.com/40',
    time: '刚刚',
    likes: 0,
    comments: 0,
    shares: 0,
    tags: tags || [],
    images: []
  };
  
  communityPosts.push(newPost);
  res.status(201).json(newPost);
});

// 身份验证路由(简单示例)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // 这里应该是真正的身份验证逻辑
  if (username === 'demo' && password === 'password') {
    return res.json({
      user: {
        id: 1,
        username: 'demo',
        nickname: '文化探索者',
        avatar: 'https://via.placeholder.com/150',
      },
      token: 'sample-jwt-token'
    });
  }
  
  res.status(401).json({ error: '用户名或密码错误' });
});

// 健康检查
app.get('/health', (req, res) => {
  res.send('Server is running');
});

// 对于所有其他GET请求，返回React应用
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`访问 http://localhost:${PORT} 查看网站`);
}); 