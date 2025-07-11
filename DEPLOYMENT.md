# 爱沉浸 - 部署指南

本指南将帮助您部署"爱沉浸"平台，使其能够通过网络链接访问。

## 本地部署

### 构建项目

1. 首先，确保您已安装所有依赖：

```bash
npm install
```

2. 构建生产版本：

```bash
npm run build
```

这会在项目根目录下创建一个 `build` 文件夹，里面包含了优化后的代码文件。

3. 启动本地服务器：

```bash
node server/index.js
```

4. 打开浏览器访问 http://localhost:5000 即可查看网站。

### 局域网访问

如果您想让同一局域网内的其他设备访问您的网站，需要找到您的局域网IP地址：

- Windows: 打开命令提示符，输入 `ipconfig` 查看 IPv4 地址
- Mac/Linux: 打开终端，输入 `ifconfig` 或 `ip addr` 查看IP地址

然后，其他设备可以通过 `http://您的IP地址:5000` 访问网站。

## 远程部署

要使网站能够通过互联网访问，您可以选择以下几种方法：

### 方法1: Netlify 部署 (推荐，免费)

1. 注册 [Netlify](https://www.netlify.com/) 账号
2. 创建新站点，选择"从现有代码部署"
3. 将本项目上传或连接到GitHub仓库
4. 配置构建命令: `npm run build`
5. 配置发布目录: `build`
6. 点击部署

**注意**: 由于我们有后端API，您可能需要将API部署到其他服务上，如Heroku，然后修改前端代码中的API地址。

### 方法2: Vercel 部署 (免费)

1. 注册 [Vercel](https://vercel.com/) 账号
2. 安装Vercel CLI: `npm i -g vercel`
3. 在项目根目录运行: `vercel`
4. 根据提示完成部署

### 方法3: 使用云服务器 (需付费)

1. 租用云服务器 (如阿里云、腾讯云、AWS等)
2. 安装Node.js环境
3. 上传项目文件
4. 安装依赖: `npm install`
5. 构建项目: `npm run build`
6. 使用PM2等工具管理Node进程:
   ```bash
   npm install -g pm2
   pm2 start server/index.js
   ```
7. 配置域名和HTTPS (如需要)

## 绑定域名 (可选)

如果您希望使用自己的域名 (如 www.aichenjin.com)：

1. 购买域名 (如阿里云、腾讯云等)
2. 在DNS管理中添加解析记录，指向您的服务器IP
3. 在服务器配置中设置域名
4. 建议配置HTTPS证书以增强安全性

## 常见问题

1. **服务器错误**: 检查服务器日志，确认Node.js版本是否兼容
2. **无法访问**: 检查防火墙设置，确认端口是否开放
3. **样式丢失**: 确认构建过程正确完成，所有静态资源都在正确位置

## 技术支持

如有部署问题，请通过以下方式寻求支持：

- 提交GitHub Issue
- 发送邮件至 support@aichenjin.com

---

祝您部署顺利！ 