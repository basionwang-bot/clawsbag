import { NextRequest, NextResponse } from "next/server";
import { sendVerificationCode } from "@/lib/sms";

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone || !/^1\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "请输入正确的手机号" },
        { status: 400 }
      );
    }

    const result = await sendVerificationCode(phone);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    );
  }
}
