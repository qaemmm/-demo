# Suki Rewards — 前端规划文档
> 菲律宾会员营销系统 Demo | 纯前端 React + Mock 数据 | 版本 v1.0

---

## 一、项目概览

| 项目 | 说明 |
|------|------|
| 产品名称 | **Suki Rewards**（Suki = 菲律宾语"熟客"） |
| 目标市场 | 菲律宾中小商家及其会员用户 |
| 语言 | 全英文，货币 ₱ PHP，日期格式 MM/DD/YYYY |
| 技术栈 | React + Tailwind CSS + Recharts + Mock 数据 |
| 无需后端 | 所有数据本地 Mock，操作假 loading 后成功 |
| 交付形态 | 两个独立 React 应用：用户端 H5 + 商家管理后台 |
| 设计风格 | 用户端：年轻活泼、渐变卡片；后台：简洁专业 |

---

## 二、整体架构

```
Suki Rewards Demo
├── 📱 用户端 H5 App          (移动端优先，375px 宽度基准)
│   ├── 登录注册
│   ├── 会员主页
│   ├── 积分中心
│   ├── 优惠券钱包
│   ├── 积分商城
│   ├── 推荐裂变
│   └── 消息通知
│
└── 🖥️ 商家管理后台           (PC Web，1280px 宽度基准)
    ├── 数据看板
    ├── 会员管理
    ├── 等级体系
    ├── 积分规则
    ├── 营销活动
    ├── 推送通知
    ├── 裂变追踪
    └── 门店管理
```

---

## 三、用户端 H5 App

### 3.1 设计规范

| 项目 | 规范 |
|------|------|
| 基准宽度 | 375px（iPhone SE 标准） |
| 主色调 | `#6C3CE1` 紫色（品牌主色） |
| 辅助色 | `#F5A623` 金色（积分/奖励感）|
| 背景色 | `#F8F6FF` 浅紫白 |
| 字体 | Inter / System Font |
| 圆角 | 16px 大圆角卡片风格 |
| 底部导航 | 固定 5 Tab 导航栏 |

---

### 3.2 页面详细规划

#### 页面 1：登录注册 `/login`

**布局结构：**
```
┌─────────────────────────┐
│   Logo + "Suki Rewards" │  <- 品牌区，渐变背景
│   "Earn. Save. Enjoy."  │
├─────────────────────────┤
│   📱 Phone Number input │  <- +63 菲律宾区号前缀
│   [Send OTP] button     │
├─────────────────────────┤
│   ── or continue with ──│
│   [f] Facebook Login    │  <- 仅 UI，Mock 点击直接进入
├─────────────────────────┤
│   New? Join for free →  │
└─────────────────────────┘
```

**交互逻辑：**
- 输入手机号点击 Send OTP → Loading 1.5s → 展示 OTP 输入框（6位数字）
- 输入任意6位数 → 验证成功 → 跳转会员主页
- Facebook 按钮 → Loading → 直接登录成功

**Mock 数据：**
- 预设账号：`0917-123-4567`，OTP：`888888`

---

#### 页面 2：会员主页 `/home`（核心页）

**布局结构：**
```
┌─────────────────────────┐
│  Hi, Maria! 👋   🔔(3)  │  <- 顶部问候 + 通知角标
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │  🌟 GOLD MEMBER     │ │  <- 渐变会员卡（紫金渐变）
│ │  Maria Santos       │ │
│ │  Card: **** 4521    │ │
│ │  2,450 pts          │ │
│ │  ████████░░ 550 to  │ │  <- 进度条：距离 Platinum
│ │  PLATINUM           │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│  快捷入口 4宫格：         │
│  [积分] [优惠券] [商城] [邀请] │
├─────────────────────────┤
│  🎯 今日任务（游戏化）    │
│  ├ ✅ Daily Check-in +10pts │
│  ├ ⬜ Share a post  +20pts  │
│  └ ⬜ Make purchase +2x pts │
├─────────────────────────┤
│  🔥 Exclusive Offers    │
│  [优惠券卡片横向滚动]     │
├─────────────────────────┤
│  📋 Recent Activity     │
│  [最近积分流水 3条]       │
└─────────────────────────┘
```

**Mock 数据：**
```js
user: {
  name: "Maria Santos",
  level: "Gold",
  points: 2450,
  nextLevel: "Platinum",
  pointsToNext: 550,
  cardNo: "4521"
}
```

---

#### 页面 3：积分中心 `/points`

