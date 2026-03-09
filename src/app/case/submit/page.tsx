"use client";

import { useState, useEffect } from "react";
import { INDUSTRIES } from "@/lib/constants";

interface UsedItemDraft {
  name: string;
  type: "skill" | "workflow";
}

export default function SubmitCasePage() {
  const [step, setStep] = useState<1 | 2 | 3 | "done">(1);
  const [availableSkills, setAvailableSkills] = useState<
    { id: string; title: string; coverImage: string; industry?: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setAvailableSkills(data.skills || []))
      .catch(() => {});
  }, []);

  // Step 1: Basic info
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [story, setStory] = useState("");
  const [metricLabel, setMetricLabel] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [beforeLabel, setBeforeLabel] = useState("");
  const [beforeValue, setBeforeValue] = useState("");
  const [afterValue, setAfterValue] = useState("");

  // Step 2: Skill packs + workflow/skill tags
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);
  const [usedItems, setUsedItems] = useState<UsedItemDraft[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<"skill" | "workflow">("skill");

  const togglePack = (id: string) => {
    setSelectedPacks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const addUsedItem = () => {
    if (!newItemName.trim()) return;
    setUsedItems([...usedItems, { name: newItemName.trim(), type: newItemType }]);
    setNewItemName("");
  };

  const removeUsedItem = (index: number) => {
    setUsedItems(usedItems.filter((_, i) => i !== index));
  };

  if (step === "done") {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl mb-2">提交成功！</h2>
          <p className="text-muted-fg mb-6">
            你的成功案例已提交审核。审核通过后将在成功案例页面展示，帮助更多人发现
            Agent 的价值。
          </p>
          <a
            href="/case"
            className="inline-block bg-accent text-background px-8 py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors"
          >
            返回成功案例
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl mb-2">分享你的成功案例</h1>
        <p className="text-muted-fg mb-8">
          告诉大家你是怎么用 Agent 解决实际问题的，帮助更多人上手
        </p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                  step === s
                    ? "bg-accent text-background"
                    : (step as number) > s
                      ? "bg-accent/20 text-accent"
                      : "bg-card-border text-muted"
                }`}
              >
                {(step as number) > s ? "✓" : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-0.5 ${(step as number) > s ? "bg-accent/30" : "bg-card-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card-bg border border-card-border rounded-2xl p-6 sm:p-8">
          {/* Step 1: Story */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl mb-4">你的故事</h2>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  标题 — 一句话概括你的成果{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="例：我的课后反馈时间从1小时缩短到15分钟"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  你的行业 <span className="text-red-400">*</span>
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent/50 transition-colors"
                >
                  <option value="">请选择</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.icon} {ind.label}
                    </option>
                  ))}
                  <option value="other">其他</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  详细故事 <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={8}
                  placeholder="用第一人称讲讲：你之前遇到什么问题？怎么发现这个工具的？用了之后什么变化？（300-500字即可）"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
                <div className="text-right text-muted text-xs mt-1">
                  {story.length} 字
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-fg mb-1.5 block">
                    核心指标名称
                  </label>
                  <input
                    type="text"
                    placeholder="例：节省时间"
                    value={metricLabel}
                    onChange={(e) => setMetricLabel(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-fg mb-1.5 block">
                    核心指标数值
                  </label>
                  <input
                    type="text"
                    placeholder="例：75%"
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-fg mb-1.5 block">
                    使用前指标
                  </label>
                  <input
                    type="text"
                    placeholder="例：课后反馈时间"
                    value={beforeLabel}
                    onChange={(e) => setBeforeLabel(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-fg mb-1.5 block">
                    使用前数值
                  </label>
                  <input
                    type="text"
                    placeholder="例：每班1小时"
                    value={beforeValue}
                    onChange={(e) => setBeforeValue(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-fg mb-1.5 block">
                    使用后数值
                  </label>
                  <input
                    type="text"
                    placeholder="例：每班15分钟"
                    value={afterValue}
                    onChange={(e) => setAfterValue(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!title || !industry || !story}
                className="w-full bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                下一步：选择用到的技能
              </button>
            </div>
          )}

          {/* Step 2: Skills & Workflows */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl mb-2">你用了哪些技能？</h2>
              <p className="text-muted-fg text-sm -mt-4">
                勾选你在案例中实际用到的技能包，并标注具体的 Skill 和 Workflow
              </p>

              {/* Select Skill Packs */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  📦 选择技能包
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {availableSkills.map((skill) => (
                    <label
                      key={skill.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedPacks.includes(skill.id)
                          ? "border-accent/50 bg-accent/5"
                          : "border-card-border hover:border-accent/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPacks.includes(skill.id)}
                        onChange={() => togglePack(skill.id)}
                        className="rounded border-card-border bg-card-bg text-accent focus:ring-accent shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-sm text-foreground truncate">
                          {skill.coverImage} {skill.title}
                        </div>
                        <div className="text-[11px] text-muted truncate">
                          {skill.industry}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tag Skills & Workflows */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  🏷️ 标注具体用到的 Skill 和 Workflow
                </h3>
                <p className="text-muted text-xs mb-3">
                  Skill = 单个具体技能（如"情绪识别"）| Workflow =
                  完整工作流程（如"录音→分析→生成报告"）
                </p>

                {/* Existing tags */}
                {usedItems.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {usedItems.map((item, i) => (
                      <span
                        key={i}
                        className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                          item.type === "skill"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        }`}
                      >
                        {item.type === "skill" ? "🧩" : "⚡"} {item.name}
                        <button
                          onClick={() => removeUsedItem(i)}
                          className="ml-1 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Add new tag */}
                <div className="flex gap-2">
                  <select
                    value={newItemType}
                    onChange={(e) =>
                      setNewItemType(e.target.value as "skill" | "workflow")
                    }
                    className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50 w-32 shrink-0"
                  >
                    <option value="skill">🧩 Skill</option>
                    <option value="workflow">⚡ Workflow</option>
                  </select>
                  <input
                    type="text"
                    placeholder={
                      newItemType === "skill"
                        ? "例：课堂情绪识别"
                        : "例：录音→分析→报告→话术"
                    }
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addUsedItem()}
                    className="flex-1 bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50"
                  />
                  <button
                    onClick={addUsedItem}
                    disabled={!newItemName.trim()}
                    className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 shrink-0"
                  >
                    添加
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-card-border py-3 rounded-xl text-foreground hover:bg-card-bg transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedPacks.length === 0}
                  className="flex-1 bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  下一步：确认提交
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preview & Submit */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl mb-4">确认并提交</h2>

              <div className="bg-background rounded-xl p-5 border border-card-border space-y-4">
                <div>
                  <span className="text-muted text-xs">标题</span>
                  <p className="text-foreground">{title}</p>
                </div>
                <div>
                  <span className="text-muted text-xs">行业</span>
                  <p className="text-foreground">
                    {INDUSTRIES.find((i) => i.id === industry)?.label ||
                      industry}
                  </p>
                </div>
                {metricLabel && metricValue && (
                  <div>
                    <span className="text-muted text-xs">核心成果</span>
                    <p className="text-accent font-bold">
                      {metricLabel}: {metricValue}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-muted text-xs">使用的技能包</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPacks.map((id) => {
                      const skill = availableSkills.find((s) => s.id === id);
                      return skill ? (
                        <span
                          key={id}
                          className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
                        >
                          {skill.coverImage} {skill.title}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                {usedItems.length > 0 && (
                  <div>
                    <span className="text-muted text-xs">
                      标注的 Skills & Workflows
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {usedItems.map((item, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.type === "skill"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-purple-500/10 text-purple-400"
                          }`}
                        >
                          {item.type === "skill" ? "🧩" : "⚡"} {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-muted text-xs">故事预览</span>
                  <p className="text-muted-fg text-sm leading-relaxed mt-1 line-clamp-4">
                    {story}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-card-border py-3 rounded-xl text-foreground hover:bg-card-bg transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={() => setStep("done")}
                  className="flex-1 bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors"
                >
                  提交审核
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
