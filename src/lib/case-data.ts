export interface UsedItem {
  name: string;
  type: "skill" | "workflow";
}

export interface CaseDetail {
  id: string;
  avatar: string;
  name: string;
  industry: string;
  city: string;
  title: string;
  story: string;
  fullStory: string;
  metricLabel: string;
  metricValue: string;
  beforeLabel: string;
  beforeValue: string;
  afterLabel: string;
  afterValue: string;
  skillPacks: { id: string; title: string; coverImage: string }[];
  usedItems: UsedItem[];
}

export const ALL_CASES: CaseDetail[] = [
  {
    id: "1",
    avatar: "👩‍🏫",
    name: "李老师",
    industry: "教培培训",
    city: "杭州",
    title: "我的课后反馈时间从1小时缩短到15分钟",
    story:
      "以前每节课后要花1小时写学生反馈，现在上传录音，15分钟就能拿到情绪分析报告和家长沟通话术。",
    fullStory: `我在杭州一家教培机构做了5年英语老师，带着3个班，每班20个学生。

每节课结束后，我最头疼的事情就是写课后反馈。每个学生的课堂表现、参与度、需要关注的点，还要想怎么跟家长说。一个班20个学生，认真写下来至少要1个小时。3个班就是3个小时。

有一天同事跟我说她在用一个叫 ClawsBag 的工具，里面有个"课堂情绪分析"的技能包。我试了一下，把课堂录音传上去，15分钟就出来了：每个学生的情绪参与度分析、需要重点关注的名单、还有给家长的个性化反馈话术。

说实话第一次看到结果的时候我是震惊的。它不仅识别出了哪些学生在走神，还能根据走神的时间段分析出可能的原因。给家长的话术也很得体，不会太直接也不会太敷衍。

现在我每天至少省了2个多小时，这些时间我用来备课和陪家人。家长对反馈的满意度也提升了很多，因为现在反馈更及时、更有针对性了。`,
    metricLabel: "节省时间",
    metricValue: "75%",
    beforeLabel: "课后反馈时间",
    beforeValue: "每班 1 小时",
    afterLabel: "使用后",
    afterValue: "每班 15 分钟",
    skillPacks: [
      { id: "1", title: "学生课堂情绪分析", coverImage: "🎯" },
      { id: "4", title: "家长沟通话术生成", coverImage: "💌" },
    ],
    usedItems: [
      { name: "课堂情绪识别", type: "skill" },
      { name: "情绪报告生成", type: "skill" },
      { name: "家长话术生成", type: "skill" },
      { name: "录音→分析→报告→话术", type: "workflow" },
    ],
  },
  {
    id: "2",
    avatar: "👨‍💼",
    name: "张经理",
    industry: "电商运营",
    city: "深圳",
    title: "30个SKU的文案更新从一天缩短到1小时",
    story:
      "管理30个SKU的文案更新，以前要写一整天。现在输入参数，10分钟生成全平台文案，质量还更好。",
    fullStory: `我在深圳做电商运营3年了，目前管理30多个SKU。

最痛苦的日常就是文案更新。每次上新品或者活动换季，30个商品的标题、详情页、种草文案都要改。淘宝、京东、抖音、小红书，每个平台的风格还不一样。

以前这个工作至少要花一整天，有时候还要加班。而且写到后面，文案质量明显下降，词穷的感觉很难受。

用了"商品文案批量生成"这个技能包后，我只需要把商品参数（材质、卖点、目标人群）输进去，它就能根据不同平台的风格生成对应的文案。10分钟就能搞定一个SKU的全平台文案。

最让我惊喜的是小红书风格的文案，用词和语气真的很像真人种草，发出去的转化率比我自己写的还高20%。`,
    metricLabel: "效率提升",
    metricValue: "10x",
    beforeLabel: "文案更新时间",
    beforeValue: "1整天",
    afterLabel: "使用后",
    afterValue: "1 小时",
    skillPacks: [
      { id: "e1", title: "商品文案批量生成", coverImage: "✍️" },
    ],
    usedItems: [
      { name: "商品参数提取", type: "skill" },
      { name: "多平台文案生成", type: "skill" },
      { name: "风格适配（小红书/淘宝/抖音）", type: "skill" },
      { name: "参数输入→文案生成→多平台分发", type: "workflow" },
    ],
  },
  {
    id: "3",
    avatar: "👩‍💻",
    name: "小王",
    industry: "自媒体内容",
    city: "北京",
    title: "靠AI选题建议一个月涨粉3倍",
    story:
      "做自媒体最头疼的是选题，这个工具每天给我10个热门选题建议，上个月涨粉翻了3倍。",
    fullStory: `我是一个美妆领域的自媒体博主，在小红书和抖音上发内容。

做自媒体最难的不是拍摄和剪辑，而是选题。每天花2-3个小时刷各种平台找灵感，结果常常写出来的内容数据很差。感觉自己越来越不懂用户想看什么了。

朋友推荐了"爆款选题生成器"，我输入"美妆护肤"这个领域关键词，它会基于当前的热门趋势给我推荐10个选题，还会告诉我每个选题的热度指数和建议切入角度。

第一周我用了其中3个选题发了内容，最好的一条小红书点赞破了5000。这在我之前是不敢想的。

一个月下来，小红书粉丝从8000涨到了24000，抖音也从1.2万涨到了3.5万。最重要的是，我现在每天只花30分钟选题，其余时间都能专注在内容质量上。`,
    metricLabel: "粉丝增长",
    metricValue: "300%",
    beforeLabel: "选题时间",
    beforeValue: "每天 2-3 小时",
    afterLabel: "使用后",
    afterValue: "每天 30 分钟",
    skillPacks: [
      { id: "m1", title: "爆款选题生成器", coverImage: "🔥" },
      { id: "m3", title: "多平台内容改写", coverImage: "🔄" },
    ],
    usedItems: [
      { name: "热门趋势抓取", type: "skill" },
      { name: "选题生成与评分", type: "skill" },
      { name: "多平台内容改写", type: "skill" },
      { name: "关键词→选题推荐→内容改写→多平台发布", type: "workflow" },
    ],
  },
];

export function getCaseById(id: string) {
  return ALL_CASES.find((c: any) => c.id === id);
}

export function getAllUsedItemNames(): { skills: string[]; workflows: string[] } {
  const skills = new Set<string>();
  const workflows = new Set<string>();
  for (const c of ALL_CASES) {
    for (const item of c.usedItems) {
      if (item.type === "skill") skills.add(item.name);
      else workflows.add(item.name);
    }
  }
  return { skills: [...skills], workflows: [...workflows] };
}