**布局结构：**
```
┌─────────────────────────┐
│  My Points              │
│  ┌────────────────────┐ │
│  │  2,450 pts  [i]    │ │  <- 总积分卡片
│  │  ≈ ₱245 value      │ │
│  └────────────────────┘ │
├─────────────────────────┤
│  🗓️ Daily Check-in      │
│  [一周7格签到日历]        │
│  连签3天 +50 bonus！     │
│  [Check In Today] btn   │
├─────────────────────────┤
│  📌 点击可做的任务列表    │
│  Task              Pts  │
│  ─────────────────────  │
│  Share on Facebook  +20 │
│  Write a Review     +30 │
│  Refer a Friend    +100 │
│  Complete Profile   +15 │
├─────────────────────────┤
│  📜 Points History      │
│  [Tab: Earned / Used]   │
│  ─────────────────────  │
│  Purchase at BGC   +120 │
│  Redeemed coupon    -50 │
│  Check-in bonus     +10 │
└─────────────────────────┘
```

**Mock 数据：**
```js
checkInStreak: 4,  // 已连签4天
tasks: [
  { id:1, name:"Share on Facebook", pts:20, done:false },
  { id:2, name:"Write a Review", pts:30, done:true },
  { id:3, name:"Refer a Friend", pts:100, done:false },
  { id:4, name:"Complete Profile", pts:15, done:true },
]
pointsHistory: [
  { date:"03/05/2026", desc:"Purchase at SM BGC", pts:+120 },
  { date:"03/04/2026", desc:"Redeemed discount coupon", pts:-50 },
  { date:"03/04/2026", desc:"Daily check-in", pts:+10 },
  ...
]
```

---

#### 页面 4：优惠券钱包 `/coupons`

**布局结构：**
```
┌─────────────────────────┐
│  My Coupons   [Tab切换] │
│  [All] [Active] [Used]  │
├─────────────────────────┤
│  ┌─────────────────────┐│
│  │🎫 20% OFF           ││  <- 优惠券卡片
│  │   Any purchase      ││
│  │   Expires: 03/31    ││  <- 倒计时红色标注
│  │   [Use Now] →       ││
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │🎫 ₱50 OFF           ││
│  │   Min. spend ₱300   ││
│  │   Expires: 04/15    ││
│  │   [Use Now] →       ││
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │🎫 FREE Dessert      ││  <- 赠品券样式不同
│  │   With any meal     ││
│  │   Expires: 03/20 🔴 ││  <- 即将过期高亮
│  │   [Use Now] →       ││
│  └─────────────────────┘│
└─────────────────────────┘
```

**点击 [Use Now] 后展示核销弹窗：**
```
┌─────────────────────────┐
│  Show this to cashier   │
│  ┌─────────────────────┐│
│  │   [大号二维码]       ││
│  │   Code: SR-2026-4521 ││
│  └─────────────────────┘│
│  20% OFF · Valid 5 mins │
│  [Close]                │
└─────────────────────────┘
```

**Mock 数据：**
```js
coupons: [
  { id:"C001", type:"percent", value:20, desc:"Any purchase", expire:"03/31/2026", used:false },
  { id:"C002", type:"fixed", value:50, desc:"Min. spend ₱300", expire:"04/15/2026", used:false },
  { id:"C003", type:"gift", value:"FREE Dessert", desc:"With any meal", expire:"03/20/2026", used:false },
  { id:"C004", type:"percent", value:10, desc:"Coffee only", expire:"02/28/2026", used:true },
]
```

---

#### 页面 5：积分商城 `/store`

**布局结构：**
```
┌─────────────────────────┐
│  Rewards Store          │
│  Your Points: 2,450 ⭐  │
├─────────────────────────┤
│  [分类 Tab 横向滚动]     │
│  [All][Vouchers][Gifts][Experience] │
├─────────────────────────┤
│  商品卡片 2列 Grid：      │
│  ┌────────┐ ┌────────┐  │
│  │ 🎁图片  │ │ 🎁图片 │  │
│  │₱100 GC │ │Free    │  │
│  │500 pts │ │Coffee  │  │
│  │Stock:12│ │200 pts │  │
│  │[Redeem]│ │[Redeem]│  │
│  └────────┘ └────────┘  │
│  ┌────────┐ ┌────────┐  │
│  │ 🎁图片  │ │ 🎁图片 │  │
│  │Movie   │ │₱500 GC │  │
│  │Ticket  │ │2000pts │  │
│  │800 pts │ │Stock: 3│  │
│  │[Redeem]│ │[Redeem]│  │
│  └────────┘ └────────┘  │
└─────────────────────────┘
```

