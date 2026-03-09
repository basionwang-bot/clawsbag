"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CaseShowcase() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cases")
      .then((res) => res.json())
      .then((data) => {
        const list = data.cases || [];
        setCases(
          list.slice(0, 3).map((c: any) => ({
            ...c,
            name: c.author?.nickname ?? c.name ?? "",
            avatar: c.author?.avatar ?? c.avatar ?? "👤",
            story: c.content ?? c.story ?? "",
            usedItems: c.usedItems ?? [],
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center mb-3">成功案例</h2>
          <p className="text-muted-fg text-center mb-12">
            看看别人怎么用 Agent 解决实际问题的
          </p>
          <div className="text-center text-muted-fg">加载中...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-3">
          成功案例
        </h2>
        <p className="text-muted-fg text-center mb-12">
          看看别人怎么用 Agent 解决实际问题的
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c: any) => {
            const usedItems = c.usedItems || [];
            const skills = usedItems.filter((i: any) => i.type === "skill");
            const workflows = usedItems.filter((i: any) => i.type === "workflow");

            return (
              <Link
                key={c.id}
                href={`/case/${c.id}`}
                className="bg-card-bg border border-card-border rounded-2xl p-6 hover:border-accent/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-2xl">
                    {c.avatar}
                  </div>
                  <div>
                    <div className="text-foreground font-medium text-sm">
                      {c.name}
                    </div>
                    <div className="text-muted text-xs">
                      {c.industry} · {c.city}
                    </div>
                  </div>
                </div>

                <h3 className="text-foreground font-medium mb-3 group-hover:text-accent transition-colors text-sm">
                  {c.title}
                </h3>

                <p className="text-muted-fg text-sm leading-relaxed mb-4">
                  &ldquo;{c.story}&rdquo;
                </p>

                {/* Skill & Workflow Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {skills.slice(0, 2).map((s: any) => (
                    <span
                      key={s.name}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      Skill · {s.name}
                    </span>
                  ))}
                  {workflows.slice(0, 1).map((w: any) => (
                    <span
                      key={w.name}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      Workflow · {w.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-card-border">
                  <span className="font-mono-num text-accent text-sm font-bold">
                    {c.metricLabel}: {c.metricValue}
                  </span>
                  <span className="text-xs text-muted bg-card-border/50 px-2 py-1 rounded-full">
                    {c.skillPacks[0]?.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/case"
            className="text-accent hover:underline text-sm"
          >
            查看更多成功案例 →
          </Link>
        </div>
      </div>
    </section>
  );
}
