import Link from "next/link";

export interface SkillCardData {
  id: string;
  title: string;
  description: string;
  industry: string;
  type: string;
  installCount: number;
  rating: number;
  price: number;
  coverImage?: string | null;
  tags?: string[];
}

export function SkillCard({ skill }: { skill: SkillCardData }) {
  const isFree = skill.price === 0;

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-5 hover:border-accent/40 transition-all group">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl shrink-0">
          {skill.coverImage || "📦"}
        </div>
        <div className="min-w-0">
          <Link href={`/skill/${skill.id}`}>
            <h3 className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
              {skill.title}
            </h3>
          </Link>
          <p className="text-muted-fg text-sm mt-0.5 line-clamp-2">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
          {skill.industry}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-card-border text-muted-fg">
          {skill.type === "skill_pack"
            ? "技能包"
            : skill.type === "workflow"
              ? "工作流"
              : skill.type === "resource"
                ? "资源包"
                : "组合包"}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-card-border">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="font-mono-num">⬇ {skill.installCount}</span>
          <span className="font-mono-num">⭐ {skill.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${isFree ? "text-green-400" : "text-accent"}`}
          >
            {isFree ? "免费" : `¥${skill.price}`}
          </span>
          <Link
            href={`/skill/${skill.id}`}
            className="bg-accent text-background text-xs px-3 py-1.5 rounded-lg hover:bg-accent-hover transition-colors font-medium"
          >
            一键安装
          </Link>
        </div>
      </div>
    </div>
  );
}
