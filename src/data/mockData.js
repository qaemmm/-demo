export const mockUser = {
  id: 'USR001',
  name: 'Maria Santos',
  phone: '+63 917 123 4567',
  level: 'Gold',
  points: 2450,
  nextLevel: 'Platinum',
  pointsToNext: 550,
  cardNo: '4521',
  totalSpent: 12500,
  joinDate: '01/15/2026',
  referralCode: 'MARIA2026',
  totalReferrals: 7,
  checkInStreak: 4,
  birthday: '03/15/2026',
  birthdayRewardClaimed: false,
};

export const mockBusiness = {
  name: 'SuperMart',
  stores: 3,
  totalMembers: 12847,
  activeMembers: 3241,
  monthlyRevenue: 2850000,
};

export const mockCoupons = [
  {
    id: 'C_BDAY',
    title: 'FREE Birthday Treat',
    type: 'gift',
    value: 'FREE Birthday Treat',
    desc: 'Any item up to ₱300 · Birthday month exclusive',
    expire: '03/31/2026',
    used: false,
    tag: 'BIRTHDAY',
  },
  { id: 'C001', title: '20% OFF', type: 'percent', value: 20, desc: 'Any purchase', expire: '03/31/2026', used: false },
  { id: 'C002', title: '₱50 OFF', type: 'fixed', value: 50, desc: 'Min. spend ₱300', expire: '04/15/2026', used: false },
  {
    id: 'C003',
    title: 'FREE Dessert',
    type: 'gift',
    value: 'FREE Dessert',
    desc: 'With any meal',
    expire: '03/20/2026',
    used: false,
  },
  { id: 'C004', title: '10% OFF Coffee', type: 'percent', value: 10, desc: 'Coffee only', expire: '02/28/2026', used: true },
];

export const mockStoreItems = [
  { id: 1, name: '₱100 Gift Card', pts: 500, stock: 12, category: 'Vouchers', emoji: '🎟' },
  { id: 2, name: 'Free Coffee', pts: 200, stock: 30, category: 'Vouchers', emoji: '☕' },
  { id: 3, name: 'Movie Ticket', pts: 800, stock: 5, category: 'Experience', emoji: '🎬' },
  { id: 4, name: '₱500 Gift Card', pts: 2000, stock: 3, category: 'Vouchers', emoji: '🎫' },
  { id: 5, name: 'Tumbler', pts: 1500, stock: 8, category: 'Gifts', emoji: '🥤' },
  { id: 6, name: 'Tote Bag', pts: 600, stock: 20, category: 'Gifts', emoji: '👜' },
];

export const mockPointsHistory = [
  { id: 1, date: '03/05/2026', desc: 'Purchase at SM BGC', pts: 120, type: 'earned' },
  { id: 2, date: '03/04/2026', desc: 'Redeemed discount coupon', pts: -50, type: 'used' },
  { id: 3, date: '03/04/2026', desc: 'Daily check-in', pts: 10, type: 'earned' },
  { id: 4, date: '03/03/2026', desc: 'Refer a friend', pts: 100, type: 'earned' },
  { id: 5, date: '03/03/2026', desc: 'Redeem free coffee', pts: -200, type: 'used' },
  { id: 6, date: '03/02/2026', desc: 'Purchase at SM BGC', pts: 90, type: 'earned' },
  { id: 7, date: '03/01/2026', desc: 'Write a review', pts: 30, type: 'earned' },
  { id: 8, date: '02/28/2026', desc: 'Redeem movie ticket', pts: -800, type: 'used' },
  { id: 9, date: '02/27/2026', desc: 'Share on Facebook', pts: 20, type: 'earned' },
  { id: 10, date: '02/26/2026', desc: 'Purchase at SuperMart MOA', pts: 70, type: 'earned' },
  { id: 11, date: '02/25/2026', desc: 'Redeemed coupon', pts: -100, type: 'used' },
];