**兑换确认弹窗：**
```
Redeem ₱100 Gift Card?
500 pts will be deducted
Remaining: 1,950 pts
[Cancel]  [Confirm Redeem]
```

**Mock 数据：**
```js
storeItems: [
  { id:1, name:"₱100 Gift Card", pts:500, stock:12, category:"Vouchers" },
  { id:2, name:"Free Coffee", pts:200, stock:30, category:"Vouchers" },
  { id:3, name:"Movie Ticket", pts:800, stock:5, category:"Experience" },
  { id:4, name:"₱500 Gift Card", pts:2000, stock:3, category:"Vouchers" },
  { id:5, name:"Tumbler", pts:1500, stock:8, category:"Gifts" },
  { id:6, name:"Tote Bag", pts:600, stock:20, category:"Gifts" },
]
```

---

#### 页面 6：推荐裂变 `/refer`

**布局结构：**
```
┌─────────────────────────┐
│  Refer & Earn 🎉        │
├─────────────────────────┤
│  ┌─────────────────────┐│
│  │  You get  +100 pts  ││  <- 激励说明卡片
│  │  Friend gets +50pts ││
│  └─────────────────────┘│
├─────────────────────────┤
│  Your Invite Code       │
│  ┌─────────────────────┐│
│  │  MARIA2026    [Copy]││  <- 邀请码一键复制
│  └─────────────────────┘│
│  [Share via Facebook]   │
│  [Share via WhatsApp]   │  <- 菲律宾主流社交
│  [Generate Share Poster]│  <- 生成海报（图片展示）
├─────────────────────────┤
│  📊 Your Referrals      │
│  Total referred: 7      │
│  Pts earned: 700        │
│  ─────────────────────  │
│  👤 Juan D.  ✅ Joined  │
│  👤 Rosa M.  ✅ Joined  │
│  👤 Carlo R. ⏳ Pending │
└─────────────────────────┘
```

**Mock 数据：**
```js
referral: {
  code: "MARIA2026",
  totalReferred: 7,
  ptsEarned: 700,
  friends: [
    { name:"Juan D.", status:"joined", date:"02/10/2026" },
    { name:"Rosa M.", status:"joined", date:"02/18/2026" },
    { name:"Carlo R.", status:"pending", date:"03/01/2026" },
  ]
}
```

---

#### 页面 7：消息通知 `/notifications`

**布局结构：**
```
┌─────────────────────────┐
│  Notifications  [全读]  │
├─────────────────────────┤
│  🔴 Today               │
│  ─────────────────────  │
│  🎁 You earned 120 pts! │
│     Purchase at SM BGC  │
│     2 hours ago         │
│  ─────────────────────  │
│  🎫 New coupon unlocked │
│     Gold member benefit │
│     5 hours ago         │
├─────────────────────────┤
│  📅 Yesterday           │
│  ─────────────────────  │
│  ⭐ You're almost Gold! │
│     500 pts to go!      │
│  ─────────────────────  │
│  🎉 Weekend 2x Points   │
│     Special promo alert │
└─────────────────────────┘
```

---

### 3.3 底部导航 Tab Bar

```
┌──────┬──────┬──────┬──────┬──────┐
│  🏠  │  ⭐  │  🎫  │  🛍️  │  👤  │
│ Home │Points│Coupon│Store │Profile│
└──────┴──────┴──────┴──────┴──────┘
```

---

## 四、商家管理后台

### 4.1 设计规范

| 项目 | 规范 |
|------|------|
| 基准宽度 | 1280px PC |
| 布局 | 左侧固定导航栏（240px）+ 右侧内容区 |
| 主色调 | `#6C3CE1` 紫色 |
| 辅助色 | `#10B981` 绿色（正向数据）、`#F59E0B` 黄色（警告） |
| 风格 | 简洁白底，数据卡片，Recharts 图表 |

---

### 4.2 左侧导航栏

```
┌─────────────────────┐
│  🌟 Suki Admin      │
│  SuperMart BGC ▼   │  <- 门店切换下拉
├─────────────────────┤
│  📊 Dashboard       │
│  👥 Members         │
│  🏆 Tier System     │
│  ⭐ Points Rules    │
│  🎯 Campaigns       │
│  📣 Push Notify     │
│  🔗 Referral Track  │
│  🏪 Store Mgmt      │
├─────────────────────┤
│  ⚙️  Settings       │
│  👤 Admin Profile   │
└─────────────────────┘
```

