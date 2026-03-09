# Suki Rewards — 开发任务清单

> 配套文档：`suki-rewards-frontend-plan.md`（需求规格 + 页面线框 + Mock 数据定义）
> 本文档定位：开发执行清单，明确做什么、按什么顺序做、每步交付什么

---

## 〇、架构决策（开工前先对齐）

| 决策点 | 原文档 | 建议调整 | 理由 |
|--------|--------|----------|------|
| 项目结构 | 两个独立 React 应用 | **一个项目，两套路由** `/user/*` + `/admin/*` | 共享 Mock 数据和公共组件，开发快一倍，部署也只需一个地址 |
| 消息通知 | 独立页面 `/notifications` | **合并到 Home 页**，点击铃铛图标弹出通知列表 | 内容纯静态，不值得独立路由，减少一个页面 |
| 动画效果 | 与页面开发穿插进行 | **全部放到最后统一润色** | 先保证所有页面跑通，再加锦上添花的动画 |
| P2 页面 | 与 P0 同等详细度 | **做最简展示版**（只读数据 + 基本布局） | 演示时一划而过，投入产出比低 |

---

## 一、阶段一：骨架 + 数据层

> 目标：项目能跑，路由能跳，Mock 数据就位，公共组件可复用

### Step 1 · 项目初始化 + 路由 `~20min`

**做什么：**
- React + Tailwind CSS + Recharts 项目搭建
- 路由结构配置（React Router）
- 全局样式变量：主色 `#6C3CE1`、辅助色 `#F5A623`、背景色 `#F8F6FF`
- 字体：Inter / system-ui

**路由表：**
```
/login                → 登录（用户端入口）
/user/home            → 会员主页
/user/points          → 积分中心
/user/coupons         → 优惠券钱包
/user/store           → 积分商城
/user/refer           → 推荐裂变

/admin/dashboard      → 数据看板（后台入口）
/admin/members        → 会员管理
/admin/tiers          → 等级体系
/admin/points-rules   → 积分规则
/admin/campaigns      → 营销活动
/admin/push           → 推送通知
/admin/referral       → 裂变追踪
/admin/stores         → 门店管理
```

**交付物：** 项目能 `npm start` 跑起来，点击任意路由显示占位页面名称

---

### Step 2 · 全局 Mock 数据 `~20min`

**做什么：**
- 创建 `src/data/mockData.js`，一个文件集中管理所有 Mock 数据
- 数据结构直接参考原文档"第五节 Mock 数据总表"
- 补充原文档未覆盖的数据：Dashboard 图表时序数据（30 天）、会员列表（至少 8 条）、活动列表、推送历史等

**核心数据模块：**
```
mockUser          → 用户端当前登录用户（Maria Santos）
mockBusiness      → 商家基本信息
mockCoupons       → 优惠券列表（4 条，含已用/未用/即将过期）
mockStoreItems    → 积分商城商品（6 条，3 个分类）
mockPointsHistory → 积分流水（10+ 条，含 earned/used）
mockTasks         → 每日任务（4 条）
mockReferral      → 裂变数据（邀请码 + 好友列表）
mockNotifications → 通知列表（5 条，分 today/yesterday）
mockMembers       → 后台会员列表（8-10 条，含各等级）
mockCampaigns     → 营销活动列表（3 条，active/scheduled/ended 各一）
mockPushHistory   → 推送历史（3 条）
mockTiers         → 等级定义（4 个等级 + 人数 + 权益）
mockPointsRules   → 积分规则配置
mockStores        → 门店列表（3 家 + Cashier 数据）
mockReferralStats → 后台裂变统计（Top Referrers + 30 天趋势）
mockDashboard     → Dashboard KPI + 图表数据
```

**交付物：** 数据文件就绪，任意页面可 `import` 使用

---

### Step 3 · 公共组件 `~30min`

**做什么：**
- `LoadingOverlay` — 全屏半透明遮罩 + Spinner，1~1.5s 后自动关闭
- `Toast` — 底部弹出提示（成功绿 / 失败红），2s 自动消失
- `TabBar`（用户端）— 底部 5 Tab 固定导航：Home / Points / Coupons / Store / Profile
- `Sidebar`（后台）— 左侧 240px 固定导航，含门店切换下拉
- `PageHeader` — 后台页面标题栏（标题 + 右侧操作按钮）
- `Modal` — 通用弹窗壳子（后续兑换确认、创建活动等复用）
- `useLoading` hook — 封装"点击 → loading → 成功回调"逻辑

**交付物：** 组件可独立渲染，TabBar 和 Sidebar 路由跳转正常

---

### Step 4 · 用户端壳子 `~10min`

**做什么：**
- 用户端 Layout：顶部状态区 + 内容区 + 底部 TabBar
- 5 个路由挂载占位组件
- 移动端视口设置 `<meta name="viewport">`，375px 基准

