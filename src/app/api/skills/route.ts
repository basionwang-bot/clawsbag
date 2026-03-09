import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const prisma = await getClient();
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get("industry");
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "installCount";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = { status: "approved" };

    if (industry) {
      where.industry = industry;
    }
    if (type) {
      where.type = type;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const orderBy: Record<string, string> =
      sort === "rating"
        ? { rating: "desc" }
        : sort === "newest"
          ? { createdAt: "desc" }
          : { installCount: "desc" };

    const [skills, total] = await Promise.all([
      prisma.skillPack.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          tags: { select: { tagName: true } },
          author: { select: { nickname: true, avatar: true } },
        },
      }),
      prisma.skillPack.count({ where }),
    ]);

    return NextResponse.json({
      skills: skills.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        industry: s.industry,
        type: s.type,
        price: s.price,
        coverImage: s.coverImage,
        installCount: s.installCount,
        rating: s.rating,
        ratingCount: s.ratingCount,
        author: s.author,
        tags: s.tags.map((t) => t.tagName),
        createdAt: s.createdAt,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Skills API error:", error);
    return NextResponse.json(
      { error: "获取技能包列表失败" },
      { status: 500 }
    );
  }
}