---

### 4.3 页面详细规划

#### 后台页面 1：数据看板 `/dashboard`

**布局结构：**
```
┌──────────────────────────────────────────────────────┐
│  Dashboard          Today: Mar 06, 2026  [本月▼]     │
├──────────────┬───────────────────────────────────────┤
│              │  KPI 卡片 4列                          │
│              │  ┌──────┐┌──────┐┌──────┐┌──────┐    │
│   左侧导航   │  │Total ││Active││Pts   ││Coupon││    │
│              │  │Member││Member││Issued││Redeem││    │
│              │  │12,847││ 3,241││98.2K ││ 1,205││    │
│              │  │+8.2% ││+12% ││+5.1% ││+18% ││    │
│              │  └──────┘└──────┘└──────┘└──────┘    │
│              ├───────────────────────────────────────┤
│              │  [折线图：会员增长趋势 - 近30天]        │
│              ├───────────────────────────────────────┤
│              │  左：[饼图：会员等级分布]               │
│              │  右：[柱状图：积分发放 vs 消耗]         │
├──────────────┼───────────────────────────────────────┤
│              │  ⚠️ AI Insights (亮点功能)             │
│              │  "23 members at risk of churning"     │
│              │  "Best send time: Fri 7-9PM"          │
│              │  [View Details →]                     │
└──────────────┴───────────────────────────────────────┘
```

**Mock 数据：**
```js
kpi: {
  totalMembers: 12847,  membersGrowth: "+8.2%",
  activeMembers: 3241,  activeGrowth: "+12%",
  ptsIssued: 98200,     ptsGrowth: "+5.1%",
  couponRedeemed: 1205, couponGrowth: "+18%"
}
memberGrowthChart: [30天每日数据，从11200增长到12847]
tierDistribution: { Bronze:45%, Silver:30%, Gold:20%, Platinum:5% }
```

---

#### 后台页面 2：会员管理 `/members`

**布局结构：**
```
┌──────────────────────────────────────────────────────┐
│  Members (12,847)                    [+ Add Member]  │
├──────────────────────────────────────────────────────┤
│  [🔍 Search name/phone]  [Tier▼] [Status▼] [Export] │
├──────────────────────────────────────────────────────┤
│  Name        Phone       Tier    Points  Joined   Act│
│  ────────────────────────────────────────────────────│
│  Maria S.   0917-123-    🥇Gold   2,450  01/15/26  ✅│
│  Juan D.    0918-456-    🥈Silver   890  02/03/26  ✅│
│  Rosa M.    0919-789-    🥉Bronze   210  03/01/26  ⏸│
│  Carlo R.   0920-111-    🏆Plat   8,100  11/20/25  ✅│
│  [... 分页 20条/页 ...]                               │
└──────────────────────────────────────────────────────┘
```

**点击某条会员 → 侧边抽屉详情：**
```
┌────────────────────────┐
│  Maria Santos    [×]   │
│  0917-123-4567         │
│  Gold · 2,450 pts      │
│  Joined: Jan 15, 2026  │
├────────────────────────┤
│  [Adjust Points]       │
│  +/- 输入框 + [Save]   │
├────────────────────────┤
│  Tags: [VIP][Foodie]   │
│  [+ Add Tag]           │
├────────────────────────┤
│  Notes:                │
│  [textarea]            │
├────────────────────────┤
│  Activity History      │
│  3 purchases this month│
└────────────────────────┘
```

---

#### 后台页面 3：等级体系 `/tiers`

