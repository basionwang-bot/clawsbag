"use client";

import { useEffect, useState } from "react";

interface StatItemProps {
  target: number;
  label: string;
  suffix?: string;
}

function StatItem({ target, label, suffix = "" }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <div className="font-mono-num text-3xl sm:text-4xl font-bold text-accent">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-muted-fg text-sm mt-1">{label}</div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="border-y border-card-border bg-card-bg/50">
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-3 gap-8">
        <StatItem target={50} label="技能包" suffix="+" />
        <StatItem target={6} label="覆盖行业" suffix="" />
        <StatItem target={1200} label="安装次数" suffix="+" />
      </div>
    </section>
  );
}