export const mockTasks = [
  { id: 1, name: 'Daily Check-in', pts: 10, done: true },
  { id: 2, name: 'Share on Facebook', pts: 20, done: false },
  { id: 3, name: 'Make purchase (2x)', pts: 50, done: false },
  { id: 4, name: 'Complete Profile', pts: 15, done: true },
];

export const mockReferral = {
  code: 'MARIA2026',
  totalReferred: 7,
  ptsEarned: 700,
  friends: [
    { name: 'Juan D.', status: 'joined', date: '02/10/2026' },
    { name: 'Rosa M.', status: 'joined', date: '02/18/2026' },
    { name: 'Carlo R.', status: 'pending', date: '03/01/2026' },
    { name: 'Ana L.', status: 'joined', date: '03/02/2026' },
    { name: 'Mika P.', status: 'joined', date: '03/03/2026' },
    { name: 'Paul C.', status: 'pending', date: '03/04/2026' },
    { name: 'Iris T.', status: 'joined', date: '03/05/2026' },
  ],
};

export const mockNotifications = [
  {
    id: 'N_BDAY',
    type: 'birthday',
    title: '🎂 Happy Birthday, Maria!',
    message: 'Claim your 200 pts birthday bonus + a special surprise coupon!',
    time: 'Just now',
    read: false,
    group: 'today',
  },
  { id: 1, title: 'You earned 120 pts!', body: 'Purchase at SM BGC', time: '2 hours ago', group: 'today' },
  { id: 2, title: 'New coupon unlocked', body: 'Gold member benefit', time: '5 hours ago', group: 'today' },
  { id: 3, title: "You're almost Gold!", body: '500 pts to go!', time: 'Yesterday', group: 'yesterday' },
  { id: 4, title: 'Weekend 2x Points', body: 'Special promo alert', time: 'Yesterday', group: 'yesterday' },
  { id: 5, title: 'Store item restocked', body: 'Free Coffee is back', time: '2 days ago', group: 'yesterday' },
];

export const mockMembers = [
  {
    id: 'MBR001',
    name: 'Maria Santos',
    phone: '0917-123-4567',
    tier: 'Gold',
    points: 2450,
    joined: '01/15/2026',
    status: 'Active',
    tags: ['VIP', 'Foodie'],
    notes: 'Responds well to coupon campaigns.',
    activity: ['3 purchases this month', 'Redeemed 2 coupons', '1 referral last week'],
  },
  {
    id: 'MBR002',
    name: 'Juan Dela Cruz',
    phone: '0918-456-8977',
    tier: 'Silver',
    points: 890,
    joined: '02/03/2026',
    status: 'Active',
    tags: ['New'],
    notes: '',
    activity: ['2 purchases this month'],
  },
  {
    id: 'MBR003',
    name: 'Rosa Mendoza',
    phone: '0919-789-2211',
    tier: 'Bronze',
    points: 210,
    joined: '03/01/2026',
    status: 'Paused',
    tags: ['At-risk'],
    notes: 'No transaction in 20 days.',
    activity: ['Last purchase on 02/15/2026'],
  },
  {
    id: 'MBR004',
    name: 'Carlo Reyes',
    phone: '0920-111-8899',
    tier: 'Platinum',
    points: 8100,
    joined: '11/20/2025',
    status: 'Active',
    tags: ['High Value'],
    notes: 'Prefers weekend promotions.',
    activity: ['5 purchases this month', '4 referrals'],
  },
  {
    id: 'MBR005',
    name: 'Ana Lopez',
    phone: '0921-133-5544',
    tier: 'Gold',
    points: 3200,
    joined: '12/18/2025',
    status: 'Active',
    tags: ['VIP'],
    notes: '',
    activity: ['Purchased electronics category'],
  },
  {
    id: 'MBR006',
    name: 'Miguel Cruz',
    phone: '0922-900-1111',
    tier: 'Silver',
    points: 1500,
    joined: '01/30/2026',
    status: 'Active',
    tags: [],
    notes: '',
    activity: ['Daily app opens in last 7 days'],
  },
  {
    id: 'MBR007',
    name: 'Iris Tan',
    phone: '0923-555-7272',
    tier: 'Bronze',
    points: 300,
    joined: '02/21/2026',
    status: 'Active',
    tags: ['Coupon user'],
    notes: '',
    activity: ['Redeemed 1 coupon last week'],
  },
  {
    id: 'MBR008',
    name: 'Paul Castillo',
    phone: '0924-122-3434',
    tier: 'Gold',
    points: 2800,
    joined: '01/08/2026',
    status: 'Paused',
    tags: ['At-risk'],
    notes: '',
    activity: ['No activity in 14 days'],
  },
  {
    id: 'MBR009',
    name: 'Mika Perez',
    phone: '0925-678-0099',
    tier: 'Silver',
    points: 1100,
    joined: '02/09/2026',
    status: 'Active',
    tags: [],
    notes: '',
    activity: ['Opened push notifications 4/5'],
  },
];

