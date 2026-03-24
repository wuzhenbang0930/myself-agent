import { initChatModel } from "langchain";
import { createDeepAgent } from "deepagents";
import { appConfig, validateConfig } from "../config";
import { allTools } from "../tools";
import { DEFAULT_SYSTEM_PROMPT } from "../config/prompts";

/**
 * 创建 Deep Agent
 */
export async function createAgent() {
  // 验证配置
  validateConfig();

  // 使用 initChatModel 配置 DashScope
  const model = await initChatModel(appConfig.api.modelName, {
    modelProvider: "openai",
    apiKey: appConfig.api.apiKey,
    configuration: {
      baseURL: appConfig.api.baseURL,
    },
  });

  // 创建 Deep Agent
  const agent = createDeepAgent({
    model,
    tools: allTools,
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
  });

  return agent;
}