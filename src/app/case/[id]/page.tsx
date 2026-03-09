"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [caseDetail, setCaseDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch("/api/cases")
      .then((res) => res.json())
      .then((data) => {
        const cases = data.cases || [];
        const found = cases.find((c: any) => c.id === id);
        if (found) {
          setCaseDetail({
            ...found,
            name: found.author?.nickname ?? found.name ?? "",
            avatar: found.author?.avatar ?? found.avatar ?? "👤",
            fullStory: found.content ?? found.fullStory ?? "",
            usedItems: found.usedItems ?? [],
            skillPacks: found.skillPacks ?? [],
          });
        } else {
          setCaseDetail(null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-muted-fg">加载中...</div>
      </div>
    );
  }

  if (!caseDetail) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-xl mb-2">案例不存在</h2>
          <Link href="/case" className="text-accent hover:underline text-sm">
            返回成功案例
          </Link>
        </div>
      </div>
    );
  }

  const caseItem = caseDetail;
  const skills = (caseItem.usedItems || []).filter((i) => i.type === "skill");
  const workflows = (caseItem.usedItems || []).filter((i) => i.type === "workflow");

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-3xl">
            {caseItem.avatar}
          </div>
          <div>
            <h2 className="text-lg font-medium">{caseItem.name}</h2>
            <p className="text-muted-fg text-sm">
              {caseItem.industry} · {caseItem.city}
            </p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl mb-8">{caseItem.title}</h1>

        {/* Before/After */}
        {(caseItem.beforeLabel || caseItem.afterLabel) && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card-bg border border-card-border rounded-xl p-5 text-center">
              <div className="text-muted text-xs mb-1">
                {caseItem.beforeLabel}
              </div>
              <div className="font-mono-num text-xl text-red-400">
                {caseItem.beforeValue}
              </div>
            </div>
            <div className="bg-card-bg border border-accent/30 rounded-xl p-5 text-center">
              <div className="text-muted text-xs mb-1">
                {caseItem.afterLabel}
              </div>
              <div className="font-mono-num text-xl text-green-400">
                {caseItem.afterValue}
              </div>
            </div>
          </div>
        )}

        {/* Metric Highlight */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-5 text-center mb-8">
          <span className="text-muted-fg text-sm">{caseItem.metricLabel}</span>
          <div className="font-mono-num text-4xl text-accent font-bold mt-1">
            {caseItem.metricValue}
          </div>
        </div>

        {/* Used Skills & Workflows */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4">用到的 Skills 和 Workflows</h2>
          <div className="bg-card-bg border border-card-border rounded-2xl p-6">
            {skills.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-foreground mb-2">
                  🧩 Skills（具体技能）
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s.name}
                      className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {workflows.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  ⚡ Workflows（工作流）
                </h3>
                <div className="flex flex-wrap gap-2">
                  {workflows.map((w) => (
                    <span
                      key={w.name}
                      className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      {w.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <p className="text-muted text-xs mt-4 pt-3 border-t border-card-border">
              这些 Skill 和 Workflow 来自下方的技能包，安装后即可使用
            </p>
          </div>
        </section>

        {/* Full Story */}
        <section className="mb-10">
          <h2 className="text-2xl mb-4">完整故事</h2>
          <div className="prose prose-invert max-w-none">
            {(caseItem.fullStory || "").split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted-fg leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Skill Packs Used */}
        <section className="mb-10">
          <h2 className="text-2xl mb-4">安装同款技能包</h2>
          <div className="space-y-3">
            {caseItem.skillPacks.map((sp) => (
              <Link
                key={sp.id}
                href={`/skill/${sp.id}`}
                className="flex items-center gap-3 bg-card-bg border border-card-border rounded-xl p-4 hover:border-accent/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-xl">
                  {sp.coverImage}
                </div>
                <span className="text-foreground font-medium">{sp.title}</span>
                <span className="ml-auto bg-accent text-background text-xs px-3 py-1.5 rounded-lg font-medium">
                  一键安装 →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-8 text-center">
          <h3 className="text-xl mb-2">你也有成功故事？</h3>
          <p className="text-muted-fg text-sm mb-4">
            分享你的案例，帮助更多人发现 Agent 的价值
          </p>
          <Link
            href="/case/submit"
            className="inline-block bg-accent text-background px-8 py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors"
          >
            分享我的成功案例
          </Link>
        </div>
      </div>
    </div>
  );
}