**交付物：** 底部 Tab 切换能跳转到对应空白页

---

### Step 5 · 后台壳子 `~10min`

**做什么：**
- 后台 Layout：左侧 Sidebar + 右侧内容区
- 8 个路由挂载占位组件
- PC 端 1280px 基准宽度

**交付物：** 侧边栏点击能跳转到对应空白页

---

## 二、阶段二：用户端页面

> 目标：用户端 Demo 可以走完整条演示路线
> 每步完成后等确认再继续

### Step 6 · 登录页 `/login` `~25min` `P0`

**做什么：**
- 品牌区渐变背景（紫色渐变）+ Logo + Slogan "Earn. Save. Enjoy."
- 手机号输入框（+63 前缀）→ Send OTP → loading → OTP 6 位输入框
- 任意 6 位数验证成功 → 跳转 /user/home
- Facebook 登录按钮 → loading → 直接成功
- 底部 "New? Join for free" 链接（Mock，点击同样进入）

**参考：** 原文档页面 1

---

### Step 7 · 会员主页 `/user/home` `~40min` `P0 核心页`

**做什么：**
- 顶栏：问候语 "Hi, Maria! 👋" + 通知铃铛（角标 3）
- 通知弹出层（点铃铛展开通知列表，替代独立通知页）
- 会员卡组件：紫金渐变卡片，Gold 等级、姓名、卡号后四位、2,450 pts、距 Platinum 进度条
- 快捷入口 4 宫格：积分 / 优惠券 / 商城 / 邀请（点击跳转对应路由）
- 今日任务区：3 个任务项（✅ 已完成灰色 / ⬜ 待完成可点击）
- Exclusive Offers 横向滚动优惠券卡片（2-3 张）
- Recent Activity 最近 3 条积分流水

**参考：** 原文档页面 2 + 页面 7（通知合并进来）

---

### Step 8 · 积分中心 `/user/points` `~30min` `P0`

**做什么：**
- 总积分卡片：2,450 pts + "≈ ₱245 value"
- 7 天签到日历格子：前 4 天已签（绿色），今天可签，后 2 天灰色
- [Check In Today] 按钮 → loading → 第 5 格变绿 + Toast "+10 pts"
- 任务列表：4 个任务（2 done / 2 undone），点击 undone → loading → 变 done
- 积分历史：[Earned / Used] Tab 切换，列表展示日期 + 描述 + 积分值

**参考：** 原文档页面 3

---

### Step 9 · 优惠券钱包 `/user/coupons` `~25min` `P0`

**做什么：**
- 顶部 Tab：All / Active / Used
- 优惠券卡片列表：百分比券、固定金额券、赠品券样式区分
- 即将过期标红提示（3 天内）
- 点击 [Use Now] → 核销弹窗：大号二维码（用 SVG 模拟）+ 券码 + "Valid 5 mins" 倒计时
- 已使用券置灰 + "Used" 标记

**参考：** 原文档页面 4

---

### Step 10 · 积分商城 `/user/store` `~25min` `P0`

**做什么：**
- 顶部积分余额展示
- 分类横向 Tab：All / Vouchers / Gifts / Experience
- 2 列商品卡片 Grid：商品图占位色块 + 名称 + 积分 + 库存
- 点击 [Redeem] → 确认弹窗：商品名 + 扣减积分 + 剩余积分
- [Confirm Redeem] → loading → Toast 成功 + 积分更新

**参考：** 原文档页面 5

---

### Step 11 · 推荐裂变 `/user/refer` `~20min` `P0`

**做什么：**
- 激励说明卡片："You get +100 pts / Friend gets +50 pts"
- 邀请码展示 `MARIA2026` + [Copy] 按钮 → Toast "Copied!"
- 分享按钮组：Facebook / WhatsApp / Generate Poster（点击均 Toast 模拟）
- Your Referrals 列表：7 人已邀请，显示姓名 + 状态（joined / pending）

**参考：** 原文档页面 6

---

## 三、阶段三：后台页面

> 目标：后台 Demo 可以走完整条演示路线

### Step 12 · Dashboard 看板 `/admin/dashboard` `~45min` `P0 核心页`

**做什么：**
- 4 个 KPI 卡片：Total Members / Active Members / Pts Issued / Coupon Redeemed（数值 + 环比百分比）
- 会员增长折线图（Recharts，近 30 天）
- 会员等级饼图（Bronze 45% / Silver 30% / Gold 20% / Platinum 5%）
- 积分发放 vs 消耗柱状图（近 6 个月）
- AI Insights 卡片：2-3 条洞察文案 + [View Details] 按钮

**参考：** 原文档后台页面 1

---

### Step 13 · 会员管理 `/admin/members` `~35min` `P0`