export const mockCampaigns = [
  {
    id: 'CMP001',
    name: 'Weekend 2x Points',
    status: 'active',
    period: 'Mar 07-08, 2026',
    target: 'All Members',
    claimed: 342,
    budget: 5000,
  },
  {
    id: 'CMP002',
    name: 'Gold Member Free Dessert',
    status: 'scheduled',
    period: 'Mar 15-31, 2026',
    target: 'Gold+ Only',
    claimed: 0,
    budget: 3500,
  },
  {
    id: 'CMP003',
    name: 'Loyalty Cashback Week',
    status: 'ended',
    period: 'Feb 10-17, 2026',
    target: 'Silver+',
    claimed: 912,
    budget: 7800,
  },
];

export const mockPushHistory = [
  { id: 'PSH001', title: 'Weekend promo!', sent: 3241, openRate: '68%', date: '03/03/2026' },
  { id: 'PSH002', title: 'New coupon unlocked', sent: 2100, openRate: '72%', date: '02/28/2026' },
  { id: 'PSH003', title: 'Points expiring soon', sent: 1850, openRate: '61%', date: '02/25/2026' },
];

export const mockTiers = [
  { id: 'T1', level: 'Bronze', range: '0-499', members: 5780, benefits: ['Basic points', 'Birthday coupon'] },
  { id: 'T2', level: 'Silver', range: '500-1999', members: 3854, benefits: ['1.5x points', 'Exclusive coupons'] },
  { id: 'T3', level: 'Gold', range: '2000-4999', members: 2569, benefits: ['2x points', 'Priority service', 'Free gift'] },
  { id: 'T4', level: 'Platinum', range: '5000+', members: 644, benefits: ['3x points', 'Concierge service', 'Premium gifts'] },
];

export const mockPointsRules = {
  purchase: { spend: 50, point: 1, minPurchase: 100 },
  checkIn: { daily: 10, streak3: 30, streak7: 100, streak30: 500 },
  tasks: [
    { id: 1, name: 'Share on Facebook', points: 20, active: true },
    { id: 2, name: 'Write a review', points: 30, active: true },
    { id: 3, name: 'Complete profile', points: 15, active: true },
    { id: 4, name: 'Refer a friend', points: 100, active: true },
  ],
  events: { birthday: 200, anniversary: 150 },
};

