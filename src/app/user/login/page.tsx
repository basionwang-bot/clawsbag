"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "phone" | "code";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async () => {
    if (countdown > 0 || phone.length !== 11) return;
    setError("");
    setSendCodeLoading(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "发送验证码失败，请稍后重试");
        return;
      }
      setStep("code");
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError("网络错误，请检查连接后重试");
    } finally {
      setSendCodeLoading(false);
    }
  };

  const verifyCode = async () => {
    if (code.length !== 6) return;
    setError("");
    setVerifyLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "验证失败，请检查验证码是否正确");
        return;
      }
      router.push("/user/profile");
    } catch {
      setError("网络错误，请检查连接后重试");
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <div className="bg-card-bg border border-card-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">🐾</span>
            <h1 className="text-2xl mt-3 mb-1">登录 ClawsBag</h1>
            <p className="text-muted-fg text-sm">手机号验证码登录，无需密码</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-destructive/10 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          {step === "phone" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  手机号
                </label>
                <input
                  type="tel"
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <button
                onClick={sendCode}
                disabled={phone.length !== 11 || sendCodeLoading}
                className="w-full bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {sendCodeLoading ? "发送中..." : "获取验证码"}
              </button>
            </div>
          )}

          {step === "code" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-fg text-center">
                验证码已发送到 {phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}
              </p>
              <div>
                <label className="text-sm text-muted-fg mb-1.5 block">
                  验证码
                </label>
                <input
                  type="text"
                  placeholder="请输入6位验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors text-center text-2xl tracking-widest font-mono-num"
                />
              </div>
              <button
                onClick={verifyCode}
                disabled={code.length !== 6 || verifyLoading}
                className="w-full bg-accent text-background py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {verifyLoading ? "验证中..." : "登录/注册"}
              </button>
              <button
                onClick={sendCode}
                disabled={countdown > 0 || sendCodeLoading}
                className="w-full text-muted-fg text-sm hover:text-foreground transition-colors disabled:opacity-40"
              >
                {countdown > 0 ? `重新发送 (${countdown}s)` : "重新发送验证码"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
