import Link from "next/link";

export function BottomCTA() {
  return (
    <section className="py-24 grid-bg relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl mb-4">
          你的 Agent 还缺什么？
        </h2>
        <p className="text-muted-fg mb-8">
          找到你行业的技能包，让 Agent 成为你的真正助手
        </p>
        <Link
          href="/explore"
          className="inline-block bg-accent text-background px-10 py-4 rounded-xl text-lg font-medium hover:bg-accent-hover transition-colors"
        >
          进入场景库
        </Link>
      </div>
    </section>
  );
}
