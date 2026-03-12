/**
 * ========================================
 *   Supabase 评论系统配置（免费）
 *   使用步骤：
 *   1. 打开 https://supabase.com 用 GitHub 或邮箱注册
 *   2. 点击 "New Project"，创建项目（Region 选新加坡或美西）
 *   3. 等待项目创建完成后，点左侧 "SQL Editor"
 *   4. 粘贴以下 SQL 并点击 "Run" 执行：
 *
 *      create table comments (
 *        id bigint generated always as identity primary key,
 *        created_at timestamptz default now(),
 *        nickname text not null,
 *        email text default '',
 *        content text not null,
 *        category text not null
 *      );
 *      alter table comments enable row level security;
 *      create policy "allow_read" on comments for select using (true);
 *      create policy "allow_insert" on comments for insert with check (true);
 *
 *   5. 点左侧 "Project Settings" → "API"
 *      复制 Project URL 和 anon public key，填到下面
 * ========================================
 */
var SUPABASE = {
  url: 'https://uqvoodjcxnyvswejfmof.supabase.co',
  key: 'sb_publishable_0FbLRem5NreOSqhLOOmyug_kJi-qgDc'
}

/**
 * ========================================
 *   全平台应用数据
 *   你可以自由修改、添加或删除应用条目
 *   url 字段填写实际下载/访问地址
 * ========================================
 */
