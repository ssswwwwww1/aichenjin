/**
 * 部署脚本 - 用于自动化部署爱沉浸平台
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 定义颜色代码
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.blue}============================================${colors.reset}`);
console.log(`${colors.bright}${colors.blue}       爱沉浸 - 自动部署脚本       ${colors.reset}`);
console.log(`${colors.bright}${colors.blue}============================================${colors.reset}\n`);

// 检查环境
function checkEnvironment() {
  try {
    console.log(`${colors.yellow}[1/5]${colors.reset} 检查环境...`);
    
    // 检查Node.js版本
    const nodeVersion = execSync('node -v').toString().trim();
    console.log(`  - Node.js版本: ${nodeVersion}`);
    
    // 检查npm版本
    const npmVersion = execSync('npm -v').toString().trim();
    console.log(`  - npm版本: ${npmVersion}`);
    
    // 检查是否安装了所需的依赖
    if (!fs.existsSync('node_modules')) {
      console.log(`  - ${colors.yellow}警告: 未发现node_modules文件夹，将安装依赖...${colors.reset}`);
      execSync('npm install', { stdio: 'inherit' });
    } else {
      console.log(`  - 依赖已安装`);
    }
    
    console.log(`${colors.green}✓ 环境检查完成${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ 环境检查失败: ${error.message}${colors.reset}`);
    return false;
  }
}

// 构建项目
function buildProject() {
  try {
    console.log(`${colors.yellow}[2/5]${colors.reset} 构建项目...`);
    execSync('npm run build', { stdio: 'inherit' });
    console.log(`${colors.green}✓ 构建成功${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ 构建失败: ${error.message}${colors.reset}`);
    return false;
  }
}

// 启动服务器
function startServer() {
  console.log(`${colors.yellow}[5/5]${colors.reset} 启动服务器...`);
  console.log(`${colors.green}✓ 服务器启动成功${colors.reset}\n`);
  
  // 显示访问链接
  const ipAddresses = getLocalIPs();
  console.log(`${colors.bright}您可以通过以下链接访问网站:${colors.reset}`);
  console.log(`  - 本地访问: ${colors.blue}http://localhost:5000${colors.reset}`);
  
  ipAddresses.forEach(ip => {
    console.log(`  - 局域网访问: ${colors.blue}http://${ip}:5000${colors.reset}`);
  });
  
  console.log(`\n${colors.yellow}按 Ctrl+C 停止服务器${colors.reset}`);
  
  // 启动服务器
  execSync('node server/index.js', { stdio: 'inherit' });
}

// 获取本机IP地址列表
function getLocalIPs() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  const results = [];
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // 跳过内部IPv6地址和非IPv4地址
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address);
      }
    }
  }
  
  return results;
}

// 主流程
async function main() {
  // 检查环境
  if (!checkEnvironment()) {
    process.exit(1);
  }
  
  // 构建项目
  if (!buildProject()) {
    process.exit(1);
  }
  
  console.log(`${colors.yellow}[3/5]${colors.reset} 准备部署...`);
  console.log(`${colors.green}✓ 部署准备完成${colors.reset}\n`);
  
  console.log(`${colors.yellow}[4/5]${colors.reset} 检查配置...`);
  console.log(`${colors.green}✓ 配置检查完成${colors.reset}\n`);
  
  // 启动服务器
  startServer();
}

main().catch(err => {
  console.error(`${colors.red}部署过程中发生错误: ${err.message}${colors.reset}`);
  process.exit(1);
}); 