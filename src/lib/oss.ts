/**
 * 阿里云 OSS 文件上传封装
 *
 * 使用前需要在 .env 中配置：
 *   ALIYUN_OSS_REGION=oss-cn-hangzhou          （你的 OSS 区域）
 *   ALIYUN_OSS_BUCKET=clawsbag                 （你的 Bucket 名称）
 *   ALIYUN_ACCESS_KEY_ID=你的AccessKeyId        （与短信共用）
 *   ALIYUN_ACCESS_KEY_SECRET=你的AccessKeySecret
 *
 * 阿里云控制台设置步骤：
 *   1. 登录 https://oss.console.aliyun.com/
 *   2. 创建 Bucket（选就近区域，如 oss-cn-hangzhou）
 *   3. Bucket 权限设为"公共读"（上传文件后用户可直接下载）
 *   4. 跨域设置(CORS)：允许 * 源，允许 GET/PUT 方法
 */

import OSS from "ali-oss";

function createOSSClient(): OSS | null {
  const accessKeyId = process.env.ALIYUN_ACCESS_KEY_ID;
  const accessKeySecret = process.env.ALIYUN_ACCESS_KEY_SECRET;
  const region = process.env.ALIYUN_OSS_REGION;
  const bucket = process.env.ALIYUN_OSS_BUCKET;

  if (!accessKeyId || !accessKeySecret || !region || !bucket) {
    return null;
  }

  return new OSS({ region, accessKeyId, accessKeySecret, bucket });
}

export async function uploadFile(
  buffer: Buffer,
  filename: string,
  folder: string = "uploads"
): Promise<{ success: boolean; url?: string; message?: string }> {
  const client = createOSSClient();

  if (!client) {
    // 开发模式：返回假URL
    console.log(`[DEV OSS] Would upload: ${folder}/${filename}`);
    return {
      success: true,
      url: `/dev-uploads/${folder}/${filename}`,
      message: "开发模式：文件未真实上传",
    };
  }

  try {
    const key = `${folder}/${Date.now()}-${filename}`;
    const result = await client.put(key, buffer);
    return { success: true, url: result.url };
  } catch (error) {
    console.error("OSS Upload Error:", error);
    return { success: false, message: "文件上传失败" };
  }
}

export function getOSSSignedUrl(key: string, expires: number = 3600): string | null {
  const client = createOSSClient();
  if (!client) return null;

  try {
    return client.signatureUrl(key, { expires });
  } catch {
    return null;
  }
}