**布局结构：**
```
4个等级横向卡片展示，每个可编辑：

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ 🥉 BRONZE  │ │ 🥈 SILVER  │ │ 🥇 GOLD    │ │ 🏆PLATINUM │
│ 0-499 pts  │ │ 500-1999   │ │ 2000-4999  │ │ 5000+ pts  │
│────────────│ │────────────│ │────────────│ │────────────│
│ Benefits:  │ │ Benefits:  │ │ Benefits:  │ │ Benefits:  │
│ ✓ Basic pts│ │ ✓ 1.5x pts │ │ ✓ 2x pts   │ │ ✓ 3x pts   │
│ ✓ B-day    │ │ ✓ Excl.    │ │ ✓ Priority │ │ ✓ Concierge│
│   coupon   │ │   coupons  │ │   service  │ │   service  │
│            │ │            │ │ ✓ Free gift│ │ ✓ Free gift│
│ 5,780 mbrs │ │ 3,854 mbrs │ │ 2,569 mbrs │ │   644 mbrs │
│  [Edit]    │ │  [Edit]    │ │  [Edit]    │ │  [Edit]    │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

---

#### 后台页面 4：积分规则 `/points-rules`

**布局结构：**
```
┌──────────────────────────────────────────────────────┐
│  Points Rules                         [Save Changes] │
├──────────────────────────────────────────────────────┤
│  💰 Purchase Rules                                   │
│  ─────────────────────────────────────────────────── │
│  Every ₱  [50  ] spent = [1   ] point               │
│  Minimum purchase: ₱ [100 ]                          │
├──────────────────────────────────────────────────────┤
│  📅 Check-in Rules                                   │
│  ─────────────────────────────────────────────────── │
│  Daily check-in:          [10  ] pts                 │
│  3-day streak bonus:      [30  ] pts                 │
│  7-day streak bonus:      [100 ] pts                 │
│  30-day streak bonus:     [500 ] pts                 │
├──────────────────────────────────────────────────────┤
│  🎯 Task Rules                                       │
│  ─────────────────────────────────────────────────── │
│  Share on Facebook:       [20  ] pts  [✅ Active]    │
│  Write a review:          [30  ] pts  [✅ Active]    │
│  Complete profile:        [15  ] pts  [✅ Active]    │
│  Refer a friend:          [100 ] pts  [✅ Active]    │
│                                    [+ Add Task Rule] │
├──────────────────────────────────────────────────────┤
│  🎂 Special Events                                   │
│  Birthday bonus:          [200 ] pts (auto-credited) │
│  Anniversary bonus:       [150 ] pts (auto-credited) │
└──────────────────────────────────────────────────────┘
```

---

#### 后台页面 5：营销活动 `/campaigns`

**布局结构：**
```
┌──────────────────────────────────────────────────────┐
│  Campaigns                         [+ New Campaign]  │
├──────────────────────────────────────────────────────┤
│  [All] [Active] [Scheduled] [Ended]                  │
├──────────────────────────────────────────────────────┤
│  活动卡片列表：                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ 🟢 ACTIVE  Weekend 2x Points                 │    │
│  │  Mar 07-08, 2026 · All Members               │    │
│  │  Claimed: 342  ·  Budget: ₱5,000             │    │
│  │                        [Edit] [Pause] [Stats]│    │
│  └──────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────┐    │
│  │ 🟡 SCHEDULED  Gold Member Free Dessert       │    │
│  │  Mar 15-31, 2026 · Gold+ Only               │    │
│  │  Target: 2,569  ·  Coupon: FREE Dessert     │    │
│  │                        [Edit] [Cancel] [→]  │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

**[+ New Campaign] 弹窗：**
```
┌────────────────────────────────┐
│  Create Campaign               │
│  Campaign Name: [___________]  │
│  Type: [Coupon▼]               │
│  Coupon: [20% OFF▼]            │
│  Target: [Gold+ ▼]             │
│  Start: [03/15/2026]           │
│  End:   [03/31/2026]           │
│  Budget: ₱ [_______]          │
│  [Cancel]      [Create →]      │
└────────────────────────────────┘
```

---

#### 后台页面 6：推送通知 `/push`

**布局结构：**
```
┌──────────────────────────────────────────────────────┐
│  Push Notifications                  [Send History]  │
├──────────────────────────────────────────────────────┤
│  📝 Compose Message                                  │
│  ─────────────────────────────────────────────────── │
│  Title: [_________________________________]          │
│  Message: [_______________________________]          │
│           [_______________________________]          │
│  Target Audience:                                    │
│  ◉ All Members (12,847)                              │
│  ○ By Tier: [Gold ▼] (2,569)                        │
│  ○ At-risk users (AI suggested: 23)                  │
│                                                      │
│  Schedule: ◉ Send Now  ○ Schedule for [__datetime]  │
│                                      [Send Message →]│
├──────────────────────────────────────────────────────┤
│  📊 Recent Sends                                     │
│  "Weekend promo!"  3,241 sent  68% open rate  03/03 │
│  "New coupon!"     2,100 sent  72% open rate  02/28 │
└──────────────────────────────────────────────────────┘
```

---

#### 后台页面 7：裂变追踪 `/referral`

