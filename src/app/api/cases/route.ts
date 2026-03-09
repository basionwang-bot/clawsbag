import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const prisma = await getClient();
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get("industry");

    const where: Record<string, unknown> = { status: "approved" };
    if (industry) {
      where.industry = industry;
    }

    const cases = await prisma.case.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { nickname: true, avatar: true } },
        skillPacks: {
          include: {
            skillPack: {
              select: { id: true, title: true, coverImage: true },
            },
          },
        },
      },
    });

    return NextResponse.json({
      cases: cases.map((c) => ({
        id: c.id,
        title: c.title,
        content: c.content,
        industry: c.industry,
        metricLabel: c.metricLabel,
        metricValue: c.metricValue,
        city: c.city,
        author: c.user,
        skillPacks: c.skillPacks.map((sp) => sp.skillPack),
        createdAt: c.createdAt,
      })),
    });
  } catch (error) {
    console.error("Cases API error:", error);
    return NextResponse.json(
      { error: "获取案例失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const prisma = await getClient();
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, industry, metricLabel, metricValue, city, skillPackIds } = body;

    if (!title || !content || !industry) {
      return NextResponse.json(
        { error: "标题、内容和行业不能为空" },
        { status: 400 }
      );
    }

    const newCase = await prisma.case.create({
      data: {
        title,
        content,
        industry,
        metricLabel,
        metricValue,
        city,
        status: "pending",
        userId,
        skillPacks: skillPackIds?.length
          ? {
              create: skillPackIds.map((id: string) => ({
                skillPackId: id,
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      caseId: newCase.id,
      message: "案例已提交审核",
    });
  } catch (error) {
    console.error("Create case error:", error);
    return NextResponse.json(
      { error: "提交失败" },
      { status: 500 }
    );
  }
}
