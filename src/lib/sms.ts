/**
 * 阿里云短信服务封装
 *
 * 使用前需要在 .env 中配置：
 *   ALIYUN_ACCESS_KEY_ID=你的AccessKeyId
 *   ALIYUN_ACCESS_KEY_SECRET=你的AccessKeySecret
 *   ALIYUN_SMS_SIGN_NAME=你的短信签名（如"ClawsBag"）
 *   ALIYUN_SMS_TEMPLATE_CODE=你的短信模板Code（如"SMS_xxxxx"）
 *
 * 阿里云控制台设置步骤：
 *   1. 登录 https://dysms.console.aliyun.com/
 *   2. 添加短信签名（公司名或产品名）
 *   3. 添加短信模板，内容类似："您的验证码为：${code}，5分钟内有效。"
 *   4. 获取 AccessKey：https://ram.console.aliyun.com/manage/ak
 */

import Dysmsapi, * as $Dysmsapi from "@alicloud/dysmsapi20170525";
import * as $OpenApi from "@alicloud/openapi-client";
import * as $Util from "@alicloud/tea-util";

const verificationCodes = new Map<string, { code: string; expiresAt: number }>();

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function createClient(): Dysmsapi | null {
  const accessKeyId = process.env.ALIYUN_ACCESS_KEY_ID;
  const accessKeySecret = process.env.ALIYUN_ACCESS_KEY_SECRET;

  if (!accessKeyId || !accessKeySecret) {
    return null;
  }

  const config = new $OpenApi.Config({
    accessKeyId,
    accessKeySecret,
    endpoint: "dysmsapi.aliyuncs.com",
  });

  return new Dysmsapi(config);
}

export async function sendVerificationCode(phone: string): Promise<{ success: boolean; message: string }> {
  const code = generateCode();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  verificationCodes.set(phone, { code, expiresAt });

  const client = createClient();

  if (!client) {
    // 开发模式：不发短信，验证码打印到控制台
    console.log(`[DEV SMS] Phone: ${phone}, Code: ${code}`);
    return { success: true, message: `开发模式：验证码为 ${code}` };
  }

  try {
    const request = new $Dysmsapi.SendSmsRequest({
      phoneNumbers: phone,
      signName: process.env.ALIYUN_SMS_SIGN_NAME || "ClawsBag",
      templateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE || "",
      templateParam: JSON.stringify({ code }),
    });

    const runtime = new $Util.RuntimeOptions({});
    const response = await client.sendSmsWithOptions(request, runtime);

    if (response.body?.code === "OK") {
      return { success: true, message: "验证码已发送" };
    } else {
      console.error("SMS Error:", response.body);
      return { success: false, message: response.body?.message || "短信发送失败" };
    }
  } catch (error) {
    console.error("SMS Error:", error);
    return { success: false, message: "短信服务异常" };
  }
}

export function verifyCode(phone: string, code: string): boolean {
  // 开发模式万能验证码
  if (code === "123456" && !process.env.ALIYUN_ACCESS_KEY_ID) {
    return true;
  }

  const stored = verificationCodes.get(phone);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    verificationCodes.delete(phone);
    return false;
  }
  if (stored.code !== code) return false;

  verificationCodes.delete(phone);
  return true;
}