**布局结构：**
```
┌──────────────────────────────────────────────────────┐
│  Referral Tracking                                   │
├──────────┬──────────┬──────────┬────────────────────┤
│ Total    │ This Mo. │ Conv.    │ Pts Rewarded        │
│ Referrals│ Referrals│ Rate     │                     │
│  1,284   │   156    │  68%     │  128,400            │
├──────────┴──────────┴──────────┴────────────────────┤
│  [折线图：每日新增裂变人数，近30天]                    │
├──────────────────────────────────────────────────────┤
│  🏆 Top Referrers                                    │
│  Rank  Name        Referred  Pts Earned              │
│  #1    Maria S.       47      4,700                  │
│  #2    Carlo R.       38      3,800                  │
│  #3    Ana L.         31      3,100                  │
├──────────────────────────────────────────────────────┤
│  🔗 Referral Chain View (可视化关系链)                 │
│  [简单树形：顶层用户 → 被邀请用户 → 再下级]            │
└──────────────────────────────────────────────────────┘
```

---

#### 后台页面 8：门店管理 `/stores`

**布局结构：**
```
┌──────────────────────────────────────────────────────┐
│  Store Management                      [+ Add Store] │
├──────────────────────────────────────────────────────┤
│  Store          Location    Members  Cashiers  Status│
│  ──────────────────────────────────────────────────  │
│  SuperMart BGC  Taguig      4,200    5         🟢 ON │
│  SuperMart MOA  Pasay       3,850    4         🟢 ON │
│  SuperMart QC   Quezon City 4,797    6         🟢 ON │
├──────────────────────────────────────────────────────┤
│  点击门店 → 展示该门店 Cashier 账号列表               │
│  Cashier        Account         Last Active          │
│  ─────────────────────────────────────────────────── │
│  Ana Reyes      ana@bgc          Today               │
│  Miguel Cruz    miguel@bgc       Yesterday           │
│                              [+ Add Cashier Account] │
└──────────────────────────────────────────────────────┘
```

---

## 五、Mock 数据总表

### 全局用户数据

```js
const mockUser = {
  id: "USR001",
  name: "Maria Santos",
  phone: "+63 917 123 4567",
  level: "Gold",         // Bronze / Silver / Gold / Platinum
  points: 2450,
  nextLevel: "Platinum",
  pointsToNext: 550,
  totalSpent: 12500,     // ₱
  joinDate: "01/15/2026",
  referralCode: "MARIA2026",
  totalReferrals: 7,
  checkInStreak: 4,
}
```

### 全局商家数据

```js
const mockBusiness = {
  name: "SuperMart",
  stores: 3,
  totalMembers: 12847,
  activeMembers: 3241,
  monthlyRevenue: 2850000,   // ₱
}
```

---

## 六、交互规范

| 操作 | 反馈方式 |
|------|---------|
| 所有按钮点击 | Loading spinner 1-1.5s 后成功 |
| 表单提交 | Toast 提示 "✅ Saved successfully" |
| 积分变动 | 数字滚动动画 |
| 等级升级 | 全屏庆祝动画 + "Congratulations!" |
| 兑换成功 | 弹窗 + 积分实时扣减 |
| 签到成功 | 格子变绿 + "+10 pts" 飞出动画 |
| 错误操作 | Toast 提示 "❌ Something went wrong" |

---

## 七、开发顺序建议

```
Day 1 上午：用户端搭框架 + 登录 + 会员主页（核心卡片）
Day 1 下午：积分中心 + 优惠券钱包 + 底部导航联通
Day 2 上午：积分商城 + 推荐裂变 + 消息通知
Day 2 下午：后台看板 + 会员管理 + 营销活动 + 简单连通
缓冲时间：等级体系 + 积分规则 + 推送 + 裂变追踪
```

---

## 八、Demo 演示路线（给销售用）

**用户端演示路线（5分钟）：**
1. 打开 App → 手机号登录 → 进入会员主页，展示金色会员卡
2. 点积分中心 → 签到 → 看积分动画 +10
3. 点优惠券 → 展示核销二维码（模拟收银员扫码场景）
4. 点积分商城 → 兑换 Free Coffee → 积分扣减
5. 点邀请好友 → 展示专属邀请码 + 分享按钮

**后台演示路线（5分钟）：**
1. 看板页 → 展示会员增长图表 + AI 预警提示
2. 会员管理 → 搜索 Maria → 查看详情 → 手动加积分
3. 营销活动 → 创建一个新活动（走完流程）
4. 推送通知 → 写一条 + 选人群 + Send
5. 裂变追踪 → 展示 Top Referrers 榜单

---

*文档版本：v1.0 | 日期：2026-03-06 | 作者：产品组*