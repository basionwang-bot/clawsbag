"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/constants";

function getAllUsedItemNames(cases: any[]): { skills: string[]; workflows: string[] } {
  const skills = new Set<string>();
  const workflows = new Set<string>();
  for (const c of cases) {
    const items = c.usedItems || [];
    for (const item of items) {
      if (item.type === "skill") skills.add(item.name);
      else if (item.type === "workflow") workflows.add(item.name);
    }
  }
  return { skills: [...skills], workflows: [...workflows] };
}

export default function CasePage() {
  const [allCases, setAllCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterIndustry, setFilterIndustry] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "skill" | "workflow">(
    "all"
  );
  const [filterTag, setFilterTag] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cases")
      .then((res) => res.json())
      .then((data) => {
        const cases = data.cases || [];
        setAllCases(
          cases.map((c: any) => ({
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

  const { skills: allSkills, workflows: allWorkflows } = useMemo(
    () => getAllUsedItemNames(allCases),
    [allCases]
  );

  const filtered = useMemo(() => {
    let result = [...allCases];

    if (filterIndustry) {
      const label = INDUSTRIES.find((i) => i.id === filterIndustry)?.label;
      result = result.filter((c) => c.industry === label);
    }

    if (filterType !== "all") {
      result = result.filter((c) =>
        (c.usedItems || []).some((item: any) => item.type === filterType)
      );
    }

    if (filterTag) {
      result = result.filter((c) =>
        (c.usedItems || []).some((item: any) => item.name === filterTag)
      );
    }

    return result;
  }, [allCases, filterIndustry, filterType, filterTag]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-muted-fg">加载中...</div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl mb-3">成功案例</h1>
          <p className="text-muted-fg">
            真实用户的故事，看看他们如何用 Agent 解决工作中的实际问题
          </p>
        </div>

        {/* Industry Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setFilterIndustry(null)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filterIndustry === null
                ? "bg-accent text-background font-medium"
                : "bg-card-bg border border-card-border text-muted-fg hover:border-accent/40"
            }`}
          >
            全部行业
          </button>
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setFilterIndustry(ind.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filterIndustry === ind.id
                  ? "bg-accent text-background font-medium"
                  : "bg-card-bg border border-card-border text-muted-fg hover:border-accent/40"
              }`}
            >
              {ind.icon} {ind.label}
            </button>
          ))}
        </div>

        {/* Skill / Workflow Type Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {(
            [
              { id: "all", label: "全部类型" },
              { id: "skill", label: "🧩 含 Skill" },
              { id: "workflow", label: "⚡ 含 Workflow" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setFilterType(t.id);
                setFilterTag(null);
              }}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                filterType === t.id
                  ? t.id === "skill"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium"
                    : t.id === "workflow"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30 font-medium"
                      : "bg-accent text-background font-medium"
                  : "bg-card-bg border border-card-border text-muted-fg hover:border-accent/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Specific Tag Filter */}
        {filterType !== "all" && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
            <button
              onClick={() => setFilterTag(null)}
              className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${
                filterTag === null
                  ? "bg-foreground/10 text-foreground font-medium"
                  : "bg-card-bg border border-card-border text-muted hover:text-muted-fg"
              }`}
            >
              全部
            </button>
            {(filterType === "skill" ? allSkills : allWorkflows).map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${
                  filterTag === tag
                    ? filterType === "skill"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "bg-card-bg border border-card-border text-muted hover:text-muted-fg"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Submit CTA */}
        <div className="flex justify-center mb-10">
          <Link
            href="/case/submit"
            className="text-sm border border-accent/40 text-accent px-5 py-2 rounded-full hover:bg-accent/10 transition-colors"
          >
            📝 分享你的成功案例
          </Link>
        </div>

        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => {
            const usedItems = c.usedItems || [];
            const skills = usedItems.filter((i) => i.type === "skill");
            const workflows = usedItems.filter((i) => i.type === "workflow");

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

                <h3 className="text-foreground font-medium mb-3 group-hover:text-accent transition-colors">
                  {c.title}
                </h3>

                <p className="text-muted-fg text-sm leading-relaxed mb-4 line-clamp-2">
                  {c.story}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {skills.slice(0, 2).map((s) => (
                    <span
                      key={s.name}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      Skill · {s.name}
                    </span>
                  ))}
                  {workflows.slice(0, 1).map((w) => (
                    <span
                      key={w.name}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      Workflow
                    </span>
                  ))}
                  {skills.length + workflows.length > 3 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-card-border text-muted">
                      +{skills.length + workflows.length - 3}
                    </span>
                  )}
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

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-fg">
            <div className="text-5xl mb-4">🔍</div>
            <p>没有匹配的成功案例</p>
            <p className="text-sm mt-2">试试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
}
