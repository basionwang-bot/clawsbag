"use client";

import Link from "next/link";
import { SITE_TAGLINE, SITE_SUBTITLE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center grid-bg overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 animate-fade-in-up">
          {SITE_TAGLINE}
        </h1>

        <p className="text-lg sm:text-xl text-muted-fg max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-100">
          {SITE_SUBTITLE}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-200">
          <Link
            href="/explore"
            className="bg-accent text-background px-8 py-4 rounded-xl text-lg font-medium hover:bg-accent-hover transition-colors"
          >
            浏览场景库
          </Link>
          <Link
            href="/publish"
            className="border border-card-border text-foreground px-8 py-4 rounded-xl text-lg hover:bg-card-bg transition-colors"
          >
            我要上传技能包
          </Link>
        </div>
      </div>
    </section>
  );
}
