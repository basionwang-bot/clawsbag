"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_NAME } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-accent font-bold text-xl tracking-tight">
              🐾 {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/explore"
              className="text-muted-fg hover:text-foreground transition-colors text-sm"
            >
              场景库
            </Link>
            <Link
              href="/case"
              className="text-muted-fg hover:text-foreground transition-colors text-sm"
            >
              成功案例
            </Link>
            <Link
              href="/publish"
              className="text-muted-fg hover:text-foreground transition-colors text-sm"
            >
              发布技能包
            </Link>
            <Link
              href="/user/login"
              className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              登录
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="菜单"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/explore"
              className="block py-2 text-muted-fg hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              场景库
            </Link>
            <Link
              href="/case"
              className="block py-2 text-muted-fg hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              成功案例
            </Link>
            <Link
              href="/publish"
              className="block py-2 text-muted-fg hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              发布技能包
            </Link>
            <Link
              href="/user/login"
              className="block bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-accent-hover transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              登录
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
