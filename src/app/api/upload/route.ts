import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { uploadFile } from "@/lib/oss";

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json(
        { error: "请选择文件" },
        { status: 400 }
      );
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "文件大小不能超过 50MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadFile(buffer, file.name, folder);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "上传失败" },
      { status: 500 }
    );
  }
}
