"use client";

import { useState, useMemo, useEffect } from "react";
import { SkillCard, type SkillCardData } from "@/components/SkillCard";
import { INDUSTRIES, SKILL_TYPES } from "@/lib/constants";

type SortOption = "installCount" | "rating" | "newest";
type PriceFilter = "all" | "free" | "paid";

export default function ExplorePage() {
  const [allSkills, setAllSkills] = useState<SkillCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("installCount");

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        setAllSkills(data.skills || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleIndustry = (id: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(id) ? prev.filter((i: any) => i !== id) : [...prev, id]
    );
  };

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((i: any) => i !== id) : [...prev, id]
    );
  };

  const filteredSkills = useMemo(() => {
    let result = [...allSkills];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s: any) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (selectedIndustries.length > 0) {
      const industryLabels = selectedIndustries.map(
        (id: any) => INDUSTRIES.find((i: any) => i.id === id)?.label
      );
      result = result.filter((s: any) => industryLabels.includes(s.industry));
    }

    if (selectedTypes.length > 0) {
      result = result.filter((s: any) => selectedTypes.includes(s.type));
    }

    if (priceFilter === "free") {
      result = result.filter((s: any) => s.price === 0);
    } else if (priceFilter === "paid") {
      result = result.filter((s: any) => s.price > 0);
    }

    if (sortBy === "installCount") {
      result.sort((a: any, b: any) => b.installCount - a.installCount);
    } else if (sortBy === "rating") {
      result.sort((a: any, b: any) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.sort((a: any, b: any) => {
        const aDate = (a as SkillCardData & { createdAt?: string }).createdAt ?? "";
        const bDate = (b as SkillCardData & { createdAt?: string }).createdAt ?? "";
        return bDate.localeCompare(aDate);
      });
    }

    return result;
  }, [allSkills, search, selectedIndustries, selectedTypes, priceFilter, sortBy]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-fg">加载中...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="搜索技能包、工作流..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card-bg border border-card-border rounded-xl px-5 py-3.5 pl-12 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Industry Filter */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  行业分类
                </h3>
                <div className="space-y-2">
                  {INDUSTRIES.map((ind: any) => (
                    <label
                      key={ind.id}
                      className="flex items-center gap-2 text-sm text-muted-fg hover:text-foreground cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(ind.id)}
                        onChange={() => toggleIndustry(ind.id)}
                        className="rounded border-card-border bg-card-bg text-accent focus:ring-accent"
                      />
                      {ind.icon} {ind.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  类型
                </h3>
                <div className="space-y-2">
                  {SKILL_TYPES.map((t: any) => (
                    <label
                      key={t.id}
                      className="flex items-center gap-2 text-sm text-muted-fg hover:text-foreground cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(t.id)}
                        onChange={() => toggleType(t.id)}
                        className="rounded border-card-border bg-card-bg text-accent focus:ring-accent"
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  价格
                </h3>
                <div className="space-y-2">
                  {[
                    { id: "all" as const, label: "全部" },
                    { id: "free" as const, label: "免费" },
                    { id: "paid" as const, label: "付费" },
                  ].map((p: any) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-2 text-sm text-muted-fg hover:text-foreground cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={priceFilter === p.id}
                        onChange={() => setPriceFilter(p.id)}
                        className="border-card-border bg-card-bg text-accent focus:ring-accent"
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  排序
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full bg-card-bg border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50"
                >
                  <option value="installCount">最多安装</option>
                  <option value="rating">评分最高</option>
                  <option value="newest">最新上传</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Skill Cards Grid */}
          <div className="flex-1">
            {/* Mobile Filter Chips */}
            <div className="lg:hidden flex flex-wrap gap-2 mb-4">
              {INDUSTRIES.map((ind: any) => (
                <button
                  key={ind.id}
                  onClick={() => toggleIndustry(ind.id)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                    selectedIndustries.includes(ind.id)
                      ? "bg-accent text-background"
                      : "bg-card-bg border border-card-border text-muted-fg"
                  }`}
                >
                  {ind.icon} {ind.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-muted text-sm">
                共 {filteredSkills.length} 个技能包
              </p>
            </div>

            {filteredSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredSkills.map((skill: any) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-fg">
                <div className="text-5xl mb-4">🔍</div>
                <p>没有找到匹配的技能包</p>
                <p className="text-sm mt-2">试试调整筛选条件或搜索关键词</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
