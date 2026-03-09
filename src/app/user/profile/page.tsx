"use client";

import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl mb-8">个人中心</h1>

        {/* Profile Card */}
        <div className="bg-card-bg border border-card-border rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-xl font-medium">未登录</h2>
              <p className="text-muted-fg text-sm">请先登录查看个人信息</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/user/installed"
            className="bg-card-bg border border-card-border rounded-xl p-5 hover:border-accent/40 transition-all group"
          >
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-medium group-hover:text-accent transition-colors">
              我已安装的包
            </h3>
            <p className="text-muted-fg text-sm mt-1">
              查看和管理已安装的技能包
            </p>
          </Link>
          <Link
            href="/publish"
            className="bg-card-bg border border-card-border rounded-xl p-5 hover:border-accent/40 transition-all group"
          >
            <div className="text-2xl mb-2">📤</div>
            <h3 className="font-medium group-hover:text-accent transition-colors">
              我发布的包
            </h3>
            <p className="text-muted-fg text-sm mt-1">
              上传和管理你的技能包
            </p>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/user/login"
            className="inline-block bg-accent text-background px-8 py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors"
          >
            登录 / 注册
          </Link>
        </div>
      </div>
    </div>
  );
}
