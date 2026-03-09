"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { SkillCard } from "@/components/SkillCard";
import { useState, useEffect } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-accent">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default function SkillDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [skill, setSkill] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [installState, setInstallState] = useState<
    "idle" | "installing" | "done"
  >("idle");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/skills/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSkill(data.skill || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <p className="text-muted-fg">加载中...</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl mb-2">技能包不存在</h2>
          <Link href="/explore" className="text-accent hover:underline text-sm">
            返回场景库
          </Link>
        </div>
      </div>
    );
  }

  const detail = skill;
  const isFree = detail.price === 0;
  const relatedSkills = detail.relatedSkills || [];

  const handleInstall = () => {
    setShowInstallModal(true);
    setInstallState("installing");
    setTimeout(() => setInstallState("done"), 2000);
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                {detail.industry}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-card-border text-muted-fg">
                {detail.type === "skill_pack"
                  ? "技能包"
                  : detail.type === "workflow"
                    ? "工作流"
                    : "资源包"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl mb-3">{detail.title}</h1>
            <p className="text-muted-fg text-lg mb-6">{detail.description}</p>

            <div className="flex items-center gap-4 mb-6">
              {detail.author && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{detail.author.avatar}</span>
                  <span className="text-sm text-muted-fg">
                    {detail.author.nickname ?? detail.author.name ?? "未知"}
                  </span>
                </div>
              )}
              {detail.author && <span className="text-card-border">|</span>}
              <div className="flex items-center gap-1">
                <StarRating rating={detail.rating} />
                <span className="text-sm text-muted-fg ml-1">
                  {detail.rating} ({detail.ratingCount}条评价)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted font-mono-num">
              <span>⬇ {detail.installCount} 次安装</span>
              {detail.updatedAt && (
                <span>更新于 {detail.updatedAt}</span>
              )}
            </div>
          </div>

          {/* Install Card */}
          <div className="md:w-72 shrink-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{detail.coverImage}</div>
                <span
                  className={`text-2xl font-bold ${isFree ? "text-green-400" : "text-accent"}`}
                >
                  {isFree ? "免费" : `¥${detail.price}`}
                </span>
              </div>
              <button
                onClick={handleInstall}
                className="w-full bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors text-lg"
              >
                一键安装到我的 Agent
              </button>
              <p className="text-center text-muted text-xs mt-3">
                安装后可在个人中心管理
              </p>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        {detail.problem && (
          <section className="mb-10">
            <h2 className="text-2xl mb-4">
              装上这个，你的 Agent 能帮你做什么
            </h2>
            <div className="bg-card-bg border border-card-border rounded-2xl p-6">
              <p className="text-muted-fg leading-relaxed">{detail.problem}</p>
            </div>
          </section>
        )}

        {/* Contents */}
        {detail.contents?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl mb-4">包含内容</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {detail.contents.map((item, i) => (
              <div
                key={i}
                className="bg-card-bg border border-card-border rounded-xl p-4"
              >
                <h3 className="text-foreground font-medium mb-1">
                  {item.name}
                </h3>
                <p className="text-muted-fg text-sm">{item.description}</p>
              </div>
              ))}
            </div>
          </section>
        )}

        {/* Instructions */}
        {detail.instructions?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl mb-4">使用说明</h2>
            <div className="bg-card-bg border border-card-border rounded-2xl p-6">
              <ol className="space-y-3">
                {detail.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-muted-fg">
                  <span className="font-mono-num text-accent font-bold shrink-0">
                    {i + 1}.
                  </span>
                  {step}
                </li>
                ))}
              </ol>
              {(detail.targetUser || detail.notForUser) && (
                <div className="mt-6 pt-4 border-t border-card-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {detail.targetUser && (
                    <div>
                      <span className="text-foreground font-medium">适合谁：</span>
                      <span className="text-muted-fg ml-1">{detail.targetUser}</span>
                    </div>
                  )}
                  {detail.notForUser && (
                    <div>
                      <span className="text-foreground font-medium">不适合谁：</span>
                      <span className="text-muted-fg ml-1">{detail.notForUser}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="mb-10">
          <h2 className="text-2xl mb-4">
            用户评价 ({detail.reviews?.length ?? 0})
          </h2>
          <div className="space-y-4">
            {(detail.reviews ?? []).map((review, i) => (
              <div
                key={i}
                className="bg-card-bg border border-card-border rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{review.avatar}</span>
                  <div>
                    <div className="text-foreground text-sm font-medium">
                      {review.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-muted text-xs">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-fg text-sm">{review.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {relatedSkills.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl mb-4">相关推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedSkills.map(
                (s) => s && <SkillCard key={s.id} skill={s} />
              )}
            </div>
          </section>
        )}
      </div>

      {/* Install Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card-bg border border-card-border rounded-2xl p-8 max-w-md w-full mx-4">
            {installState === "installing" ? (
              <div className="text-center">
                <div className="text-5xl mb-4 animate-bounce">⚡</div>
                <h3 className="text-xl mb-2">正在配置你的 Agent...</h3>
                <p className="text-muted-fg text-sm">
                  正在将技能包写入配置，请稍候
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl mb-2">
                  已成功装入你的 Agent！
                </h3>
                <p className="text-muted-fg text-sm mb-2">
                  已安装：{detail.title}
                </p>
                <p className="text-muted text-xs mb-6">
                  包含 {detail.contents?.length ?? 0} 个技能
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowInstallModal(false)}
                    className="flex-1 bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors"
                  >
                    继续浏览
                  </button>
                  <Link
                    href="/user/installed"
                    className="flex-1 border border-card-border py-3 rounded-xl text-center text-foreground hover:bg-card-bg transition-colors"
                  >
                    查看已安装
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
