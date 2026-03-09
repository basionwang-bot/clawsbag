import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-accent font-bold text-lg">
              🐾 {SITE_NAME}
            </span>
            <p className="text-muted-fg text-sm mt-2">
              Agent 技能包市场
              <br />
              让普通人的 Agent 真正有用
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-3 text-sm">导航</h4>
            <div className="space-y-2">
              <Link
                href="/explore"
                className="block text-muted-fg hover:text-foreground text-sm transition-colors"
              >
                场景库
              </Link>
              <Link
                href="/case"
                className="block text-muted-fg hover:text-foreground text-sm transition-colors"
              >
                成功案例
              </Link>
              <Link
                href="/publish"
                className="block text-muted-fg hover:text-foreground text-sm transition-colors"
              >
                发布技能包
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-3 text-sm">联系</h4>
            <p className="text-muted-fg text-sm">clawsbag.com</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-card-border text-center text-muted text-xs">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
