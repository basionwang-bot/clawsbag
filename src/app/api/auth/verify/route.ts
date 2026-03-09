import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/prisma";
import { verifyCode } from "@/lib/sms";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const prisma = await getClient();
    const { phone, code, nickname, industry } = await request.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "手机号和验证码不能为空" },
        { status: 400 }
      );
    }

    if (!verifyCode(phone, code)) {
      return NextResponse.json(
        { error: "验证码错误或已过期" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({ where: { phone } });
    const isNewUser = !user;

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          nickname: nickname || `用户${phone.slice(-4)}`,
          industry: industry || null,
        },
      });
    } else if (nickname || industry) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(nickname && { nickname }),
          ...(industry && { industry }),
        },
      });
    }

    const token = signToken(user.id);

    const response = NextResponse.json({
      success: true,
      isNewUser,
      user: {
        id: user.id,
        phone: user.phone,
        nickname: user.nickname,
        industry: user.industry,
        avatar: user.avatar,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth verify error:", error);
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    );
  }
}
