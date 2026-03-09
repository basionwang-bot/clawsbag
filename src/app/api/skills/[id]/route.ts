import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const prisma = await getClient();
    const { id } = await params;

    const skill = await prisma.skillPack.findUnique({
      where: { id },
      include: {
        tags: { select: { tagName: true } },
        author: { select: { id: true, nickname: true, avatar: true } },
        reviews: {
          include: {
            user: { select: { nickname: true, avatar: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!skill) {
      return NextResponse.json(
        { error: "技能包不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...skill,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: skill.tags.map((t: any) => t.tagName),
      contents: skill.contents ? JSON.parse(skill.contents) : [],
    });
  } catch (error) {
    console.error("Skill detail error:", error);
    return NextResponse.json(
      { error: "获取技能包详情失败" },
      { status: 500 }
    );
  }
}
