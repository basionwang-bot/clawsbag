const STEPS = [
  {
    number: "01",
    title: "选场景",
    description: "浏览行业分类，找到适合你工作的技能包",
    icon: "🔍",
  },
  {
    number: "02",
    title: "一键安装",
    description: "点击安装按钮，把技能包装进你的 Agent",
    icon: "⚡",
  },
  {
    number: "03",
    title: "直接用",
    description: "打开你的 Agent，新技能已就绪，直接开始工作",
    icon: "🚀",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-card-bg/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-3">
          三步上手，简单到不行
        </h2>
        <p className="text-muted-fg text-center mb-14">
          不需要懂代码，不需要看文档
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-accent/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div className="font-mono-num text-accent text-sm mb-2">
                STEP {step.number}
              </div>
              <h3 className="text-xl mb-2 font-bold">{step.title}</h3>
              <p className="text-muted-fg text-sm">{step.description}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-card-border text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
