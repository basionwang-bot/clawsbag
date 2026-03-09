export interface SkillDetail {
  id: string;
  title: string;
  description: string;
  industry: string;
  type: string;
  price: number;
  coverImage: string;
  installCount: number;
  rating: number;
  ratingCount: number;
  author: { name: string; avatar: string };
  updatedAt: string;
  problem: string;
  contents: { name: string; description: string }[];
  instructions: string[];
  targetUser: string;
  notForUser: string;
  reviews: { name: string; avatar: string; rating: number; content: string; date: string }[];
  relatedIds: string[];
}

export const SKILL_DETAILS: Record<string, SkillDetail> = {
  "1": {
    id: "1",
    title: "学生课堂情绪分析",
    description: "上传录音/文字 → 生成情绪报告 + 家长沟通话术",
    industry: "教培培训",
    type: "skill_pack",
    price: 0,
    coverImage: "🎯",
    installCount: 328,
    rating: 4.8,
    ratingCount: 56,
    author: { name: "Basion", avatar: "🧑‍🏫" },
    updatedAt: "2026-03-01",
    problem:
      "每节课结束，你需要花大量时间观察和记录学生的情绪状态，然后再费力组织语言给家长反馈。装上这个技能包后，你只需上传一节课的录音或文字记录，15分钟内就能得到：每个学生的情绪参与度报告、需要重点关注的学生标注、给对应家长的个性化沟通话术。",
    contents: [
      { name: "课堂情绪识别", description: "从音频/文字中提取学生情绪特征" },
      { name: "情绪报告生成", description: "自动生成可视化的课堂情绪分析报告" },
      { name: "家长话术生成", description: "基于分析结果，生成个性化的家长沟通文案" },
      { name: "重点学生标注", description: "自动标记需要特别关注的学生" },
    ],
    instructions: [
      "安装后，在 Agent 中选择「课堂情绪分析」技能",
      "上传课堂录音文件或粘贴课堂文字记录",
      "等待 15 分钟，查收完整的分析报告",
    ],
    targetUser: "K12 教培机构老师、班主任、教学主管",
    notForUser: "大学讲师（内容偏向 K12 场景）、纯线上录播课",
    reviews: [
      {
        name: "陈老师",
        avatar: "👩‍🏫",
        rating: 5,
        content: "真的太省时间了，以前写一个班的反馈要一个多小时，现在15分钟搞定。",
        date: "2026-02-15",
      },
      {
        name: "王校长",
        avatar: "👨‍💼",
        rating: 5,
        content: "我们全校老师都在用，家长满意度提升了很多。",
        date: "2026-02-20",
      },
      {
        name: "刘老师",
        avatar: "👨‍🏫",
        rating: 4,
        content: "分析挺准的，偶尔会有小偏差，但整体节省了大量时间。",
        date: "2026-03-01",
      },
    ],
    relatedIds: ["2", "3", "4"],
  },
  "2": {
    id: "2",
    title: "学员流失预警",
    description: "追踪出勤/作业数据 → 关键节点自动提醒",
    industry: "教培培训",
    type: "workflow",
    price: 0,
    coverImage: "🔔",
    installCount: 215,
    rating: 4.6,
    ratingCount: 34,
    author: { name: "Basion", avatar: "🧑‍🏫" },
    updatedAt: "2026-02-28",
    problem:
      "学员流失往往有迹可循：连续缺课、作业不交、互动减少。但你很难同时关注几十甚至上百个学员的状态。这个工作流会自动追踪每个学员的关键行为数据，在流失风险升高时第一时间提醒你，并给出挽留建议。",
    contents: [
      { name: "行为数据追踪", description: "自动记录出勤、作业、互动等关键指标" },
      { name: "流失风险评估", description: "基于多维数据计算流失概率" },
      { name: "预警通知", description: "风险达到阈值时自动推送提醒" },
      { name: "挽留建议", description: "针对不同情况生成个性化挽留方案" },
    ],
    instructions: [
      "安装后，录入学员名单和基础信息",
      "定期更新出勤和作业数据（支持批量导入）",
      "收到预警通知后，查看详情和建议执行挽留动作",
    ],
    targetUser: "教培机构教务、班主任、校区负责人",
    notForUser: "1对1私教（学员数量少，不需要系统化管理）",
    reviews: [
      {
        name: "赵校长",
        avatar: "👩‍💼",
        rating: 5,
        content: "上个月靠这个挽回了3个准备退费的学员，太值了。",
        date: "2026-02-18",
      },
    ],
    relatedIds: ["1", "3", "5"],
  },
};

export function getSkillDetail(id: string): SkillDetail | undefined {
  return SKILL_DETAILS[id];
}
