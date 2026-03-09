"use client";

import Link from "next/link";

const MOCK_INSTALLED = [
  {
    id: "1",
    title: "学生课堂情绪分析",
    coverImage: "🎯",
    installedAt: "2026-03-05",
    industry: "教培培训",
  },
  {
    id: "m1",
    title: "爆款选题生成器",
    coverImage: "🔥",
    installedAt: "2026-03-08",
    industry: "自媒体内容",
  },
];

export default function InstalledPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl mb-8">我已安装的包</h1>

        {MOCK_INSTALLED.length > 0 ? (
          <div className="space-y-4">
            {MOCK_INSTALLED.map((item) => (
              <div
                key={item.id}
                className="bg-card-bg border border-card-border rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-3xl shrink-0">
                  {item.coverImage}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/skill/${item.id}`}
                    className="font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {item.title}
                  </Link>
                  <div className="text-muted text-xs mt-1 flex gap-3">
                    <span>{item.industry}</span>
                    <span>安装于 {item.installedAt}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-card-border text-muted-fg hover:text-foreground transition-colors">
                    重新安装
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                    卸载
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-fg">
            <div className="text-5xl mb-4">📦</div>
            <p>还没有安装任何技能包</p>
            <Link
              href="/explore"
              className="text-accent hover:underline text-sm mt-2 inline-block"
            >
              去场景库看看 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
