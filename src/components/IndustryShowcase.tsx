"use client";

import { useState, useEffect } from "react";
import { INDUSTRIES } from "@/lib/constants";
import { SkillCard, type SkillCardData } from "./SkillCard";

export function IndustryShowcase() {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const [allSkills, setAllSkills] = useState<SkillCardData[]>([]);

  useEffect(() => {
    fetch("/api/skills?limit=100")
      .then((res) => res.json())
      .then((data) => setAllSkills(data.skills || []))
      .catch(() => {});
  }, []);

  const industryLabel = INDUSTRIES.find((i) => i.id === activeTab)?.label;
  const skills = allSkills.filter((s) => s.industry === industryLabel);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-3">
          你是做什么的？
        </h2>
        <p className="text-muted-fg text-center mb-10">
          选择你的行业，发现为你准备的技能包
        </p>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveTab(industry.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeTab === industry.id
                  ? "bg-accent text-background font-medium"
                  : "bg-card-bg border border-card-border text-muted-fg hover:border-accent/40"
              }`}
            >
              {industry.icon} {industry.label}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
