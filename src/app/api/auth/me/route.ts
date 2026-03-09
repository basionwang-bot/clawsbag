import { NextResponse } from "next/server";
import { getClient } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  try {
    const prisma = await getClient();
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        nickname: true,
        industry: true,
        avatar: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            installations: true,
            skillPacks: true,
            reviews: true,
          },
        },
      },
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
