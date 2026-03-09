# ClawsBag 阿里云 ECS 部署指南

## 一、准备工作

### 1. 购买阿里云 ECS
- 登录 [ECS 控制台](https://ecs.console.aliyun.com/)
- 推荐配置：2核4G、Ubuntu 22.04、40G 系统盘
- 安全组开放端口：22(SSH)、80(HTTP)、443(HTTPS)

### 2. 购买域名 + 备案（必须）
- 在阿里云购买域名
- 完成 ICP 备案（约 5-10 个工作日）
- 域名解析 A 记录指向 ECS 公网 IP

### 3. 开通阿里云短信服务
- 登录 [短信控制台](https://dysms.console.aliyun.com/)
- 添加短信签名（公司名或产品名，如 "ClawsBag"）
- 添加短信模板，内容：`您的验证码为：${code}，5分钟内有效。`
- 记下签名名称和模板 Code

### 4. 创建阿里云 OSS Bucket
- 登录 [OSS 控制台](https://oss.console.aliyun.com/)
- 创建 Bucket，选就近区域（如 `oss-cn-hangzhou`）
- Bucket 权限设为 **公共读**
- 跨域设置(CORS)：允许源 `*`，允许方法 `GET,PUT,POST`

### 5. 获取 AccessKey
- 登录 [RAM 控制台](https://ram.console.aliyun.com/manage/ak)
- 创建 AccessKey，保存好 ID 和 Secret
- **强烈建议**：创建子账号，只授予 SMS 和 OSS 权限

---

## 二、服务器环境搭建

### SSH 登录服务器
```bash
ssh root@你的ECS公网IP
```

### 安装 Node.js 20
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v  # 确认 v20.x
```

### 安装 PM2（进程管理）
```bash
sudo npm install -g pm2
```

### 安装 Nginx
```bash
sudo apt-get install -y nginx
sudo systemctl enable nginx
```

### 安装 Git
```bash
sudo apt-get install -y git
```

---

## 三、部署项目

### 1. 上传代码
```bash
# 方式一：从 Git 仓库拉取（推荐）
cd /var/www
git clone https://github.com/你的用户名/clawsbag.git
cd clawsbag

# 方式二：本地上传（如果没有 Git 仓库）
# 在本地执行：
# scp -r /Volumes/miaomiao/clawsbag root@ECS公网IP:/var/www/clawsbag
```

### 2. 配置环境变量
```bash
cd /var/www/clawsbag
cp .env.production.example .env

# 编辑 .env，填入真实配置
nano .env
```

需要填写的关键配置：
- `DATABASE_URL`：生产环境用 SQLite 也可以（`file:./prod.db`），数据量大时换 MySQL
- `JWT_SECRET`：运行 `openssl rand -hex 32` 生成
- `ALIYUN_ACCESS_KEY_ID` / `ALIYUN_ACCESS_KEY_SECRET`
- `ALIYUN_SMS_SIGN_NAME` / `ALIYUN_SMS_TEMPLATE_CODE`
- `ALIYUN_OSS_REGION` / `ALIYUN_OSS_BUCKET`

### 3. 安装依赖 + 构建
```bash
npm install
npx prisma generate
npm run prisma:compile
npx prisma migrate deploy
npm run build
```

### 4. 初始化数据（首次部署）
```bash
npx tsx prisma/seed.ts
```

### 5. 启动应用
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # 设置开机自启
```

### 6. 配置 Nginx
```bash
sudo cp nginx.conf /etc/nginx/sites-available/clawsbag
sudo ln -sf /etc/nginx/sites-available/clawsbag /etc/nginx/sites-enabled/clawsbag
sudo rm -f /etc/nginx/sites-enabled/default

# 编辑 nginx 配置，替换域名
sudo nano /etc/nginx/sites-available/clawsbag
# 将 your-domain.com 替换为你的真实域名

sudo nginx -t        # 测试配置
sudo systemctl reload nginx
```

---

## 四、配置 HTTPS（推荐）

### 使用阿里云免费 SSL 证书
1. 登录 [SSL 证书控制台](https://yundunnext.console.aliyun.com/?p=cas)
2. 申请免费证书（DV 单域名）
3. 下载 Nginx 格式证书
4. 上传到服务器：

```bash
sudo mkdir -p /etc/nginx/ssl
sudo cp your-domain.com.pem /etc/nginx/ssl/
sudo cp your-domain.com.key /etc/nginx/ssl/
```

5. 取消 `nginx.conf` 中 HTTPS 部分的注释，填入域名和证书路径
6. 重载 Nginx：`sudo systemctl reload nginx`

---

## 五、日常运维

### 查看应用状态
```bash
pm2 status
pm2 logs clawsbag         # 查看日志
pm2 logs clawsbag --lines 100  # 最近100行
```

### 更新代码
```bash
cd /var/www/clawsbag
git pull                   # 或重新上传代码
npm install
npx prisma generate
npm run prisma:compile
npx prisma migrate deploy
npm run build
pm2 restart clawsbag
```

### 数据库备份（SQLite）
```bash
# 手动备份
cp /var/www/clawsbag/prod.db /var/www/backups/prod-$(date +%Y%m%d).db

# 定时备份（每天凌晨3点）
crontab -e
# 添加：0 3 * * * cp /var/www/clawsbag/prod.db /var/www/backups/prod-$(date +\%Y\%m\%d).db
```

---

## 六、常见问题

### Q: 网站打不开？
```bash
pm2 status                 # 检查应用是否在运行
sudo systemctl status nginx  # 检查 Nginx 状态
curl http://localhost:3000   # 直接测试 Node 应用
```

### Q: 验证码收不到？
- 检查 `.env` 中的 `ALIYUN_SMS_*` 配置
- 确认短信签名和模板已审核通过
- 查看日志：`pm2 logs clawsbag | grep SMS`

### Q: 文件上传失败？
- 检查 `.env` 中的 `ALIYUN_OSS_*` 配置
- 确认 Bucket 的 CORS 设置
- Nginx 的 `client_max_body_size` 是否足够

### Q: 数据库迁移失败？
```bash
# 如果是首次部署，可以直接推送
npx prisma db push

# 如果之前有数据，先备份再迁移
cp prod.db prod.db.bak
npx prisma migrate deploy
```