**做什么：**
- 顶部：标题 + 会员总数 + [+ Add Member] 按钮
- 搜索框 + Tier 下拉筛选 + Status 下拉筛选 + [Export] 按钮
- 会员列表表格：Name / Phone / Tier / Points / Joined / Status
- 点击某行 → 右侧滑出抽屉：会员详情 + [Adjust Points] 加减积分 + Tags 标签 + Notes + Activity History
- [Save] → loading → Toast 成功

**参考：** 原文档后台页面 2

---

### Step 14 · 营销活动 `/admin/campaigns` `~30min` `P0`

**做什么：**
- 顶部：标题 + [+ New Campaign] 按钮
- 状态 Tab：All / Active / Scheduled / Ended
- 活动卡片列表：状态标签（绿/黄/灰）+ 活动名 + 时间 + 目标人群 + 已领取数 + 预算
- 卡片操作按钮：[Edit] [Pause/Cancel] [Stats]
- [+ New Campaign] → Modal 表单：名称 / 类型 / 优惠券 / 目标等级 / 起止日期 / 预算 → [Create] → loading → 新增到列表

**参考：** 原文档后台页面 5

---

### Step 15 · 推送通知 `/admin/push` `~20min` `P1`

**做什么：**
- 编辑表单：Title + Message 文本框
- Target Audience 三选一：All Members / By Tier / At-risk users
- Schedule：Send Now / 预约时间
- [Send Message] → loading → Toast + 新增到发送历史
- Recent Sends 列表：消息摘要 + 发送量 + 打开率 + 日期

**参考：** 原文档后台页面 6

---

### Step 16 · 裂变追踪 `/admin/referral` `~25min` `P1`

**做什么：**
- 4 个统计卡片：Total Referrals / This Month / Conv. Rate / Pts Rewarded
- 每日新增裂变折线图（Recharts，近 30 天）
- Top Referrers 排行表格：Rank / Name / Referred / Pts Earned

**参考：** 原文档后台页面 7

---

### Step 17 · 等级体系 `/admin/tiers` `~15min` `P2`

**做什么：**
- 4 个等级卡片横排：等级名 + 积分区间 + 权益列表 + 会员人数
- [Edit] 按钮（点击 Toast 提示 "Coming soon" 即可）

**参考：** 原文档后台页面 3

---

### Step 18 · 积分规则 `/admin/points-rules` `~15min` `P2`

**做什么：**
- 表单布局展示当前规则：Purchase / Check-in / Task / Special Events
- 各输入框预填 Mock 值，可编辑
- [Save Changes] → loading → Toast 成功

**参考：** 原文档后台页面 4

---

### Step 19 · 门店管理 `/admin/stores` `~15min` `P2`

**做什么：**
- 门店表格：Store / Location / Members / Cashiers / Status
- 点击门店行展开 Cashier 列表
- [+ Add Store] 和 [+ Add Cashier] 按钮（Toast "Coming soon"）

**参考：** 原文档后台页面 8

---

## 四、收尾润色（有余力再做）

### Step 20 · 动画 + 微交互 `~30min`

- 积分数字变动时的滚动计数动画
- 签到成功 "+10 pts" 飞出效果
- 页面切换 fade / slide 过渡
- 会员卡片轻微 3D 倾斜 hover 效果

### Step 21 · 全流程走查 `~20min`

- 按原文档"第八节 Demo 演示路线"走两遍（用户端 5min + 后台 5min）
- 修复走查中发现的 bug、间距、文案问题

---

## 五、注意事项备忘

| # | 事项 |
|---|------|
| 1 | 货币统一 `₱`，数字千分位逗号（`2,450`），日期 `MM/DD/YYYY` |
| 2 | 所有可点击操作统一走 `useLoading` hook：loading 1~1.5s → 成功回调 |
| 3 | 用户端设计关键词：渐变、大圆角 16px、年轻活泼 |
| 4 | 后台设计关键词：白底、卡片阴影、Recharts 图表、专业克制 |
| 5 | 二维码用 SVG 矩阵模拟即可，不需要真实编码 |
| 6 | 后台辅助色：绿色 `#10B981`（正向）、黄色 `#F59E0B`（警告） |
| 7 | 积分商城图片用纯色块 + emoji 占位，不依赖外部图片资源 |
| 8 | 每个 Step 完成后等确认再继续下一步 |

---

## 六、文档配合方式

| 文档 | 用途 |
|------|------|
| `suki-rewards-frontend-plan.md` | **查需求**：看页面线框图、Mock 数据字段定义、交互细节 |
| `suki-rewards-dev-checklist.md`（本文档） | **查进度**：看当前做到哪一步、下一步做什么、优先级排序 |

两份文档配合使用：本清单告诉你"做什么、什么顺序"，原文档告诉你"具体长什么样"。

---

*预估总工时：~8h | 文档版本：v1.0 | 2026-03-06*
