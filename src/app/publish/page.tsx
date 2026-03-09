"use client";

import { useState } from "react";
import { INDUSTRIES, SKILL_TYPES } from "@/lib/constants";

type PublishStep = 1 | 2 | 3 | 4 | "done";

export default function PublishPage() {
  const [step, setStep] = useState<PublishStep>(1);

  // Step 1
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [packType, setPackType] = useState("");

  // Step 2
  const [problem, setProblem] = useState("");
  const [contents, setContents] = useState([{ name: "", desc: "" }]);
  const [instructions, setInstructions] = useState("");
  const [targetUser, setTargetUser] = useState("");

  // Step 4
  const [pricing, setPricing] = useState<"free" | "paid">("free");

  const addContent = () =>
    setContents([...contents, { name: "", desc: "" }]);

  const updateContent = (
    index: number,
    field: "name" | "desc",
    value: string
  ) => {
    const updated = [...contents];
    updated[index][field] = value;
    setContents(updated);
  };

  if (step === "done") {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl mb-2">提交成功！</h2>
          <p className="text-muted-fg mb-6">
            你的技能包「{title}」已提交审核，审核通过后将上线。
            我们会尽快处理，通常在 1-2 个工作日内完成。
          </p>
          <a
            href="/explore"
            className="inline-block bg-accent text-background px-8 py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors"
          >
            返回场景库
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl mb-2">发布技能包</h1>
        <p className="text-muted-fg mb-8">
          分享你的技能包，帮助更多人提升效率
        </p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s: any) => (
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
              {s < 4 && (
                <div
                  className={`flex-1 h-0.5 ${(step as number) > s ? "bg-accent/30" : "bg-card-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card-bg border border-card-border rounded-2xl p-6 sm:p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl mb-4">基本信息</h2>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  包名称 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="30字以内，清楚说明是什么"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
                <div className="text-right text-muted text-xs mt-1">
                  {title.length}/30
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  一句话描述 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  maxLength={50}
                  placeholder="50字以内，描述核心功能"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
                <div className="text-right text-muted text-xs mt-1">
                  {description.length}/50
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-fg mb-1.5 block">
                    行业分类 <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent/50 transition-colors"
                  >
                    <option value="">请选择</option>
                    {INDUSTRIES.map((ind: any) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-fg mb-1.5 block">
                    包类型 <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={packType}
                    onChange={(e) => setPackType(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent/50 transition-colors"
                  >
                    <option value="">请选择</option>
                    {SKILL_TYPES.map((t: any) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!title || !description || !industry || !packType}
                className="w-full bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                下一步
              </button>
            </div>
          )}

          {/* Step 2: Content Details */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl mb-4">内容详情</h2>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  解决什么问题 <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="用场景语言描述：装上这个包后，Agent 能帮用户做什么"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  包含什么（可动态添加）
                </label>
                {contents.map((item: any, i: any) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="名称"
                      value={item.name}
                      onChange={(e) =>
                        updateContent(i, "name", e.target.value)
                      }
                      className="flex-1 bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50"
                    />
                    <input
                      type="text"
                      placeholder="一句话说明"
                      value={item.desc}
                      onChange={(e) =>
                        updateContent(i, "desc", e.target.value)
                      }
                      className="flex-2 bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50"
                    />
                  </div>
                ))}
                <button
                  onClick={addContent}
                  className="text-accent text-sm hover:underline"
                >
                  + 添加更多
                </button>
              </div>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  使用说明
                </label>
                <textarea
                  rows={3}
                  placeholder="安装后如何使用（每行一个步骤）"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  适合谁
                </label>
                <input
                  type="text"
                  placeholder="描述目标用户"
                  value={targetUser}
                  onChange={(e) => setTargetUser(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
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
                  disabled={!problem}
                  className="flex-1 bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Upload Files */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl mb-4">上传文件</h2>

              <div className="border-2 border-dashed border-card-border rounded-xl p-10 text-center hover:border-accent/30 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">📁</div>
                <p className="text-foreground font-medium mb-1">
                  上传技能包文件
                </p>
                <p className="text-muted text-sm">
                  支持 JSON / ZIP 格式，最大 50MB
                </p>
                <input type="file" className="hidden" accept=".json,.zip" />
              </div>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  提示词模板（可选）
                </label>
                <textarea
                  rows={4}
                  placeholder="粘贴你的提示词模板内容"
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  演示视频链接（可选）
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-card-border py-3 rounded-xl text-foreground hover:bg-card-bg transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl mb-4">定价</h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPricing("free")}
                  className={`p-5 rounded-xl border text-center transition-all ${
                    pricing === "free"
                      ? "border-accent bg-accent/10"
                      : "border-card-border hover:border-accent/30"
                  }`}
                >
                  <div className="text-3xl mb-2">🆓</div>
                  <div className="font-medium">免费</div>
                  <div className="text-muted text-xs mt-1">
                    所有人可直接安装
                  </div>
                </button>
                <button
                  onClick={() => setPricing("paid")}
                  className={`p-5 rounded-xl border text-center transition-all ${
                    pricing === "paid"
                      ? "border-accent bg-accent/10"
                      : "border-card-border hover:border-accent/30"
                  }`}
                >
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-medium">付费</div>
                  <div className="text-muted text-xs mt-1">
                    设定价格获取收益
                  </div>
                </button>
              </div>

              {pricing === "paid" && (
                <div>
                  <label className="text-sm text-muted-fg mb-1.5 block">
                    价格（元）
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="请输入价格"
                    className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              )}

              {/* Summary */}
              <div className="bg-background rounded-xl p-5 border border-card-border">
                <h3 className="text-sm font-medium mb-3">发布摘要</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-fg">名称</span>
                    <span className="text-foreground">{title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-fg">类型</span>
                    <span className="text-foreground">
                      {SKILL_TYPES.find((t: any) => t.id === packType)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-fg">行业</span>
                    <span className="text-foreground">
                      {INDUSTRIES.find((i: any) => i.id === industry)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-fg">定价</span>
                    <span className="text-foreground">
                      {pricing === "free" ? "免费" : "付费"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
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
