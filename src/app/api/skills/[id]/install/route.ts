import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const prisma = await getClient();
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      );
    }

    const { id: skillPackId } = await params;

    const skill = await prisma.skillPack.findUnique({
      where: { id: skillPackId },
    });

    if (!skill) {
      return NextResponse.json(
        { error: "技能包不存在" },
        { status: 404 }
      );
    }

    // Upsert installation
    await prisma.installation.upsert({
      where: {
        userId_skillPackId: { userId, skillPackId },
      },
      update: { status: "installed", installedAt: new Date() },
      create: { userId, skillPackId, status: "installed" },
    });

    // Increment install count
    await prisma.skillPack.update({
      where: { id: skillPackId },
      data: { installCount: { increment: 1 } },
    });

    // Generate config JSON for download
    const config = {
      skillPackId: skill.id,
      title: skill.title,
      type: skill.type,
      contents: skill.contents ? JSON.parse(skill.contents) : [],
      installedAt: new Date().toISOString(),
      version: "1.0.0",
    };

    return NextResponse.json({
      success: true,
      message: "安装成功",
      config,
    });
  } catch (error) {
    console.error("Install error:", error);
    return NextResponse.json(
      { error: "安装失败" },
      { status: 500 }
    );
  }
}
