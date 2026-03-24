import { config } from "dotenv";
config();

export * from "./prompts";
export const appConfig = {
  // API 配置
  api: {
    baseURL: process.env.OPENAI_API_BASE || "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiKey: process.env.OPENAI_API_KEY || "",
    modelName: process.env.MODEL_NAME || "qwen-plus",
  },

  // 智能体配置
  agent: {
    temperature: 0.7,
    maxTokens: 4096,
  },
};

/**
 * 验证配置
 */
export function validateConfig() {
  if (!appConfig.api.apiKey || appConfig.api.apiKey === "your_dashscope_api_key_here") {
    throw new Error(
      "请配置 OPENAI_API_KEY！\n" +
      "1. 编辑 .env 文件\n" +
      "2. 填入你的阿里云 DashScope API Key\n" +
      "获取地址: https://dashscope.console.aliyun.com/"
    );
  }
}