var CATEGORIES = [
  {
    id: 'yingshi',
    name: '影视',
    icon: '🎬',
    color: '#f472b6',
    description: '全平台影视应用导航',
    apps: [
      {
        _group: 'iOS端',
        name: '瓜子影视',
        icon: '🌻',
        description: '可观看体育直播、小说、漫画，支持缓存、投屏功能（部分功能需登录）',
        tags: ['体育直播', '小说', '漫画', '缓存', '投屏'],
        url: 'https://apps.apple.com/us/app/shoecarevault/id6759591869',
        rating: 5,
        ipad: '兼容',
        tip: '下载APP，打开后「允许粘贴」，关闭软件再次打开即可。若未显示允许粘贴提示，可复制下面代码',
        code: '#iPhone#GOjZ3kxlNw9pD0sdP0WZ9fjOrXVRQ2xFKDp/B+LpandM6UOmZT8rlYQDbDTC/d7Jg2uq78Hdk2xB/wdjsgYkngRqYHPNv6UqoTqElL15YNVyaAiz4cY+nCdrRnPJZqOT5o5WYv+HaMkmt8KPPNIVv7dv1Iw+5JEYQXoyWDN00PLytir+eiCpdlHFOtSQLQ1SMhNs2KX/81N9UocKoD9m5E3d9sjnp38fLtl1xF/BgRtYKJdlx4IyPUBr1RCMvFXF52dgcjhnWSafD1T/L66B51uMH0c6tOEl2IUijMmKbQmqTIVCdTaabHWIaElbZO/TGoFOutTGw5fc7xzGX3Q5YIv7SNfpg7LOajFKQvBmKi4=#iPhone#code=BGZ0839'
      },
      {
        _group: 'iOS端',
        name: '瓜子影视②',
        icon: '🌻',
        description: '可观看体育直播、小说、漫画，支持缓存、投屏功能（部分功能需登录）',
        tags: ['体育直播', '小说', '漫画', '缓存', '投屏'],
        url: 'https://apps.apple.com/us/app/%E5%87%BA%E8%A1%8C%E8%AE%A1%E7%A8%8B%E5%AE%9D/id6759592353',
        rating: 5,
        ipad: '兼容',
        tip: '顶部「新建行程」按钮 》第一个框内输入或粘贴暗号 》允许网络 》搜索',
        code: 'BGZ0839'
      },
      {
        _group: 'iOS端',
        name: '橘汁视频',
        icon: '🍊',
        description: '有弹窗广告、更新速度较快、4K画质、弹幕数量多、可看电视直播、支持缓存',
        tags: ['4K', '直播', '弹幕', '缓存'],
        url: 'https://apps.apple.com/cn/app/%E5%99%AA%E5%A3%B0%E8%A1%B0%E5%87%8F%E8%AE%A1%E7%AE%97/id6758057688',
        rating: 4,
        ipad: '适配',
        tip: '顶部「搜索框」输入/粘贴暗号后提交 》关闭app重新进入',
        code: 'jz10005'
      },
      {
        _group: 'iOS端',
        name: '佩奇影视',
        icon: '🐷',
        description: '有弹窗广告、首页无热播推荐、支持弹幕/缓存/投屏功能、支持平板设备',
        tags: ['弹幕', '缓存', '投屏', '平板'],
        url: 'https://apps.apple.com/us/app/%E6%89%8B%E4%BD%9C%E5%B0%8F%E8%AE%B0/id6760246043',
        rating: 4,
        ipad: '适配',
        tip: '右上角图标 》输入暗号后提交 》关闭软件再次进入即可',
        code: '666'
      },
      {
        _group: 'iOS端',
        name: '简单影视',
        icon: '🎞️',
        description: '有部分弹窗广告、支持小窗模式，支持缓存/投屏功能',
        tags: ['小窗', '缓存', '投屏'],
        url: 'https://apps.apple.com/us/app/kmm%E8%BD%AC%E6%8D%A2/id6757914847',
        rating: 4,
        ipad: '适配',
        tip: '问题反馈 》输入暗号后提交',
        code: '135'
      },
      {
        _group: 'iOS端',
        name: '电影天堂②',
        icon: '🎬',
        description: '支持4K画质、可缓存、高清线路多、弹幕多',
        tags: ['4K', '缓存', '高清', '弹幕'],
        url: 'https://apps.apple.com/us/app/%E6%95%B0%E5%80%BC%E8%AE%A1%E7%AE%97%E5%B7%A5%E5%85%B7/id6759972639',
        rating: 4,
        ipad: '不可用',
        tip: '右上角「反馈」》反馈内容输入或粘贴暗号后提交',
        code: 'dy520'
      },
      {
        _group: 'iOS端',
        name: '电影天堂',
        icon: '🎬',
        description: '无广告，不支持投屏/弹幕/缓存功能',
        tags: ['无广告', '免费'],
        url: 'https://apps.apple.com/cn/app/%E5%BD%B1%E6%95%88%E6%8D%95%E6%89%8B/id6760332961',
        rating: 3,
        ipad: '适配',
        tip: '底部「意见反馈」输入或粘贴暗号后提交即可变身',
        code: 'D5199'
      },
      {
        _group: 'iOS端',
        name: '小柠檬',
        icon: '🍋',
        description: '广告较多，多条高清线路、支持小说/漫画',
        tags: ['高清', '小说', '漫画'],
        url: 'https://apps.apple.com/us/app/%E9%A3%9F%E7%94%A8%E5%90%AC%E8%A7%89%E6%84%9F%E5%BA%94/id6758489746',
        rating: 3,
        ipad: '适配',
        tip: '设置 》意见反馈 》输入暗号后提交',
        code: '1234567'
      },
      {
        _group: 'iOS端',
        name: '大师兄影视',
        icon: '🐒',
        description: '广告较多，多条高清线路、支持小说/漫画',
        tags: ['高清', '小说', '漫画'],
        url: 'https://apps.apple.com/us/app/%E8%99%9A%E6%8B%9F%E6%B6%88%E8%B4%B9%E8%80%85/id6759604392',
        rating: 3,
        ipad: '适配',
        tip: '右上角「设置」》意见反馈 》输入暗号后提交',
        code: '1234567'
      },
      {
        _group: 'iOS端',
        name: '大师兄影视②',
        icon: '🙈',
        description: '首页热播推荐较老、广告较多、支持投屏/缓存/弹幕等功能（弹幕数量较多）',
        tags: ['投屏', '缓存', '弹幕'],
        url: 'https://apps.apple.com/us/app/%E8%90%A5%E6%95%B0%E8%AE%B0/id6760293713',
        rating: 3,
        ipad: '适配',
        tip: '左上角图标 》输入暗号后提交 》关闭APP重新进入',
        code: '666'
      },
      {
        _group: 'iOS端',
        name: '壹影视',
        icon: '🎥',
        description: '有弹窗广告（较多）',
        tags: ['免费'],
        url: 'https://apps.apple.com/cn/app/%E5%91%A8%E6%9C%9F%E8%9D%89%E6%8C%87%E6%95%B0/id6758644418',
        rating: 3,
        ipad: '兼容',
        tip: '意见反馈 》反馈内容输入暗号后提交',
        code: 'yys666'
      },
      {
        _group: 'iOS端',
        name: '荐片',
        icon: '🎞️',
        description: '运营做的不错，无广告，但高清线路不多',
        tags: ['无广告'],
        url: 'https://apps.apple.com/us/app/%E8%B7%83%E5%8A%A8%E8%B7%B3%E7%BB%B3/id6758704636',
        rating: 3,
        ipad: '适配',
        tip: '复制下面「变身代码」》下载APP 》打开后「允许粘贴」，关闭软件再次打开',
        code: '77FD4FF30A84D5E8FDB8CC8226A497161758963512XKey'
      },
      {
        _group: 'iOS端',
        name: '来看吧',
        icon: '👀',
        description: '影视、短剧、小说、漫画、听书为一体的综合APP，请忽略「免费会员」相关活动',
        tags: ['影视', '短剧', '小说', '漫画', '听书'],
        url: 'https://fda115.evomcrbngf.top:4000/qltgk2fwzv0czx',
        rating: 3,
        ipad: '不清楚',
        tip: '在页面点击「安装」》点击「去信任」，允许下载安装描述，按照流程完成安装 》在「我的」里面填写邀请码',
        code: '15881688'
      },
      {
        _group: '安卓端',
        name: '影视仓',
        icon: '📦',
        description: '安卓端影视聚合应用，资源丰富',
        tags: ['聚合', '影视'],
        url: 'https://wwaqa.lanzoub.com/ix5KF3kdhpqf',
        tip: '蓝奏云下载，密码见下方',
        code: '7qkq'
      },
      {
        _group: '安卓端',
        name: '橘汁视频',
        icon: '🍊',
        description: '无广告',
        tags: ['无广告'],
        url: 'https://wwaqa.lanzoub.com/iBQ9V3e63a9g',
        tip: '蓝奏云下载，密码见下方',
        code: '4ug9'
      },
      {
        _group: '安卓端',
        name: '佩奇影视',
        icon: '🐷',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/iE8Jr3a0bu4j',
        tip: '蓝奏云下载，密码见下方',
        code: '7ayz'
      },
      {
        _group: '安卓端',
        name: '爱其意影视',
        icon: '💜',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/iR6FZ3a96b8d',
        tip: '蓝奏云下载，密码见下方',
        code: 'aebd'
      },
      {
        _group: '安卓端',
        name: '小柚子影视',
        icon: '🍊',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/ioSji3ad3u7c',
        tip: '蓝奏云下载，密码见下方',
        code: 'by66'
      },
      {
        _group: '安卓端',
        name: '番喜视频（纯净版）',
        icon: '🎉',
        tags: ['纯净版'],
        url: 'https://wwaqa.lanzoub.com/iE9Tw3alr2aj',
        tip: '蓝奏云下载，密码见下方',
        code: '4voo'
      },
      {
        _group: '安卓端',
        name: '小苹果影视',
        icon: '🍎',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/iFanK3eb38ch',
        tip: '蓝奏云下载，密码见下方',
        code: '9o3s'
      },
      {
        _group: '安卓端',
        name: '星影视频',
        icon: '⭐',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/i4CuU3es4thg',
        tip: '蓝奏云下载，密码见下方',
        code: '4ky0'
      },
      {
        _group: '安卓端',
        name: 'MINO4K',
        icon: '🎬',
        tags: ['4K'],
        url: 'https://wwaqa.lanzoub.com/iLAAG3j8ciij',
        tip: '蓝奏云下载，密码见下方',
        code: '1kjr'
      },
      {
        _group: '安卓端',
        name: '快映4K',
        icon: '🎞️',
        tags: ['4K'],
        url: 'https://wwaqa.lanzoub.com/iu4hX3jma8qj',
        tip: '蓝奏云下载，密码见下方',
        code: '2bk7'
      },
      {
        _group: '安卓端',
        name: '瓜子影视',
        icon: '🌻',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/iiAhV3k5h03e',
        tip: '蓝奏云下载，密码见下方',
        code: '450c'
      },
      {
        _group: '安卓端',
        name: '华谊影视',
        icon: '🎭',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/igsH63cz3s0h',
        tip: '蓝奏云下载，密码见下方',
        code: 'bic2'
      },
      {
        _group: '安卓端',
        name: '天空影视',
        icon: '🌤️',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/icdZs39gauwb',
        tip: '蓝奏云下载，密码见下方',
        code: '2fh1'
      },
      {
        _group: 'TV端',
        name: '影视仓',
        icon: '📦',
        tags: ['聚合', '影视'],
        url: 'https://wwaqa.lanzoub.com/itWNA3kdhole',
        tip: '蓝奏云下载，密码见下方',
        code: '9e1v'
      },
      {
        _group: 'TV端',
        name: '橘汁视频',
        icon: '🍊',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/iQp5e370w50d',
        tip: '蓝奏云下载，密码见下方',
        code: 'bknb'
      },
      {
        _group: '投影仪端',
        name: '影视仓',
        icon: '📦',
        tags: ['聚合', '影视'],
        url: 'https://wwaqa.lanzoub.com/itWNA3kdhole',
        tip: '蓝奏云下载，密码见下方',
        code: '9e1v'
      },
      {
        _group: '投影仪端',
        name: '橘汁视频',
        icon: '🍊',
        tags: ['影视'],
        url: 'https://wwaqa.lanzoub.com/iQp5e370w50d',
        tip: '蓝奏云下载，密码见下方',
        code: 'bknb'
      },
      {
        _group: 'PC端',
        name: 'UZ影视',
        icon: '🖥️',
        description: 'Windows 端影视应用',
        tags: ['Windows', '影视'],
        url: 'https://wwaqa.lanzoub.com/iNuaa3hv70ji',
        tip: '蓝奏云下载，密码见下方',
        code: 'agde'
      },
      {
        _group: '网页端',
        name: '3Q影视',
        icon: '🎬',
        description: '在线影视网站，资源丰富',
        tags: ['在线', '影视'],
        url: 'https://qqqys.com/'
      },
      {
        _group: '网页端',
        name: '茶杯狐',
        icon: '🦊',
        description: '影视搜索引擎，聚合多个在线资源站',
        tags: ['搜索', '聚合'],
        url: 'https://www.cupfox.ai/'
      },
      {
        _group: '网页端',
        name: '剧OK',
        icon: '🎞️',
        description: '在线影视网站，有弹幕',
        tags: ['在线', '弹幕'],
        url: 'https://juok.cc/'
      }
    ]
  },
  {
    id: 'music',
    name: '音乐',
    icon: '🎵',
    color: '#a78bfa',
    description: '音乐与K歌应用推荐',
    apps: []
  },
  {
    id: 'yecao',
    name: '野草口令',
    icon: '🌿',
    color: '#4ade80',
    description: '在野草应用中输入口令即可安装对应应用',
    apps: [
      {
        name: '影视仓空壳版',
        icon: '📦',
        tags: ['追剧'],
        code: 'E762'
      },
      {
        name: '茶杯狐TV',
        icon: '🦊',
        tags: ['追剧'],
        code: '25BC'
      },
      {
        name: '七星影仓',
        icon: '⭐',
        tags: ['追剧'],
        code: 'A4E9'
      },
      {
        name: '七星影仓V3',
        icon: '🌟',
        tags: ['追剧'],
        code: '186C'
      },
      {
        name: '网飞猫',
        icon: '🐱',
        tags: ['追剧'],
        code: 'DD94'
      },
      {
        name: '清流影视TV',
        icon: '🎬',
        tags: ['追剧'],
        code: '9B04'
      },
      {
        name: '酷我音乐',
        icon: '🎵',
        tags: ['音乐K歌'],
        code: 'AAD9'
      },
      {
        name: '家庭KTV',
        icon: '🎤',
        tags: ['音乐K歌'],
        code: 'BDD3'
      },
      {
        name: '咪咕爱唱',
        icon: '🎶',
        tags: ['音乐K歌'],
        code: 'B76D'
      },
      {
        name: '闪电音乐',
        icon: '⚡',
        tags: ['音乐K歌'],
        code: '06FD'
      },
      {
        name: '汽水音乐',
        icon: '🥤',
        tags: ['音乐K歌'],
        code: '59BC'
      },
      {
        name: '七星智教',
        icon: '📚',
        tags: ['儿童学习'],
        code: '291F'
      },
      {
        name: 'TAO课堂',
        icon: '🎓',
        tags: ['儿童学习'],
        code: 'CFD1'
      },
      {
        name: '宝宝巴士儿歌',
        icon: '🚌',
        tags: ['儿童学习'],
        code: '0FA6'
      },
      {
        name: '茱元游戏',
        icon: '🎮',
        tags: ['游戏'],
        code: '6102'
      },
      {
        name: 'START云游戏',
        icon: '☁️',
        tags: ['游戏'],
        code: '380C'
      },
      {
        name: '迅雷浏览器',
        icon: '⚡',
        tags: ['浏览器'],
        code: '6363'
      },
      {
        name: 'X浏览器',
        icon: '🌐',
        tags: ['浏览器'],
        code: '6363'
      },
      {
        name: '飞视浏览器',
        icon: '🔍',
        tags: ['浏览器'],
        code: '992C'
      },
      {
        name: '哔哩哔哩',
        icon: '📺',
        tags: ['短剧'],
        code: '2BD4'
      },
      {
        name: '抖音短视频',
        icon: '🎵',
        tags: ['短剧'],
        code: 'C571'
      },
      {
        name: '畅看戏曲',
        icon: '🎭',
        tags: ['戏曲'],
        code: '4737'
      }
    ]
  }
]