export const mockStores = [
  {
    id: 'STR001',
    name: 'SuperMart BGC',
    location: 'Taguig',
    members: 4200,
    cashiers: [
      { name: 'Ana Reyes', account: 'ana@bgc', lastActive: 'Today' },
      { name: 'Miguel Cruz', account: 'miguel@bgc', lastActive: 'Yesterday' },
      { name: 'Rina Santos', account: 'rina@bgc', lastActive: '2 days ago' },
      { name: 'Leo Tan', account: 'leo@bgc', lastActive: 'Today' },
      { name: 'Mark Uy', account: 'mark@bgc', lastActive: 'Today' },
    ],
    status: 'ON',
  },
  {
    id: 'STR002',
    name: 'SuperMart MOA',
    location: 'Pasay',
    members: 3850,
    cashiers: [
      { name: 'Joan Lim', account: 'joan@moa', lastActive: 'Today' },
      { name: 'Paul Cruz', account: 'paul@moa', lastActive: 'Yesterday' },
      { name: 'Ted Ong', account: 'ted@moa', lastActive: 'Today' },
      { name: 'Ira Ponce', account: 'ira@moa', lastActive: '3 days ago' },
    ],
    status: 'ON',
  },
  {
    id: 'STR003',
    name: 'SuperMart QC',
    location: 'Quezon City',
    members: 4797,
    cashiers: [
      { name: 'Jan Romero', account: 'jan@qc', lastActive: 'Today' },
      { name: 'Dane Isla', account: 'dane@qc', lastActive: 'Yesterday' },
      { name: 'Bea Dizon', account: 'bea@qc', lastActive: 'Today' },
      { name: 'Nica Yu', account: 'nica@qc', lastActive: 'Today' },
      { name: 'Ken Lopez', account: 'ken@qc', lastActive: '2 days ago' },
      { name: 'Mia Cruz', account: 'mia@qc', lastActive: 'Today' },
    ],
    status: 'ON',
  },
];

export const mockReferralStats = {
  totalReferrals: 1284,
  thisMonth: 156,
  conversionRate: 68,
  pointsRewarded: 128400,
  topReferrers: [
    { rank: 1, name: 'Maria S.', referred: 47, pointsEarned: 4700 },
    { rank: 2, name: 'Carlo R.', referred: 38, pointsEarned: 3800 },
    { rank: 3, name: 'Ana L.', referred: 31, pointsEarned: 3100 },
    { rank: 4, name: 'Juan D.', referred: 24, pointsEarned: 2400 },
    { rank: 5, name: 'Iris T.', referred: 22, pointsEarned: 2200 },
  ],
};

const memberBase = [
  11200, 11230, 11260, 11310, 11340, 11380, 11420, 11490, 11530, 11590, 11640, 11680, 11720, 11770, 11800,
  11870, 11910, 11980, 12040, 12100, 12170, 12230, 12310, 12390, 12470, 12520, 12610, 12680, 12750, 12847,
];

export const mockDashboard = {
  kpis: {
    totalMembers: { value: 12847, growth: '+8.2%' },
    activeMembers: { value: 3241, growth: '+12%' },
    pointsIssued: { value: 98200, growth: '+5.1%' },
    couponRedeemed: { value: 1205, growth: '+18%' },
  },
  memberGrowth30d: memberBase.map((value, i) => ({ day: i + 1, members: value })),
  tierDistribution: [
    { name: 'Bronze', value: 45 },
    { name: 'Silver', value: 30 },
    { name: 'Gold', value: 20 },
    { name: 'Platinum', value: 5 },
  ],
  pointsIssuedVsConsumed: [
    { month: 'Oct', issued: 11500, consumed: 7300 },
    { month: 'Nov', issued: 12800, consumed: 7600 },
    { month: 'Dec', issued: 15200, consumed: 9800 },
    { month: 'Jan', issued: 16100, consumed: 10400 },
    { month: 'Feb', issued: 17500, consumed: 11200 },
    { month: 'Mar', issued: 15100, consumed: 9700 },
  ],
  aiInsights: [
    '23 members are at risk of churning this week.',
    'Best push open window: Friday 7:00 PM - 9:00 PM.',
    'Gold tier members convert 2.1x better on voucher campaigns.',
  ],
};

export const mockReferralTrend30d = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  referrals: 20 + ((i * 7) % 19) + (i % 3 === 0 ? 8 : 0),
}));
