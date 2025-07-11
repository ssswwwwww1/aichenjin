import axios from 'axios';

// 根据环境确定API基地址
const isDevelopment = process.env.NODE_ENV === 'development';
const BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api' 
  : '/api';  // 生产环境下，API与前端在同一域名下

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器 - 添加token等认证信息
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器 - 处理常见错误
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 未授权，清除本地凭证并重定向到登录页
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API函数
export const getARExperiences = () => api.get('/ar-experiences');
export const getARExperienceById = (id) => api.get(`/ar-experiences/${id}`);
export const login = (credentials) => api.post('/auth/login', credentials);

// 用户相关
export const register = (userData) => api.post('/auth/register', userData);
export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (data) => api.put('/users/profile', data);
export const getUserOrders = () => api.get('/users/orders');
export const getUserFavorites = () => api.get('/users/favorites');

// 通知系统
export const getNotifications = () => api.get('/notifications');
export const markNotificationAsRead = (id) => api.put(`/notifications/${id}/read`);
export const markAllNotificationsAsRead = () => api.put('/notifications/read-all');
export const getUnreadNotificationCount = () => api.get('/notifications/unread-count');

// 聊天系统
export const getChatRooms = () => api.get('/chat/rooms');
export const getChatMessages = (roomId) => api.get(`/chat/rooms/${roomId}/messages`);
export const sendChatMessage = (roomId, message) => api.post(`/chat/rooms/${roomId}/messages`, { message });
export const createChatRoom = (data) => api.post('/chat/rooms', data);

// 文化学习
export const getCulturalCourses = () => api.get('/cultural-learning/courses');
export const getCourseById = (id) => api.get(`/cultural-learning/courses/${id}`);
export const enrollCourse = (courseId) => api.post(`/cultural-learning/courses/${courseId}/enroll`);

// 社区互动
export const getCommunityPosts = (params) => api.get('/community/posts', { params });
export const createCommunityPost = (data) => api.post('/community/posts', data);
export const likePost = (postId) => api.post(`/community/posts/${postId}/like`);
export const commentOnPost = (postId, comment) => api.post(`/community/posts/${postId}/comments`, { content: comment });

// 虚拟导览
export const getVirtualTours = () => api.get('/virtual-tours');
export const getVirtualTourById = (id) => api.get(`/virtual-tours/${id}`);
export const saveVirtualTourProgress = (tourId, data) => api.post(`/virtual-tours/${tourId}/progress`, data);

// 语音助手
export const sendVoiceQuery = (audioData) => api.post('/voice-assistant/query', audioData);
export const getCulturalInformation = (query) => api.get('/voice-assistant/information', { params: { query } });

// 预订功能
export const getAvailableTours = (params) => api.get('/booking/tours', { params });
export const createBooking = (data) => api.post('/booking/create', data);
export const getBookingById = (id) => api.get(`/booking/${id}`);
export const cancelBooking = (id) => api.post(`/booking/${id}/cancel`);

// DeepSeek AI API调用
export const askDeepSeekAI = async (question) => {
  try {
    const API_KEY = 'sk-3f62c6c793274de9a166b59f085282d0';
    const API_URL = 'https://api.deepseek.com/v1/chat/completions';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个专注于中国传统文化和非物质文化遗产的AI助手，特别精通北京地区的文化遗产。你的回答应该准确、详细且富有文化底蕴。'
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API调用失败:', error);
    return '抱歉，我暂时无法回答这个问题，请稍后再试。';
  }
};

export default api; 